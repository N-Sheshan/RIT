import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-university-marks',
  templateUrl: './university-marks.component.html',
  styleUrls: ['./university-marks.component.css']
})
export class UniversityMarksComponent implements OnInit {

  constructor(private http: HttpClient) {
  }
  data: any[] = [];
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
    
    for (let i = 0; i < this.sample.length; i++) {
       this.courseGradeData[i].courseCode = this.sample[i].course_code;
    }
    console.log("answer",this.courseGradeData);
    this.http.post('http://172.16.71.2:9090/api/v1/JA//university_mark', this.courseGradeData)
      .subscribe(
        (response) => { alert('Data saved successfully...'); },
        // (error) => {console.error('Error submitting form:', error);}
        (error) => { console.error('Error submitting form:', error); alert('There is a error to insert the data plz check the entrys'); }
      );
    this.courseGradeData = [];
    this.saveUserDataToLocalStorage();

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
  }
  sample: any;
  get_course_code() {
   
    
    const data = {
      semester: this.University_Marks_data.semester,
      regulation: this.University_Marks_data.regulation_no
    };
    console.log(typeof data.regulation);
    // console.log(data);
    this.valuesArray = []
    this.http.post('http://172.16.71.2:9090/api/v1/JA/university_course_code', data)
      .subscribe((response: any) => {
        console.log(response);
        this.sample = response;
        console.log('sample',this.sample);
        for (const key in response) {
          // console.log(response[key]["course_code"]);
          this.valuesArray[response[key]["course_code"]] = response[key]["credit"]
        }
        console.log('dai', this.valuesArray);
        // Store the valuesArray in sessionStorage after it's populated
        sessionStorage.setItem("course_code", JSON.stringify(this.valuesArray));

      });
  }


  updateCourseCode(index: number, key: string) {
    this.courseGradeData[index].courseCode = key;
    console.log('update',this.courseGradeData[index].courseCode);
    
  }

}
