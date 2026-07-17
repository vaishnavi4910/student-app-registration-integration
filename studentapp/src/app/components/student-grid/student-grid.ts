import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  email: string;
  mobileNumber: string;
  course: string;
  branch: string;
  candidateGroup: string;

}

@Component({
  selector: 'app-student-grid',
  standalone: true,

  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule
  ],

  templateUrl: './student-grid.html',
  styleUrl: './student-grid.css'
})
export class StudentGrid implements OnInit {

  // Student records displayed inside the table
  students: Student[] = [];

  // Total number of records returned by the backend
  totalRecords = 0;

  // Current page size
  rows = 10;

  // Current page number
  currentPage = 0;

  // Current search value
  searchName = '';

  // Shows the table loading state
  loading = false;

  // Stores an API error message
  errorMessage = '';

  // Prevents the search API from being called for every keystroke
  private searchTimer: ReturnType<typeof setTimeout> | undefined;

  private readonly studentsApiUrl =
    'http://172.17.12.50:8082/reborn/candidates/getall';

constructor(
  private http: HttpClient,
  private router: Router
) {}

  ngOnInit(): void {
    // Do not call loadStudents() here because p-table calls
    // onLazyLoad automatically when the table opens.
  }

  /**
   * Called automatically when:
   * 1. The table first loads
   * 2. The page changes
   * 3. The page size changes
   */
  onPageChange(event: any): void {
    const firstRecord = event.first ?? 0;
    const pageSize = event.rows ?? this.rows;

    this.rows = pageSize;

    // PrimeNG starts from record 0, but the backend starts from page 1.
    this.currentPage = Math.floor(firstRecord / pageSize) ;

    this.loadStudents();
  }

  /**
   * Calls the GET API and loads student details.
   */
  loadStudents(): void {
    this.loading = true;
    this.errorMessage = '';

    const params = new HttpParams()
      .set('name', this.searchName.trim())
      .set('page', this.currentPage.toString())
      .set('size', this.rows.toString());

    this.http.get<any>(this.studentsApiUrl, { params }).subscribe({
      next: (response: any) => {
        console.log('Student GET API response:', response);

        /*
         * This supports different common backend response formats:
         *
         * 1. Direct array:
         *    [{...}, {...}]
         *
         * 2. Spring Boot pagination:
         *    { content: [{...}], totalElements: 20 }
         *
         * 3. Data property:
         *    { data: [{...}], totalRecords: 20 }
         *
         * 4. Single student object:
         *    { firstName: "...", lastName: "..." }
         */
        if (Array.isArray(response)) {
          this.students = response;
          this.totalRecords = response.length;
        } else if (Array.isArray(response?.content)) {
          this.students = response.content;
          this.totalRecords =
            response.totalElements ?? response.content.length;
        } else if (Array.isArray(response?.data)) {
          this.students = response.data;
          this.totalRecords =
            response.totalElements ??
            response.totalRecords ??
            response.data.length;
        } else if (Array.isArray(response?.candidates)) {
          this.students = response.candidates;
          this.totalRecords =
            response.totalElements ??
            response.totalRecords ??
            response.candidates.length;
        } else if (response?.firstName) {
          // Handles the single-object response you supplied
          this.students = [response];
          this.totalRecords = 1;
        } else {
          this.students = [];
          this.totalRecords = 0;
        }

        this.loading = false;
      },

      error: (error: any) => {
        console.error('Error loading students:', error);

        this.students = [];
        this.totalRecords = 0;
        this.loading = false;

        this.errorMessage =
          error?.error?.message ||
          'Unable to load student details. Please try again.';
      }
    });
  }

  /**
   * Called whenever the user enters a student name.
   */
  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    this.searchName = inputElement.value;
    this.currentPage = 0;
    console.log("searching vaishu waittt");

    // Cancel the previous timer
    clearTimeout(this.searchTimer);

    // Wait for 500ms before calling the API
    this.searchTimer = setTimeout(() => {
      this.loadStudents();
    }, 500);
  }

  /**
   * Clears the search box and reloads the table.
   */
  clearSearch(): void {
    this.searchName = '';
    this.currentPage = 0;
    this.loadStudents();
  }

  /**
   * Refreshes the current student list.
   */
  refreshStudents(): void {
    this.loadStudents();
  }

  /**
   * Combines first name and last name.
   */
  getFullName(student: Student): string {
    return `${student.firstName ?? ''} ${student.lastName ?? ''}`.trim();
  }

  /**
   * Produces initials for the circular student avatar.
   */
  getInitials(student: Student): string {
    const firstInitial = student.firstName?.charAt(0) ?? '';
    const lastInitial = student.lastName?.charAt(0) ?? '';

    return `${firstInitial}${lastInitial}`.toUpperCase();
  }
/**
 * Opens the selected student's profile page.
 */
openStudentProfile(student: Student): void {
  // Do not navigate if the backend did not provide an ID
  if (student.id == null) {
    console.error('Student ID is unavailable:', student);
    return;
  }

  console.log('Opening student profile with ID:', student.id);

  this.router.navigate([
    '/student-profile',
    student.id
  ]);
}
  /**
   * Opens the Add Student page/dialog later.
   */
  addStudent(): void {
    console.log('Add Student clicked');
  }

  /**
   * Opens the actions menu later.
   */
  showActions(student: Student): void {
    console.log('Selected student:', student);
  }

  /**
   * Counts different courses available on the current page.
   */
  get courseCount(): number {
    const courses = this.students
      .map(student => student.course)
      .filter(course => Boolean(course));

    return new Set(courses).size;
  }

  /**
   * Counts different branches available on the current page.
   */
  get branchCount(): number {
    const branches = this.students
      .map(student => student.branch)
      .filter(branch => Boolean(branch));

    return new Set(branches).size;
  }
}