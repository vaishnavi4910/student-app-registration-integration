import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {

menuItems: MenuItem[] = [
  { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
  { label: 'Students', icon: 'pi pi-users', route: '/students' },
  { label: 'Registration', icon: 'pi pi-user-plus', route: '/registration' },
  { label: 'Courses', icon: 'pi pi-book', route: '/courses' },
  { label: 'Branches', icon: 'pi pi-sitemap', route: '/branches' },
  { label: 'Faculty', icon: 'pi pi-briefcase', route: '/faculty' },
  { label: 'Reports', icon: 'pi pi-chart-bar', route: '/reports' },
  { label: 'Settings', icon: 'pi pi-cog', route: '/settings' }
];

}