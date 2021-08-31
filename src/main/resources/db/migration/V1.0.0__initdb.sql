CREATE  TABLE role_entity
(
    id   int8 generated by default as identity,
    name varchar(255) not null,
    PRIMARY KEY (id)
);
CREATE  TABLE super_contract_entity
(
    contract_id int8 ,
    PRIMARY KEY (contract_id)
);
CREATE  TABLE user_entity
(
    id                                int8 generated by default as identity,
    b2b                               varchar(255),
    hwsun_monitor                     boolean ,
    sysel_agreement                   boolean ,
    accepted_request_to_edr           boolean ,
    connectedfve                      boolean ,
    email                             varchar(255),
    generated_contract                boolean ,
    generated_facture                 boolean ,
    generated_request_to_edr          boolean ,
    name                              varchar(255),
    paid_facture                      boolean ,
    paid_request_to_edr               boolean ,
    password                          varchar(255),
    phone                             varchar(255),
    salesman_id                       int8,
    sended_confirmation_about_payment boolean ,
    sended_contract                   boolean ,
    signed_contract                   boolean ,
    surname                           varchar(255),
    username                          varchar(255),
    city                              varchar(255),
    company_name                      varchar(255),
    job_position                      varchar(255),
    ico                               varchar(255),
    PRIMARY KEY (id)
);
CREATE  TABLE user_entity_roles
(
    user_entity_id int8 not null,
    roles_id       int8 not null,
    PRIMARY KEY (user_entity_id, roles_id)
);
CREATE  SEQUENCE hibernate_sequence start 100 increment 1;
ALTER TABLE IF EXISTS user_entity_roles
    ADD CONSTRAINT FKr70hb6wpq5vq5ennenkk12nqk FOREIGN KEY (roles_id) REFERENCES role_entity;
ALTER TABLE IF EXISTS user_entity_roles
    ADD CONSTRAINT FKjvvinok3stf32dvgie3vr73s0 FOREIGN KEY (user_entity_id) REFERENCES user_entity;