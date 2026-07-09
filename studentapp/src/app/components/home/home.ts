import { Component } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Toolbar,
    Button,Card,RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class HomeComponent {


  routes = {
    home: '/',
    login: '/login',
    register: '/register'
  };


}