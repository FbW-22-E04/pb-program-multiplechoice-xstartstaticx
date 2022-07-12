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
describe('1. Color Analyzer', () => {
    test('`color` variable is defined ', () => {
        let color = solution.__get__("color");
        expect(color).toBeDefined();
    })
    test('switch has been used', () => {
        const scriptText = fs.readFileSync(__dirname + "/../solution.js", "utf8");
        expect(scriptText.includes("switch(color)") || scriptText.includes("switch (color)")).toBeTruthy();
    })
    test('"red" value produces correct output', () => {
        console.log = jest.fn();
        runScript('color', 'red')
        const answer = console.log.mock.calls.find(call => call.join(' ').substring(0, 3) === 'Q1:');
        expect(answer.join().toLowerCase()).toContain('red');
    })
    test('"blue" value produces correct output', () => {
        console.log = jest.fn();
        runScript('color', 'blue')
        const answer = console.log.mock.calls.find(call => call.join(' ').substring(0, 3) === 'Q1:');
        expect(answer.join().toLowerCase()).toContain('blue');
    })
    test('"green" value produces correct output', () => {
        console.log = jest.fn();
        runScript('color', 'green')
        const answer = console.log.mock.calls.find(call => call.join(' ').substring(0, 3) === 'Q1:');
        expect(answer.join().toLowerCase()).toContain('green');
    })
    test('"yellow" value produces correct output', () => {
        console.log = jest.fn();
        runScript('color', 'yellow')
        const answer = console.log.mock.calls.find(call => call.join(' ').substring(0, 3) === 'Q1:');
        expect(answer.join().toLowerCase()).toContain('yellow');
    })
    test('other values produce correct output', () => {
        console.log = jest.fn();
        runScript('color', '')
        const answer = console.log.mock.calls.find(call => call.join(' ').substring(0, 3) === 'Q1:');
        expect(answer.join().toLowerCase()).toContain('pick a color');
    })
})
