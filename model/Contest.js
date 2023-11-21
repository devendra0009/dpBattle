import mongoose from 'mongoose';
const { Schema } = mongoose;

const ContestSchema = new Schema({
  type: { type: String, required: true }, // 1v1 or many
  votesU1: { type: Number, default: 0 },
  votesU2: { type: Number, default: 0 },
  status: {
    type: String,
    required: true,
    enum: ['matching', 'fighting', 'closed'],
  },
  user1: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  user2: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  img1: {
    type: String,
  },
  img2: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
  duration: { type: String, required: true, enum: ['5m', '1h', '1d'] },
});

ContestSchema.statics.updateStatusAfterDuration = async function (contestId) {
  const contest = await this.findById(contestId);

  if (contest && contest.status === 'fighting') {
    // Calculate the end time based on the contest's createdAt and duration
    const endTime = new Date(contest.createdAt);
    const duration = contest.duration;

    if (duration === '5m') {
      endTime.setMinutes(endTime.getMinutes() + 5);
    } else if (duration === '1h') {
      endTime.setHours(endTime.getHours() + 1);
    } else if (duration === '1d') {
      endTime.setDate(endTime.getDate() + 1);
    }

    // Calculate the remaining time in milliseconds
    const remainingTime = endTime - Date.now();

    // Set a timeout to update the contest status after the specified duration
    setTimeout(async () => {
      await this.findByIdAndUpdate(contestId, { status: 'closed' });
      console.log(`Contest ${contestId} status updated to 'closed'`);
    }, remainingTime);
  }
};


const Contest = mongoose.model('Contest', ContestSchema);

export default Contest;
