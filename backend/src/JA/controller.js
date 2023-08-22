const pool = require('../../bd');
const query = require('./queries')


const getcoursedata = (req, res) => {
  pool.query(query.getcoursedata, (error, result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  })
};
const get_university_mark = (req, res) => {
  pool.query(query.get_university_mark, (error, result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  })
};




const addcoursdata = async (req, res) => {
  // Assuming the client is sending JSON data with a 'message' property
  const { course_code, degree_code, dept_code, year, semester, regulation, course_type, category, credit,
    ppw_lectur, ppw_tutorial, ppw_practical, course_title, course_subtype } = req.body;

  let roundedCredit = credit; // Initialize a new variable to store the rounded credit value

  if (credit === '1.5') {
    roundedCredit = Math.round(parseFloat(credit)); // Round the float value and convert it to an integer
  }

  try {
    // Perform database insert operation
    await pool.query(query.addcoursdata, [course_code, degree_code, dept_code, year, semester, regulation, course_type, category, roundedCredit, ppw_lectur, ppw_tutorial, ppw_practical, course_title, course_subtype]);

    // Send the response
    res.status(201).json({ status: 'Success', message: 'Data saved successfully.' });
  } catch (error) {
    console.error('Error saving data to database:', error);
    res.status(500).json({ status: 'Error', message: 'Failed to save data.' });
  }
};


// this set of code line for university mark data entry to db
const add_university_mark_data = async (req, res) => {

  const { degree_code,batch_no, dept_code, regulation_no, semester,course_code, reg_no,grade,section} = req.body;

  try {
    await pool.query(query.add_university_mark_data,[degree_code,batch_no, dept_code, regulation_no, semester,course_code, reg_no,grade,section]);
    res.status(201).json({ status: 'Success', message: 'Data saved successfully.' });
  } catch (error) {
    console.error('Error saving data to database:', error);
    res.status(500).json({ status: 'Error', message: 'Failed to save data.' });
  }
};

// const add_university_mark_data = async (req, res) => {
//   const {
//     degree_code,
//     batch_no,
//     dept_code,
//     regulation_no,
//     semester,
//     course_code,
//     reg_no,
//     grade,
//     section
//   } = req.body;

//   try {
//     const existingData =pool.query(query.check_existing_data,[degree_code, batch_no, dept_code, regulation_no, semester, course_code, reg_no] );

//     if (existingData.rows.length > 0) {
//       return res.status(409).json({ status: 'Error', message: 'Data already exists.' });
//     }

//     // Data doesn't exist, proceed to insert
//     await pool.query(query.add_university_mark_data, [degree_code, batch_no, dept_code, regulation_no, semester, course_code,reg_no,grade,section ]);

//    return res.status(201).json({ status: 'Success', message: 'Data saved successfully.' });
//   } catch (error) {
//     console.error('Error saving data to database:', error);

//     // Return the error message to the frontend
//     const errorMessage = 'Failed to save data. ' + error.message;
//     res.status(500).json({ status: 'Error', message: errorMessage });
//   }
// };

// const add_university_mark_data = async (req, res) => {
//   const {
//     degree_code,
//     batch_no,
//     dept_code,
//     regulation_no,
//     semester,
//     course_code,
//     reg_no,
//     grade,
//     section
//   } = req.body;
//   try {
//     const existingData =pool.query(query.check_existing_data,[degree_code, batch_no, dept_code, regulation_no, semester, course_code, reg_no] );

//     if (existingData.rows.length > 0) {
//       return res.status(409).json({ status: 'Error', message: 'Data already exists.' });
//     }

//     // Data doesn't exist, proceed to insert
//     else{ pool.query(query.add_university_mark_data, [degree_code, batch_no, dept_code, regulation_no, semester, course_code,reg_no,grade,section ]);

//    return res.status(201).json({ status: 'Success', message: 'Data saved successfully.' });
//     }
//   } 
//   catch (error) {
//     console.error('Error saving data to database:', error);

//     // Return the error message to the frontend
//     const errorMessage = 'Failed to save data. ' + error.message;
//     res.status(500).json({ status: 'Error', message: errorMessage });
//   }
// };

const add_erp_student_master = async (req, res) => {

  const { name,reg_no, reference_no, dept_code, section,degree_code, current_sem_no} = req.body;

  try {
    await pool.query(query.add_erp_student_master,[name,reg_no, reference_no, dept_code, section,degree_code, current_sem_no]);
    res.status(201).json({ status: 'Success', message: 'Data saved successfully.' });
  } catch (error) {
    console.error('Error saving data to database:', error);
    res.status(500).json({ status: 'Error', message: 'Failed to save data.' });
  }
};

//we add the data is in 12th_Stateboard_mark_table

const add_12th_Stateboard_mark = async (req, res) => {

  const { degree_code,batch_no,dept_code,education_type,year_of_passing,tamil,english,maths,physics,chemistry,biology,computer_science,total,percentage,cutoff} = req.body;

  try {
    await pool.query(query.add_student_12th_mark,[degree_code,batch_no,dept_code,education_type,year_of_passing,tamil,english,maths,physics,chemistry,biology,computer_science,total,percentage,cutoff]);
    res.status(201).json({ status: 'Success', message: 'Data saved successfully.' });
  } catch (error) {
    console.error('Error saving data to database:', error);
    res.status(500).json({ status: 'Error', message: 'Failed to save data.' });
  }
}


//we the data is in student_12_mark_table

const add_12th_icse_cbsc_mark = async (req, res) => {

  const {degree_code,batch_no,dept_code,education_type,year_of_passing,language1,language1_mark,language2,language2_Mark,english,maths,physics,chemistry,biology,computer_science,total,percentage,cutoff} = req.body;

  try {
    await pool.query(query.add_12th_icse_cbsc_mark,[degree_code,batch_no,dept_code,education_type,year_of_passing,language1,language1_mark,language2,language2_Mark,english,maths,physics,chemistry,biology,computer_science,total,percentage,cutoff]);
    res.status(201).json({ status: 'Success', message: 'Data saved successfully.' });
  } catch (error) {
    console.error('Error saving data to database:', error);
    res.status(500).json({ status: 'Error', message: 'Failed to save data.' });
  }
}


//we add the data is in 12th_vocational_mark

const add_12th_vocational_mark = async (req, res) => {

  const {degree_code,batch_no,dept_code,education_type,year_of_passing,language,language_mark,maths,physics,chemistry,voc_theory_name,voc_theory_mark,voc_practical_name,voc_practical_mark,total,percentage,cutoff} = req.body;

  try {
    await pool.query(query.add_12th_vocational_mark,[degree_code,batch_no,dept_code,education_type,year_of_passing,language,language_mark,maths,physics,chemistry,voc_theory_name,voc_theory_mark,voc_practical_name,voc_practical_mark,total,percentage,cutoff]);
    res.status(201).json({ status: 'Success', message: 'Data saved successfully.' });
  } catch (error) {
    console.error('Error saving data to database:', error);
    res.status(500).json({ status: 'Error', message: 'Failed to save data.' });
  }
}

module.exports = {
  getcoursedata,
  addcoursdata,
  add_university_mark_data,
  get_university_mark,
  add_erp_student_master,
  add_12th_Stateboard_mark,
  add_12th_icse_cbsc_mark,
  add_12th_vocational_mark
}

