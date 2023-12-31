// script.js
var socket;
var messageInput;
var dingSound;
var messages = [];
var delay = true;
var messagesToLoad = 15;
var typing = false; // Flag to track typing state

function onload() {
  socket = io();
  messageInput = document.getElementById("ComposedMessage");

  messages = JSON.parse(localStorage.getItem("messages")) || [];
  updateDisplayMessages();

  socket.on("join", function (room) {
    updateDisplayMessages();
  });

  socket.on("recieve", function (message) {
    window.scrollTo(0, document.body.scrollHeight);
    console.log(message);
    messages.push(message);
    updateDisplayMessages();
    localStorage.setItem("messages", JSON.stringify(messages));
  });

  // Add event listener to submit message on 'enter' hit
  messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      Send();
    } else {
      startTyping();
    }
  });

  // Add event listener to stop typing when user stops typing
  messageInput.addEventListener("keyup", function () {
    stopTyping();
  });
}

function Send() {
  if (delay && messageInput.value.replace(/\s/g, "") !== "") {
    delay = false;
    setTimeout(delayReset, 1000);
    socket.emit("send", messageInput.value);
    messageInput.value = "";
    stopTyping(); // Stop typing when the message is sent
    window.scrollTo(0, document.body.scrollHeight -2);
  }
}

function delayReset() {
  delay = true;
}

function startTyping() {
  if (!typing) {
    typing = true;
    socket.emit("typing", true);
  }
}

function stopTyping() {
  if (typing) {
    typing = false;
    socket.emit("typing", false);
  }
}

function updateDisplayMessages() {
  const messageContainer = document.getElementById("MessageContainer");
  messageContainer.innerHTML = ""; // Clear existing messages

  // Load all messages without a limit
  const displayMessages = messages.slice();

  // Append messages to the message container
  for (let i = 0; i < displayMessages.length; i++) {
    const messageElement = document.createElement("p");
    messageElement.className = "Message";
    messageElement.innerHTML = displayMessages[i];
    messageContainer.appendChild(messageElement);
  }
}


function panic(){
  socket.emit("send", "**[SAFEWORD BRIDGE]**  *panic emergency button triggered* ") 

  localStorage.setItem('messages', '')
  localStorage.clear()
  location.reload()
}