import "reflect-metadata";
import "dotenv/config";

import * as admin from "firebase-admin";
import * as fireorm from "fireorm";

import express from "express";
import cors from "cors";
import routes from "./routes";

import firebaseKeys from "../../firebase.json";

const PORT = process.env.PORT || 3333;
const app = express();

// config do server
app.use(cors({}));
app.use(express.json());
app.use(routes);

// config do firebase
const firebaseConfig = {
  ...firebaseKeys,
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementiD: process.env.MEASUREMENT_ID,
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
});
const firestore = admin.firestore();
fireorm.initialize(firestore);

if (firestore) {
  console.log("🔥 Firebase is connected");
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
