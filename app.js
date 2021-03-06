var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

// create the connection information for the sql database
var connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "Love1993you",
database: "myCompany_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    inquirer
    .prompt({
        name: "choice",
        message: "What would you like to do?",
        type: "list",
        choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee's Role",
        "Update Employee's Manager",
        "View the total utilized budget by department",
        "EXIT"],
      })
      .then((result) => {
        if (result.choice === "View All Employees") {
          viewAllEmployees();
        } else if (result.choice === "View All Employees By Department") {
        
            viewByDepartment();
        } else if (result.choice === "View All Employees By Manager") {
       
          viewByManager();
        } else if (result.choice === "Add Employee") {
         
          addEmployee();
        } else if (result.choice === "Update Employee's Role"){
            updateEmployeeRole();
        } else if (result.choice === "Update Employee's Manager"){
          updateEmployeeManager();
        
        } else if (result.choice === "Remove Employee"){
            removeEmployee(); 
        }  else if (result.choice === "View the total utilized budget by department"){
          viewBudgetByDepartment(); 
      }
        
        else {
          connection.end();
        }
      })
      .catch((err) => {
        connection.end();
      });
  }


function viewAllEmployees() {
connection.query(
    "SELECT * FROM employee",
    
    function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
    }
    );
    }
// view all employee by Department function 
    function viewByDepartment() {
    inquirer
    .prompt({
    name: "choice",
    message: "Which department you want to see?",
    type: "list",
    choices: [
    "Marketing",
    "Engineering",
    "Finance",
    "Legal"],
    }).then((result)=>{
    var department = result.choice;
    connection.query(
    "SELECT * FROM employee WHERE department=?", [department],

    function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
    }
    );

    })
    }
    // view all employee by Manager function 
    function viewByManager() {
    inquirer
    .prompt({
    name: "choice",
    message: "Select one manager",
    type: "list",
    choices: [
    "Anil Kumar",
    "Barbara Corcoran",
    "Ray Dalio"],
    }).then((result)=>{
    var manager = result.choice;
    connection.query(
    "SELECT * FROM employee WHERE manager=?", [manager],
    function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
    }
    );
    })

    }

    // add employee function 
    function addEmployee(){
    inquirer
    .prompt([{
    name: "first_name",
    message: "What is the employee's first name",
    type: "input",
    },
    {
    name: "last_name",
    message: "What is the employee's last name",
    type: "input",
    },
    {
    name: "title",
    message: "What is the employee's role",
    type: "input",
    },
    {
    name: "department",
    message: "What is the employee's department?",
    type: "list",
    choices: [
    "Marketing",
    "Engineering",
    "Finance",
    "Legal"],
    },
    {
    name: "salary",
    message: "What is the employee's salary",
    type: "input",
    },
    {
    name: "manager",
    message: "Who is the employee's manager",
    type: "list",
    choices: [
    "None",
    "Anil Kumar",
    "Barbara Corcoran",
    "Ray Dalio"],
    }],
    ).then((result) => {
    connection.query(
    "INSERT INTO employee SET ?",
    {
    first_name: result.first_name,
    last_name: result.last_name,
    title: result.title,
    department: result.department,
    salary: result.salary,
    manager: result.manager,
    },
    function (err, results) {
    if (err) throw err;
    console.log("You added an employee");
    start();
    }
    );
    })

    }
    // remove employee function 
    function removeEmployee() {

    connection.query("SELECT * FROM employee", function (err, rows) {
    inquirer
    .prompt(
    {
    name: "id",
    message: "Which employee would you like to remove?",
    type: "list",
    choices: function () {
    let choices = [];
    for (let i = 0; i < rows.length; i++) {
    let choice = {
    name: `${rows[i].first_name} ${rows[i].last_name}`,
    value: rows[i].id
    }
    choices.push(choice);
    }

    return choices;
    },

    },
    ).then((result)=>{
    var id = result.id;
    connection.query("DELETE FROM employee WHERE id=?", [id], function (err, result){
    if (err) throw err;
    console.log("You've removed employee");
    start();

    })
    })
    })
    }

    // update employee role function 
    function updateEmployeeRole() {
    connection.query("SELECT * FROM employee", function (err, rows) {
    inquirer
    .prompt(
    [{
    name: "id",
    message: "Select employee",
    type: "list",
    choices: function () {
    let choices = [];
    for (let i = 0; i < rows.length; i++) {
    let choice = {
    name: `${rows[i].first_name} ${rows[i].last_name}`,
    value: rows[i].id
    }
    choices.push(choice);
    }

    return choices;
    },

    },
    {
    name: "title",
    message: "Please input new title",
    type: "input",
    }

    ]
    ).then((result)=>{
    var newId = result.id
    var newRole = result.title;
    connection.query("UPDATE employee SET title=? WHERE id=?", [newRole, newId], function (err, result){
    if (err) throw err;
    console.log("Title is updated");
    start();

    })
    })
    })
    }
    // update employee manager function 
    function updateEmployeeManager(){
    connection.query("SELECT * FROM employee", function (err, rows) {
    inquirer
    .prompt(
    [{
    name: "id",
    message: "Select employee",
    type: "list",
    choices: function () {
    let choices = [];
    for (let i = 0; i < rows.length; i++) {
    let choice = {
    name: `${rows[i].first_name} ${rows[i].last_name}`,
    value: rows[i].id
    }
    choices.push(choice);
    }

    return choices;
    },

    },
    {
    name: "manager",
    message: "Who will be new manager?",
    type: "list",
    choices: [
    "Anil Kumar",
    "Barbara Corcoran",
    "Ray Dalio",
    "None"
    ]
    }

    ]
    ).then((result)=>{
    var newId = result.id
    var newManager = result.manager;
    connection.query("UPDATE employee SET manager=? WHERE id=?", [newManager, newId], function (err, result){
    if (err) throw err;
    console.log("Title is updated");
    start();

    })
    })
    })
    }

    function viewBudgetByDepartment(){

    connection.query(
    "select department, sum(salary) AS total_salary from employee group by department",

    function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
    }
    );
    }