import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tenth-marks',
  templateUrl: './tenth-marks.component.html',
  styleUrls: ['./tenth-marks.component.css']
})
export class TenthMarksComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
student_10th_marks_data={

}

  To_DB(): void {
    console.log(this.student_10th_marks_data);
  
    this.http.post('http://172.16.71.2:9090/api/v1/JA/', this.student_10th_marks_data)
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
      
      };



      
  }



