//Grabbing packages
const inquirer = require('inquirer');
const fs = require('fs');

//Grabbing classes
const manager = require('./lib/manager');
const intern = require('./lib/intern');
const engineer = require('./lib/engineer');

//Ran at the last line in this script, it loads the first third of the HTML before running the employee function
//given that employees may be added.
function load() {
    topHTML();
    addEmployee();
}

//Prompts for basic information. Based on role prompt, it will run appropriate constructor
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the employee's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the employee's identification number?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the employee's email?"
        },
        {
            type: 'list',
            name: 'role',
            message: "What is the employee's role on the team?",
            choices: [
                "Manager",
                "Intern",
                "Engineer"
            ]
        },
        //when allows me to ask a prompt based on the response to the role question
        {
            type: 'input',
            name: 'number',
            message: "What is the Manager's office phone number?",
            when: (answers) => answers.role === 'Manager'
        },
        {
            type: 'input',
            name: 'github',
            message: "What is the Engineer's Github username?",
            when: (answers) => answers.role === 'Engineer'
        },
        {
            type: 'input',
            name: 'school',
            message: "What school is the intern currently enrolled in?",
            when: (answers) => answers.role === 'Intern'
        },
    ])
    .then((data) => {
        //We take the data from the prompts and assign a class based on role
        var newEmployee;

        switch (data.role) {
            case "Manager":
                newEmployee = new manager(data.name, data.id, data.email, data.number);
                break;
            case "Intern":
                newEmployee = new intern(data.name, data.id, data.email, data.school)
                break;
            case "Engineer":
                newEmployee = new engineer(data.name, data.id, data.email, data.github)
                break;
        };
        //After we make the class, we generate a card for it
        generateCard(newEmployee);
        //After making a card, the application will prompt for another employee, if another employee is not wanted, 
        another()

        function another() {
            inquirer.prompt([
                {
                    type: "list",
                    name: "another",
                    message: "The employee's card has been generated. Would you like to add another employee?",
                    choices: ["Yes", "No"]
                }
            ])
            .then((answers) => {
                if (answers.another === "Yes" ) {
                    addEmployee();
                }
                else {
                    //we finish the application by completing the HTML file.
                    bottomHTML()
                    console.log('The HTML file should be complete!')
                }
            })
        };

    })
}

function topHTML() {
//Plain text that will be written into an HTML file using fs.writeFile
    var html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Generator</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel='stylesheet' href='./style.css'>
</head>

<body>
    <div class="container-fluid">
        <div id='headerRow' class='row justify-content-md-center'>
            <div class='col-12' id='header'>
                <p>My Team</p>
            </div>
        </div>

        <div id='main' class='row justify-content-center'>
    `;
    //Takes the above text and throws it into an HTML
    fs.writeFile("./dist/team.html", html, function(err) {
        if (err) {
            console.log(err)
        }
    })
}

function generateCard(newEmployee) {
    //Grabbing the class data from the employee just created. This function will be ran for each employee created, before starting another.
    var name = newEmployee.getName();
    var id = newEmployee.getID();
    var email = newEmployee.getEmail();
    var role = newEmployee.getRole();
    var special;

    //Switch-case for figuring out the value for special. Since each employee could be different
    switch (role) {
        case "Manager":
            special = "Office Number: " + newEmployee.number;
            break;
        case "Intern":
            special = "School: " + newEmployee.school;
            break;
        case "Engineer":
            var emailLink = "https://github.com/" + newEmployee.github
            special = `GitHub: <a href="${emailLink}">` + newEmployee.github + `</a>`
            break;
    };
    
    //More html to inject into the file before it is fully complete.
    var cardHTML = `<div id='card' class='col-2'>
    <div class='row align-items-center'>
        <div id='cardHeader' class='col-12'>
            <p class='name'>${name}</p>
            <p class='position'>${role}</p>
        </div>

        <div id='cardBody' class='col-12'>
            <div class='infodiv'>
                <p class='info'>ID: ${id}</p>
            </div>
            <div class='infodiv'>
                <p class='info'>Email: <a href="mailto:${email}">${email}</a></p>
            </div>
            <div class='infodiv'>
                <p class='info'>${special}</p>
            </div>
        </div>
    </div>
</div>
    `
    fs.appendFile("./dist/team.html", cardHTML, function(err) {
        if (err) {
            console.log(err)
        }
    })
}

function bottomHTML() {

    //Final bit of html to close off div elements in addition to scripts
    var html = `</div>
    </div>


    <!-- Scripts for Bootstrap -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
        integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
        integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
        crossorigin="anonymous"></script>
</body>

</html>
    `
    fs.appendFile("./dist/team.html", html, function(err) {
        if (err) {
            console.log(err)
        }
    })
}

//Begins the application
load()