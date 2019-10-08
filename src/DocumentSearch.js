const fs = require("fs");
const readline = require("readline");
const { performance } = require('perf_hooks');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const DocumentSearch = module.exports = function () {
    return {
        method: null,
        path: `${__dirname}/documents`,
        query: null,
        results: {},

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
            const t0 = performance.now();
            const files = fs.readdirSync(path = this.path);
            files.forEach((file) => {
                this.results[file] = 0;
                let wordsArray = fs.readFileSync(`${path}/${file}`, 'utf8').split(' ');
                for (let i = 0; i < wordsArray.length; i++) {
                    const word = wordsArray[i];
                    if (word.toLowerCase() == this.query.toLowerCase()) {
                        this.results[file]++;
                    }
                }
            });
            console.log(this.results);
            const t1 = performance.now();
            console.log(`Elapsed time: ${t1 - t0} ms`);
        },

        regularExpressionSearch: function () {
            const t0 = performance.now();
            const files = fs.readdirSync(path = this.path);
            const escapeRegExp = function (string) {
                return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            }
            const regExpQuery = new RegExp(escapeRegExp(this.query), 'gi');
            files.forEach((file) => {
                let match = fs.readFileSync(`${path}/${file}`, 'utf8').split(' ').filter((word) => {
                    return word.length == this.query.length && word.match(regExpQuery);
                });
                this.results[file] = match ? match.length : 0;
            });
            console.log(this.results);
            const t1 = performance.now();
            console.log(`Elapsed time: ${t1 - t0} ms`);
        },

        indexedSearch: function () {
            const t0 = performance.now();

            const files = fs.readdirSync(path = this.path);
            files.forEach((file) => {
                let wordsArray = fs.readFileSync(`${path}/${file}`, 'utf8').split(' ').sort().filter((word) => {
                    return word.length == this.query.length && word.toLowerCase() == this.query.toLowerCase();
                });
                this.results[file] = wordsArray ? wordsArray.length : 0;
            });
            console.log(this.results);
            const t1 = performance.now();
            console.log(`Elapsed time: ${t1 - t0} ms`);
        }
    }
}

const request = new DocumentSearch();
rl.question('Enter the search term: ', (query) => {
    if (!!query) {
        rl.question('Search Method: 1) String Match  2) Regular Expression  3) Indexed - ', (method) => {
            request.query = query;
            request.method = method;
            request.processDocuments();
        });
    } else {
        console.log('Invalid search query.');
        rl.close();
    }
});