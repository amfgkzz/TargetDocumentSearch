const fs = require("fs");
const readline = require("readline");
const { performance } = require('perf_hooks');

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
                    break;
                case '2':
                    this.regularExpressionSearch();
                    break;
                case '3':
                    this.indexedSearch();
                    break;
                default:
                    console.log('Invalid method.');
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
            this.getResults();
            const t1 = performance.now();
            console.log(`\nElapsed time: ${t1 - t0} ms\n`);
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
            this.getResults();
            const t1 = performance.now();
            console.log(`\nElapsed time: ${t1 - t0} ms\n`);
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
            this.getResults();
            const t1 = performance.now();
            console.log(`\nElapsed time: ${t1 - t0} ms \n`);
        },

        getResults: function () {
            if (this.results !== null) {
                for (const key in this.results) {
                    if (this.results.hasOwnProperty(key)) {
                        console.log(`\nResult: ${key} - ${this.results[key]} matches`);
                    }
                }
            } else {
                console.log('No results, yet.');
            }
        }
    }
}

if (require.main === module) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('\nEnter the search term: ', (query) => {
        const request = new DocumentSearch();
        if (!!query) {
            rl.question('\nEnter a number to choose the preferred Search Method: \n1) String Match  2) Regular Expression  3) Indexed - ', (method) => {
                request.query = query;
                request.method = method;
                request.processDocuments();
                rl.close();
            });
        } else {
            console.log('Invalid search query.');
            rl.close();
        }
    });
}

