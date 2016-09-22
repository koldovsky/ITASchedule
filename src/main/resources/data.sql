INSERT INTO `itaschedule`.`city` (`name`) VALUES ('Lviv');
INSERT INTO `itaschedule`.`city` (`name`) VALUES ('Kyiv');
# INSERT INTO `itaschedule`.`address` (`address`, `code_name`, `working_hours_end`, `working_hours_start`, `city_id`) VALUES ('111', '1111', '111', '111', '2');
INSERT INTO `itaschedule`.`address` (`active`, `address`, `code_name`, `working_hours_end`, `working_hours_start`, `city_id`) VALUES (true, 'address1', '1', '8-22', '8-22', '1');
INSERT INTO `itaschedule`.`address` (`active`, `address`, `code_name`, `working_hours_end`, `working_hours_start`, `city_id`) VALUES (true, 'address2', '1', '8-22', '8-22', '1');
INSERT INTO `itaschedule`.`address` (`active`, `address`, `code_name`, `working_hours_end`, `working_hours_start`, `city_id`) VALUES (true, 'address3', '1', '8-22', '8-22', '2');
INSERT INTO `itaschedule`.`address` (`active`, `address`, `code_name`, `working_hours_end`, `working_hours_start`, `city_id`) VALUES (true, 'address4', '1', '8-22', '8-22', '1');

INSERT INTO `itaschedule`.`event_type` (`color`, `type`) VALUES ('red',   'type1');
INSERT INTO `itaschedule`.`event_type` (`color`, `type`) VALUES ('green', 'type2');
INSERT INTO `itaschedule`.`event_type` (`color`, `type`) VALUES ('blue',  'type3');

INSERT INTO `itaschedule`.`room` (`active`, `number`, `address_id`) VALUES (true, '1001', '1');
INSERT INTO `itaschedule`.`room` (`active`, `number`, `address_id`) VALUES (true, '1002', '1');
INSERT INTO `itaschedule`.`room` (`active`, `number`, `address_id`) VALUES (true, '1003', '1');
INSERT INTO `itaschedule`.`room` (`active`, `number`, `address_id`) VALUES (true, '1004', '2');

INSERT INTO `itaschedule`.`event` (`end_time`, `start_time`, `title`, `room_id`, `type_id`) VALUES ('2016-09-23 15:00:00', '2016-09-23 17:00:00', 'Event 1', '1', '1');
INSERT INTO `itaschedule`.`event` (`end_time`, `start_time`, `title`, `room_id`, `type_id`) VALUES ('2016-09-24 13:00:00', '2016-09-24 17:00:00', 'Event 2', '1', '1');
INSERT INTO `itaschedule`.`event` (`end_time`, `start_time`, `title`, `room_id`, `type_id`) VALUES ('2016-09-27 13:00:00', '2016-09-27 15:00:00', 'Event 3', '1', '1');
INSERT INTO `itaschedule`.`event` (`end_time`, `start_time`, `title`, `room_id`, `type_id`) VALUES ('2016-09-28 15:00:00', '2016-09-28 19:00:00', 'Event 4', '2', '1');
INSERT INTO `itaschedule`.`event` (`end_time`, `start_time`, `title`, `room_id`, `type_id`) VALUES ('2016-09-30 17:00:00', '2016-09-30 19:00:00', 'Event 5', '3', '2');
