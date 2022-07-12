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
describe('3. Fruits', () => {
    test('`fruit` variable is defined ', () => {
        let fruit = solution.__get__("fruit");
        expect(fruit).toBeDefined();
    })
    test('switch case has been used ', () => {
        const scriptText = fs.readFileSync(__dirname + "/../solution.js", "utf8");
        expect(scriptText.includes("switch(fruit)") || scriptText.includes("switch (fruit)")).toBeTruthy();
    })
    test('case "apple" produces the correct result', () => {
        console.log = jest.fn();
        runScript('fruit', 'apple')
        const answer = console.log.mock.calls.find(call => call.join(' ').substring(0, 3) === 'Q3:');
        expect(answer.join().toLowerCase()).toContain('apple');
    })
    test('case "banana" produces the correct result', () => {
        console.log = jest.fn();
        runScript('fruit', 'banana')
        const answer = console.log.mock.calls.find(call => call.join(' ').substring(0, 3) === 'Q3:');
        expect(answer.join().toLowerCase()).toContain('banana');
    })
    test('case "orange" produces the correct result', () => {
        console.log = jest.fn();
        runScript('fruit', 'orange')
        const answer = console.log.mock.calls.find(call => call.join(' ').substring(0, 3) === 'Q3:');
        expect(answer.join().toLowerCase()).toContain('orange');
    })
    test('case "strawberry" produces the correct result', () => {
        console.log = jest.fn();
        runScript('fruit', 'strawberry')
        const answer = console.log.mock.calls.find(call => call.join(' ').substring(0, 3) === 'Q3:');
        expect(answer.join().toLowerCase()).toContain('strawberr');
    })
    test('other values produce the correct output', () => {
        console.log = jest.fn();
        runScript('fruit', '')
        const answer = console.log.mock.calls.find(call => call.join(' ').substring(0, 3) === 'Q3:');
        expect(answer.join().toLowerCase()).toContain('pick a fruit');
    })
})
