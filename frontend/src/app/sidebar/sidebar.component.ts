import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() sideNavStatus:boolean = false;

  constructor() { }
  list=[
    {
      id:1,
      name:'Course Master',
      icon:'bx bxs-dashboard',
      link:'/mainpage/course_entry'
    },
    {
      id:2,
      name:'University marks',
      icon:'bx bx-money-withdraw',
      link:'/mainpage/university_entry'
    },
    {
      id:3,
      name:'student 10th marks',
      icon:'bx bx-user',
      link:'/mainpage/10th_marks'
    },
    {
      id:4,
      name:'erp_student_master',
      icon:'bx bx-wallet-alt',
      link:'/mainpage/erp_student_master'
    },
    {
      id:5,
      name:'1oth_marks_entry',
      icon:'bx bx-receipt',
      link:'/mainpage/1oth_marks_entry'
    },
    // {
    //   id:6,
    //   name:'Loan Plans',
    //   icon:'bx bx-briefcase-alt-2',
    //   link:'/loan-types'
    // },
    // {
    //   id:7,
    //   name:'Reports',
    //   icon:'bx bx-trending-up',
    //   link:'/reports'
    // },
    // {
    //   id:8,
    //   name:'Settings',
    //   icon:'bx bx-cog',
    //   link:'/settings'
    // },
    // {
    //   id:9,
    //   name:'main',
    //   icon:'bx bx-cog',
    //   link:'/settings'
    // },
  ]

  ngOnInit(): void {
  }

}
