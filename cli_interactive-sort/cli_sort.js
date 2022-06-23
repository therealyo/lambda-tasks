const readline = require("readline");


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function sortArr(arr, sType){
    if (sType === "ascending"){
        return arr.sort(function (a, b){return a - b;});
    }

    if (sType === "descending"){
        return arr.sort(function (a, b){return a - b;})
                    .reverse();
    }

    if (sType === "words"){
        return arr.sort()
    }

    if (sType === "length"){
        return arr.sort(function (s1, s2){return s1.length - s2.length});
    }
}


function unique(arr){
    return [...new Set(arr)];
}


function makeChoice(input) {
    let allElements = input.split(" ");

    let numbers = [];
    allElements.filter(Number).forEach(str => {
        numbers.push(Number(str));
    });
    let words = allElements.filter(element => !numbers.includes(Number(element)));

    rl.question("Select one of available options(type 1-6): ", (choice) => {
        switch (choice){
            case "1":
                console.log(sortArr(words, "words"));
                break;
            case "2":
                console.log(sortArr(numbers, "ascending"));
                break;
            case "3":
                console.log(sortArr(numbers, "descending"));
                break;
            case "4":
                console.log(sortArr(words, "length"));
                break;
            case "5":
                console.log(unique(words));
                break;
            case "6":
                console.log(unique(allElements));
                break;
            case "new":
                main();
                break;
            case "quit":
                console.log("Exiting...");
                return rl.close();
            default:
                console.log("Wrong choice!!");
        }
        makeChoice(input);
    });
}

function main() {
    rl.question("Enter your text: ", (input) => {

        console.log();
        console.log("\t1.Sort words in alphabetical order\n",
            "\t2.Sort numbers in ascending order\n",
            "\t3.Sort numbers in descending order\n",
            "\t4.Sort words by amount of letters in each word\n",
            "\t5.Show unique words\n",
            "\t6.Show all unique values from input\n",
            "\nEnter next if you want new input",
            "\nEnter quit if you want to exit");

        makeChoice(input);
    });
}


main();
