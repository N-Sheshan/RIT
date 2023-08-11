import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseMasterComponent } from './JA/course-master/course-master.component';
import { ErpStudentMasterComponent } from './JA/erp-student-master/erp-student-master.component';
import { StudentTenthMarkComponent } from './JA/student-tenth-mark/student-tenth-mark.component';
import { UniversityMarksComponent } from './JA/university-marks/university-marks.component';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';
import { TenthMarksComponent } from './student/tenth-marks/tenth-marks.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'mainpage',component:MainpageComponent,children:[ {path:'course_entry',component:CourseMasterComponent},
  {path:'university_entry',component:UniversityMarksComponent},
  {path:'10th_marks',component:StudentTenthMarkComponent},
  {path:'erp_student_master',component:ErpStudentMasterComponent},
  {path:'1oth_marks_entry',component:TenthMarksComponent},]},

  



  // {path:'',component:DashboardComponent},
  
  // {
  //   path: 'payments',
  //   loadChildren: () =>
  //     import('./payments/payments.module').then((m) => m.PaymentsModule),
  // },
  // {
  //   path: 'loans',
  //   loadChildren: () =>
  //     import('./loans/loans.module').then((m) => m.LoansModule),
  // },
  // {
  //   path: 'invoices',
  //   loadChildren: () =>
  //     import('./invoices/invoices.module').then((m) => m.InvoicesModule),
  // },
  // {
  //   path: 'settings',
  //   loadChildren: () =>
  //     import('./settings/settings.module').then((m) => m.SettingsModule),
  // },
  // { path: 'loan-types', loadChildren: () =>
  //  import('./loan-types/loan-types.module').then(m => m.LoanTypesModule) },
  // { path: 'reports', loadChildren: () =>
  // import('./reports/reports.module').then(m => m.ReportsModule) },
  // { path: 'activity', loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule) },
  // {path:'**' , component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
