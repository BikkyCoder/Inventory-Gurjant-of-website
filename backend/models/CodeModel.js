import mongoose from "mongoose";

const CodeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
}, { timestamps: true });

export const Code = mongoose.model("Code", CodeSchema);

