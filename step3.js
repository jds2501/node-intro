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
        process.exit();
    }
}

async function webCat(url) {
    const output = await getWebCatOutput(url);
    console.log(output);
}

async function getCatOutput(path) {
    try {
        const data = await fs.readFile(path, "utf-8");
        return data;
    } catch (error) {
        console.error(`Error reading ${path}:`, "\n", error.toString());
        process.exit();
    }
}

async function cat(path) {
    const output = await getCatOutput(path);
    console.log(output);
}

if (process.argv.length === 3) {
    const targetCat = process.argv[2];

    if (targetCat.startsWith("http://") || targetCat.startsWith("https://")) {
        webCat(targetCat);
    } else {
        cat(targetCat);
    }

} else {
    console.error("Usage: node step3.js <path>");
}