import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    Toolbar,
    Button,
    InputText,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {

  searchCourses(event: Event): void {
    const searchValue =
      (event.target as HTMLInputElement).value;

    console.log('Searching for:', searchValue);
  }
}