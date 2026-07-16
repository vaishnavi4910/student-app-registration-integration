import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AdminNavbar } from '../admin-navbar/admin-navbar';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-admin-layout',
  standalone: true,

  imports: [
    CommonModule,
    RouterOutlet,
    AdminNavbar,
    AdminSidebar
  ],

  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {

  // Controls the sidebar width on desktop
  sidebarCollapsed = false;

  // Controls whether the sidebar is visible on mobile
  mobileSidebarOpen = false;

  // Tracks the current screen size
  isMobile = window.innerWidth <= 768;

  /**
   * Called when the navbar hamburger button is clicked.
   */
  toggleSidebar(): void {
    if (this.isMobile) {
      this.mobileSidebarOpen = !this.mobileSidebarOpen;
    } else {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }
  }

  /**
   * Closes the sidebar on mobile.
   */
  closeMobileSidebar(): void {
    if (this.isMobile) {
      this.mobileSidebarOpen = false;
    }
  }

  /**
   * Updates sidebar behavior when the browser size changes.
   */
  @HostListener('window:resize')
  onWindowResize(): void {
    this.isMobile = window.innerWidth <= 768;

    if (!this.isMobile) {
      this.mobileSidebarOpen = false;
    }
  }
}