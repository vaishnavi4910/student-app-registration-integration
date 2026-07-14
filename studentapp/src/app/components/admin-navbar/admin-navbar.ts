import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-navbar', standalone: true,
  imports: [FormsModule, AvatarModule, ButtonModule, InputTextModule, MenuModule],
  templateUrl: './admin-navbar.html', styleUrl: './admin-navbar.css'
})
export class AdminNavbar {
  @Output() sidebarToggle = new EventEmitter<void>();
  searchText = '';
  readonly profileItems: MenuItem[] = [
    { label: 'My Profile', icon: 'pi pi-user' },
    { label: 'Settings', icon: 'pi pi-cog', routerLink: '/admin/settings' },
    { separator: true },
    { label: 'Logout', icon: 'pi pi-sign-out', routerLink: '/login' }
  ];
}
