const fs = require('fs').promises;
const axios = require('axios');

async function getWebCatOutput(url) {
    try {
        const response = await axios.get(url);

        if (response.status !== 404) {
            return response.data;
        } else {
            throw new Error();
        }
    } catch (err) {
        console.error(`Error fetching ${url}:`, "\n", "Error: Request failed with status code 404");
        process.exit(1);
    }
}

async function getCatOutput(path) {
    try {
        const data = await fs.readFile(path, "utf-8");
        return data;
    } catch (error) {
        console.error(`Error reading ${path}:`, "\n", error.toString());
        process.exit(1);
    }
}

async function processReadTarget(targetCat) {
    let result;

    if (targetCat.startsWith("http://") || targetCat.startsWith("https://")) {
        result = await getWebCatOutput(targetCat);
    } else {
        result = getCatOutput(targetCat);
    }

    return result;
}

async function printReadTarget(targetCat) {
    const output = await processReadTarget(targetCat);
    console.log(output);
}

async function writeReadTarget(targetCat, writeFile) {
    const output = await processReadTarget(targetCat);

    try {
        await fs.writeFile(writeFile, output, "utf-8");
    } catch (err) {
        console.error(`Error writing ${writeFile}:`, "\n", error.toString());
        process.exit(1);
    }
}

if (process.argv.length === 3) {
    const targetCat = process.argv[2];
    printReadTarget(targetCat);
} else if (process.argv.length === 5 && process.argv[2] === "--out") {
    const writeFile = process.argv[3];
    const readTarget = process.argv[4];
    writeReadTarget(readTarget, writeFile);
} else {
    console.error("Usage: node step3.js <path>");
    console.error("Usage: node step3.js --out <output file> <input file>");
}