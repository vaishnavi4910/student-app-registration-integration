import {
  Component,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Menu, MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,

  imports: [
    FormsModule,
    AvatarModule,
    ButtonModule,
    InputTextModule,
    MenuModule
  ],

  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css'
})
export class AdminNavbar {

  /*
   * Sends an event to AdminLayout when the
   * hamburger button is clicked.
   */
  @Output() sidebarToggle = new EventEmitter<void>();

  /*
   * Gets access to the PrimeNG profile menu
   * declared in admin-navbar.html.
   */
  @ViewChild('profileMenu') profileMenu!: Menu;

  // Stores the navbar search value
  searchText = '';

  // Options shown when the Admin User profile is clicked
  readonly profileItems: MenuItem[] = [
    {
      label: 'My Profile',
      icon: 'pi pi-user'
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      routerLink: '/admin/settings'
    },
    {
      separator: true
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      routerLink: '/login'
    }
  ];

  /**
   * Sends the hamburger click to AdminLayout.
   */
  onToggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  /**
   * Opens or closes the PrimeNG profile popup menu.
   */
  openProfile(event: Event): void {
    this.profileMenu.toggle(event);
  }

  /**
   * Temporary notification functionality.
   */
  openNotifications(): void {
    console.log('Notifications clicked');
  }

  /**
   * Called when the search value changes.
   */
  onSearch(): void {
    console.log('Navbar search:', this.searchText);
  }
}