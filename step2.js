const fs = require('fs');
const axios = require('axios');

async function webCat(url) {
    try {
        const response = await axios.get(url);

        if (response.status !== 404) {
            console.log(response.data);
        } else {
            throw new Error();
        }
    } catch (err) {
        console.error(`Error fetching ${url}:`, "\n", "Error: Request failed with status code 404");
    }
}

function cat(path) {
    fs.readFile(path, function (err, data) {
        if (err) {
            console.error(`Error reading ${path}:`, "\n", err.toString());
            process.exit();
        }

        console.log(data.toString());
    });
}

if (process.argv.length === 3) {
    const targetCat = process.argv[2];

    if (targetCat.startsWith("http://") || targetCat.startsWith("https://")) {
        webCat(targetCat);
    } else {
        cat(targetCat);
    }

} else {
    console.error("Usage: node step1.js <path>");
}