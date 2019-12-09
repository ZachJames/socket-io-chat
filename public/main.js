$(function() {
  const selectUsernamePage = $(".select-username");
  const chatPage = $(".chat");

  // Input fields
  const usernameInput = $(".username-input");
  const usernameDisplay = $(".username-display");

  const socket = io();
  let username = null;

  const addChatLogMessage = (message, options) => {
    if (!options) {
      options = {};
    }
  };

  // Login the user
  const login = username => {
    username = usernameInput.val().trim();

    if (username.length > 0) {
      socket.emit("login user", username);
      usernameDisplay.text(username);
      selectUsernamePage.hide();
      chatPage.show();
    }
  };

  // When user submits username form
  $(".username-form").submit(e => {
    e.preventDefault();
    login(username);
  });
})();
