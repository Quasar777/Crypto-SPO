// класс, обладающий полями, которые будем отправлять на клиент
// DTO - Data Transfer Object

module.exports = class UserDTO {
    email;
    id;
    isActivated;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;

    }
}

