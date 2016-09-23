INSERT INTO `itaschedule`.`city` (`name`) VALUES ('Lviv');
INSERT INTO `itaschedule`.`city` (`name`) VALUES ('Kyiv');
INSERT INTO `itaschedule`.`city` (`name`) VALUES ('Kharkiv');
INSERT INTO `itaschedule`.`city` (`name`) VALUES ('Sofia');

# INSERT INTO `itaschedule`.`address` (`address`, `code_name`, `working_hours_end`, `working_hours_start`, `city_id`) VALUES ('111', '1111', '111', '111', '2');
INSERT INTO `itaschedule`.`address` (`active`, `address`, `code_name`, `working_hours_end`, `working_hours_start`, `city_id`) VALUES (true, 'address1', '1', '12:00:00', '10:00:00', '1');
INSERT INTO `itaschedule`.`address` (`active`, `address`, `code_name`, `working_hours_end`, `working_hours_start`, `city_id`) VALUES (true, 'address2', '1', '22:00:00', '08:00:00', '1');
INSERT INTO `itaschedule`.`address` (`active`, `address`, `code_name`, `working_hours_end`, `working_hours_start`, `city_id`) VALUES (true, 'address3', '1', '21:00:00', '11:00:00', '2');
INSERT INTO `itaschedule`.`address` (`active`, `address`, `code_name`, `working_hours_end`, `working_hours_start`, `city_id`) VALUES (true, 'address4', '1', '16:00:00', '08:00:00', '1');

INSERT INTO `itaschedule`.`event_type` (`color`, `type`) VALUES ('red',   'type1');
INSERT INTO `itaschedule`.`event_type` (`color`, `type`) VALUES ('green', 'type2');
INSERT INTO `itaschedule`.`event_type` (`color`, `type`) VALUES ('blue',  'type3');

INSERT INTO `itaschedule`.`room` (`active`, `number`, `address_id`) VALUES (true, '1001', '1');
INSERT INTO `itaschedule`.`room` (`active`, `number`, `address_id`) VALUES (true, '1002', '1');
INSERT INTO `itaschedule`.`room` (`active`, `number`, `address_id`) VALUES (true, '1003', '1');
INSERT INTO `itaschedule`.`room` (`active`, `number`, `address_id`) VALUES (true, '1004', '1');
INSERT INTO `itaschedule`.`room` (`active`, `number`, `address_id`) VALUES (true, '2001', '2');
INSERT INTO `itaschedule`.`room` (`active`, `number`, `address_id`) VALUES (true, '2002', '2');
INSERT INTO `itaschedule`.`room` (`active`, `number`, `address_id`) VALUES (true, '2003', '2');

INSERT INTO `itaschedule`.`event` (`end_time`, `start_time`, `title`, `room_id`, `type_id`) VALUES ('2016-09-23 15:00:00', '2016-09-23 17:00:00', 'Event 1', '1', '1');
INSERT INTO `itaschedule`.`event` (`end_time`, `start_time`, `title`, `room_id`, `type_id`) VALUES ('2016-09-24 13:00:00', '2016-09-24 17:00:00', 'Event 2', '1', '1');
INSERT INTO `itaschedule`.`event` (`end_time`, `start_time`, `title`, `room_id`, `type_id`) VALUES ('2016-09-27 13:00:00', '2016-09-27 15:00:00', 'Event 3', '1', '1');
INSERT INTO `itaschedule`.`event` (`end_time`, `start_time`, `title`, `room_id`, `type_id`) VALUES ('2016-09-28 15:00:00', '2016-09-28 19:00:00', 'Event 4', '2', '1');
INSERT INTO `itaschedule`.`event` (`end_time`, `start_time`, `title`, `room_id`, `type_id`) VALUES ('2016-09-30 17:00:00', '2016-09-30 19:00:00', 'Event 5', '3', '2');
INSERT INTO `itaschedule`.`event` (`end_time`, `start_time`, `title`, `room_id`, `type_id`) VALUES ('2016-09-30 17:00:00', '2016-09-30 19:00:00', 'Event 6', '3', '2');
INSERT INTO `itaschedule`.`event` (`end_time`, `start_time`, `title`, `room_id`, `type_id`) VALUES ('2016-09-30 17:00:00', '2016-09-30 19:00:00', 'Event 7', '3', '2');

insert into itaschedule.itagroup (active, end_date, start_date, students_count, title) values (true, '2016-09-23', '2016-09-20', 7, 'Java-193');
insert into itaschedule.itagroup (active, end_date, start_date, students_count, title) values (true, '2016-09-30', '2016-09-25', 6, 'Java-200');
insert into itaschedule.itagroup (active, end_date, start_date, students_count, title) values (true, '2016-09-30', '2016-09-15', 5, 'Java-228');
insert into itaschedule.itagroup (active, end_date, start_date, students_count, title) values (true, '2016-09-19', '2016-09-10', 8, 'Java-1488');

insert into itaschedule.permission (title) values ('Admin');
insert into itaschedule.permission (title) values ('Teacher');
insert into itaschedule.permission (title) values ('User');


insert into itaschedule.teacher (active, contact_info, email, full_name, password) values (true, 'some text', 'konon@gmail.com', 'Kononchuk Bohdan', '12345');
insert into itaschedule.teacher (active, contact_info, email, full_name, password) values (true, 'some text2', 'dima@gmail.com', 'Golodniy Dima', '23456');
insert into itaschedule.teacher (active, contact_info, email, full_name, password) values (true, 'some text3', 'ruslan@gmail.com', 'Cool Ruslan', '34567');
insert into itaschedule.teacher (active, contact_info, email, full_name, password) values (true, 'some text4', 'marian@gmail.com', 'Hiroku Marian', '45678');
insert into itaschedule.teacher (active, contact_info, email, full_name, password) values (true, 'some text5', 'bodya@gmail.com', 'Drink Bodya', '56789');

INSERT INTO `itaschedule`.`teacher_permissions` (`teacher`, `permission`) VALUES ('1', '1');
INSERT INTO `itaschedule`.`teacher_permissions` (`teacher`, `permission`) VALUES ('1', '2');
INSERT INTO `itaschedule`.`teacher_permissions` (`teacher`, `permission`) VALUES ('3', '3');
INSERT INTO `itaschedule`.`teacher_permissions` (`teacher`, `permission`) VALUES ('4', '1');
INSERT INTO `itaschedule`.`teacher_permissions` (`teacher`, `permission`) VALUES ('5', '1');

INSERT INTO `itaschedule`.`event_teachers` (`event`, `teacher`) VALUES ('1', '1');
INSERT INTO `itaschedule`.`event_teachers` (`event`, `teacher`) VALUES ('1', '2');
INSERT INTO `itaschedule`.`event_teachers` (`event`, `teacher`) VALUES ('2', '1');
INSERT INTO `itaschedule`.`event_teachers` (`event`, `teacher`) VALUES ('2', '2');
INSERT INTO `itaschedule`.`event_teachers` (`event`, `teacher`) VALUES ('2', '3');
INSERT INTO `itaschedule`.`event_teachers` (`event`, `teacher`) VALUES ('2', '3');
INSERT INTO `itaschedule`.`event_teachers` (`event`, `teacher`) VALUES ('4', '2');
INSERT INTO `itaschedule`.`event_teachers` (`event`, `teacher`) VALUES ('5', '3');

INSERT INTO `itaschedule`.`event_itagroups` (`event`, `itagroup`) VALUES ('1', '1');
INSERT INTO `itaschedule`.`event_itagroups` (`event`, `itagroup`) VALUES ('1', '2');
INSERT INTO `itaschedule`.`event_itagroups` (`event`, `itagroup`) VALUES ('1', '3');
INSERT INTO `itaschedule`.`event_itagroups` (`event`, `itagroup`) VALUES ('2', '1');
INSERT INTO `itaschedule`.`event_itagroups` (`event`, `itagroup`) VALUES ('2', '3');
INSERT INTO `itaschedule`.`event_itagroups` (`event`, `itagroup`) VALUES ('4', '1');
INSERT INTO `itaschedule`.`event_itagroups` (`event`, `itagroup`) VALUES ('5', '2');

INSERT INTO `itaschedule`.`itagroup_teachers` (`itagroup`, `teacher`) VALUES ('1', '1');
INSERT INTO `itaschedule`.`itagroup_teachers` (`itagroup`, `teacher`) VALUES ('2', '1');
INSERT INTO `itaschedule`.`itagroup_teachers` (`itagroup`, `teacher`) VALUES ('3', '1');
INSERT INTO `itaschedule`.`itagroup_teachers` (`itagroup`, `teacher`) VALUES ('4', '2');
