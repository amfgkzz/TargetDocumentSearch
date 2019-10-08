const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const DocumentSearch = module.exports = function () {
    return {
        method: null,
        path: `${__dirname}/documents`,
        query: null,
        results: null,

        processDocuments: function () {
            switch (this.method) {
                case '1':
                    this.stringMatchSearch();
                    rl.close();
                    break;
                case '2':
                    this.regularExpressionSearch();
                    rl.close();
                    break;
                case '3':
                    this.indexedSearch();
                    rl.close();
                    break;            
                default:
                    console.log('Invalid method.');
                    rl.close();
                    break;
            }
        },

        stringMatchSearch: function () {
            console.log("string match");
            fs.readdir(path = this.path, (error, files) => {
                if (error) {
                    console.log(error);
                    return;
                }
                files.forEach((file) => {
                    // console.log(file);
                    fs.readFile(`${path}/${file}`, 'utf8', (error, data) => {
                        console.log(path);
                        if (error) {
                            console.log(error);
                            return;
                        }
                        let words = data.split(' ');
                        console.log(words);
                    });
                    rl.close();
                });
            });
        },

        regularExpressionSearch: function () {
            console.log("reg exp");
        },

        indexedSearch: function () {
            console.log("index search");
        }
    }
}

rl.question('Enter the search term: ', (query) => {
    const request = new DocumentSearch();
    if (!!query) {
        rl.question('Search Method: 1) String Match  2) Regular Expression  3) Indexed - ', (method) => {
            request.method = method;
            request.query = query;
            request.processDocuments();
        });
    } else {
        console.log('Invalid search query.');
        rl.close();
    }
});