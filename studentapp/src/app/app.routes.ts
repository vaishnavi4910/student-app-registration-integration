import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { Register } from './components/register/register';
import { StudentGrid } from './components/student-grid/student-grid';

import { AdminLayout } from './layouts/admin-layout/admin-layout';

export const routes: Routes = [

  // Temporarily open the Student Grid instead of Home
  // {
  //   path: '',
  //   redirectTo: 'admin/students',
  //   pathMatch: 'full'
  // },
   {
    path: '',
    component: HomeComponent,
  },
  // Public pages
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: Register
  },

  // Admin section
  {
    path: 'admin',
    component: AdminLayout,

    children: [
      {
        path: '',
        redirectTo: 'students',
        pathMatch: 'full'
      },
      {
        path: 'students',
        component: StudentGrid
      }
    ]
  },

  // Invalid URL
  {
    path: '**',
    redirectTo: ''
  }
];