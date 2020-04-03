export const TYPING = "TYPING_MESSAGE";
export const PUBLISH_POST = "ADD_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE"

export function typed_message(message) {
    return {
        type: TYPING,
        message: message
    }
}

export function post_message() {
    return {
        type: PUBLISH_POST
    }
}

export function clear_message() {
    return {
        type: CLEAR_MESSAGE
    }
}