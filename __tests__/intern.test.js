const intern = require("../lib/intern");


describe('intern', () => {
    it("Can return school name via constructor", () => {
        var school = "Hogwarts"
        const newInt = new intern("In Tern", 1, "email@email.com", school)
        expect(newInt.school).toBe(school);
    });

    describe("getSchool", () => {
        it("Can return school based on constructor's input", () => {
            var school = "Hogwarts"
            const newInt = new intern("In Tern", 1, "email@email.com", school)
            expect(newInt.getSchool()).toBe(school)
        });
    });

    describe("getRole", () => {
        it("Can return role", () => {
            var role = "Intern";
            const newInt = new intern("In Tern", 1, "email@email.com", "Hogwarts");
            expect(newInt.getRole()).toBe(role)
        });
    });

});