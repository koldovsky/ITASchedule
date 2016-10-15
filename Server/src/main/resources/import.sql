INSERT INTO city (name) VALUES ('Lviv');
INSERT INTO city (name) VALUES ('Kyiv');
INSERT INTO city (name) VALUES ('Kharkiv');
INSERT INTO city (name) VALUES ('Sofia');

INSERT INTO address (is_active, address, code_name, working_hours_end, working_hours_start, city_id) VALUES (true, 'Pasternaka 228', 'Lviv1', '12:00:00', '10:00:00', 1);
INSERT INTO address (is_active, address, code_name, working_hours_end, working_hours_start, city_id) VALUES (true, 'Smalstockoho 322', 'Lviv2', '22:00:00', '08:00:00', 1);
INSERT INTO address (is_active, address, code_name, working_hours_end, working_hours_start, city_id) VALUES (true, 'Heroiv Upa 12', 'K', '21:00:00', '11:00:00', 2);
INSERT INTO address (is_active, address, code_name, working_hours_end, working_hours_start, city_id) VALUES (true, 'Lubinska 164', 'lviv4', '16:00:00', '08:00:00', 1);

INSERT INTO event_type (color, type) VALUES ('red',   'training');
INSERT INTO event_type (color, type) VALUES ('green', 'demo');
INSERT INTO event_type (color, type) VALUES ('blue',  'lesson');

INSERT INTO room (is_active, number, address_id) VALUES (true, '1001', 1);
INSERT INTO room (is_active, number, address_id) VALUES (true, '1002', 1);
INSERT INTO room (is_active, number, address_id) VALUES (true, '1003', 1);
INSERT INTO room (is_active, number, address_id) VALUES (true, '1004', 1);
INSERT INTO room (is_active, number, address_id) VALUES (true, '2001', 2);
INSERT INTO room (is_active, number, address_id) VALUES (true, '2002', 2);
INSERT INTO room (is_active, number, address_id) VALUES (true, '2003', 2);

insert into user (is_active, contact_info, email, full_name, password) values (true, '80631488228', 'konon@gmailcom', 'Kononchuk Bohdan', '12345');
insert into user (is_active, contact_info, email, full_name, password) values (true, '80194519923', 'dima@gmailcom', 'Golodniy Dima', '23456');
insert into user (is_active, contact_info, email, full_name, password) values (true, '80961236549', 'ruslan@gmailcom', 'Cool Ruslan', '34567');
insert into user (is_active, contact_info, email, full_name, password) values (true, '80124578951', 'marian@gmailcom', 'Hiroku Marian', '45678');
insert into user (is_active, contact_info, email, full_name, password) values (true, '80501234569', 'bodya@gmailcom', 'Zog Bodya', '56789');

insert into itagroup (is_active, end_date, start_date, students_count, title, creator_id) values (true, '2016-09-23', '2016-09-20', 7, 'Java-193', 1);
insert into itagroup (is_active, end_date, start_date, students_count, title, creator_id) values (true, '2016-09-30', '2016-09-25', 6, 'Java-200', 2);
insert into itagroup (is_active, end_date, start_date, students_count, title, creator_id) values (true, '2016-09-30', '2016-09-15', 5, 'Java-228', 3);
insert into itagroup (is_active, end_date, start_date, students_count, title, creator_id) values (true, '2016-09-19', '2016-09-10', 8, 'Java-1488', 4);

INSERT INTO event (start_time, end_time, title, room_id, type_id, creator_id) VALUES ('2016-10-10 15:00:00', '2016-10-10 17:00:00', 'Event 1', 1, 1, 1);
INSERT INTO event (start_time, end_time, title, room_id, type_id, creator_id) VALUES ('2016-10-24 13:00:00', '2016-10-27 17:00:00', 'Event 2', 1, 1, 2);
INSERT INTO event (start_time, end_time, title, room_id, type_id, creator_id) VALUES ('2016-10-27 13:00:00', '2016-10-27 15:00:00', 'Event 3', 1, 1, 3);
INSERT INTO event (start_time, end_time, title, room_id, type_id, creator_id) VALUES ('2016-10-28 15:00:00', '2016-10-28 19:00:00', 'Event 4', 2, 1, 4);
INSERT INTO event (start_time, end_time, title, room_id, type_id, creator_id) VALUES ('2016-10-10 17:00:00', '2016-10-15 19:00:00', 'Event 5', 3, 2, 5);
INSERT INTO event (start_time, end_time, title, room_id, type_id, creator_id) VALUES ('2016-10-30 17:00:00', '2016-10-30 19:00:00', 'Event 6', 3, 2, 3);
INSERT INTO event (start_time, end_time, title, room_id, type_id, creator_id) VALUES ('2016-10-30 17:00:00', '2016-10-30 19:00:00', 'Event 7', 3, 2, 2);


INSERT INTO user_roles (user, role) VALUES (1, 1);
INSERT INTO user_roles (user, role) VALUES (1, 2);
INSERT INTO user_roles (user, role) VALUES (2, 0);
INSERT INTO user_roles (user, role) VALUES (3, 2);
INSERT INTO user_roles (user, role) VALUES (4, 1);
INSERT INTO user_roles (user, role) VALUES (5, 1);

INSERT INTO event_users (event, user) VALUES (1, 1);
INSERT INTO event_users (event, user) VALUES (1, 2);
INSERT INTO event_users (event, user) VALUES (2, 1);
INSERT INTO event_users (event, user) VALUES (2, 2);
INSERT INTO event_users (event, user) VALUES (2, 3);
INSERT INTO event_users (event, user) VALUES (2, 3);
INSERT INTO event_users (event, user) VALUES (4, 2);
INSERT INTO event_users (event, user) VALUES (5, 3);

INSERT INTO event_itagroups (event, itagroup) VALUES (1, 1);
INSERT INTO event_itagroups (event, itagroup) VALUES (1, 2);
INSERT INTO event_itagroups (event, itagroup) VALUES (1, 3);
INSERT INTO event_itagroups (event, itagroup) VALUES (2, 1);
INSERT INTO event_itagroups (event, itagroup) VALUES (2, 3);
INSERT INTO event_itagroups (event, itagroup) VALUES (4, 1);
INSERT INTO event_itagroups (event, itagroup) VALUES (5, 2);

INSERT INTO itagroup_users (itagroup, user) VALUES (1, 1);
INSERT INTO itagroup_users (itagroup, user) VALUES (2, 1);
INSERT INTO itagroup_users (itagroup, user) VALUES (3, 1);
INSERT INTO itagroup_users (itagroup, user) VALUES (4, 2);
