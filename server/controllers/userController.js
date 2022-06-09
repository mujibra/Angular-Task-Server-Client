const { User, History } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { payloadToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address, image } =
        req.body;
      const data = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
        image,
      });
      await History.create({
        username,
        email,
        password,
        phoneNumber,
        address,
        image,
        history: `${data.username} create new user`,
        UserId: data.id,
      });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async userList(req, res, next) {
    try {
      let user = await User.findAll({
        attributes: { exclude: ["password"] },
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async history(req, res, next) {
    try {
      let history = await History.findAll({
        attributes: { exclude: ["password"] },
      });
      res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      const userLogin = await User.findOne({
        where: {
          email,
        },
      });
      if (!userLogin) {
        next({ name: "NotFound" });
      }
      const rightPassword = compare(password, userLogin.password);
      if (!rightPassword) {
        res.status(401).json({ message: "Unauthorized" });
      }
      const payload = {
        id: userLogin.id,
      };
      const token = payloadToken(payload);
      res.status(200).json({
        access_token: token,
        email: userLogin.email,
        username: userLogin.username,
      });
    } catch (error) {
      next(error);
    }
  }

  static async userById(req, res, next) {
    try {
      let user = await User.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    let id = req.params.id;
    try {
      let user = await User.findByPk(id);
      if (user === null) {
        next({ name: "NotFound" });
      } else {
        await User.destroy({
          where: {
            id,
          },
        });
      }

      res.status(200).json({
        message: `${user.username} has been delete`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const data = await User.findByPk(req.params.id);
      if (!data) {
        next({ name: "NotFound" });
      } else {
        const { id } = req.params;
        const { username, email, phoneNumber, address, image } = req.body;
        console.log(req.body);
        let update = await User.update(
          {
            username,
            email,
            phoneNumber,
            address,
            image,
          },
          {
            where: {
              id,
            },
            returning: true,
          }
        );
        await History.create({
          username: data.username,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: data.password,
          address: data.address,
          image: data.image,
          history: `${data.username} already updated`,
          UserId: data.id,
        });
        update = update[1][0];
        res.status(200).json({
          message: `Update data with ID ${id} Success`,
          userBefore: data,
          userAfter: update,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
