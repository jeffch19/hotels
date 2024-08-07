import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCtWZrOLqMOyjyciY5eiSwZGBCml0V81do",
  authDomain: "hotels-8c904.firebaseapp.com",
  projectId: "hotels-8c904",
  storageBucket: "hotels-8c904.appspot.com",
  messagingSenderId: "178262094573",
  appId: "1:178262094573:web:566c5a8fd9c516bc3fd2e4",
  measurementId: "G-51Y2RLMD6X"
};

export const firebaseApp = initializeApp(firebaseConfig);