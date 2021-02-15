import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngb-modal';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


// Theme Routing
import { CoursesRoutingModule } from "./Courses-routing.module";
import { CoursesComponent } from "./Courses.component";
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSliderModule } from '@angular/material/slider';


@NgModule({
    imports: [
    FormsModule,
    CoursesRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    FormsModule,
    BsDropdownModule.forRoot(),
    ChartsModule,
    NgbDropdownModule,
    FormsModule,
    CommonModule,
    ModalModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    ],
    declarations: [
        CoursesComponent
    ]
 })
 export class CoursesModule {
     constructor() {}

 }