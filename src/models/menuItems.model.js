import mongoose from "mongoose";

//* Define the menuItems Schema::
const menuItemsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Must provide a item name"],
      unique: true,
      trim: true,
    },
    itemCode: {
      type: String,
      required: [true, "Must provide a menu-item code"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Must Provide a price of an Item"],
      minValue: 1,
    },
    image: {
      type: String,
      defaultValue: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
   
  },
  {
    timestamps: true,

  }
);


const MenuItems =
  mongoose.models.MenuItems || mongoose.model("MenuItems", menuItemsSchema);

export default MenuItems;
