import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModalModule, NgbDropdownModule, NgbPaginationModule, NgbAlertModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FileSelectDirective, FileUploadModule } from "ng2-file-upload";

import { AttendanceHistoryComponent } from './AttendanceHistory.component'

const routes: Routes = [
  {
    path: '',
    component: AttendanceHistoryComponent,
    data: {
    title: 'AttendanceHistory'
    },
    children: [
      {
        path: '',
        redirectTo: ''
      },
    ]
  }
];

@NgModule({
  
  imports: [
    RouterModule.forChild(routes),
    FileUploadModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    RouterModule,
    NgbModalModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbTimepickerModule,
    
  ],
  declarations: [
    // FileSelectDirective
  ]
 
})

export class AttendanceHistoryRoutingModule {}