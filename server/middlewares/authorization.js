const { User, Product } = require("../models");

const getAccess = async (req, res, next) => {
  try {
    const foodId = req.params.id;
    const userId = req.rightUser.id;
    const userRole = req.rightUser.role;

    const searchProduct = await Product.findByPk(foodId);
    if (!searchProduct) {
      throw { name: "NotFound" };
    }
    const match = await User.findOne({
      where: {
        id: req.rightUser.id,
        email: req.rightUser.email,
      },
    });
    if (!match) {
      throw { name: "BadRequest" };
    }
    if (req.method === "PUT" && userRole !== "Admin") {
      throw { name: "BadRequest" };
    }
    if (userId !== searchProduct.UserId && userRole !== "Admin") {
      throw { name: "Forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { getAccess };
