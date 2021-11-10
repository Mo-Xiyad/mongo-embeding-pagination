import mongoose from "mongoose";
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    category: { type: String },
    title: { type: String, required: true },
    cover: { type: String },
    readTime: {
      type: Object,
      required: true,
      nested: {
        value: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          default: "minutes",
        },
      },
    },
    author: {
      type: Object,
      required: true,
      nested: {
        name: {
          type: String,
          required: true,
        },
        avatar: {
          type: String,
          required: true,
        },
      },
    },
    content: { type: String },
    comments: [
      {
        text: { type: String, required: true },
      },
      { timestamps: true },
    ],
  },
  {
    timestamps: true, // adds and manage createdAt and updatedAt fields
  }
);

export default model("Post", postSchema);
