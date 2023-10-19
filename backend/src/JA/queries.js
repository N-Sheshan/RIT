const getcoursedata = 'select * from course_master';
const get_university_mark = 'select * from university_marks';
const checkcourse_code = 'select s from course_master where course_master.course_code = $1';
const addcoursdata = 'insert into course_master (course_code,degree_code,dept_code,year,semester,regulation,course_type,category,credit,ppw_lectur,ppw_tutorial,ppw_practical,course_title,course_subtype) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14);';
const add_university_mark_data = "insert into university_marks (degree_code,batch_no, dept_code, regulation_no, semester,course_code, reg_no,grade,section,year_passing,result,no_attempts) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);"
const add_erp_student_master = "insert into erp_student_master (name,reg_no, reference_no, dept_code, section,degree_code, current_sem_no) values ($1,$2,$3,$4,$5,$6,$7);"
const add_student_12th_mark = "insert into student_12th_marks_stateboard (degree_code,batch_no,dept_code,education_type,year_of_passing,tamil,english,maths,physics,chemistry,biology,computer_science,total,percentage,cutoff) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15);"
const add_12th_icse_cbsc_mark  = "insert into student_12th_marks_icse_cbse (degree_code,batch_no,dept_code,education_type,year_of_passing,language1,language1_mark,language2,language2_Mark,english,maths,physics,chemistry,biology,computer_science,total,percentage,cutoff) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18);"
const add_12th_vocational_mark  = "insert into student_12th_marks_voc (degree_code,batch_no,dept_code,education_type,year_of_passing,language,language_mark,maths,physics,chemistry,voc_theory_name,voc_theory_mark,voc_practical_name,voc_practical_mark,total,percentage,cutoff) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18);"
const login ="SELECT role FROM user_new WHERE username = $1 AND password = $2";
const get_university_course_code =`SELECT course_code, credit, course_title ,semester
FROM course_master 
WHERE course_code IN (
  SELECT course_code 
  FROM course_master 
  WHERE 
    semester = $3 
    AND degree_code = $1
    AND dept_code = $2
    AND regulation = $5 
    AND batch LIKE $8
  UNION 
  SELECT course_code 
  FROM university_marks 
  WHERE 
    degree_code = $1
    AND batch_no = $7
    AND dept_code = $2
    AND regulation_no = $6
    AND result = $9 
    AND reg_no = $4 
    AND semester < $3
);`
const get_student_gpa_cgpa = "select semester,gpa, total_credit_earned,total_credit from student_gpa_cgpa where degree_code=$1 and batch_no=$2 and dept_code=$3 and regulation_no=$4 and semester < $5 and reg_no=$6; "
const add_student_gpa_cgpa='insert into student_gpa_cgpa ( degree_code,batch_no,dept_code,regulation_no,semester,reg_no, gpa ,cgpa ,total_credit_earned,total_credit,history_of_arrear,arrear_count) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);'
module.exports = {
    getcoursedata,
    addcoursdata,
    checkcourse_code,
    add_university_mark_data,
    get_university_mark,
    add_erp_student_master,
    add_student_12th_mark,
    add_12th_icse_cbsc_mark,
    add_12th_vocational_mark,
    login,
    get_university_course_code,
    add_student_gpa_cgpa,
    get_student_gpa_cgpa
}

// `SELECT course_code,credit,course_title FROM course_master WHERE semester = $1 AND regulation = $2 AND batch  LIKE $3` 