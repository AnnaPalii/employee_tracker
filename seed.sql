USE myCompany_DB;

-- Create Dummy Content for Reference
INSERT INTO employee (first_name, last_name, title, department, salary, manager)
VALUES ("Amy", "Dowre", "Sales Lead", "Marketing", 100000, "Anil Kumar");

INSERT INTO employee (first_name, last_name, title, department, salary, manager)
VALUES ("Tineke", "Eklude", "Salesperson", "Marketing", 80000, null);

INSERT INTO employee (first_name, last_name, title, department, salary, manager)
VALUES ("Stav", "Agostini", "Lead Engineer", "Engineering", 150000, null);

INSERT INTO employee (first_name, last_name, title, department, salary, manager)
VALUES ("Diana", "Reeve", "Software Engineer", "Engineering", 150000, "Barbara Corcoran");

INSERT INTO employee (first_name, last_name, title, department, salary, manager)
VALUES ("Suzana", "Boyce", "Accountant", "Finance", 125000, null);


INSERT INTO employee (first_name, last_name, title, department, salary, manager)
VALUES ("Chetan", "Clay", "Legal Team Lead", "Legal", 250000, null);

INSERT INTO employee (first_name, last_name, title, department, salary, manager)
VALUES ("Richard", "Brown", "Lawyer", "Legal", 190000, "Ray Dalio");