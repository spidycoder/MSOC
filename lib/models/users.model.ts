import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    posts: {
      type: [
        {
          heading: {
            type: String,
            required: false,
          },
          description: {
            type: String,
            required: false,
          },
          likes: {
            type: Number,
            required: false,
            default: 0,
          },
          hearts: {
            type: Number,
            required: false,
            default: 0,
          },
        },
      ],
      default: [],
    },
    resetToken: {
      type: String,
      required: false,
    },
    resetTokenExpiry: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
