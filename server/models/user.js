import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String },
  id: { type: String },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin', 'superAdmin']
  }
});

export default mongoose.model("User", userSchema);
