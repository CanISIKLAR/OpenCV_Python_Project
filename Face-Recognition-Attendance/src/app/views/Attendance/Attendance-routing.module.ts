import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceComponent } from './Attendance.component';

const routes: Routes = [
  {
    path: '',
    component: AttendanceComponent,
    data: {
    title: 'Attendance'
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AttendanceRoutingModule {}