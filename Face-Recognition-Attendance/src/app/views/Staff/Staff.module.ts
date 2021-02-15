import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngb-modal';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSliderModule } from '@angular/material/slider';



// Theme Routing
import { StaffRoutingModule } from "./Staff-routing.module";

import { StaffComponent } from "./Staff.component";

@NgModule({
    imports: [
        FormsModule,
        StaffRoutingModule,
        ChartsModule,
        BsDropdownModule,
        ButtonsModule.forRoot(),
        BsDropdownModule.forRoot(),
        CommonModule,
        ModalModule,
        NgMultiSelectDropDownModule.forRoot(),
        MatFormFieldModule,
        MatInputModule,
        MatSliderModule,
    
    ],
    declarations: [
        StaffComponent
    ]
 })
 export class StaffModule {
     constructor() {}

 }