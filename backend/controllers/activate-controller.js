const Jimp = require('jimp');
const path = require('path');
const userService = require('../services/user-service');
const UserDto = require('../dtos/user-dto');

class ActivateController {
    async activate(req, res) {
        // Activation logic
        const { name, avatar } = req.body;
        if (!name || !avatar) {
            res.status(400).json({ message: 'All fields are required!' });
        }

        // Image Base64
        const buffer = Buffer.from(
            avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
            'base64'
        );
        const imagePath = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}.png`;  // 32478362874-3242342342343432.png

        // Jim package is used to compress the image (if user sends too large size image we dont want to increase our storage)
        try {
            const jimResp = await Jimp.read(buffer);
            jimResp
                .resize(150, Jimp.AUTO)
                .write(path.resolve(__dirname, `../storage/${imagePath}`));
        } catch (err) {
            res.status(500).json({ message: 'Could not process the image' });
        }

        const userId = req.user._id;
        // Update user (activated field needs to be changed from false to true)
        try {
            const user = await userService.findUser({ _id: userId });
            if (!user) {
                res.status(404).json({ message: 'User not found!' });
            }
            user.activated = true;
            user.name = name;
            let imagepath = "http://localhost:5500/storage/"+imagePath;
            user.avatar = imagepath;
           
            user.save();
            
            // console.log("user", user);
            // console.log("user.avatar", user.avatar)
            res.json({ user: new UserDto(user), auth: true });
            // res.json({ user: new UserDto(user), auth: true });
        } catch (err) {
            res.status(500).json({ message: 'Something went wrong!' });
        }
    }
}

module.exports = new ActivateController();