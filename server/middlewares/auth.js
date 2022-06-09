const { readPayloadToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Forbidden" };
    }

    const payload = readPayloadToken(access_token);

    let user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: "Invalid email/password" };
    }
    req.rightUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
      address: user.address,
      image: user.image,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
