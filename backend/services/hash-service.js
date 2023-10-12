const crypto = require('crypto');

class HashService {
    hashOtp(data) {
        let hashedOtp = crypto
            .createHmac('sha256', process.env.HASH_SECRET)
            .update(data)
            .digest('hex');
        return hashedOtp;
    }
}

module.exports = new HashService();
