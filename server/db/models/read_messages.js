const Sequelize = require("sequelize");
const User = require("./user");
const Message = require("./message");
const db = require("../db");

const UserReadMessage = db.define("user_read_message", {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id"
    }
  },
  messageId: {
    type: Sequelize.INTEGER,
    references: {
      model: Message,
      key: "id"
    }
  }
});

module.exports = UserReadMessage;
