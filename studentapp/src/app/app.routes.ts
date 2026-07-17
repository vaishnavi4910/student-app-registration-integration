import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { Register } from './components/register/register';
import { StudentGrid } from './components/student-grid/student-grid';

// Student profile component
import { StudentProfile } from './components/student-profile/student-profile';

import { AdminLayout } from './layouts/admin-layout/admin-layout';

export const routes: Routes = [

  // Default page
  {
    path: '',
    component: HomeComponent
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

  // Student profile page
  // :id receives the selected student's ID
  // Example: /student-profile/49
  {
    path: 'student-profile/:id',
    component: StudentProfile
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