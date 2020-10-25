var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

// create the connection information for the sql database
var connection = mysql.createConnection({
host: "localhost",

  // adding port
port: 3306,

// Username
user: "root",

// Password
password: "Love1993you",
database: "myCompany_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
    .prompt({
        name: "addOrViewOrUpdate",
        type: "list",
        message: "Would you like to Add or View or Update information?",
        choices: ["Add", "View", "Update","Exit"]
    })
    .then(function(answer) {
    // based on their answer, either call the bid or the post functions
    if (answer.addOrViewOrUpdate === "Add") {
        addFunction();
    }
    else if(answer.addOrViewOrUpdate === "View") {
        viewFunction();
    } 
    else if(answer.addOrViewOrUpdate === "Update") {
        updateFunction();
    } else{
        connection.end();
    }
    });
}

function addFunction (){
    inquirer
    .prompt({
        name: "addToDB",
        type: "list",
        message: "Would you like to add Department, Role or Employee?",
        choices: ["Department", "Role", "Employee","Exit"]
    })
    .then(function(answer) {
    // based on their answer, either call the bid or the post functions
    if (answer.addToDB === "Department") {
        addDepartment();
    }
    else if(answer.addToDB === "Role") {
        addRole();
    } 
    else if(answer.addToDB === "Employee") {
        addEmployee();
    } else{
        connection.end();
    }
    });   
}

// ADD FUNCTIONS 
function addDepartment() {
// prompt for info about the item being put up for auction
inquirer
    .prompt([
    {
        name: "item",
        type: "input",
        message: "Please add new department name."
    }])
    .then(function(answer) {
    // when finished prompting, insert a new item into the db with that info
    connection.query(
        "INSERT INTO department SET ?",
        {name: answer.item },
        function(err) {
        if (err) throw err;
        console.log("Your department was added successfully!");
        // re-prompt the user for if they want to bid or post
        start();
        }
    );
    });
}

function addRole() {
// prompt for info about the item being put up for auction
inquirer
    .prompt([
    {
        name: "item",
        type: "input",
        message: "Please add new role name."
    },
    {
        name: "salary",
        type: "input",
        message: "What is the salary amount?",
        validate: function(value) {
        if (isNaN(value) === false) {
            return true;
        }
        return false;
        }
    },
    {
        name: "id",
        type: "input",
        message: "Please add department id"
    },
    ])
    .then(function(answer) {
    // when finished prompting, insert a new item into the db with that info
    connection.query(
        "INSERT INTO roles SET ?",
        {
        title: answer.item,
        salary: answer.salary || 0,
        id: answer.id || 0
        },
        function(err) {
        if (err) throw err;
        console.log("Role was created successfully!");
        // re-prompt the user for if they want to bid or post
        start();
        }
    );
    });
}
function addEmployee() {
    // prompt for info about the item being put up for auction
    inquirer
        .prompt([
        {
            name: "name",
            type: "input",
            message: "Please add employee first name."
        },
        {
            name: "lname",
            type: "input",
            message: "Please add employee last name."
        },
        {
            name: "roleId",
            type: "input",
            message: "Please add role id"
        },
        {
            name: "managerId",
            type: "input",
            message: "Please add manager id"
        }
        ])
        .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
            "INSERT INTO employee SET ?",
            {
            first_name: answer.name,
            last_name: answer.lname,
            role_id: answer.roleId || 0,
            manager_id: answer.managerId || 0
            },
            function(err) {
            if (err) throw err;
            console.log("Employee was added successfully!");
            // re-prompt the user for if they want to bid or post
            start();
            }
        );
        });
    }

function viewFunction (){
    inquirer
    .prompt({
        name: "viewDB",
        type: "list",
        message: "Would you like to view Department, Role or Employee?",
        choices: ["Department", "Role", "Employee","Exit"]
    })
    .then(function(answer) {
    // based on their answer, either call the bid or the post functions
    if (answer.viewDB === "Department") {
        viewDepartment();
    }
    else if(answer.viewDB === "Role") {
        viewRole();
    } 
    else if(answer.viewDB === "Employee") {
        viewEmployee();
    } else{
        connection.end();
    }
    });   
}

function updateFunction (){
    inquirer
    .prompt({
        name: "updateDB",
        type: "list",
        message: "Would you like to update Department, Role or Employee?",
        choices: ["Department", "Role", "Employee","Exit"]
    })
    .then(function(answer) {
    // based on their answer, either call the bid or the post functions
    if (answer.updateDB === "Department") {
        updateDepartment();
    }
    else if(answer.updateDB === "Role") {
        updateRole();
    } 
    else if(answer.updateDB === "Employee") {
        updateEmployee();
    } else{
        connection.end();
    }
    });   
}