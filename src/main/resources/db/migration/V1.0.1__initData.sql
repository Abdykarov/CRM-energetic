-- ROLES
INSERT INTO role_entity (id, name) VALUES (1,'ADMIN');
INSERT INTO role_entity (id, name) VALUES (2,'MANAGER');
INSERT INTO role_entity (id, name) VALUES (3,'SALESMAN');
INSERT INTO role_entity (id, name) VALUES (4,'NEW');
INSERT INTO role_entity (id, name) VALUES (5,'OLD');
INSERT INTO role_entity (id, name) VALUES (6,'LEAD');
INSERT INTO role_entity (id, name) VALUES (7,'POTENTIAL');
INSERT INTO role_entity (id, name) VALUES (8,'CURRENT');
INSERT INTO role_entity (id, name) VALUES (9,'ACCEPTED');
INSERT INTO role_entity (id, name) VALUES (10,'EDR');

-- USERS
INSERT INTO user_entity (id, name, surname, phone, email)
VALUES (1, 'Ilias', 'Abdykarov', '420792254131', 'n13wka@gmail.com');

-- ROLES_USER
INSERT INTO user_entity_roles (user_entity_id, roles_id)
VALUES (1, 4);