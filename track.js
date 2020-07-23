var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employeeDB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});


function runSearch() {

  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View department",
        "View role",
        "View employee",
        "Update employee",
          ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add department":
        Adepart();
        break;

      case "Add role":
        Arole();
        break;

      case "Add employee":

            Aemployee();

        
        break;

      case "View department":
        Vdepart();
        break;

      case "View role":
        Vrole();
        break;
        
      case "View employee":
        Vemployee();
        break;

      case "Update employee":
        update();
        break;
      }
    });
}

function Adepart() {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "What is the name of the new department?"
    })
    .then(function(answer) {
      var query = "INSERT INTO department (name) VALUES (?)";
      connection.query(query, answer.name, function(err, res) {
          if (err) throw err;

        // var user = res[0].name;
        console.log(answer)

        runSearch();
      });
    });
}

function Arole() {
    inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "What is the name of the new role?"
    })
    .then(function(answer) {
      var query = "INSERT INTO role (name) VALUES (?)";
      connection.query(query, answer.name, function(err, res) {
          if (err) throw err;

        // var user = res[0].name;
        console.log(answer)

        runSearch();
      });
    });
}

function Aemployee(addSet) {
    inquirer
    .prompt([
    {
      name: "firstname",
      type: "input",
      message: "What is the first name of the new employee?"
    },
    {
        name: "lastname",
        type: "input",
        message: "What is the last name of the new employee?"
    },
    {
        name: "role",
        type: "input",
        message: "What is the role of the new employee?"
    },
    {
        name: "manager",
        type: "input",
        message: "Who is the employee's manager?"
    }
]
    ).then(function(answer){
    // var set = {
    //     first_name:answer.firstname
    // }
      var query = "INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)";
      connection.query(query, [answer.firstname,answer.lastname,answer.role,answer.manager], function(err, res) {
          if (err) throw err;

        // var user = res[0].name;
        console.log(answer)

        runSearch();
      });
    });
    }

function Vdepart() {
return;
}

function Vrole() {
return;
}

function Vemployee() {
return;
}