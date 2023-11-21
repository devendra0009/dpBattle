import User from '../model/User.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.status(200).json({ users: users });
  } catch (error) {
    console.log('Error registering user:', error);
    res.status(500).json({ msg: error.message });
  }
};

// for searching of other users by email
export const getUserByUserEmail = async (req, res) => {
  try {
    const { email } = req.query;
    console.log(email);
    // console.log(req.user);
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      res.status(404).json({ msg: 'User not found !!' });
    }
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserByUserId = async (req, res) => {
  try {
    const { id } = req.user;
    // console.log(req.user);
    const user = await User.findById(id, { password: 0 });
    res.status(200).json({ user: user });
  } catch (error) {
    console.log('Error registering user:', error);
    res.status(500).json({ msg: error.message });
  }
};

export const getUserByContestId = async (req, res) => {
  try {
  } catch (error) {}
};

// in this i can update any new follower or following, any new contestId that user participated in, update the name, email, image
// one more thing if userA started following a userB, to userA k following me userB ki id push krde and userB k followers me userA ki id push krde
export const updateUserByUserId = async (req, res) => {
  try {
    const { id } = req.user; // this will get me user's id as to run this route user had to first authenticate/fill the req.user
    const updates = req.body;
    if (!Object.keys(updates).length) {
      return res.status(400).json({ msg: 'No fields to update provided!!' });
    }
    const result = await User.updateOne({ _id: id }, { $set: updates });
    console.log(result);

    if (result.modifiedCount === 1) {
      return res.status(200).json({ msg: 'User updated successfully!!' });
    } else {
      return res
        .status(404)
        .json({ msg: 'User not found or no changes to update!!' }); // no changes to update means a field is provided but without any change
    }
  } catch (error) {}
};
export const updateFollowerFollowingByUserId = async (req, res) => {
  // i have the id of current user, i want the id of the user clicked to be followed.
  // So, in req.body i'll receive { targetUserId: id, operation: "follow/unfollow" }
  const { id } = req.user;
  const { targetUserId, operation } = req.body;
  console.log(id);

  if (id === targetUserId) {
    return res.status(400).json({ msg: 'User cannot follow themselves!' });
  }

  try {
    if (!targetUserId) {
      return res
        .status(400)
        .json({ msg: 'targetUserId is required in the request body!' });
    }

    let updatedUser, updatedTargetUser;

    if (operation === 'follow') {
      updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { $addToSet: { following: targetUserId } },
        { new: true }
      );

      updatedTargetUser = await User.findOneAndUpdate(
        { _id: targetUserId },
        { $addToSet: { followers: id } },
        { new: true }
      );
    } else {
      updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { $pull: { following: targetUserId } },
        { new: true }
      );

      updatedTargetUser = await User.findOneAndUpdate(
        { _id: targetUserId },
        { $pull: { followers: id } },
        { new: true }
      );
    }
    console.log(updatedUser, updatedTargetUser);
    if (updatedUser && updatedTargetUser) {
      return res.status(200).json({
        msg:
          operation === 'follow'
            ? 'User followed successfully'
            : 'User unfollowed successfully',
        updatedUser,
        updatedTargetUser,
      });
    } else {
      console.log('aee vala');
      return res.status(404).json({ msg: 'User not found!' });
    }
  } catch (error) {
    console.error('Error following/unfollowing user:', error);
    res.status(500).json({ msg: error.message });
  }
};

// isme me contest ki id provide kruga that'll be pushed in the contest array of a user
// export const updateUserContestByContestId=async(req,res)=>{
//     const {id}=req.user;
//     try {

//     } catch (error) {

//     }
// }

// this endpoint is initiated by user itself
export const deleteUserByUserId = async (req, res) => {
  try {
    const { id } = req.user;
    const deletedUser = await User.findByIdAndDelete(id);
    res.send({ status: 200, data: deletedUser });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const deleteAllUsers = async (req, res) => {  // this is for admin
//     try {
//         const { id } = req.params;
//         const res = await User.deleteMany({});
//         res.send({ status: 200, data: res });
//       } catch (error) {
//         res.status(500).json({ msg: error.message });
//       }
// };
