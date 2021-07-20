const manager = require("../lib/manager");


describe('manager', () => {
    it("Can return office phone number via constructor", () => {
        var num = "111-111-111"
        const newM = new manager("Manny Jur", 1, "email@email.com", num)
        expect(newM.number).toBe(num);
    });

    describe("getRole", () => {
        it("Can return role", () => {
            var role = "Manager";
            const newM = new manager("Manny Jur", 1, "email@email.com", "111-111-111");
            expect(newM.getRole()).toBe(role)
        });
    });

});