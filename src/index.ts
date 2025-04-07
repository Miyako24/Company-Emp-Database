import { pool, connectToDb } from './connection.js';
import inquirer from 'inquirer';

await connectToDb();

const init = () => {
inquirer
.prompt ([
    {
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do?:',
        choices: [
            'view all departments',
            'view all roles',
            'view all employees',
            'add a department',
            'add a role',
            'add an employee',
            'update an employee role',
            'exit'  
        ]
        
    },

])

.then((answers) => {
    switch (answers.mainMenu) {
      case 'view all departments':
        pool.query('SELECT * FROM department')
          .then(res => {
            console.table(res.rows);
            init();
          })
          .catch(err => {
            console.error('Error fetching departments:', err);
            init();
          });
        break;

      case 'view all roles':
        pool.query('SELECT * FROM role')
          .then(res => {
            console.table(res.rows);
            init();
          })
          .catch(err => {
            console.error('Error fetching roles:', err);
            init();
          });
        break;

      case 'view all employees':
        pool.query('SELECT * FROM employee')
          .then(res => {
            console.table(res.rows);
            init();
          })
          .catch(err => {
            console.error('Error fetching employees:', err);
            init();
          });
        break;

      case 'add a department':
        inquirer.prompt([
          {
            type: 'input',
            name: 'deptName',
            message: 'Enter the name of the new department:'
          }
        ]).then(({ deptName }) => {
          pool.query('INSERT INTO department (name) VALUES ($1)', [deptName])
            .then(() => {
              console.log(`Department "${deptName}" added.`);
              init();
            })
            .catch(err => {
              console.error('Error adding department:', err);
              init();
            });
        });
        break;

      case 'add a role':
        inquirer.prompt([
          { type: 'input', name: 'title', message: 'Role title:' },
          { type: 'input', name: 'salary', message: 'Role salary:' },
          { type: 'input', name: 'department_id', message: 'Department ID:' }
        ]).then(({ title, salary, department_id }) => {
          pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id])
            .then(() => {
              console.log(`Role "${title}" added.`);
              init();
            })
            .catch(err => {
              console.error('Error adding role:', err);
              init();
            });
        });
        break;

      case 'add an employee':
        inquirer.prompt([
          { type: 'input', name: 'first_name', message: 'First name:' },
          { type: 'input', name: 'last_name', message: 'Last name:' },
          { type: 'input', name: 'role_id', message: 'Role ID:' },
          { type: 'input', name: 'manager_id', message: 'Manager ID (or leave blank):' }
        ]).then(({ first_name, last_name, role_id, manager_id }) => {
          pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [
            first_name, last_name, role_id, manager_id || null
          ])
            .then(() => {
              console.log(`Employee "${first_name} ${last_name}" added.`);
              init();
            })
            .catch(err => {
              console.error('Error adding employee:', err);
              init();
            });
        });
        break;

      case 'update an employee role':
        inquirer.prompt([
          { type: 'input', name: 'employee_id', message: 'Employee ID to update:' },
          { type: 'input', name: 'new_role_id', message: 'New role ID:' }
        ]).then(({ employee_id, new_role_id }) => {
          pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [new_role_id, employee_id])
            .then(() => {
              console.log(`Updated employee ${employee_id} to role ${new_role_id}.`);
              init();
            })
            .catch(err => {
              console.error('Error updating employee role:', err);
              init();
            });
        });
        break;

      case 'exit':
        console.log('Goodbye!');
        pool.end().then(() => process.exit());
        break;
    }
  });
}

init();