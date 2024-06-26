import mongoose from "mongoose";

// Define the User Schema::
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          // Custom validation function to check if either email or phoneNumber is provided
          return this.email || this.phoneNumber;
        },
        message: "Email or Phone Number is required",
      },
    },
    number: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: "string",
      lowercase: true,
      default: "customer",
      enum: {
        values: ["admin", "manager", "waiter", "customer"],
        message: "{VALUE} is not supported",
      },
    },
  },
  {
    timestamps: true,
  }
);


// Create the User model using the userSchema
const User = mongoose.models.User || mongoose.model("User", userSchema);

// Export the User model
export default User;
