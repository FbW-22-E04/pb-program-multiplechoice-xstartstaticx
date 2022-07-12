const rewire = require("rewire");
const solution = rewire("../solution");
const fs = require("fs");
/**
 * this function will read and run solution file so we will be able to change the variables value to check in different test cases
 * @param {String} par - the name of the variable we want to change
 * @param {String} value - the value we want to change the variable to
 */
function runScript(par, value) {
    const scriptText = fs.readFileSync(__dirname + "/../solution.js", "utf8");
        const newScript = scriptText.split("\n").map(line => {
            if (line.includes(`${par} =`) || line.includes(`${par}=`)) {
                return line.split(';').map(command => {
                    if (command.includes(`${par} =`) || command.includes(`${par}=`)) {
                        return `const ${par} = '${value}' ;`;
                    }
                    return command;
                }).join(';');
            }
            return line;
        }).join("\n");
        eval(newScript);
}
describe('2. Grading', () => {
    test('`grade` variable is defined ', () => {
        let grade = solution.__get__("grade");
        expect(grade).toBeDefined();
    })
    test('switch case has been used ', () => {
        const scriptText = fs.readFileSync(__dirname + "/../solution.js", "utf8");
        expect(scriptText.includes("switch(grade)") || scriptText.includes("switch (grade)")).toBeTruthy();
    })
    test('case "A" produces the correct result', () => {
        console.log = jest.fn();
        runScript('grade', 'A')
        const answer = console.log.mock.calls.find(call => call.join(' ').substring(0, 3) === 'Q2:');
        expect(answer.join().toLowerCase()).toContain('well done');
    })
    test('case "B" produces the correct result', () => {
        console.log = jest.fn();
        runScript('grade', 'B')
        const answer = console.log.mock.calls.find(call => call.join(' ').substring(0, 3) === 'Q2:');
        expect(answer.join().toLowerCase()).toContain('good on you');
    })
    test('case "C" produces the correct result', () => {
        console.log = jest.fn();
        runScript('grade', 'C')
        const answer = console.log.mock.calls.find(call => call.join(' ').substring(0, 3) === 'Q2:');
        expect(answer.join().toLowerCase()).toContain('good effort');
    })
    test('case "D" produces the correct result', () => {
        console.log = jest.fn();
        runScript('grade', 'D')
        const answer = console.log.mock.calls.find(call => call.join(' ').substring(0, 3) === 'Q2:');
        expect(answer.join().toLowerCase()).toContain('try harder');
    })
    test('other values produce the correct output', () => {
        console.log = jest.fn();
        runScript('grade', '')
        const answer = console.log.mock.calls.find(call => call.join(' ').substring(0, 3) === 'Q2:');
        expect(answer.join().toLowerCase()).toContain('yikes');
    })
})
