const createTokenUser = (user) => {
    return {
      fullName: user.fullName,
      userId: user._id,
      role: user.role,
      email: user.email,
    };
  };
  
//   const createTokenPerson = (participant) => {
//     return {
//       lastName: participant.lastName,
//       participantId: participant._id,
//       firstName: participant.firstName,
//       email: participant.email,
//     };
//   };
  
  module.exports = { createTokenUser };
  