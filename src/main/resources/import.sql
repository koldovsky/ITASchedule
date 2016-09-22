INSERT INTO teacher (id, active, contact_info, email, full_name, password) VALUES (1, true, 'skype:koldovsky', 'koldovsky@gmail.com', 'Vyacheslav Koldovsky', '123');
INSERT INTO teacher (id, active, contact_info, email, full_name, password) VALUES (2, true, 'skype:biletsky', 'biletsky@gmail.com', 'Ostap Biletsky', '123');
INSERT INTO teacher (id, active, contact_info, email, full_name, password) VALUES (3, true, 'skype:kovalchuk', 'kovalchuk@gmail.com', 'Iruna Kovalchuk', '123');

INSERT INTO ita_group (id, title, students_count, active) VALUES (1, 'LV-193 Java', 9, true);
INSERT INTO ita_group (id, title, students_count, active) VALUES (2, 'LV-183 .Net', 9, true);
INSERT INTO ita_group (id, title, students_count, active) VALUES (3, 'LV-191 UI', 9, true);

INSERT INTO ita_group_teachers(ita_group, teacher) VALUES (1,1);
INSERT INTO ita_group_teachers(ita_group, teacher) VALUES (1,2);
INSERT INTO ita_group_teachers(ita_group, teacher) VALUES (2,3);
INSERT INTO ita_group_teachers(ita_group, teacher) VALUES (3,2);

INSERT INTO city(id, name) VALUES (1, 'Lviv');
INSERT INTO city(id, name) VALUES (2, 'Kiyv');
INSERT INTO city(id, name) VALUES (3, 'Ivano-Frankivsk');

INSERT INTO address(id, address, code_name, working_hours_start, working_hours_end, active, city_id) VALUES (1, 'Pasternaka 5', 'Lviv 4', '09:00', '21:00', true, 1);
INSERT INTO address(id, address, code_name, working_hours_start, working_hours_end, active, city_id) VALUES (2, 'Sadova 60', 'Lviv 1', '10:00', '22:00', true, 1);



INSERT INTO room(id, active, number, address_id) VALUES (1, true, 1001, 1);
INSERT INTO room(id, active, number, address_id) VALUES (2, true, 1002, 1);
INSERT INTO room(id, active, number, address_id) VALUES (3, true, 1003, 1);
INSERT INTO room(id, active, number, address_id) VALUES (4, true, 1004, 1);
INSERT INTO room(id, active, number, address_id) VALUES (5, true, 1005, 1);
INSERT INTO room(id, active, number, address_id) VALUES (6, true, 1006, 1);
INSERT INTO room(id, active, number, address_id) VALUES (7, true, 1007, 1);
INSERT INTO room(id, active, number, address_id) VALUES (8, true, 1008, 1);
INSERT INTO room(id, active, number, address_id) VALUES (9, true, 1009, 1);
INSERT INTO room(id, active, number, address_id) VALUES (10, true, 1010, 1);