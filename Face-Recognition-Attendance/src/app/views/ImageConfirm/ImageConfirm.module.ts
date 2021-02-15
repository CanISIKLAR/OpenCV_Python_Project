import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ImageConfirmComponent } from './ImageConfirm.component';
import { ImageConfirmRoutingModule } from './ImageConfirm-routing.module';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngb-modal';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from "@angular/material/select";
import { camPhotoComponent } from '../SharedComponents/camPicture/camPhoto.component';
import { camPhotoForPublicComponent } from '../SharedComponents/camPicture/camPhotoForPublic/camPhotoForPublic.component';



@NgModule({
  imports: [
    FormsModule,
    ImageConfirmRoutingModule,
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
  declarations: [ ImageConfirmComponent ,
    camPhotoForPublicComponent
  ]
})
export class ImageConfirmModule { }