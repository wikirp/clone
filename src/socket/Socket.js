import io from "socket.io-client";
const ENDPOINT = "http://localhost:4001";

let socket;

export const initiateSocket = () => {
    socket = io(ENDPOINT);
};

export const disconnectSocket = () => {
    if (socket) socket.disconnect();
};

export const subscribeToLogin = (callback) => {
    if (!socket) return true;

    socket.on("login", (data) => {
        return callback(data);
    });
};

export const subscribeToData = (callback) => {
    if (!socket) return true;

    socket.on("logged", (data) => {
        return callback(data);
    });
};


export const requireChat = ( chatID,callback) => {
    if (!socket) return true;

    console.log(chatID)

    socket.emit('chat', chatID)

    //Regresa Array de Chat
    socket.on('chat', (data) => {
        return callback(data);
    });
};
