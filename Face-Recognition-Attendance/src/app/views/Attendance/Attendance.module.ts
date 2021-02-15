// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ModalModule } from 'ngb-modal';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Theme Routing
import { AttendanceRoutingModule } from "./Attendance-routing.module";

import { AttendanceComponent } from "./Attendance.component";
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from "@angular/material/select";

@NgModule({
    imports: [
        AttendanceRoutingModule,
        CommonModule,
        FormsModule,
        ChartsModule,
        BsDropdownModule,
        ButtonsModule.forRoot(),
        BsDropdownModule.forRoot(),
        ChartsModule,
        NgbDropdownModule,
        ModalModule,  
        MatFormFieldModule,
        MatInputModule,
        MatSliderModule,
        MatSelectModule,
    ],
    declarations: [
        AttendanceComponent
    ]
 })
 export class AttendanceModule {
     constructor() {}

 }