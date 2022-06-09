const jwt = require("jsonwebtoken");
const key = "secrett";

const payloadToken = (payload) => {
  return jwt.sign(payload, key);
};

const readPayloadToken = (token) => {
  return jwt.verify(token, key);
};

module.exports = {
  payloadToken,
  readPayloadToken,
};
