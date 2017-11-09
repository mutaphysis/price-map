import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: 'AIzaSyAUx6H0A35NMkkzNRPRisnB7UXSVTVHjBg',
    authDomain: 'price-map-react.firebaseapp.com',
    databaseURL: 'https://price-map-react.firebaseio.com',
    projectId: 'price-map-react',
    storageBucket: 'price-map-react.appspot.com',
    messagingSenderId: '678469049984'
};

export const fire = firebase.initializeApp(config);