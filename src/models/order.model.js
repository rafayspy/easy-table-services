import mongoose from "mongoose";
import MenuItems, { ingredientSchema } from "./menuItems.model";


// orderItems Sub-schema::
const orderItemsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Must Provide the Food Item's Name."],
  },
  itemCode: {
    type: String,
    required: [true, "Must Provide the Food Item's Code."],
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  _id: {
    type: mongoose.Schema.ObjectId,
    ref: "MenuItems",
    required: true,
  },
});

const foodOrderSchema = new mongoose.Schema(
  {
    // orderID: {
    //   type: String,
    //   unique: true,
    //   required: [true, 'Custom Order ID is required!']
    // },
    orderType: {
      type: String,
      lowercase: true,
      default: "by restaurant",
      enum: {
        values: ["by restaurant", "by customer", "by waiter"],
        message: "{VALUE} is not supported !",
      },
    },
    orderStatus: {
      type: String,
      lowercase: true,
      default: "pending",
      enum: {
        values: ["pending", "preparing", "served", "canceled", "paid"],
        message: "{VALUE} is not supported !",
      },
    },
    tableCode: {
      type: String,
      trim: true,
    },
    numberOfGuest: {
      type: Number,
      required: [true, "Must Provide Number of Guest"],
      default: 1,
      minValue: 1,
    },
    subTotalPrice: {
      type: Number,
      required: [true, "Must Provide totalPrice"],
      minValue: 1,
    },
    vat: {
      type: Number,
      default: 0,
    },
    payableAmount: {
      type: Number,
      required: [true, "Must be a Positive  Number"],
      minValue: 1,
    },
    orderItems: [orderItemsSchema], // sub schema added ::
    OrderedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    customerName: {
      type: String,
      required: false,
    },
    customerNumber: {
      type: String,
      required: false,
    },
    cardNumber: {
      type: String,
      required: false,
    },
    cardExpire: {
      type: String,
      required: false,
    },
    cvv: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);







// Create a Model with The order Schema ::
const Order = mongoose.models.Order || mongoose.model("Order", foodOrderSchema);

export default Order;
