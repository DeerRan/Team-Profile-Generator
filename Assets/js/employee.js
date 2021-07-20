class employee {
    constructor(names, id, email) {
        this.name = names;
        this.id = id;
        this.email = email
    }

    getName () {
        return this.name
    };
    getID () {
        return this.id
    };
    getEmail () {
        return this.email
    };
}

module.exports = employee