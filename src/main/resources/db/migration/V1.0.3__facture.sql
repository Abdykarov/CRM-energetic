create table facture_entity
(
    id             int8 not null,
    var_symbol     varchar(255),
    created_at     timestamp,
    facture_status varchar(255),
    total_price    numeric(19, 2),
    user_id        int8,
    primary key (id)
);
create table facture_item_entity
(
    id         int8 not null,
    name       varchar(255),
    price      numeric(19, 2),
    facture_id int8,
    primary key (id)
);
alter table if exists facture_entity
    add constraint FKmeujiqgpdhoiw302t1gvc4u6t foreign key (user_id) references user_entity;
alter table if exists facture_item_entity
    add constraint FK1k27iknftxd3i6jgmyqnt9x0 foreign key (facture_id) references facture_entity;