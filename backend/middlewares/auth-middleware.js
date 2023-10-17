const tokenService = require('../services/token-service');


// this middleware is created so that activation can only be done for the users who have valid tokens
module.exports = async function (req, res, next) {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken) {
            throw new Error();
        }
        const userData = await tokenService.verifyAccessToken(accessToken);
        if (!userData) {
            throw new Error();
        }
        req.user = userData;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};