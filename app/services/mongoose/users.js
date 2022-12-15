const Users = require('../../api/v1/users/model');
// const Guru = require('../../api/v1/guru/model');
const { BadRequestError } = require('../../errors');

const createUsers = async (req, res) => {
  const { fullName, password, role, confirmPassword, email } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Password dan Konfirmasi password tidak cocok');
  }

  const result = await Users.create({
    fullName,
    email,
    password,
    role,
  });

  return result;
};

const getAllUsers = async (req) => {
  const result = await Users.find();

  return result;
};

module.exports = { createUsers, getAllUsers };
