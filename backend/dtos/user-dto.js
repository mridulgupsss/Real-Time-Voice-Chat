class UserDto {
    id;
    phone;
    name;
    avatar;
    activated;
    createdAt;

    constructor(user) {
        this.id = user._id;
        this.phone = user.phone;
        this.name = user.name;
        this.avatar = user.avatar
            ? `${process.env.BASE_URL}${user.avatar}`   // server url is also added so that we can show the actual image when we are sending it in response
            : null;
        this.activated = user.activated;
        this.createdAt = user.createdAt;
    }
}

module.exports = UserDto;