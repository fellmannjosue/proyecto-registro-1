import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';

const firebaseConfig = {
  apiKey: "AIzaSyCkdu4qRd2uK3vkLMNeg1sN0v9WCkvPSso",
  authDomain: "inventory-4116d.firebaseapp.com",
  projectId: "inventory-4116d",
  storageBucket: "inventory-4116d.appspot.com",
  messagingSenderId: "1094957442023",
  appId: "1:1094957442023:web:1eb1cccb17ec01cee85342",
  measurementId: "G-YZRS658KF8"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const performance = getPerformance(app);

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyCkdu4qRd2uK3vkLMNeg1sN0v9WCkvPSso",
    authDomain: "inventory-4116d.firebaseapp.com",
    projectId: "inventory-4116d",
    storageBucket: "inventory-4116d.appspot.com",
    messagingSenderId: "1094957442023",
    appId: "1:1094957442023:web:1eb1cccb17ec01cee85342",
    measurementId: "G-YZRS658KF8"
  }
};
