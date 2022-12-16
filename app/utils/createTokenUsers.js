const createTokenUser = (user) => {
    return {
      fullName: user.fullName,
      userId: user._id,
      role: user.role,
      email: user.email,
    };
  };
  
  const createTokenParticipant = (participant) => {
    return {
      firstName: participant.firstName,
      lastName: participant.lastName,
      participantId: participant._id, 
      email: participant.email,
    };
  };
  
  module.exports = { createTokenUser, createTokenParticipant };
  