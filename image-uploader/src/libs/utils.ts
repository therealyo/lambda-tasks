import jwt from "jsonwebtoken";

export const retrieveAuthData = (event) => {
    const headers = event.headers;
    const auth = headers.Authorization;
    return jwt.decode(auth);
};



