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

export function typed_comment(comment) {
    return {
        type: TYPING_COMMENT,
        comment: comment
    }
}

export function post_message(post_key) {
    return {
        type: PUBLISH_POST,
        key: post_key
    }
}

export function clear_message() {
    return {
        type: CLEAR_MESSAGE
    }
}

export function clear_comment() {
    return {
        type: CLEAR_COMMENT
    }
}

export function post_comment(comment, key) {
    return {
        type: PUBLISH_COMMENT,
        comment: comment,
        key: key
    }
}