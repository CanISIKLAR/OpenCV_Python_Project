import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { ImageConfirmComponent } from './views/ImageConfirm/ImageConfirm.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { StudentsListComponent } from './views/StudentsList/StudentsList.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    redirectTo: 'studentsList',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  //  {
  //   path: 'studentsList',
  //   component: StudentsListComponent,
  //   data: {
  //     title: 'Page 404'
  //   }
  // },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  
  
  {
    path: 'ImagesConfirm',
    component: ImageConfirmComponent,
    data: {
      title: 'Images Confirm'
    }
  },


  
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'studentsList',
        loadChildren: () => import('./views/StudentsList/StudentsList.module').then(m => m.StudentsListModule)
      },
      {
        path: 'Attendance',
        loadChildren: () => import('./views/Attendance/Attendance.module').then(m => m.AttendanceModule)
      },
      {
        path: 'Attendance-History',
        loadChildren: () => import('./views/AttendanceHistory/AttendanceHistory.module').then(m => m.AttendanceHistoryModule)
      },
      {
        path: 'Courses',
        loadChildren: () => import('./views/Courses/Courses.module').then(m => m.CoursesModule)
      },
      {
        path: 'Staff',
        loadChildren: () => import('./views/Staff/Staff.module').then(m => m.StaffModule)
      },
      
      // {
      //   path: 'ImagesConfirm',
      //   loadChildren: () => import('./views/ImageConfirm/ImageConfirm.module').then(m => m.ImageConfirmModule)
      // },

      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
