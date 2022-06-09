const bcrypt = require("bcrypt");

const hash = (plaintext) => {
  return bcrypt.hashSync(plaintext, 10);
};

const compare = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = {
  hash,
  compare,
};
