

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Replace these values with your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo8_9Zf1w8miqtbaFracn0OM0-VcRHpGQ",
  authDomain: "prochat-653f4.firebaseapp.com",
  projectId: "prochat-653f4",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const messagesRef = collection(db, "messages");

const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesBox = document.getElementById("messages");

// Send message
sendBtn.addEventListener("click", async () => {
  
  const message = messageInput.value.trim();

  if (!message) return;

  try {
    await addDoc(messagesRef, {
      text: message,
      createdAt: serverTimestamp()
    });

    messageInput.value = "";
  } catch (error) {
    alert("Message failed: " + error.message);
  }
});

// Receive messages in real time
const messagesQuery = query(
  messagesRef,
  orderBy("createdAt", "asc")
);

onSnapshot(messagesQuery, (snapshot) => {
  messagesBox.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();

    const messageElement = document.createElement("p");
    messageElement.textContent = data.text;

    messagesBox.appendChild(messageElement);
  });

  messagesBox.scrollTop = messagesBox.scrollHeight;
});
