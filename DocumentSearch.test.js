const fs = require("fs");
const DocumentSearch = require("./DocumentSearch");
const { performance } = require('perf_hooks');

// I only ran one test at a time because it was overheating my laptop
test('testStringMatchSearch', function() {
    const searchEngine = new DocumentSearch();
    searchEngine.method = '1';
    searchEngine.path = `${__dirname}/documents`;
    let testArray = fs.readFileSync('/Users/kouaxiong/TargetChallenge/TargetSeachEngine/src/test_documents/two_million_words.txt', 'utf8').split(' ');
    const t0 = performance.now();
    for (let i = 0; i < testArray.length; i++) {
        searchEngine.query = testArray[i];
        searchEngine.processDocuments();
    }
    const t1 = performance.now();
    console.log(`Elapsed time: ${t1 - t0} ms`);
});

// test('testRegularExpressionSearch', function() {
//     const searchEngine = new DocumentSearch();
//     searchEngine.method = '2';
//     searchEngine.path = `${__dirname}/documents`;
//     let testArray = fs.readFileSync('/Users/kouaxiong/TargetChallenge/TargetSeachEngine/src/test_documents/two_million_words.txt', 'utf8').split(' ');
//     const t0 = performance.now();
//     for (let i = 0; i < testArray.length; i++) {
//         searchEngine.query = testArray[i];
//         searchEngine.processDocuments();
//     }
//     const t1 = performance.now();
//     console.log(`Elapsed time: ${t1 - t0} ms`);
// });

// test('indexedSearch', function() {
//     const searchEngine = new DocumentSearch();
//     searchEngine.method = '3';
//     searchEngine.path = `${__dirname}/documents`;
//     let testArray = fs.readFileSync('/Users/kouaxiong/TargetChallenge/TargetSeachEngine/src/test_documents/two_million_words.txt', 'utf8').split(' ');
//     const t0 = performance.now();
//     for (let i = 0; i < testArray.length; i++) {
//         searchEngine.query = testArray[i];
//         searchEngine.processDocuments();
//     }
//     const t1 = performance.now();
//     console.log(`Elapsed time: ${t1 - t0} ms`);
// });