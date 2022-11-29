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
