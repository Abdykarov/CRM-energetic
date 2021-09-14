create table edr_link_entity
(
    id                int8 not null,
    registration_link varchar(255),
    current_id        int8,
    primary key (id)
);
create table email_entity
(
    id         int8 not null,
    body       varchar(255),
    email_from varchar(255),
    email_to   varchar(255),
    subject    varchar(255),
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
alter table if exists edr_link_entity
    add constraint FKc9sneoj80ro8rgii8nxmae8n4 foreign key (current_id) references user_entity;
alter table if exists referal_entity
    add constraint FK368hnpwptj1795lhew3y0l64e foreign key (link_creator_id) references user_entity;
alter table if exists referal_link_entity
    add constraint FKfev7w0g1lxooq772g75ctah8p foreign key (edr_id) references user_entity;