const engineer = require("../lib/engineer");


describe('engineer', () => {
    it("Can return Github github via constructor", () => {
        var github = "Engie";
        const newEng = new engineer("Engi Neer", 1, "email@email.com", github);
        expect(newEng.github).toBe(github);
    });

    describe("getGithub", () => {
        it("Can return github based on constructor's input", () => {
            var github = "Engie";
            const newEng = new engineer("Engi Neer", 1, "email@email.com", github);
            expect(newEng.getGithub()).toBe(github)
        });
    });

    describe("getRole", () => {
        it("Can return role", () => {
            var role = "Engineer";
            const newEng = new engineer("Engi Neer", 1, "email@email.com", "Engie");
            expect(newEng.getRole()).toBe(role)
        });
    });


});