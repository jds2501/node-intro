const fs = require('fs');


function cat(path) {
    fs.readFile(path, function (err, data) {
        if (err) {
            console.error(`Error reading ${path}: `, err);
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