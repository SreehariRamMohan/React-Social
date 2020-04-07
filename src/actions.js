const axios = require('axios');

export const TYPING = "TYPING_MESSAGE";
export const TYPING_COMMENT = "TYPING_COMMENT"
export const PUBLISH_POST = "ADD_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE"
export const PUBLISH_COMMENT = "PUBLISH_COMMENT"
export const CLEAR_COMMENT = "CLEAR_COMMENT";
export const POST_MESSAGE_SUCCESS = "POST_MESSAGE_SUCCESS";
export const POST_MESSAGE_FAILURE = "POST_MESSAGE_FAILURE";
export const FETCH_DATA_SUCCESS_MONGO = "FETCH_DATA_SUCCESS_MONGO"
export const POSTED_COMMENT_TO_MONGO = "POSTED_COMMENT_TO_MONGO"
export const LOGGING_IN_USER = "LOGGING_IN_USER"

export function typed_message(message) {
    return {
        type: TYPING,
        message: message
    }
}

export function typed_comment(comment, key) {
    return {
        type: TYPING_COMMENT,
        key: key,
        comment: comment
    }
}

export function post_message(post_key, post_date) {
    return {
        type: PUBLISH_POST,
        key: post_key,
        date: post_date
    }
}

export function clear_message() {
    return {
        type: CLEAR_MESSAGE
    }
}

export function clear_comment(key) {
    return {
        type: CLEAR_COMMENT,
        key: key
    }
}

export function post_comment(comment, key) {
    return {
        type: PUBLISH_COMMENT,
        comment: comment,
        key: key
    }
}

export function post_message_success(json) {
    return {
        type: POST_MESSAGE_SUCCESS,
    }
}

export function post_message_failure(error) {
    return {
        type: POST_MESSAGE_FAILURE,
    }
}

export function post_comment_success(json) {
    return {
        type: POSTED_COMMENT_TO_MONGO,
    }
}

export function post_comment_failure(error) {
    return {
        type: "FAILED_TO_POST_COMMENT_TO_MONGO",
    }
}

export function fetch_data_success(data) {
    return {
        type: FETCH_DATA_SUCCESS_MONGO,
        payload: data
    }
}

export function fetch_data_failure() {
    return {
        type: "FETCH_DATA_FAILURE_MONGO"
    }
}



export function log_in(username) {
    return {
        type: "LOGGING_IN_USER",
        username: username
    }
}

export function failed_log_in(username) {
    return {
        type: "FAILED_TO_AUTHENTICATE_USER",
        username: username
    }
}

export function create_user_mongo(username, password) {
    let userObject = {
        "username": username,
        "password": password
    }

    return (dispatch) => {
        return axios.post("http://localhost:5000/user/add", userObject)
            .then(json => {
                dispatch(log_in(username));
            })
            .catch(error => {
                dispatch(failed_log_in(username));
            })
    }
}

export function post_message_mongo(message, currentDate, postKey) {
    let messageToSend = {
        "message": message,
        "author": "Bob Rammohan",
        "date": currentDate,
        "comments": [],
        "key": postKey,
    }
    return (dispatch) => {
        return axios.post("http://localhost:5000/post/add", messageToSend)
            .then(json => {
                dispatch(post_message_success(json))
            })
            .catch(error => {
                dispatch(post_message_failure(error))
            })
    }
}

export function post_comment_mongo(comment, postKey) {

    let reqEndpoint = "http://localhost:5000/post/add/comment/" + postKey

    console.log("**", reqEndpoint);

    let payload = {
        comment: comment
    }

    return (dispatch) => {
        return axios.post(reqEndpoint, payload)
            .then(json => {
                dispatch(post_comment_success(json))
            })
            .catch(error => {
                dispatch(post_comment_failure(error))
            })
    }

}

export function fetch_data_from_mongo() {
    console.log("**", "trying to fetch data from mongo");
    return (dispatch) => {
        return axios.get('http://localhost:5000/post/')
        .then(function (response) {
            // handle success
            console.log(response);
            dispatch(fetch_data_success(response.data))
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            dispatch(fetch_data_failure());
        })
        .then(function () {
            // always executed
        });
    }
    

}