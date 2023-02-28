import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getPerformance } from "firebase/performance";

const firebaseConfig = {
  apiKey: "AIzaSyAlFp1mxhtzaCy16eXFKX9glqWDAiyS_hg",
  authDomain: "jcs-tab-tracker.firebaseapp.com",
  projectId: "jcs-tab-tracker",
  storageBucket: "jcs-tab-tracker.appspot.com",
  messagingSenderId: "557593235569",
  appId: "1:557593235569:web:f48c54248eae89d86f4bd0",
  measurementId: "G-KXRF1B2ZEJ",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const functions = getFunctions(firebaseApp);
const messaging = getMessaging(firebaseApp);

getAnalytics(firebaseApp);
getPerformance(firebaseApp);

getToken(messaging, {
  vapidKey:
    "BBeXegOCfTcMiYKK1PcATi7prahLmEeNvbxjDYN97EF8yqp_KflRfQHPB3HSveJbLCVKL2OSV6qMb3lC8GWWqvU",
})
  .then((currentToken) => {
    if (currentToken) {
      console.log("current token for client: ", currentToken);
      // Perform any other necessary action with the token
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
  });

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
});

export { firebaseApp, functions, messaging };
