import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { StudentsListComponent } from './StudentsList.component';
import { StudentsListRoutingModule } from './StudentsList-routing.module';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngb-modal';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from "@angular/material/select";
import { camPhotoComponent } from '../SharedComponents/camPicture/camPhoto.component';



@NgModule({
  imports: [
    FormsModule,
    StudentsListRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    FormsModule,
    BsDropdownModule.forRoot(),
    ChartsModule,
    FormsModule,
    CommonModule,
    ModalModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatSelectModule,
    
    // MatButtonModule,
    // MatCheckboxModule,
    // MatFormFieldModule,
  ],
  declarations: [ StudentsListComponent ,
   camPhotoComponent
]
})
export class StudentsListModule { }