import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ReactRouter from "./ReactRouter"
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { LOGGING_IN_USER, TYPING, PUBLISH_POST, CLEAR_MESSAGE, PUBLISH_COMMENT, FETCH_DATA_SUCCESS_MONGO } from "./actions"

import { enableAllPlugins } from "immer"
import produce from "immer"

import thunk from 'redux-thunk';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

enableAllPlugins()

/*
messages Array contains 
[
  {
    key: 3,
    message:"this is a message",
    comments: ["comment 1", "comment 2"]
    date: April 3 at 7:52 PM
  }
]
*/

const initialState = {
  messages: [],
  message: "",
  comment: "",
  username: "",
  loggedIn: false
}

//New reducer code is Immer.js

function reducer(state = initialState, action) {

  console.log("==> reducer called", state, action)

  const producer = produce((draft, action) => {

    switch (action.type) {

      case PUBLISH_POST: {
        draft.messages.push({
          key: action.key,
          message: draft.message,
          date: action.date,
          comments: [],
        })
        return draft;
      }

      case PUBLISH_COMMENT: {
        for (var i = 0; i < draft.messages.length; i++) {
          if (draft.messages[i].key === action.key) {
            draft.messages[i].comments.push(action.comment)
          }
        }
      }

      case TYPING: {
        draft.message = action.message;
        return draft;
      }

      case CLEAR_MESSAGE: {
        draft.message = "";
        return draft;
      }

      case FETCH_DATA_SUCCESS_MONGO: {
        draft.messages = action.payload;
        return draft;
      }

      case LOGGING_IN_USER: {
        draft.username = action.username;
        draft.loggedIn = true;
        return draft;
      }

      default: {
        return draft;
      }
    }
  }, state);


  const nextState = producer(state, action);
  console.log("<== reducer finished ", nextState, action.type);
  return nextState;


}



// Old reducer code using Vanilla JS

// function reducer(state = initialState, action) {
//   console.log("reducer", state, action)

//   switch (action.type) {
//     case PUBLISH_POST:
//       return {
//         ...state,
//         messages: [
//         {
//           key: action.key,
//           message: state.message,
//           comments: []
//         }
//         , ...state.messages]
//       }

//       case PUBLISH_COMMENT:
//         console.log(action.comment + "==" + action.key)
//         return {
//           ...state, 
//           messages: state.messages.map((item, index) => {
//             if(item.key === action.key) {
//               console.log("found relevant message")
//               return {
//                 ...item,
//                 comments: [...state.messages[index].comments, action.comment]
//               }
//             }

//             return item;

//           })
//         }
//     case TYPING:
//       return {
//         ...state,
//         message: action.message
//       }

//     case TYPING_COMMENT: 
//       return {
//         ...state,
//         comment: action.comment
//       }

//     case CLEAR_MESSAGE: 
//       return {
//         ...state,
//         message: ""
//       }

//     case CLEAR_COMMENT:
//       return {
//         ...state,
//         comment: ""
//       }

//     default:
//       return state;
//   }
// }

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <React.StrictMode>
        <ReactRouter />
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
