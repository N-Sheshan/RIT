import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ThisReceiver } from '@angular/compiler';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-university-marks',
  templateUrl: './university-marks.component.html',
  styleUrls: ['./university-marks.component.css']
})
export class UniversityMarksComponent implements OnInit {

  constructor(private http: HttpClient) { localStorage.setItem('grade', JSON.stringify({ 'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5 })); }
  // jsonString = ;
  grade: { [key: string]: number } = { 'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'RA': 0 }
  gpa: number = 0;
  cgpa: number = 0;
  C_total_credit: number = 0;
  C_total_credit_earned: number = 0;
  arrear_count = 0;

  ngOnInit() {
  }
  table = false
  valuesArray: Record<string, any> = {};
  University_Marks_data = {
    degree_code: 2,
    batch_no: null,
    dept_code: 16,
    regulation_no: null,
    semester: null,
    course_code: '',
    reg_no: '',
    grade: '',
    section: '',
    year_passing: '',
    result: '',
    no_attempts: 1
  }
  ans: number = 0;
  // Array to store course, grade, and additional data
  courseGradeData: {
    degree_code: number | null;
    batch_no: number | null;
    dept_code: number | null;
    regulation_no: number | null;
    courseCode: string;
    semester: number | null | any,
    reg_no: string;
    grade: string;
    section: string;
    year_passing: string;
    result: string;
    no_attempts: number | null;
  }[] = [];
  // Function to add a new row to the array
  addCourseRow() {
    this.courseGradeData = [];

    // Check if this.sample is an array
    if (Array.isArray(this.sample)) {
        for (let count of this.sample) {
            this.courseGradeData.push({
                degree_code: 2,
                batch_no: Number(this.University_Marks_data.batch_no),
                dept_code: this.University_Marks_data.dept_code,
                regulation_no: Number(this.University_Marks_data.regulation_no),
                courseCode: '',
                semester: null,
                reg_no: this.University_Marks_data.reg_no,
                grade: '',
                section: this.University_Marks_data.section,
                year_passing: this.University_Marks_data.year_passing,
                result: '',
                no_attempts: 0
            });
        }
        this.table = true;
    } else {
        console.error("this.sample is not an array");
    }
}


  // Function to save data to local storage
  saveUserDataToLocalStorage(): void {
    // console.log("this is localstorage");

    localStorage.setItem('UniversityMarksData', JSON.stringify(this.courseGradeData));
  }

  // Function to load data from local storage
  loadUserDataFromLocalStorage(): void {
    const userDataString = localStorage.getItem('UniversityMarksData');
    if (userDataString) {
      this.courseGradeData = JSON.parse(userDataString);
    }
  }
  semesterCredits: { [key: number]: number } = {};
  async To_DB() {
    // console.log(this.courseGradeData);
    for (let i = 0; i < this.sample.length; i++) {
      // Initialize this.courseGradeData[i] as an object
      this.courseGradeData[i] = this.courseGradeData[i] || {};
      this.courseGradeData[i].courseCode = this.sample[i].course_code;
      this.courseGradeData[i].semester = this.sample[i].semester;
      let grade = this.courseGradeData[i].grade; // replace 'DEFAULT_GRADE' with a default grade if needed

      let sample_grade = this.grade[grade] * this.sample[i].credit;
      if (this.courseGradeData[i].semester !== parseInt(String(this.University_Marks_data.semester), 10)) {
        if (!this.semesterCredits[this.courseGradeData[i].semester]) {
          this.semesterCredits[this.courseGradeData[i].semester] = sample_grade;

        } else { this.semesterCredits[this.courseGradeData[i].semester] += sample_grade; }
      }

      else {
        if (!this.semesterCredits[this.courseGradeData[i].semester]) {
          this.semesterCredits[this.courseGradeData[i].semester] = sample_grade;
          // console.log(' current semester disneary',this.semesterCredits);
        } else {
          this.semesterCredits[this.courseGradeData[i].semester] += sample_grade;
        }

        this.C_total_credit += this.sample[i].credit;
        this.C_total_credit_earned += this.grade[grade] * this.sample[i].credit;
        this.arrear_count += (grade === 'RA') ? 1 : 0;
        // console.log('current semester disneary',this.semesterCredits);
      }

      // console.log('main semester disneary', this.semesterCredits, '\nC_total_credit', this.C_total_credit, '\nC_total_credit_earned', this.C_total_credit_earned);

      this.courseGradeData[i].result = (grade === 'RA') ? 'fail' : 'pass';

      // console.log(this.courseGradeData[i].courseCode, '==>', this.courseGradeData[i].result);
    }
    // console.log('after for loop', this.courseGradeData);
    try {
      // Run the first function
      for (const semester in this.semesterCredits) {
        let semesterNumber = +semester;

        try {
          if (this.semesterCredits.hasOwnProperty(semester) && semesterNumber === parseInt(String(this.University_Marks_data.semester), 10)) {
            // Call a function based on the dictionary key
            let current_sem_gpa = this.C_total_credit_earned / this.C_total_credit;
            const result = await this.get_cgpa_gpa(semesterNumber).toPromise();

            // console.log('Total Credit:', result.t_cridet);
            // console.log('Total Credit Earned:', result.t_c_earned);

            // // Assuming this.gpa and total_cridet are defined somewhere
            // console.log(this.C_total_credit_earned, result.t_c_earned, this.C_total_credit, result.t_cridet);

            let current_sem_cgpa = (this.C_total_credit_earned + result.t_c_earned) / (this.C_total_credit + result.t_cridet);

            // After the first function is completed, run the second function
            await this.add_cgpa_gpa(current_sem_gpa, current_sem_cgpa, this.C_total_credit, this.C_total_credit_earned, semesterNumber);
            alert(`current semester : ${semesterNumber}\n GPA : ${current_sem_gpa.toFixed(2)}\n CGPA : ${current_sem_cgpa.toFixed(2)}\n\n If any correction contact us`);
            // 2('************Current Semester:', this.University_Marks_data.semester);
          } else {
            if (this.semesterCredits.hasOwnProperty(semester)) {
              const result = await this.get_cgpa_gpa(semesterNumber).toPromise();
              // console.log('from database', result);
              // console.log('this.semesterCredits[semester]',this.semesterCredits[semester]);

              let arrear_gpa = (this.semesterCredits[semester] + result.sem_c_earned) / result.sem_cridet;
              let arrear_cgpa = (result.t_c_earned + this.semesterCredits[semester]) / result.t_cridet;

              // After the first function is completed, run the second function
              // console.log('arrear cgpa updating data',arrear_gpa, arrear_cgpa, result.t_cridet, result.sem_c_earned + this.semesterCredits[semester], semesterNumber);

              await this.add_cgpa_gpa(arrear_gpa, arrear_cgpa, result.t_cridet, result.sem_c_earned + this.semesterCredits[semester], semesterNumber);
              alert(`arrear semester : ${semesterNumber}\nUPDATED GPA : ${arrear_gpa.toFixed(2)}\nUPDATED CGPA : ${arrear_cgpa.toFixed(2)}\n\n If any correction contact us`);
              // console.log('************not a current sem');
            }
          }
        } catch (error) {
          console.error('An error occurred in the loop iteration:', error);
          // Handle the error if needed
        }
      }

      console.log('Both functions completed.');
    } catch (error) {
      console.error('An error occurred:', error);
    }
    const universityMarkEndpoint = 'http://172.16.71.2:9090/api/v1/JA/university_mark';
    this.http.post(universityMarkEndpoint, this.courseGradeData)
      .subscribe(
        (response: any) => {
          alert('Data saved successfully...');


        },
        (error: any) => {
          console.error('Error submitting form:', error);
          if (error.error && error.error.error === 'Duplicate key violation. The record already exists.') {
            alert('There was an error inserting the data. Please check the entries.');
          } else {
            alert('The record already exists.');
          }
        }
      );


    this.courseGradeData = [];
    this.University_Marks_data = {
      degree_code: 2,
      batch_no: null,
      dept_code: 16,
      regulation_no: null,
      semester: null,
      course_code: '',
      reg_no: '',
      grade: '',
      section: '',
      year_passing: '',
      result: '',
      no_attempts: 1
    };
    this.table = false;
    this.gpa = 0;
    this.cgpa = 0;
    this.C_total_credit = 0;
    this.C_total_credit_earned = 0;
    this.arrear_count = 0;
    this.isSecondInputEnabled = false;
    this.isThirdInputEnabled = false;
    this.isFourInputEnabled = false;
    this.isFiveInputEnabled = false;
    this.issixInputEnabled = false;
    this.semesterCredits = {}
  }
  sample: any;
  get_course_code() {
    const batch_no: any = this.University_Marks_data.batch_no;
    const data = {
      degree_code: this.University_Marks_data.degree_code,
      batch_no: batch_no.toString(),
      dept_code: this.University_Marks_data.dept_code,
      regulation: this.University_Marks_data.regulation_no,
      semester: Number(this.University_Marks_data.semester),
      reg_no: this.University_Marks_data.reg_no
    };
    // console.log("for testing", data);

    this.valuesArray = []
    this.http.post('http://172.16.71.2:9090/api/v1/JA/university_course_code', data)
      .subscribe((response: any) => {
        // console.log(response);
        this.sample = response;
        for (const key in response) {
          // console.log(response[key]["course_code"]);
          this.valuesArray[response[key]["course_code"]] = response[key]["credit"]
        }
        // Store the valuesArray in sessionStorage after it's populated
        sessionStorage.setItem("course_code", JSON.stringify(this.valuesArray));
      });
  }

  add_cgpa_gpa(gpa: number, cgpa: number, total_credit: number, total_credit_earned: number, semesterNumber: number): void {
    // console.log('Checking GPA and CGPA from function:', gpa, cgpa);

    const details = {
      degree_code: this.University_Marks_data.degree_code,
      batch_no: this.University_Marks_data.batch_no,
      dept_code: this.University_Marks_data.dept_code,
      regulation_no: this.University_Marks_data.regulation_no,
      semester: semesterNumber,
      reg_no: this.University_Marks_data.reg_no.toString(),
      gpa: parseFloat(gpa.toFixed(2)),
      cgpa: parseFloat(cgpa.toFixed(2)),
      total_credit_earned: total_credit_earned,
      total_credit: total_credit,
      history_of_arrear: (this.arrear_count > 0 && semesterNumber === parseInt(String(this.University_Marks_data.semester), 10)) ? 'yes' : 'no',
      arrear_count: this.arrear_count

    };

    // console.log('no2:',details);

    const addStudentGpaCgpaEndpoint = 'http://172.16.71.2:9090/api/v1/JA/add_student_gpa_cgpa';

    this.http.post(addStudentGpaCgpaEndpoint, details)
      .subscribe(
        (response: any) => {
          console.log('successfuly add gpa and cpga')
        },
        (error: any) => {
          console.error('Error adding student GPA and CGPA:', error);
          // Handle error if needed
        }
      );
  }


  get_cgpa_gpa(semesterNumber: number): Observable<any> {
    const details = {
      degree_code: this.University_Marks_data.degree_code,
      batch_no: this.University_Marks_data.batch_no,
      dept_code: this.University_Marks_data.dept_code,
      regulation_no: this.University_Marks_data.regulation_no,
      semester: semesterNumber,
      reg_no: this.University_Marks_data.reg_no.toString(),
    };

    // console.log('no:1',semesterNumber);

    return this.http.post('http://172.16.71.2:9090/api/v1/JA/get_student_gpa_cgpa', details).pipe(
      map((response: any) => {
        // console.log('cgpa ==> ' + response);
        let t_cridet = 0;
        let t_c_earned = 0;
        let sem_cridet = 0;
        let sem_c_earned = 0;
        // console.log('response',response);


        for (let key in response) {

          console.log('checking sem', response[key]['semester'], semesterNumber, typeof response[key]['semester'], typeof semesterNumber);

          if (response[key]['semester'] === semesterNumber) {
            sem_cridet = response[key]['total_credit'];
            sem_c_earned = response[key]['total_credit_earned'];
            // console.log('for checking get_cgpa',response[key]['total_credit'],response[key]['total_credit_earned']);

          }
          t_cridet += response[key]['total_credit'];
          t_c_earned += response[key]['total_credit_earned'];
        }

        return { t_cridet, t_c_earned, sem_cridet, sem_c_earned };
      }),
      catchError((error: any) => {
        console.error('Error:', error);
        return []; // Return an empty array or handle the error accordingly
      })
    );
  }

  isSecondInputEnabled = false;
  isThirdInputEnabled = false;
  isFourInputEnabled = false;
  isFiveInputEnabled = false;
  issixInputEnabled = false;
  enableNextInput(step: number): void {
    // console.log(`Step ${step} selected.`);
    switch (step) {
      case 1:
        this.isSecondInputEnabled = true;
        break;
      case 2:
        this.isThirdInputEnabled = true;
        break;
      case 3:
        this.isFourInputEnabled = true;
        break;
      case 4:
        this.isFiveInputEnabled = true;
        break;
      case 5:
        this.issixInputEnabled = true;
        break;
      // Add cases for other steps as needed
      default:
        break;
    }
  }


}
