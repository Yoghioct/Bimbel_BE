const Participant = require('../../api/v1/participants/model');
const Bimbel = require('../../api/v1/bimbel/model');

const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../../errors');
const { createTokenParticipant, createJWT } = require('../../utils');

const { otpMail } = require('../email');

const signupParticipant = async (req) => {
  const { firstName, lastName, email, password, role } = req.body;

  // jika email dan status tidak aktif
  let result = await Participant.findOne({
    email,
    status: 'tidak aktif',
  });

  if (result) {
    result.firstName = firstName;
    result.lastName = lastName;
    result.role = role;
    result.email = email;
    result.password = password;
    result.otp = Math.floor(Math.random() * 999999);
    await result.save();
  } else {
    result = await Participant.create({
      firstName,
      lastName,
      email,
      password,
      role,
      otp: Math.floor(Math.random() * 999999),
    });
  }
  await otpMail(email, result);

  delete result._doc.password;
  delete result._doc.otp;

  return result;
};

const activateParticipant = async (req) => {
  const { otp, email } = req.body;
  const check = await Participant.findOne({
    email,
  });

  if (!check) throw new NotFoundError('Partisipan belum terdaftar');

  if (check && check.otp !== otp) throw new BadRequestError('Kode otp salah');

  const result = await Participant.findByIdAndUpdate(
    check._id,
    {
      status: 'aktif',
    },
    { new: true }
  );

  delete result._doc.password;

  return result;
};

const signinParticipant = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const result = await Participant.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  if (result.status === 'tidak aktif') {
    throw new UnauthorizedError('Akun anda belum aktif');
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  const token = createJWT({ payload: createTokenParticipant(result) });

  return token;
};

const getAllBimbel = async (req) => {
  const result = await Bimbel.find({ statusEvent: 'Published' })
    .populate('category')
    .populate('image')
    .select('_id title date');

  return result;
};

/**
 * TODO: Ambil data email dari personal detail
 *  */
const checkoutOrder = async (req) => {
  const { bimbel, personalDetail, payment } = req.body;

  const checkingBimbel = await Bimbels.findOne({ _id: bimbel });
  if (!checkingBimbel) {
    throw new NotFoundError('Tidak ada acara dengan id : ' + bimbel);
  }

  const checkingPayment = await Payments.findOne({ _id: payment });

  if (!checkingPayment) {
    throw new NotFoundError(
      'Tidak ada metode pembayaran dengan id :' + payment
    );
  }

  let totalPay = 0,
    totalOrderBimbel = 0;
};

module.exports = {
  signupParticipant,
  activateParticipant,
  signinParticipant,
  getAllBimbel,
  checkoutOrder,
};
