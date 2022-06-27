const inquirer = require("inquirer");
const fs = require("fs");


const DBFILE = "db.txt";


const find = (db, name) => {
    for (let el of db) {
        if (el["name"] === name) {
            return el;
        }
    }
    return `Name ${name} not found`;

}


const convertTXT = (dict) => {
    return JSON.stringify(dict);
}


const convertFromTXT = (str) => {
    let users = str.split("\n").filter((line) => line.length >= 1);
    users = users.map((el) => JSON.parse(el));

    return users;
}


const save = (user) => {
    fs.appendFile(DBFILE, convertTXT(user) + "\n", function (err) {
        if (err) {
            console.log(err);
        }
    });
}


const suggestSearch = () => {
    inquirer.prompt([
        {
            name: "answer",
            type: "confirm",
            message: "Would you like to search values in db?"
        }

    ]).then((answer) => {
        fs.readFile(DBFILE, 'utf8', (err, data) => {
            if (err) {
                console.log("Empty database");
                return;
            }

            let db = convertFromTXT(data);
            console.log(db);

            if (!answer.answer) {
                return;
            }
            inquirer.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "Who are you looking for?"
                }
            ]).then((name) => {
                console.log(find(db, name.name));
                suggestSearch();
            })
        })

    });
}


const main = () => {
    inquirer.prompt([
        {
            name: "username",
            type: "input",
            message: "What is your name? Press ENTER to exit"
        }
    ]).then((name) => {
        if (name.username !== "") {
            inquirer.prompt([
                {
                    name: "gender",
                    type: "list",
                    choices: ["male", "female"]
                },
                {
                    name: "age",
                    type: "input",
                    message: "Enter your age"
                }
            ]).then((result) => {
                result["name"] = name.username;
                save(result);
                main();
            })

        } else {
            suggestSearch();
        }
    });
}

main();


