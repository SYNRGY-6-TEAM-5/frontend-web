import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import Cookies from 'js-cookie';
import axiosClient from './lib/axios';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_FIREBASE_APPID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

initializeApp(firebaseConfig);

export const getFirebaseToken = async (setTokenFound: (arg0: boolean) => void) => {
    try {
        const currentToken = await getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY });
        if (currentToken) {
            console.log('current token for client: ', currentToken);
            setTokenFound(true);
            await useSaveToken(currentToken);
        } else {
            console.log('No registration token available. Request permission to generate one.');
            setTokenFound(false);
        }
    } catch (err) {
        console.log('An error occurred while retrieving token. ', err);
    }
}

export const onMessageListener = () => 
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });

const useSaveToken = async (currentToken: string) => {
    try {
        const token = Cookies.get("accesstoken")
        const response = await axiosClient.post(`/user/fcm-token`, { fcmToken: currentToken }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.log('Failed to save FCM token:', error);
    }
};