var mysql = require("mysql");
var inquirer = require("inquirer");

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