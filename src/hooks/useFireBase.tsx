import React, { createContext, useContext } from 'react';
import app from '../services/firebase';

interface IFireBaseData {
  firebase: firebase.app.App;
}

const FireBaseContext = createContext<IFireBaseData>({} as IFireBaseData);

const FireBaseProvider: React.FC = ({ children }) => {
  return (
    <FireBaseContext.Provider value={{ firebase: app }}>
      {children}
    </FireBaseContext.Provider>
  );
};

function useFireBase() {
  const context = useContext(FireBaseContext);

  if (!context) {
    throw new Error('useFireBase must to be used inside FireBase Provider');
  }

  return context;
}

export { FireBaseProvider, useFireBase };
