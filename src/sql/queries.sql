/*For select all*/
select* from user;
select* from job;
select* from note;

/*Quesrie in user table*/
/*For select all*/
select* from user;

/*For select rows with given user_id*/
SELECT * FROM user
WHERE user_id = 6;

/*get user_name by user_id*/

SELECT user_name FROM user
WHERE user_id = 5;

/*get user_role by user_id*/
SELECT user_role FROM user
WHERE user_id = 3;

/*Get all jobs by user_id*/
SELECT *from job
WHERE user_id = 3
ORDER BY job_id;

/*get user_name,user_role,job_id,job_discription by user_id*/
SELECT u.user_id, u.user_name,u.user_role,j.job_id,j.job_discription FROM user AS u ,job as j
WHERE u.user_id = j.user_id AND u.user_id = 2 ;

/*get  user_name,user_role,job_id,job_discription,note_id,note_date by user_id*/
SELECT u.user_id, u.user_name,u.user_role,j.job_id,j.job_discription,n.note_id,n.note_date FROM user AS u ,job as j,note AS n
WHERE u.user_id = j.user_id AND u.user_id = 1 AND j.job_id = n.job_id;


/*get all notes details by user_id*/
SELECT n.note_id,n.note_date FROM user As u, note AS n, job As j
WHERE u.user_id = 1 AND u.user_id = j.user_id AND j.job_id = n.job_id;
