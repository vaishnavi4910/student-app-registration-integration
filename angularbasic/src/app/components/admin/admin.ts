import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  firstName = "vaishnavi";

  courseName= "Angular 20 tutorial";

  rollNo=111;
}
