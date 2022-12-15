const Bimbel = require('../../api/v1/bimbel/model');
const { checkingImage } = require('./images');
const { checkingCategories } = require('./categories');

const { NotFoundError, BadRequestError } = require('../../errors');

const getAllBimbel = async (req) => {
  const { keyword, category } = req.query;
  let condition = {};

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: 'i' } };
  }

  if (category) {
    condition = { ...condition, category: category };
  }

  const result = await Bimbel.find(condition)
    .populate({ path: 'image', select: '_id name' })
    .populate({
      path: 'category',
      select: '_id name',
    })

  return result;
};

const createBimbel = async (req) => {
    const {
        title,
        date,
        description,
        price,
        statusBimbel,
        typeBimbel,
        period,
        image,
        category,
    } = req.body;
  
    await checkingImage(image);
    await checkingCategories(category);
  
    const check = await Bimbel.findOne({ title });
  
    if (check) throw new BadRequestError('judul bimbel duplikat');
  
    const result = await Bimbel.create({
        title,
        date,
        description,
        price,
        statusBimbel,
        typeBimbel,
        period,
        image,
        category,
    });
  
    return result;
  };

const getOneBimbel = async (req) => {
  const { id } = req.params;

  const result = await Bimbel.findOne({ _id: id })
    .populate({ path: 'image', select: '_id name' })
    .populate({
      path: 'category',
      select: '_id name',
    })

    // if (!result)
    // throw new NotFoundError(`Tidak ada guru dengan id :  ${id}`);

  return result;
};

const updateBimbel = async (req) => {
  const { id } = req.params;
  const {
    title,
    date,
    description,
    price,
    statusBimbel,
    typeBimbel,
    period,
    image,
    category,
  } = req.body;

  await checkingImage(image);
  await checkingCategories(category);

  const check = await Bimbel.findOne({
    title,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError('judul bimbel duplikat');

  const result = await Bimbel.findOneAndUpdate(
    { _id: id },
    {
        title,
        date,
        description,
        price,
        statusBimbel,
        typeBimbel,
        period,
        image,
        category,
    },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada bimbel dengan id :  ${id}`);

  return result;
};

const deleteBimbel = async (req) => {
  const { id } = req.params;

  const result = await Bimbel.findOne({
    _id: id,
  });

//   if (!result)
//     throw new NotFoundError(`Tidak ada guru dengan id :  ${id}`);

  await result.remove();

  return result;
};

module.exports = {
  getAllBimbel,
  createBimbel,
  getOneBimbel,
  updateBimbel,
  deleteBimbel,
};