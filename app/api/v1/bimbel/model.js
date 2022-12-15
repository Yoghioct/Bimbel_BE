const mongoose = require('mongoose');

const bimbelSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, 'Judul harus diisi'],
        minlength: 3,
        maxlength: 50,
      },
      date: {
        type: Date,
        required: [true, 'Tanggal dan waktu harus diisi'],
      },
      description: {
        type: String,
      },
      price: {
        type: Number,
        default: 0,
      },
      statusBimbel: {
        type: String,
        enum: ['Published', 'Draft'],
        default: 'Published',
      },
      typeBimbel: {
        type: String,
        enum: ['Offline', 'Online'],
        default: 'Offline',
      },
      period: {
        type: String,
      },
      image: {
        type: mongoose.Types.ObjectId,
        ref: 'Image',
        required: true,
      },
      category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
    },
    { timestamps: true }
  );

module.exports = mongoose.model('Bimbel', bimbelSchema);