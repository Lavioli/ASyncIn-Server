export default user => {
  return {
      username: user.username,
      token: user.token,
      accessToken: user.accessToken,
      userId: user._id,
      favouritePlaylists: user.favouritePlaylists,
      queue: user.queue
  };
}