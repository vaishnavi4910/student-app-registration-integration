import { Component, signal } from '@angular/core';
import { StudentRegistration } from './components/student-registration/student-registration';
import { HomeComponent } from './components/home/home';
import { RouterOutlet } from '@angular/router';
import {  LoginComponent } from './components/login/login';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentRegistration, HomeComponent, RouterOutlet,LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('studentapp');
}