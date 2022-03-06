import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import {
  getFirestore,
  collection,
  Timestamp,
  addDoc,
  onSnapshot,
  doc,
  query,
  where,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoGM5bLOW-fkY7qbZjg1-afHMD1gd4g0w",
  authDomain: "chat-room-js-fc4f4.firebaseapp.com",
  projectId: "chat-room-js-fc4f4",
  storageBucket: "chat-room-js-fc4f4.appspot.com",
  messagingSenderId: "301160702000",
  appId: "1:301160702000:web:8351421cbae68af8748df5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = collection(db, "chats");
    this.unsub;
  }

  async addChat(message) {
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: Timestamp.fromDate(now),
    };
    const response = await addDoc(this.chats, chat);
    return response;
  }

  getChats(callback) {
    const q = query(
      this.chats,
      where("room", "==", this.room),
      orderBy("created_at")
    );
    this.unsub = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          callback(change.doc.data());
        }
      });
    });
  }

  updateName(username) {
    this.username = username;
    localStorage.setItem("username", username);
  }

  updateRoom(room) {
    this.room = room;
    if (this.unsub) {
      this.unsub();
    }
  }
}

export default Chatroom;
