export const TYPING = "TYPING_MESSAGE";
export const TYPING_COMMENT = "TYPING_COMMENT"
export const PUBLISH_POST = "ADD_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE"
export const PUBLISH_COMMENT = "PUBLISH_COMMENT"
export const CLEAR_COMMENT = "CLEAR_COMMENT";

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