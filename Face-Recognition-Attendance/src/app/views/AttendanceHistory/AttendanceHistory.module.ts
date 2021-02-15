import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngb-modal';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// Theme Routing
import { AttendanceHistoryRoutingModule } from "./AttendanceHistory-routing.module";

import { AttendanceHistoryComponent } from "./AttendanceHistory.component";
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from "@angular/material/select";


@NgModule({
    imports: [
        AttendanceHistoryRoutingModule,
        CommonModule,
        FormsModule,
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
    ],
    declarations: [
        AttendanceHistoryComponent
    ]
 })
 export class AttendanceHistoryModule {
     constructor() {}

 }

//  AttendanceHistory