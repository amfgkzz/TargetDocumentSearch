const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function searchAllDocuments() {
    fs.readdir('/Users/kouaxiong/TargetChallenge/TargetSeachEngine/documents', (error, files) => {
        if (error) {
            console.log(error);
            return;
        }
        files.forEach((file) => {
            console.log(file);
        });
    });
}

function stringMatchSearch(query) {
    console.log(query);
    searchAllDocuments();
    rl.close();
}

function regularExpressionSearch(query) {
    console.log(query);
    rl.close();
}

function indexedSearch(query) {
    console.log(query);
    rl.close();
}

rl.question('Enter the search term: ', (answer) => {
    if (!!answer) {
        rl.question('Search Method: 1) String Match  2) Regular Expression  3) Indexed - ', (newAnswer) => {
            switch (newAnswer) {
                case '1':
                    console.log("STRING MATCH");
                    stringMatchSearch(answer);
                    break;

                case '2':
                    console.log("REG EXP");
                    regularExpressionSearch(answer);
                    break;
                case '3':
                    console.log("INDEXED");
                    indexedSearch(answer);
                    break;
                default:
                    console.log("INVALID");
                    break;
            }
            // if ( newAnswer == 1 ) {
            //     console.log('You chose string match!');
            //     stringMatchSearch(answer);
            // } else if ( newAnswer == 2) {
            //     console.log('You chose regular expression!');
            //     regularExpressionSearch(answer);
            // } else if ( newAnswer == 3 ) {
            //     console.log('You chose indexed! ');
            //     indexedSearch(answer);
            // } else {
            //     console.log('No input :( ');
            //     rl.close();
            // }
        });
    } else {
        console.log(`Nope`);
        rl.close();
    }
});