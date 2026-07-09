import { Routes } from '@angular/router';
import { Admin } from './components/admin/admin';
import { DataBinding } from './components/data-binding/data-binding';
import { signal } from '@angular/core';
import { NgIf } from './components/ng-if/ng-if';
import { NgFor } from './components/ng-for/ng-for';
import { NgClass } from '@angular/common';
import { PipeEx } from './components/pipe-ex/pipe-ex';
import { GetApi } from './components/get-api/get-api';
import { User } from './components/user/user';
import { ReactiveUser } from './components/reactive-user/reactive-user';
import { Adminlazy } from './components/adminlazy/adminlazy';




export const routes: Routes = [

  // Normal routes
  {
    path: 'data-binding',
    component: DataBinding
  },
  {
    path: 'ng-if',
    component: NgIf
  },
  {
    path: 'ng-for',
    component: NgFor
  },
  {
    path: 'pipe-ex',
    component: PipeEx
  },
  {
    path: 'get-api',
    component: GetApi
  },
  {
    path: 'user',
    component: User
  },
  {
    path: 'reactive-user',
    component: ReactiveUser
  },
   {
        path: 'admin-lazy',
        loadComponent: () => import('./components/adminlazy/adminlazy').then(m=>{
            return m.Adminlazy;})
        }
      ,

  // Parent route with child routes
  {
    path: 'admin',
    component: Admin,
    children: [
      {
        path: 'data-binding',
        component: DataBinding
      },
      {
        path: 'ng-if',
        component: NgIf
      },
      {
        path: 'ng-for',
        component: NgFor
      },
      {
        path: 'pipe-ex',
        component: PipeEx
      },
      {
        path: 'get-api',
        component: GetApi
      },
      {
        path: 'user',
        component: User
      },
      {
        path: 'reactive-user',
        component: ReactiveUser
      },
     
    ]
  }

     
];