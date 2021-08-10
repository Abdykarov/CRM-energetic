package com.example.demo.domain;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
@Table(name = "reminder")
public class ReminderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String reminderType;
    String description;
    Date creationDate;
    Time creationTime;

}
