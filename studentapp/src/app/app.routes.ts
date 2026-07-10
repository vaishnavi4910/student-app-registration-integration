import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { Register } from './components/register/register';
import { Adminlayout } from './layouts/adminlayout/adminlayout';

// Future pages
// import { DashboardComponent } from './pages/dashboard/dashboard';
// import { StudentsComponent } from './pages/students/students';

export const routes: Routes = [

  // Landing Page (No Sidebar)
 
  // Authentication Pages (No Sidebar)
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: Register
  },
  
  {
          path: '',
          component: HomeComponent
  },

  // Admin Area (Sidebar + Navbar)
  {
    path: 'admin',
    component: Adminlayout,
    children: [


            {
          path: '',
          component: HomeComponent
        },

      // {
      //   path: 'dashboard',
      //   component: DashboardComponent
      // },
      // {
      //   path: 'students',
      //   component: StudentsComponent
      // }
    ]
  },

  {
    path: '**',
    redirectTo: ''
  }

];