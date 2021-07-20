const employee = require('./employee');

class manager extends employee {
    constructor (name, id, email, number) {
        super(name, id, email);
        this.number = number
    };

    getRole() {
        return 'Manager'
    };

    
}

module.exports = manager