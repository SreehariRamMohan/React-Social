import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';

import {TYPING, PUBLISH_POST, CLEAR_MESSAGE, PUBLISH_COMMENT} from "./actions"

import {enableAllPlugins} from "immer"
import produce from "immer"

import thunk from 'redux-thunk';


enableAllPlugins()

/*
messages Array contains 
[
  {
    key: 3,
    message:"this is a message",
    comments: ["comment 1", "comment 2"]
    comment: ""
  }
]
*/

const initialState = {
  messages: [],
  message: "",
  comment: "",
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
          comment: ""
        })
        return draft;
      }

      case PUBLISH_COMMENT: {
        for(var i = 0; i < draft.messages.length; i++) {
          if(draft.messages[i].key === action.key) {
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
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
