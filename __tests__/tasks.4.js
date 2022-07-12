const rewire = require("rewire");
const solution = rewire("../solution");
const fs = require("fs");
/**
 * this function will read and run solution file so we will be able to change the variables value to check in different test cases
 * @param {String} par - the name of the variable we want to change
 * @param {Number} value - the value we want to change the variable to
 */
function runScript(par, value) {
    const scriptText = fs.readFileSync(__dirname + "/../solution.js", "utf8");
        const newScript = scriptText.split("\n").map(line => {
            if (line.includes(`${par} =`) || line.includes(`${par}=`)) {
                return line.split(';').map(command => {
                    if (command.includes(`${par} =`) || command.includes(`${par}=`)) {
                        return `const ${par} = ${value} ;`;
                    }
                    return command;
                }).join(';');
            }
            return line;
        }).join("\n");
        eval(newScript);
}
describe('4. Percentage Complete', () => {
    test('`percentageComplete` variable is defined ', () => {
        let percentageComplete = solution.__get__("percentageComplete");
        expect(percentageComplete).toBeDefined();
    })
    test('case "20" produces the correct result', () => {
        console.log = jest.fn();
        runScript('percentageComplete', 20)
        const answer = console.log.mock.calls.find(call => call.join(' ').substring(0, 3) === 'Q4:');
        expect(answer.join().toLowerCase()).toContain('long way to go');
    })
    test('case "40" produces the correct result', () => {
        console.log = jest.fn();
        runScript('percentageComplete', 40)
        const answer = console.log.mock.calls.find(call => call.join(' ').substring(0, 3) === 'Q4:');
        expect(answer.join().toLowerCase()).toContain('getting there');
    })
    test('case "60" produces the correct result', () => {
        console.log = jest.fn();
        runScript('percentageComplete', 60)
        const answer = console.log.mock.calls.find(call => call.join(' ').substring(0, 3) === 'Q4:');
        expect(answer.join().toLowerCase()).toContain('can do it');
    })
    test('case "90" produces the correct result', () => {
        console.log = jest.fn();
        runScript('percentageComplete', 90)
        const answer = console.log.mock.calls.find(call => call.join(' ').substring(0, 3) === 'Q4:');
        expect(answer.join().toLowerCase()).toContain('last push');
    })
    test('case "100" produces the correct result', () => {
        console.log = jest.fn();
        runScript('percentageComplete', 100)
        const answer = console.log.mock.calls.find(call => call.join(' ').substring(0, 3) === 'Q4:');
        expect(answer.join().toLowerCase()).toContain('well done');
    })
})
