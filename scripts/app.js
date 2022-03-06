import Chatroom from "./chat.js";
import ChatUI from "./ui.js";

// DOM Queries
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector("form.new-chat");
const updateNameForm = document.querySelector("form.update-name");
const updateMsg = document.querySelector(".update-msg");
const rooms = document.querySelector(".chat-rooms");

// Add new chat
newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  //   add chat
  chatroom
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch((err) => console.log(err));
});

// Update name
updateNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newName = updateNameForm.name.value.trim();
  // run func
  chatroom.updateName(newName);
  // reset form
  updateNameForm.reset();
  // show/hide msg
  updateMsg.textContent = `Your name was updated to ${newName}`;
  setTimeout(() => (updateMsg.textContent = ""), 2000);
});

// update chat room
rooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getChats((data) => chatUI.render(data));
  }
});

// check localstorage for name
const username = localStorage.username ? localStorage.username : "anon";

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", username);

// get chats and render
chatroom.getChats((data) => chatUI.render(data));
