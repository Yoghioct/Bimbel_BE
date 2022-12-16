const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    personalDetail: {
      firstName: {
        type: String,
        required: [true, 'Please provide firstName'],
        minlength: 3,
        maxlength: 50,
      },
      lastName: {
        type: String,
        required: [true, 'Please provide lastName'],
        minlength: 3,
        maxlength: 50,
      },
      email: {
        type: String,
        required: [true, 'Please provide email'],
      },
      school: {
        type: String,
      },
    },
    status: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
    },
    totalPay: {
      type: Number,
      required: true,
    },
    participant: {
      type: mongoose.Types.ObjectId,
      ref: 'Participant',
      required: true,
    },
    payment: {
      type: mongoose.Types.ObjectId,
      ref: 'Payment',
      required: true,
    },
    bimbel: {
      type: mongoose.Types.ObjectId,
      ref: 'Bimbel',
      required: true,
    },
    historyBimbel: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
