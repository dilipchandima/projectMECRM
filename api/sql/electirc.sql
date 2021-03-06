drop database if exists electric;
create database electric;
use electric;
drop table if exists user;
create table user(
	user_id int not null AUTO_INCREMENT,
	user_name varchar(255),
	user_email varchar(255),
	user_address1 varchar(255),
	user_address2 varchar(255),
	user_address3 varchar(255),
	user_profile_picture varchar(1000),
  user_password  varchar(40),
  user_phone varchar(40),
	user_role enum ('ADMIN','USER') DEFAULT 'ADMIN' NOT NULL,
	PRIMARY KEY(user_id)
);

drop table if exists job;
create table job(
	job_id int not null AUTO_INCREMENT,
	job_address varchar(255),
	job_discription varchar(250),
	job_phone varchar(250),
	job_status enum('ENQUIRY','QUOTATION','SCHEDULED','COMMENCED', 'COMPLETED', 'CANCELLED') not null,
	user_id int,
	job_accepted varchar(2),
	PRIMARY KEY(job_id),
	FOREIGN KEY (user_id) REFERENCES user(user_id)
);

drop table if exists note;
create table note(
	note_id int not null AUTO_INCREMENT,
	note_date DATE,
	note_time TIME,
	note_description varchar(255),
	job_id int,
	note_role varchar(5),
	PRIMARY KEY(note_id),
	FOREIGN KEY (job_id) REFERENCES job(job_id)
);

drop table if exists super_keys;
create table super_keys(
	keys_id int not null AUTO_INCREMENT,
	keys_super varchar(255),
	PRIMARY KEY(keys_id)
);

INSERT INTO super_keys (keys_super) VALUES ("$upp#r^dm!nK@y");
