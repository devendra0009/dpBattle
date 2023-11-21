import mongoose from 'mongoose';
const {Schema}=mongoose
const UserSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img: {type:String, required:true},
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  contests: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Contest',
    },
  ],
  role: { type: String, default: 'user' },
});

const User = mongoose.model('User', UserSchema);

export default User;
