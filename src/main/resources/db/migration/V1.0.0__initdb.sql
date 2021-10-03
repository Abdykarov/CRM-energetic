create table concurrent_fve_entity
(
    id         int8      not null,
    created_at timestamp not null,
    updated_at timestamp,
    due_to     timestamp,
    user_id    int8,
    primary key (id)
);
create table contract_entity
(
    id            int8      not null,
    created_at    timestamp not null,
    updated_at    timestamp,
    contract_type varchar(255),
    lead_id       int8,
    primary key (id)
);
create table edr_link_entity
(
    id                int8 not null,
    registration_link varchar(255),
    current_id        int8,
    primary key (id)
);
create table email_entity
(
    id         int8 generated by default as identity,
    body       text,
    email_date timestamp,
    email_from varchar(255),
    email_to   varchar(255),
    inbox      boolean not null,
    subject    varchar(255),
    primary key (id)
);
create table facture_entity
(
    id             int8      not null,
    created_at     timestamp not null,
    due_date       timestamp,
    facture_status varchar(255),
    total_price    numeric(19, 2),
    var_symbol     varchar(255),
    user_id        int8,
    primary key (id)
);
create table note_entity
(
    id         int8 generated by default as identity,
    created_at      timestamp not null,
    message    varchar(255),
    manager_id int8,
    user_id    int8,
    primary key (id)
);
create table notification_entity
(
    id              int8 generated by default as identity,
    active_user_id  int8,
    created_at      timestamp not null,
    description     varchar(255),
    passive_user_id int8,
    type            varchar(255),
    primary key (id)
);
create table referal_entity
(
    id              int8      not null,
    created_at      timestamp not null,
    updated_at      timestamp,
    email           varchar(255),
    name            varchar(255),
    phone           varchar(255),
    referal_link    varchar(255),
    surname         varchar(255),
    link_creator_id int8,
    primary key (id)
);
create table referal_link_entity
(
    id           int8      not null,
    created_at   timestamp not null,
    updated_at   timestamp,
    referal_link varchar(255),
    edr_id       int8,
    primary key (id)
);
create table role_entity
(
    id   int8 generated by default as identity,
    name varchar(255),
    primary key (id)
);
create table user_entity
(
    male                                 boolean,
    role_changed_date                    timestamp,
    id                                   int8 generated by default as identity,
    area                                 varchar(255),
    city                                 varchar(255),
    concurrent_fve_due_date              timestamp,
    concurrent_fve_installed             boolean not null,
    concurrent_fve_installed_date        timestamp,
    concurrent_fve_name                  varchar(255),
    confirmation_about_payment_sent      boolean not null,
    confirmation_about_payment_sent_date timestamp,
    connected_fve_generated              boolean not null,
    connected_fve_generated_date         timestamp,
    connected_fve_sent                   boolean not null,
    connected_fve_sent_date              timestamp,
    connected_fve_signed                 boolean not null,
    connected_fve_signed_date            timestamp,
    edr_contract_generated               boolean not null,
    edr_contract_generated_date          timestamp,
    edr_contract_signed                  boolean not null,
    edr_contract_signed_date             timestamp,
    email                                varchar(255),
    facture_generated                    boolean not null,
    facture_generated_date               timestamp,
    facture_paid                         boolean not null,
    facture_paid_date                    timestamp,
    facture_sent                         boolean not null,
    facture_sent_date                    timestamp,
    hwsun_monitor_generated              boolean not null,
    hwsun_monitor_generated_date         timestamp,
    hwsun_monitor_sent                   boolean not null,
    hwsun_monitor_sent_date              timestamp,
    hwsun_monitor_signed                 boolean not null,
    hwsun_monitor_signed_date            timestamp,
    ico                                  varchar(255),
    name                                 varchar(255),
    op_number                            varchar(255),
    password                             varchar(255),
    phone                                varchar(255),
    request_to_edr_accepted              boolean not null,
    request_to_edr_accepted_date         timestamp,
    request_to_edr_generated             boolean not null,
    request_to_edr_generated_date        timestamp,
    request_to_edr_signed                boolean not null,
    request_to_edr_signed_date           timestamp,
    surname                              varchar(255),
    sysel_agreement_generated            boolean not null,
    sysel_agreement_generated_date       timestamp,
    sysel_agreement_sent                 boolean not null,
    sysel_agreement_sent_date            timestamp,
    sysel_agreement_signed               boolean not null,
    sysel_agreement_signed_date          timestamp,
    username                             varchar(255),
    wallet_points                        int4,
    referal_id                           int8,
    salesman_id                          int8,
    primary key (id)
);
create table user_entity_roles
(
    user_entity_id int8 not null,
    roles_id       int8 not null,
    primary key (user_entity_id, roles_id)
);
create sequence hibernate_sequence start 1 increment 1;
alter table if exists concurrent_fve_entity
    add constraint FKfvxq73kgul6efk4pfp17n05gc foreign key (user_id) references user_entity;
alter table if exists contract_entity
    add constraint FKcuyb3e9i72ew7qmbw4nd1kmtc foreign key (lead_id) references user_entity;
alter table if exists edr_link_entity
    add constraint FKc9sneoj80ro8rgii8nxmae8n4 foreign key (current_id) references user_entity;
alter table if exists facture_entity
    add constraint FKmeujiqgpdhoiw302t1gvc4u6t foreign key (user_id) references user_entity;
alter table if exists facture_item_entity
    add constraint FK1k27iknftxd3i6jgmyqnt9x0 foreign key (facture_id) references facture_entity;
alter table if exists note_entity
    add constraint FKb0mdrvgq67upg9k9vqd3r9heq foreign key (manager_id) references user_entity;
alter table if exists note_entity
    add constraint FKqlkwdbioi5spwq745qjf6cjhd foreign key (user_id) references user_entity;
alter table if exists referal_entity
    add constraint FK368hnpwptj1795lhew3y0l64e foreign key (link_creator_id) references user_entity;
alter table if exists referal_link_entity
    add constraint FKfev7w0g1lxooq772g75ctah8p foreign key (edr_id) references user_entity;
alter table if exists user_entity
    add constraint FKsp9h5mtbfbuiubs03b8mr1de6 foreign key (salesman_id) references user_entity;
alter table if exists user_entity_roles
    add constraint FKr70hb6wpq5vq5ennenkk12nqk foreign key (roles_id) references role_entity;
alter table if exists user_entity_roles
    add constraint FKjvvinok3stf32dvgie3vr73s0 foreign key (user_entity_id) references user_entity;