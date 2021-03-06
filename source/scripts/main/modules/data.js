/*global firebase, firebaseui, Actions */

'use strict';

((window, document, Data, Core) => {
    Data.initializeFirebase = () => {
        // Initialize Firebase
        let config = {
            apiKey:
                'AIzaSyBErwJPIqN7K-gfcUMisC594dZEHcjnzkY',
            authDomain: 'kratner-firebase.firebaseapp.com',
            databaseURL:
                'https://kratner-firebase.firebaseio.com',
            projectId: 'kratner-firebase',
            storageBucket: '',
            messagingSenderId: '386299743486'
        };
        firebase.initializeApp(config);
        Data.database = firebase.database();
        const firestore = firebase.firestore(),
            settings = {timestampsInSnapshots: true};
        firestore.settings(settings);
        Data.firestore = firestore;
        Data.getCollection = id =>
            Data.firestore.collection(id).get();
        Data.ui = new firebaseui.auth.AuthUI(
            firebase.auth()
        );
    };
    Data.getLinks = () => Data.getCollection('links');
    Data.getVideoSources = () =>
        Data.getCollection('video_sources');
})(
    window,
    document,
    (window.Data = window.Data || {}),
    (window.Core = window.Core || {})
);
