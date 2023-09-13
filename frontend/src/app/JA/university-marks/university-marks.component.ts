import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  grade:{ [key: string]: number }={'O': 10,'A+': 9,'A': 8,'B+': 7,'B': 6,'C': 5}
  gpa: number = 0;
  cgpa: number = 0;
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
    section: ''

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



  To_DB(): void {
    let sum=0;
    for (let i = 0; i < this.sample.length; i++) {
       this.courseGradeData[i].courseCode = this.sample[i].course_code;
       let g=this.courseGradeData[i].grade
       sum += this.sample[i].credit
       this.gpa +=this.grade[g]*this.sample[i].credit
    }
    this.gpa = this.gpa/sum;
    console.log(`this is sum of crdite ${sum}`+'\n this is gpa '+this.gpa);
    console.log("answer",this.courseGradeData);
    this.add_cgpa_gpa()
    this.http.post('http://172.16.71.2:9090/api/v1/JA//university_mark', this.courseGradeData)
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
      section: ''
    };
    this.table=false
  }
  sample: any;
  get_course_code() { 
    const data = {
      semester:Number(this.University_Marks_data.semester),
      regulation: this.University_Marks_data.regulation_no
    };
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

  add_cgpa_gpa(){
    const details={
      batch_no: this.University_Marks_data.batch_no,
      dept_code: this.University_Marks_data.dept_code,
      regulation_no: this.University_Marks_data.regulation_no,
      reg_no:this.University_Marks_data.reg_no.toString()
    }
    this.http.post('http://172.16.71.2:9090/api/v1/JA/get_student_gpa_cgpa', details)
      .subscribe((response: any) => {console.log('cgpa ==> '+response[0]);},
      (error: any) => {console.error('Error:', error);});
  }

}
