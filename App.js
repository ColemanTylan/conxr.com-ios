import React, {useState,useEffect} from 'react';
import Navigation from './src/routes';
import { Provider } from "react-redux";
import {store} from './src/store/store'

const App = () => {

 
  return (

    <Provider store={store}>
      <Navigation  />
    </Provider>
  );
};

export default App;
