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
    {
      id:6,
      name:'12th_Stateboard_mark',
      icon:'bx bx-receipt',
      link:'/mainpage/12th_Stateboard_mark'
    },
    {
      id:7,
      name:'12th_icse_cbsc_mark',
      icon:'bx bx-briefcase-alt-2',
      link:'/mainpage/12th_icse_cbsc_mark'
    },
    {
      id:8,
      name:'12th_vocational_mark',
      icon:'bx bx-trending-up',
      link:'/mainpage/12th_vocational_mark'
    },
    {
      id:9,
      name:'student_arrer',
      icon:'bx bx-briefcase-alt-2',
      link:'/mainpage/student_arrer'
    },
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
