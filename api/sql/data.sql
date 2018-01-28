INSERT INTO user
    (user_name,user_email,user_address1,user_address2,user_address3,user_role,user_password,user_phone)
VALUES
    ("jayani","jayani@gmail.com","matara1","kanaththagoda1","kamburugamuwa1",'ADMIN',"abcd",0767332406),
    ("jayani","jayani","matara1","kanaththagoda1","kamburugamuwa1",'ADMIN',"123",0767332406),
    ("sumudini","sumudini@gmail.com","matara2","kanaththagoda2","kamburugamuwa2",'USER',"efgh",0767332406),
    ("dileepa","dileepa@gmail.com","matara3","kanaththagoda3","kamburugamuwa3",'ADMIN',"ijkl",0767332406),
    ("chandima","chandima@gmail.com","matara4","kanaththagoda4","kamburugamuwa4",'USER',"mnop",0767332406),
    ("dilip","dilip@gmail.com","matara5","kanaththagoda5","kamburugamuwa5",'USER',"qrst",0767332406),
    ("sumudi","sumudi@gmail.com","matara6","kanaththagoda6","kamburugamuwa6",'USER',"uvwx",0767332406),
    ("manusha","manusha@gmail.com","matara7","kanaththagoda7","kamburugamuwa7",'USER',"yzab",0767332406),
    ("ashen","ashen@gmail.com","matara8","kanaththagoda8","kamburugamuwa8",'USER',"cdef",0767332406),
    ("baba","baba@gmail.com","matara9","kanaththagoda9","kamburugamuwa9",'USER',"ghij",0767332406),
    ("anne","anne@gmail.com","matara10","kanaththagoda10","kamburugamuwa11",'USER',"klmn",0767332406);


INSERT INTO job
	(job_address,job_discription,job_status,user_id)
VALUES
	("engineerAddress1","abcd",'ENQUIRY',1),
	("engineerAddress2","abcd",'COMPLETE',2),
	("engineerAddress3","abcd",'ISSUED',1),
	("engineerAddress4","abcd",'ACCEPTED',2),
	("engineerAddress5","abcd",'COMMENCED',3),
	("engineerAddress6","abcd",'SCHEDULED',1),
	("engineerAddress7","abcd",'ENQUIRY',2),
	("engineerAddress8","abcd",'SCHEDULED',1),
	("engineerAddress9","abcd",'ISSUED',4),
	("engineerAddress10","abcd",'COMPLETE',1),
	("engineerAddress11","abcd",'COMMENCED',2),
	("engineerAddress12","abcd",'ENQUIRY',3),
	("engineerAddress13","abcd",'ISSUED',1),
	("engineerAddress14","abcd",'SCHEDULED',2),
	("engineerAddress15","abcd",'ACCEPTED',5),
	("engineerAddress16","abcd",'ISSUED',1),
	("engineerAddress17","abcd",'SCHEDULED',7),
	("engineerAddress18","abcd",'ACCEPTED',8),
	("engineerAddress19","abcd",'COMMENCED',2),
	("engineerAddress20","abcd",'ACCEPTED',1),
	("engineerAddress21","abcd",'ISSUED',3),
	("engineerAddress22","abcd",'ISSUED',1),
	("engineerAddress23","abcd",'ISSUED',4),
	("engineerAddress24","abcd",'COMMENCED',2),
	("engineerAddress25","abcd",'COMPLETE',1),
	("engineerAddress26","abcd",'ACCEPTED',3),
	("engineerAddress27","abcd",'ISSUED',2),
	("engineerAddress28","abcd",'CANCELLED',1),
	("engineerAddress29","abcd",'COMMENCED',2),
	("engineerAddress30","abcd",'SCHEDULED',4),
	("engineerAddress31","abcd",'COMPLETE',1),
	("engineerAddress32","abcd",'ACCEPTED',3),
	("engineerAddress33","abcd",'SCHEDULED',1);

INSERT INTO note
	(note_date,note_time,note_description,job_id)
VALUES
	('2012-05-06' , '03:12:11' ,"abcd1" ,3),
	('2017-06-04' , '11:23:10' ,"abcd2" ,1),
	('2018-01-06' , '11:12:11' ,"abcd3" ,2),
	('2011-05-01' , '03:10:11' ,"abcd4" ,3),
	('2014-06-04' , '11:12:10' ,"abcd5" ,2),
	('2010-05-01' , '11:23:10' ,"abcd6" ,3),
	('2003-06-01' , '03:30:11' ,"abcd7" ,1),
	('2013-06-05' , '11:10:11' ,"abcd8" ,1),
	('2014-04-06' , '11:12:10' ,"abcd9" ,3),
	('2015-01-01' , '03:23:11' ,"abcd10" ,2),
	('2016-06-04' , '11:10:10' ,"abcd11" ,1),
	('2017-04-05' , '11:12:10' ,"abcd12" ,3),
	('2018-01-05' , '11:11:26' ,"abcd13" ,1),
	('2012-06-05' , '03:23:26' ,"abcd14" ,1),
	('2012-04-05' , '11:12:10' ,"abcd15" ,3),
	('2012-01-04' , '11:26:10' ,"abcd16" ,1),
	('2012-05-01' , '11:10:26' ,"abcd17" ,1),
	('2012-01-04' , '03:23:10' ,"abcd18" ,3),
	('2012-04-06' , '11:12:10' ,"abcd19" ,2),
	('2012-01-01' , '11:26:10' ,"abcd20" ,3),
	('2012-04-04' , '03:23:10' ,"abcd21" ,2);
