const employee = require('../lib/employee');

describe('employee', ()=> {
    it("Can create a new employee", () => {
        const newEmployee = new employee();
        expect(typeof newEmployee).toBe("object");
    });

    it("Can set name property via constructor", () => {
        var name = "Jane Doe"
        const newEmployee = new employee(name);
        expect(newEmployee.name).toBe(name);
    });

    it("Can set ID property via constructor", () => {
        var id = 2
        const newEmployee = new employee("Dude", 2);
        expect(newEmployee.id).toBe(id);
    });

    it("Can set email property via constructor", () => {
        var email = "fakeemail@gmail.com"
        const newEmployee = new employee("Dude", 2, "fakeemail@gmail.com");
        expect(newEmployee.email).toBe(email);
    });

    describe("getName", () => {
        it("Can return name based on constructor's input", () => {
            var name = "Jane Doe"
            const newEmployee = new employee(name, 2, "fakeemail@gmail.com");
            expect(newEmployee.getName()).toBe(name)
        });
    });

    describe("getID", () => {
        it("Can return ID based on constructor's input", () => {
            var id = 2
            const newEmployee = new employee("Jane Doe", id, "fakeemail@gmail.com");
            expect(newEmployee.getID()).toBe(id)
        });
    });

    describe("getEmail", () => {
        it("Can return email based on constructor's input", () => {
            var email = "fakeemail@gmail.com"
            const newEmployee = new employee("Jane Doe", 2, email);
            expect(newEmployee.getEmail()).toBe(email)
        });
    });
});