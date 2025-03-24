create table departments (
    id serial primary key,
    name varchar(30) unique not null
);

create table role (
    id serial primary key,
    title varchar(30) unique not null,
    salary Decimal not null,
    department_id Integer NOT Null 
    foreign key (department_id) references departments(id) on delete cascade
);

create table employee (
    id serial primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id Integer NOT Null
    manager_id Integer,
    foreign key (role_id) references role(id) on delete set null,
    foreign key (manager_id) references employee(id) on delete cascade
);

