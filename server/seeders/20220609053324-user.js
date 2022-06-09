"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../user.json");

    data.forEach((el) => {
      (el.createdAt = new Date()), (el.updatedAt = new Date());
    });
    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
