import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModalModule, NgbDropdownModule, NgbPaginationModule, NgbAlertModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FileSelectDirective, FileUploadModule } from "ng2-file-upload";

import { StaffComponent } from './Staff.component'

const routes: Routes = [
  {
    path: '',
    component: StaffComponent,
    data: {
    title: 'Staff'
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

export class StaffRoutingModule {}