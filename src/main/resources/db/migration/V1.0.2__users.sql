-- CONTACTS - NEW
INSERT INTO user_entity (b2b, hwsun_monitor, sysel_agreement, accepted_request_to_edr, city, company_name,
                         connectedfve, email, generated_contract, generated_facture, generated_request_to_edr,
                         ico, job_position, name, paid_facture, password, phone,
                         salesman_id, sended_confirmation_about_payment, signed_contract, signed_request_to_edr,
                         surname, username)
VALUES (null, false, false, false, 'Prague', 'company', false, 'gfgf@gmail.com',
        false, false, false, '169 00', 'manager', 'Ilias', false,
        null, '31232312312', 13, false, false, false, 'Abdykarov', null);

INSERT INTO user_entity (b2b, hwsun_monitor, sysel_agreement, accepted_request_to_edr, city, company_name,
                         connectedfve, email, generated_contract, generated_facture, generated_request_to_edr,
                         ico, job_position, name, paid_facture, password, phone,
                         salesman_id, sended_confirmation_about_payment, signed_contract, signed_request_to_edr,
                         surname, username)
VALUES (null, false, false, false, 'Prague', 'company', false, 'gfgf@gmail.com',
        false, false, false, '169 00', 'manager', 'Ilias2', false,
        null, '31232312312', 13, false, false, false, 'Abdykarov', null);

INSERT INTO user_entity (b2b, hwsun_monitor, sysel_agreement, accepted_request_to_edr, city, company_name,
                         connectedfve, email, generated_contract, generated_facture, generated_request_to_edr,
                         ico, job_position, name, paid_facture, password, phone,
                         salesman_id, sended_confirmation_about_payment, signed_contract, signed_request_to_edr,
                         surname, username)
VALUES (null, false, false, false, 'Prague', 'company', false, 'gfgf@gmail.com',
        false, false, false, '169 00', 'manager', 'Ilias3', false,
        null, '31232312312', 13, false, false, false, 'Abdykarov', null);


-- ROLES_USER
INSERT INTO user_entity_roles (user_entity_id, roles_id)
VALUES (1, 4);


INSERT INTO user_entity_roles (user_entity_id, roles_id)
VALUES (2, 4);


INSERT INTO user_entity_roles (user_entity_id, roles_id)
VALUES (3, 4);
