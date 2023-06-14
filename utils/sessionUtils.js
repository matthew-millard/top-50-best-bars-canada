const clearUserSessions = async (email, sessionStore) => {
  try {
    const sessions = await sessionStore.all();

    for (const sessionId in sessions) {
      const session = sessions[sessionId];
      if (
        session.passport &&
        session.passport.user &&
        session.passport.user.email === email
      ) {
        await sessionStore.destroy(sessionId);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { clearUserSessions };
