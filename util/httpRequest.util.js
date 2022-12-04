/**
 * This method is used to get the JWT token from the request header.
 * @param headers the request headers
 * @returns {null|string} the JWT string if exists, null otherwise.
 */
const getToken = (headers) => {
    if (headers && headers.authorization) {
        let tokens = headers.authorization.split(' ');
        if (tokens.length === 2) {
            return tokens[1];
        } else {
            return null;
        }
    }
    return null;
}

module.exports = {
    getToken
}
