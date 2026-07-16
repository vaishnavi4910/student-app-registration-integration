import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

interface SidebarMenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],

  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css'
})
export class AdminSidebar {

  /*
   * The AdminLayout will send true or false.
   *
   * false = sidebar is open
   * true  = sidebar is collapsed
   */
  @Input() collapsed = false;

  /*
   * Sends an event to AdminLayout when the mobile
   * sidebar close button is clicked.
   */
  @Output() closeSidebar = new EventEmitter<void>();

  menuItems: SidebarMenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      route: '/admin/dashboard'
    },
    {
      label: 'Students',
      icon: 'pi pi-users',
      route: '/admin/students'
    },
    {
      label: 'Courses',
      icon: 'pi pi-book',
      route: '/admin/courses'
    },
    {
      label: 'Branches',
      icon: 'pi pi-sitemap',
      route: '/admin/branches'
    },
    {
      label: 'Enrollments',
      icon: 'pi pi-folder',
      route: '/admin/enrollments'
    },
    {
      label: 'Examinations',
      icon: 'pi pi-file',
      route: '/admin/examinations'
    },
    {
      label: 'Reports',
      icon: 'pi pi-chart-bar',
      route: '/admin/reports'
    },
    {
      label: 'Messages',
      icon: 'pi pi-envelope',
      route: '/admin/messages'
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      route: '/admin/settings'
    }
  ];

  constructor(private router: Router) {}

  /**
   * Closes the sidebar on mobile after selecting a menu item.
   */
  onMenuItemClick(): void {
    this.closeSidebar.emit();
  }

  /**
   * Sends a close request to AdminLayout.
   */
  onCloseSidebar(): void {
    this.closeSidebar.emit();
  }

  /**
   * Returns the user to the Login page.
   *
   * Later, if we store an authentication token,
   * we will remove it here before navigating.
   */
  logout(): void {
    this.closeSidebar.emit();
    this.router.navigate(['/login']);
  }
}