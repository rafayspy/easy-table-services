import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      require: [true, "Must provide customer name!"],
      trim: true,
    },
    customerEmail: {
      type: String,
      require: [true, "Must provide your email!"],
      trim: true,
      validate: {
        validator: function (val) {
          // Regular expression to validate email address
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        },
        message: "Invalid email address format!",
      },
    },
    customerContactNumber: {
      type: String,
      require: [true, "Must provide Contact number!"],
      trim: true,
    },
    numberOfGuest: {
      type: Number,
      require: [true, "Must provide Contact number!"],
      trim: true,
    },
    reservationDate: {
      type: Date,
      require: [true, "Must provide Reservation Time!"],
      trim: true,
    },
    reservationTime: {
      type: String,
      require: [true, "Must provide Reservation Time!"],
      trim: true,
    },
    note: {
      type: String,
      trim: true,
      require: false,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a Reservation Model With the schema::
const Reservation =
  mongoose.models.Reservation || mongoose.model("Reservation", reservationSchema);

// Export the Reservation Model::
export default Reservation;
