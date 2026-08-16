export const mapUser = (user) => {
  console.log("user is user dto ===>", user);
  return {
    id: user._id.toString(),
    name: user.username,
    email: user.email,
    profileUrl: user?.profile?.url,
  };
};
