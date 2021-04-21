const auth = {
    isPermitted: username => {
      if(!username || username === 'dog') {
        return false;
      }
      const cleanUsername = username.replace(/[^a-zA-Z0-9_\-]/g, "");
      return !(!username === cleanUsername || username.trim().length === 0);
    },
  };
  
  module.exports = auth;