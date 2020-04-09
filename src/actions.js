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
export const FAILED_TO_POST_COMMENT_TO_MONGO = "FAILED_TO_POST_COMMENT_TO_MONGO"
export const FETCH_DATA_FAILURE_MONGO = "FETCH_DATA_FAILURE_MONGO"
export const FAILED_TO_AUTHENTICATE_USER = "FAILED_TO_AUTHENTICATE_USER"
export const UPDATE_PROFILE_PICTURE_CHOICE = "UPDATE_PROFILE_PICTURE_CHOICE"

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

export function post_message(post_key, post_date, posterName) {
    return {
        type: PUBLISH_POST,
        key: post_key,
        date: post_date,
        posterName: posterName
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

export function post_comment(comment, key, username) {
    return {
        type: PUBLISH_COMMENT,
        comment: comment,
        key: key,
        author: username
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
        type: FAILED_TO_POST_COMMENT_TO_MONGO,
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
        type: FETCH_DATA_FAILURE_MONGO
    }
}


export function log_in(username) {
    return {
        type: LOGGING_IN_USER,
        username: username
    }
}

export function failed_log_in(username) {
    return {
        type: FAILED_TO_AUTHENTICATE_USER,
        username: username
    }
}

export function update_profile_picture(pictureName) {
    return {
        type: UPDATE_PROFILE_PICTURE_CHOICE,
        pictureName: pictureName
    }
}

export function changed_profile_picture(json) {
    return {
        type: "CHANGED_PROFILE_PICTURE",
    }
}

export function failed_to_change_profile_picture(err) {
    return {
        type: "FAILED_TO_CHANGE_PROFILE_PICTURE",
        err: err
    }
}

export function update_profile_picture_mongo(pictureName, username) {
    let payload = {
        "username": username,
        "pictureName": pictureName
    }

    return (dispatch) => {
        return axios.post("http://localhost:1080/user/update/profile/", payload)
            .then(json => {
                dispatch(changed_profile_picture(json))
            })
    }
}

export function create_user_mongo(username, password) {
    let userObject = {
        "username": username,
        "password": password
    }

    return (dispatch) => {
        return axios.post("http://localhost:1080/user/add", userObject)
            .then(json => {
                dispatch(log_in(username));
            })
            .catch(error => {
                console.log(error);
                dispatch(failed_log_in(username));
            })
    }
}

export function login_user_mongo(username, password) {
    let userObject = {
        "username": username,
        "password": password
    }
    console.log("trying to log user in", username, password)
    return (dispatch) => {
        return axios.post("http://localhost:1080/user/login", userObject)
            .then(json => {
                console.log("response json", json.data);

                if (json.data.success) {
                    dispatch(log_in(username));
                } else {
                    dispatch(failed_log_in(username));
                }

            }
        )
    }
}

export function post_message_mongo(message, currentDate, postKey, posterName) {
    let messageToSend = {
        "message": message,
        "author": posterName,
        "date": currentDate,
        "comments": [],
        "key": postKey,
    }
    return (dispatch) => {
        return axios.post("http://localhost:1080/post/add", messageToSend)
            .then(json => {
                dispatch(post_message_success(json))
            })
            .catch(error => {
                dispatch(post_message_failure(error))
            })
    }
}

export function post_comment_mongo(comment, postKey, username) {

    let reqEndpoint = "http://localhost:1080/post/add/comment/" + postKey

    console.log("**", reqEndpoint);

    let payload = {
        "comment": comment,
        "author": username
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
        return axios.get('http://localhost:1080/post/')
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