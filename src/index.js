import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAt_oA1_xDRV9-LcEiMEmzqrljnCIoU0vQ",
  authDomain: "ecomm-c6351.firebaseapp.com",
  projectId: "ecomm-c6351",
  storageBucket: "ecomm-c6351.appspot.com",
  messagingSenderId: "284027662899",
  appId: "1:284027662899:web:e6288be645e0f93ca5e946"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
