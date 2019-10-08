const DocumentSearch = require("./DocumentSearch");

test('testStringMatchSearch', function() {
    const searchEngine = new DocumentSearch();
    const twoMillionSearchesArray = new Array(2000000);
    for ( let i = 0; i < twoMillionSearchesArray.length; i++ ) {
        const query = twoMillionSearchesArray[i];
        console.log(query);
    }
});