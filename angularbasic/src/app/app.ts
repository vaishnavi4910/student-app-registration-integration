import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Admin } from './components/admin/admin';
import { User } from './components/user/user';
import { DataBinding } from './components/data-binding/data-binding';
import { NgIf } from "./components/ng-if/ng-if";
import { NgFor } from './components/ng-for/ng-for';
import { NgClass } from "./components/ng-class/ng-class";
import { Highlight } from './components/highlight';
import { AppnumbersOnly } from './components/appnumbers-only';
import { CurrencyConverterPipe } from './components/currency-converter-pipe';
import { GetApi } from './components/get-api/get-api';
import { ReactiveUser } from './components/reactive-user/reactive-user';


@Component({
  selector: 'app-root',
  imports: [RouterLink,DataBinding,RouterOutlet,CurrencyConverterPipe,GetApi,User,ReactiveUser], 
  // Highlight,AppnumbersOnly,NgClass,NgFor,NgIf
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angularbasic');
  amount=12;
}
