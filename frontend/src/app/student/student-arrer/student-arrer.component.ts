import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';

enum Branch {
  BE = 'B.E',
  TECH = 'B.TECH',
}
@Component({
  selector: 'app-student-arrer',
  templateUrl: './student-arrer.component.html',
  styleUrls: ['./student-arrer.component.css']
})

export class StudentarrerComponent implements OnInit{

  constructor (private http: HttpClient) { }

  ngOnInit(): void {
  }




  studentarrer ={
    degree_code: 1,
    batch_no :null,
    dept_code :1,
    regulation_no :null,
    semester : null,
    reg_no:'',
    course_code:'',
    no_of_arrer_current_sem:'',
    no_of_total_arrer:'',
    backlog:''

  }
  To_DB(): void {
    console.log(this.studentarrer);
    this.http.post('http://172.16.71.11:9090/api/v1/JA//studentarrer', this.studentarrer)
      .subscribe(
        (response) => {alert('Data saved successfully...');},
        (error) => {console.error('Error submitting form:', error);}
      );
      this.studentarrer ={
        degree_code: 1,
        batch_no :null,
        dept_code :1,
        regulation_no :null,
        semester : null,
        reg_no:'',
        course_code:'',
        no_of_arrer_current_sem:'',
        no_of_total_arrer:'',
        backlog:''

    
      };
}
}

export class studentarrerComponent {
  branches = Branch; // Expose the Branch enum to the template
}