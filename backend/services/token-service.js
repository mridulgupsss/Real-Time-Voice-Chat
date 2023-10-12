const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, accessTokenSecret, {
            expiresIn: '1h', // because if it gets stolen then also it would be only available for 1h only
                            // more secure systems keep it for 20sec like banks and all
        });
        const refreshToken = jwt.sign(payload, refreshTokenSecret, {
            expiresIn: '1y', // its needed because when access token gets expired we can generate new access token using regfreshToken and user doesnt need to login every hour after expiring of access token
        });
        return { accessToken, refreshToken };
    }
}

module.exports = new TokenService();
