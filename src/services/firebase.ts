import firebase from 'firebase';

import fireBaseConfig from '../config/fireBaseConfig';

const fireBaseApp = firebase.initializeApp(fireBaseConfig);

export default fireBaseApp;
