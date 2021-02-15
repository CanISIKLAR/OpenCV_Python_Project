import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModalModule, NgbDropdownModule, NgbPaginationModule, NgbAlertModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FileSelectDirective, FileUploadModule } from "ng2-file-upload";

import { CoursesComponent } from './Courses.component'

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    data: {
    title: 'Courses'
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
export class CoursesRoutingModule {}