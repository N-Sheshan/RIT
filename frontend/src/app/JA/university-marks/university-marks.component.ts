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

  constructor(private http: HttpClient) {localStorage.setItem('grade', JSON.stringify({'O': 10,'A+': 9,'A': 8,'B+': 7,'B': 6,'C': 5}));}
  // jsonString = ;
  grade:{ [key: string]: number }={'O': 10,'A+': 9,'A': 8,'B+': 7,'B': 6,'C': 5,'RA':0}
  gpa: number = 0;
  cgpa: number = 0;
  C_total_credit:number = 0;
C_total_credit_earned:number = 0;
arrear_count=0;

  ngOnInit() {
  }
  table=false
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
    year_passing:'',
    result:'',
    no_attempts:null
  }
  ans:number=0;
  // Array to store course, grade, and additional data
  courseGradeData: {
    degree_code: number | null;
    batch_no: number | null;
    dept_code: number | null;
    regulation_no: number |null;
    courseCode: string;
    semester: number | null,  
    reg_no: string;
    grade: string;
    section: string;
    year_passing:string;
    result:string;
    no_attempts:number | null;

  }[] = [];
  // Function to add a new row to the array
  addCourseRow() {
    
    
    this.courseGradeData=[]
    // console.log("main loop-------------------",this.ans+=1);
    for (let count of this.sample){
      this.courseGradeData.push({
        degree_code: 2,
        batch_no: Number(this.University_Marks_data.batch_no),
        dept_code: this.University_Marks_data.dept_code,
        regulation_no: Number(this.University_Marks_data.regulation_no),
        courseCode: '',
        semester:Number(this.University_Marks_data.semester),
        reg_no: this.University_Marks_data.reg_no,
        grade: '',
        section: this.University_Marks_data.section,
        year_passing:'nov-dec 20??',
        result:'',
        no_attempts:0
      });
    }
   this.table=true
  }

  // Function to save data to local storage
  saveUserDataToLocalStorage(): void {
    console.log("this is localstorage");
    
    localStorage.setItem('UniversityMarksData', JSON.stringify(this.courseGradeData));
  }

  // Function to load data from local storage
  loadUserDataFromLocalStorage(): void {
    const userDataString = localStorage.getItem('UniversityMarksData');
    if (userDataString) {
      this.courseGradeData = JSON.parse(userDataString);
    }
  }

  async To_DB(){

  
    for (let i = 0; i < this.sample.length; i++) {
      this.courseGradeData[i].courseCode = this.sample[i].course_code;
      let grade = this.courseGradeData[i].grade;
      this.C_total_credit += this.sample[i].credit;
      this.C_total_credit_earned += this.grade[grade] * this.sample[i].credit;
      this.courseGradeData[i].result = (grade === 'RA') ? 'fail' : 'pass';
      this.arrear_count += (grade === 'RA') ? 1 : 0;
      console.log(this.courseGradeData[i].courseCode,'==>', this.courseGradeData[i].result);
    }
    this.gpa = this.C_total_credit_earned / this.C_total_credit;
    try {
      // Run the first function
      const result = await this.get_cgpa_gpa().toPromise();
    
      console.log('Total Credit:', result.t_cridet);
      console.log('Total Credit Earned:', result.t_c_earned);
    
      // Assuming this.gpa and total_cridet are defined somewhere
      console.log(this.C_total_credit_earned, result.t_c_earned, this.C_total_credit , result.t_cridet);
    
      this.cgpa = (this.C_total_credit_earned + result.t_c_earned) / (this.C_total_credit + result.t_cridet);
     
    
      console.log('This is the total cgpa:', this.cgpa);
    
      // After the first function is completed, run the second function
      await this.add_cgpa_gpa(this.C_total_credit_earned, this.C_total_credit);
    
      console.log('Both functions completed.');
    } catch (error) {
      console.error('An error occurred:', error);
    }
        // console.log("Sum of all credits: " + total_credit);
    // console.log("Sum of earned credits: " + total_credit_earned);

    
    // console.log(`Sum of credits: ${total_credit}\nGPA: ${this.gpa}`);
  
   
   
   
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
      year_passing:'',
    result:'',
    no_attempts:null
    };
    this.table = false;
    this.gpa = 0;
    this.cgpa = 0;
    this.C_total_credit = 0;
  this.C_total_credit_earned = 0;
  }
  sample: any;
  get_course_code() { 
    const batch_no:any = this.University_Marks_data.batch_no;    
    const data = {
      degree_code:this.University_Marks_data.degree_code,
      batch_no:batch_no.toString(),
      dept_code:this.University_Marks_data.dept_code,
      regulation: this.University_Marks_data.regulation_no,
      semester:Number(this.University_Marks_data.semester),
      reg_no:this.University_Marks_data.reg_no 
    };
    console.log("for testing",data);
    
    this.valuesArray = []
    this.http.post('http://172.16.71.2:9090/api/v1/JA/university_course_code', data)
      .subscribe((response: any) => {
        console.log(response);
        this.sample = response;
        for (const key in response) {
          // console.log(response[key]["course_code"]);
          this.valuesArray[response[key]["course_code"]] = response[key]["credit"]}
        // Store the valuesArray in sessionStorage after it's populated
        sessionStorage.setItem("course_code", JSON.stringify(this.valuesArray));
      });
  }

  add_cgpa_gpa(total_credit: number, total_credit_earned: number): void {
    console.log('Checking GPA and CGPA from function:',this.gpa,this.cgpa);
  
    const details = {
      degree_code:this.University_Marks_data.degree_code,
      batch_no: this.University_Marks_data. batch_no,
      dept_code: this.University_Marks_data.dept_code,
      regulation_no:this.University_Marks_data. regulation_no,
      semester: this.University_Marks_data.semester,
      reg_no:this.University_Marks_data. reg_no.toString(),
      gpa: parseFloat(this.gpa.toFixed(2)),
      cgpa: parseFloat(this.cgpa.toFixed(2)),
      total_credit_earned: total_credit_earned,
      total_credit: total_credit,
      history_of_arrear:(this.arrear_count >0) ? 'yes' : 'no',
      arrear_count:this.arrear_count

    };
  
    console.log('no2:');
  
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
  

  get_cgpa_gpa(): Observable<any> {
    const details = {
      degree_code: this.University_Marks_data.degree_code,
      batch_no: this.University_Marks_data.batch_no,
      dept_code: this.University_Marks_data.dept_code,
      regulation_no: this.University_Marks_data.regulation_no,
      semester:this.University_Marks_data.semester,
      reg_no: this.University_Marks_data.reg_no.toString(),
    };
  
    console.log('no:1');
  
    return this.http.post('http://172.16.71.2:9090/api/v1/JA/get_student_gpa_cgpa', details).pipe(
      map((response: any) => {
        // console.log('cgpa ==> ' + response);
        let t_cridet = 0;
        let t_c_earned = 0;
  
        for (let key in response) {
          t_cridet += response[key]['total_credit'];
          t_c_earned += response[key]['total_credit_earned'];
        }
  
        return { t_cridet, t_c_earned };
      }),
      catchError((error: any) => {
        console.error('Error:', error);
        return []; // Return an empty array or handle the error accordingly
      })
    );
  }
}
