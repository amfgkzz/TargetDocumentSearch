const fs = require("fs");
const DocumentSearch = require("./DocumentSearch");

test('testStringMatchSearch', function() {
    const searchEngine = new DocumentSearch();
    searchEngine.method = '1';
    searchEngine.path = `${__dirname}/documents`;
    let testArray = fs.readFileSync('/Users/kouaxiong/TargetChallenge/TargetSeachEngine/src/test_documents/two_million_words.txt', 'utf8').split(' ');
    for (let i = 0; i < testArray.length; i++) {
        searchEngine.query = testArray[i];
        searchEngine.processDocuments();
    }
});