import mongoose, { Date, ObjectId } from 'mongoose';

interface ICard {
  name: string;
  link: string;
  owner: ObjectId;
  likes: [ObjectId];
  createdAt: Date
}

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }],

});

export default mongoose.model<ICard>('card', cardSchema);
