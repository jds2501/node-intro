const fs = require('fs');

function cat(path) {
    fs.readFile(path, "utf-8", function (err, data) {
        if (err) {
            console.error(`Error reading ${path}:`, "\n", err.toString());
            process.exit();
        }

        console.log(data.toString());
    });
}

if (process.argv.length === 3) {
    cat(process.argv[2]);
} else {
    console.error("Usage: node step1.js <path>");
}