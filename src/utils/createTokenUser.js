const createTokenUser = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export { createTokenUser };
