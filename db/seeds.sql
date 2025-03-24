INSERT INTO department (name) VALUES ('HR'), ('Engineering'), ('Sales'), ('Fiance'), ('Customer Service');
insert into role (title, salary, department_id) values 
('HR Manager', 60000, 1), 
('Software Engineer', 80000, 2), 
('Sales Associate', 50000, 3), 
('Finance Analyst', 70000, 4), 
('Customer Service', 40000, 5);


insert into employee (first_name, last_name, role_id, manager_id) values 
('Miya', 'Lee', 1, null), 
('Mary', 'Smith', 2, 1), 
('Lisa', 'Decosta', 3, 1), 
('Jay', 'Turner', 4, 2);