const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const DocumentSearch = module.exports = function () {
    return {
        query: null,
        results: null,
        processDocuments: function (path = '/Users/kouaxiong/TargetChallenge/TargetSeachEngine/documents') {
            fs.readdir(path, (error, files) => {
                if (error) {
                    console.log(error);
                    return;
                }
                files.forEach((file) => {
                    console.log(file);
                    fs.readFile(`${path}/${file}`, 'utf8', (error, data) => {
                        if (error) {
                            console.log(error);
                            return;
                        }
                        console.log(data);
                        rl.close();
                    });
                });
            });
        }
    }
}

rl.question('Enter the search term: ', (answer) => {
    const search = new DocumentSearch();
    if (!!answer) {
        rl.question('Search Method: 1) String Match  2) Regular Expression  3) Indexed - ', (newAnswer) => {
            switch (newAnswer) {
                case '1':
                    console.log("STRING MATCH");
                    search.processDocuments();
                    break;
                case '2':
                    console.log("REG EXP");
                    break;
                case '3':
                    console.log("INDEXED");
                    break;
                default:
                    console.log("INVALID");
                    break;
            }
        });
    } else {
        console.log(`Nope`);
        rl.close();
    }
});