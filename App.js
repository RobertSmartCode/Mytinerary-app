
import React from 'react';
import {NavigationContainer} from "@react-navigation/native"
import Navigator from './navigation/MainNavDrawer';
import { Provider } from 'react-redux';
import thunk from "redux-thunk"
import rootReducers from "./redux/reducers/rootReducers"
import {applyMiddleware, createStore} from "redux"


const myStore = createStore(rootReducers, applyMiddleware(thunk))

const App = () => {
  
  
 
  return (
    <NavigationContainer>
      <Provider store={myStore}>
        <Navigator/>
      </Provider>
    </NavigationContainer>
  )
}


export default App


