const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build'); // path to build folder
fs.removeSync(buildPath); // remove build folder

const campaingPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');  // path to the contract
const source = fs.readFileSync(campaingPath, 'utf8');   // read the file
const output = solc.compile(source, 1).contracts; // 1 argument is the number of contracts to compile

fs.ensureDirSync(buildPath);  // create build folder if it doesn't exist

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
} // write the compiled contract to the build folder
