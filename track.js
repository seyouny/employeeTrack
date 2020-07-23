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
        URole();
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

      var query = "SELECT * FROM department";
      connection.query(query, function(err, res) {
          if (err) throw err;

        // var user = res[0].name;
        const table = cTable.getTable(res);
        console.log(table)

        runSearch();
      });
      
    }

function Vrole() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
        if (err) throw err;

      // var user = res[0].name;
      const table = cTable.getTable(res);
      console.log(table)

      runSearch();
    });
    
}

function Vemployee() {
    var query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
        if (err) throw err;

      // var user = res[0].name;
      const table = cTable.getTable(res);
      console.log(table)

      runSearch();
    });
    
}
function URole(){
    inquirer
    .prompt([
        {
            name: "name",
            type: "input",
            message: "Who would you like to update?"
          },
          {
              name: "updateRole",
              type: "input",
              message: "What role would you like to update them to?"
          }
    ]).then(function(answer){
        
        var query = "UPDATE employee SET role_id = ? WHERE first_name= ?";
        connection.query(query,[answer.updateRole, answer.name] ,function(err, res) {
            if (err) throw err;

          // var user = res[0].name;
          console.log(answer)
            Vemployee();
          runSearch();
    })

    });

  
}