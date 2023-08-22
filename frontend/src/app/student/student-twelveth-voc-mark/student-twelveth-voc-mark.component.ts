import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-twelveth-voc-mark',
  templateUrl: './student-twelveth-voc-mark.component.html',
  styleUrls: ['./student-twelveth-voc-mark.component.css']
})
export class StudentTwelvethVocMarkComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  student_12th_vocational_mark = {
    degree_code: 2,
    batch_no: null,
    dept_code: 16,
    education_type: '',
    year_of_passing: null,
    language : '',
    language_mark: null,
    english: null,
    maths: null,
    physics: null,
    chemistry: null,
    voc_theory_name: '',
    voc_theory_mark:null,
    voc_practical_name:'',
    voc_practical_mark:null,
    total: null,
    percentage:null,
    cutoff:null

  };
  
  To_DB(): void {
    console.log(this.student_12th_vocational_mark);
  
    this.http.post('http://172.16.71.2:9090/api/v1/JA/twelveth_vocational_mark', this.student_12th_vocational_mark)
      .subscribe(
        (response) => {
  
          alert('Data saved successfully...');
          // Handle success, show a success message, or perform any other action
        },
        (error) => {
          alert("This course is alrady exist");
          // Handle error, show an error message, or perform any other action
        }
      );
      this.student_12th_vocational_mark = {
        degree_code: 2,
        batch_no: null,
        dept_code: 16,
        education_type: '',
        year_of_passing: null,
        language : '',
        language_mark: null,
        english: null,
        maths: null,
        physics: null,
        chemistry: null,
        voc_theory_name: '',
        voc_theory_mark:null,
        voc_practical_name:'',
        voc_practical_mark:null,
        total: null,
        percentage:null,
        cutoff:null
      };
  }
}
