import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
// import {Injectable} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { FnavbarComponent } from './fnavbar/fnavbar.component';

import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
// import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { MainpageComponent } from './mainpage/mainpage.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { CourseMasterComponent } from './JA/course-master/course-master.component';
import { UniversityMarksComponent } from './JA/university-marks/university-marks.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentTenthMarkComponent } from './JA/student-tenth-mark/student-tenth-mark.component';
import { ErpStudentMasterComponent } from './JA/erp-student-master/erp-student-master.component';
import { AssesmentEntryComponent } from './faculty/assesment-entry/assesment-entry.component';
import { TenthMarksComponent } from './student/tenth-marks/tenth-marks.component';
import { TwelvethStateboardMarkComponent } from './student/twelveth-stateboard-mark/twelveth-stateboard-mark.component';
import { TwelvethIcseCbseMarkComponent } from './student/twelveth-icse-cbse-mark/twelveth-icse-cbse-mark.component';
import { StudentTwelvethVocMarkComponent } from './student/student-twelveth-voc-mark/student-twelveth-voc-mark.component';
import { StudentarrerComponent } from './student/student-arrer/student-arrer.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    StudentTwelvethVocMarkComponent,
    StudentarrerComponent,
    PagenotfoundComponent,
   LoginComponent,RegisterComponent,FnavbarComponent, MainpageComponent, FirstpageComponent, CourseMasterComponent, UniversityMarksComponent, StudentTenthMarkComponent, ErpStudentMasterComponent, AssesmentEntryComponent, TenthMarksComponent, TwelvethStateboardMarkComponent, TwelvethIcseCbseMarkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,RouterModule,
    // DataTablesModule,
    BrowserAnimationsModule,
    MatTableModule,ReactiveFormsModule,FormsModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
