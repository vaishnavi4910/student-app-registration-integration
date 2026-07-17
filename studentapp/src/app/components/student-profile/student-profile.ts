
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectModule } from 'primeng/select';

import { Api } from '../../services/api';

@Component({
  selector: 'app-student-profile',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    SelectModule
  ],

  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css'
})
export class StudentProfile implements OnInit {

  studentForm!: FormGroup;

  // Student ID obtained from the URL
  studentId!: number;

  // Dropdown option arrays
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  courseList: any[] = [];
  branchList: any[] = [];
  candidateGroupList: any[] = [];

  // Loading states
  loading = false;
  saving = false;

  // Form is initially read-only
  isEditing = false;

  errorMessage = '';
  successMessage = '';

  private readonly profileApiUrl =
    'http://172.17.12.50:8082/reborn/api/candidate-details/profile';

  private readonly updateApiUrl =
    'http://172.17.12.50:8082/reborn/candidates/update';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private api: Api
  ) {}

  ngOnInit(): void {
    this.createForm();

    // Example URL: /student-profile/49
    const idFromUrl =
      this.route.snapshot.paramMap.get('id');

    if (!idFromUrl) {
      this.errorMessage =
        'Student ID is unavailable.';
      return;
    }

    this.studentId = Number(idFromUrl);

    if (Number.isNaN(this.studentId)) {
      this.errorMessage =
        'Invalid student ID.';
      return;
    }

    // First load the selected student
    this.loadStudentProfile();
  }


  /**
   * Creates the Student Profile reactive form.
   */
  createForm(): void {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      mobileNumber: ['', Validators.required],
      course: ['', Validators.required],
      branch: ['', Validators.required],
      candidateGroup: ['', Validators.required]
    });

    // User must click Edit before changing fields
    this.studentForm.disable();
  }


  /**
   * Calls the GET-by-ID API and patches the profile.
   */
 /**
 * Calls the GET-by-ID API and patches the profile.
 */
loadStudentProfile(): void {
  this.loading = true;
  this.errorMessage = '';

  const url =
    `${this.profileApiUrl}/${this.studentId}`;

  console.log(
    'Calling student profile API:',
    url
  );

  this.http.get<any>(url).subscribe({
    next: (response: any) => {
      console.log(
        'Student profile response:',
        response
      );

      // Supports direct object or { data: object }
      const student =
        response?.data ?? response;

      // First patch values returned by profile GET API
      this.studentForm.patchValue({
        firstName: student.firstName ?? '',
        lastName: student.lastName ?? '',
        dateOfBirth: student.dateOfBirth ?? '',
        gender: student.gender ?? '',
        country: student.country ?? '',
        state: student.state ?? '',
        city: student.city ?? '',
        zipCode: student.zipCode ?? '',
        email: student.email ?? '',
        mobileNumber:
          student.mobileNumber ?? '',
        course: student.course ?? '',
        branch: student.branch ?? '',
        candidateGroup:
          student.candidateGroup ?? ''
      });

      // Load Country → State → City options
      this.loadCountries(
        student.country,
        student.state
      );

      // Load Course → Branch → Candidate Group options
      this.loadCourses(
        student.course,
        student.branch,
        student.candidateGroup
      );

      // The next block finishes here
      this.loading = false;
    },

    // The error block starts separately
    error: (error: any) => {
      console.error(
        'Student profile API failed:',
        error
      );

      this.loading = false;

      this.errorMessage =
        error?.error?.message ||
        'Unable to load student profile.';
    }
  });
}


  /**
   * Loads Country dropdown options.
   *
   * The optional values are used when opening
   * an existing student profile.
   */
  loadCountries(
    selectedCountryName?: string,
    selectedStateName?: string
  ): void {
    this.api.getCountries().subscribe({
      next: (response: any) => {
        console.log(
          'Country API response:',
          response
        );

        this.countries =
          Array.isArray(response)
            ? response
            : [];

        /*
         * Profile GET returns the Country name,
         * but the States API requires Country ID.
         *
         * Find the Country object using its name.
         */
        const selectedCountry =
          this.countries.find(
            country =>
              country.countryName
                ?.toLowerCase() ===
              selectedCountryName
                ?.toLowerCase()
          );

        if (selectedCountry) {
          this.loadStates(
            selectedCountry.id,
            selectedStateName
          );
        } else {
          this.states = [];
          this.cities = [];
        }
      },

      error: (error: any) => {
        console.error(
          'Unable to load countries:',
          error
        );

        this.countries = [];
        this.states = [];
        this.cities = [];
      }
    });
  }


  /**
   * Loads States using Country ID.
   */
  loadStates(
    countryId: number,
    selectedStateName?: string
  ): void {
    this.api.getStates(countryId).subscribe({
      next: (response: any) => {
        console.log(
          'State API response:',
          response
        );

        this.states =
          Array.isArray(response)
            ? response
            : [];

        /*
         * Profile GET returns the State name,
         * but the Cities API requires State ID.
         */
        const selectedState =
          this.states.find(
            state =>
              state.stateName
                ?.toLowerCase() ===
              selectedStateName
                ?.toLowerCase()
          );

        if (selectedState) {
          this.loadCities(selectedState.id);
        } else {
          this.cities = [];
        }
      },

      error: (error: any) => {
        console.error(
          'Unable to load states:',
          error
        );

        this.states = [];
        this.cities = [];
      }
    });
  }


  /**
   * Loads Cities using State ID.
   */
  loadCities(stateId: number): void {
    this.api.getCities(stateId).subscribe({
      next: (response: any) => {
        console.log(
          'City API response:',
          response
        );

        this.cities =
          Array.isArray(response)
            ? response
            : [];
      },

      error: (error: any) => {
        console.error(
          'Unable to load cities:',
          error
        );

        this.cities = [];
      }
    });
  }




  /**
 * Loads Course dropdown options.
 *
 * Optional names are used while opening
 * an existing student profile.
 */loadCourses(
  selectedCourseName?: string,
  selectedBranchName?: string,
  selectedCandidateGroupName?: string
): void {
  this.api.getCourses().subscribe({
    next: (response: any) => {
      console.log('Course API response:', response);

      this.courseList = Array.isArray(response)
        ? response
        : [];

      // Find the Course returned by the profile GET API
      const selectedCourse = this.courseList.find(
        course =>
          course.label?.trim().toLowerCase() ===
          selectedCourseName?.trim().toLowerCase()
      );

      if (selectedCourse) {
        /*
         * Patch the exact Course label from the dropdown
         * so that PrimeNG displays it as selected.
         */
        this.studentForm.patchValue({
          course: selectedCourse.label
        });

        // Load Branches using the Course code
        this.loadBranches(
          selectedCourse.code,
          selectedBranchName,
          selectedCandidateGroupName
        );
      } else {
        console.error(
          'Profile Course was not found in Course options:',
          selectedCourseName
        );

        this.branchList = [];
        this.candidateGroupList = [];
      }
    },

    error: (error: any) => {
      console.error('Unable to load Courses:', error);

      this.courseList = [];
      this.branchList = [];
      this.candidateGroupList = [];
    }
  });
}


/**
 * Loads Branches using Course code.
 */loadBranches(
  courseCode: string,
  selectedBranchName?: string,
  selectedCandidateGroupName?: string
): void {
  this.api.getBranches(courseCode).subscribe({
    next: (response: any) => {
      console.log('Branch API response:', response);

      this.branchList = Array.isArray(response)
        ? response
        : [];

      // Find the Branch returned by the profile GET API
      const selectedBranch = this.branchList.find(
        branch =>
          branch.label?.trim().toLowerCase() ===
          selectedBranchName?.trim().toLowerCase()
      );

      if (selectedBranch) {
        /*
         * Patch the exact Branch label from branchList.
         * This makes the current Branch appear selected.
         */
        this.studentForm.patchValue({
          branch: selectedBranch.label
        });

        // Load Candidate Groups using the Branch code
        this.loadCandidateGroups(
          selectedBranch.code,
          selectedCandidateGroupName
        );
      } else {
        console.error(
          'Profile Branch was not found in Branch options:',
          selectedBranchName
        );

        this.candidateGroupList = [];
      }
    },

    error: (error: any) => {
      console.error('Unable to load Branches:', error);

      this.branchList = [];
      this.candidateGroupList = [];
    }
  });
}

/**
 * Loads Candidate Group options using the Branch code.
 */loadCandidateGroups(
  branchCode: string,
  selectedCandidateGroupName?: string
): void {
  this.api.getCandidateGroup(branchCode).subscribe({
    next: (response: any) => {
      console.log(
        'Candidate Group API response:',
        response
      );

      this.candidateGroupList =
        Array.isArray(response)
          ? response
          : [];

      // Find Candidate Group returned by profile GET API
      const selectedCandidateGroup =
        this.candidateGroupList.find(
          candidateGroup =>
            candidateGroup.label
              ?.trim()
              .toLowerCase() ===
            selectedCandidateGroupName
              ?.trim()
              .toLowerCase()
        );

      if (selectedCandidateGroup) {
        /*
         * Patch the exact Candidate Group label.
         * This makes it appear selected.
         */
        this.studentForm.patchValue({
          candidateGroup:
            selectedCandidateGroup.label
        });
      } else {
        console.error(
          'Profile Candidate Group was not found in options:',
          selectedCandidateGroupName
        );
      }
    },

    error: (error: any) => {
      console.error(
        'Unable to load Candidate Groups:',
        error
      );

      this.candidateGroupList = [];
    }
  });
}
/**
 * Runs when the user selects a different Course.
 */
onCourseChange(): void {
  const selectedCourseName =
    this.studentForm.get('course')?.value;

  /*
   * Form stores Course label.
   * Find the Course object to obtain its code.
   */
  const selectedCourse = this.courseList.find(
    course =>
      course.label === selectedCourseName
  );

  // Remove old Branch and Candidate Group
  this.studentForm.patchValue({
    branch: null,
    candidateGroup: null
  });

  // Remove old dropdown options
  this.branchList = [];
  this.candidateGroupList = [];

  if (selectedCourse) {
    this.loadBranches(selectedCourse.code);
  }
}


/**
 * Runs when the user selects a different Branch.
 */onBranchChange(): void {
  const selectedBranchName =
    this.studentForm.get('branch')?.value;

  const selectedBranch = this.branchList.find(
    branch =>
      branch.label === selectedBranchName
  );

  this.studentForm.patchValue({
    candidateGroup: null
  });

  this.candidateGroupList = [];

  if (selectedBranch) {
    // No existing selection is passed because user changed Branch
    this.loadCandidateGroups(
      selectedBranch.code
    );
  }
}

  /**
   * Runs when the user changes Country.
   */
  onCountryChange(): void {
    const selectedCountryName =
      this.studentForm.get('country')?.value;

    /*
     * The form stores Country name.
     * Find its complete object to obtain ID.
     */
    const selectedCountry =
      this.countries.find(
        country =>
          country.countryName ===
          selectedCountryName
      );

    // Remove the old State and City values
    this.studentForm.patchValue({
      state: null,
      city: null
    });

    // Remove the old dropdown options
    this.states = [];
    this.cities = [];

    if (selectedCountry) {
      this.loadStates(selectedCountry.id);
    }
  }


  /**
   * Runs when the user changes State.
   */
  onStateChange(): void {
    const selectedStateName =
      this.studentForm.get('state')?.value;

    /*
     * The form stores State name.
     * Find its complete object to obtain ID.
     */
    const selectedState =
      this.states.find(
        state =>
          state.stateName ===
          selectedStateName
      );

    // Remove old City value and options
    this.studentForm.patchValue({
      city: null
    });

    this.cities = [];

    if (selectedState) {
      this.loadCities(selectedState.id);
    }
  }


  /**
   * Enables all fields after clicking Edit.
   */
  enableEditing(): void {
    this.isEditing = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.studentForm.enable();
  }


  /**
   * Sends modified student information
   * through the PUT API.
   */
  updateStudent(): void {
    if (!this.isEditing) {
      return;
    }

    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Includes every form control
    const formValue =
      this.studentForm.getRawValue();

    const requestBody = {
      id: this.studentId,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      dateOfBirth: formValue.dateOfBirth,
      gender: formValue.gender,

      // These values are names, not IDs
      country: formValue.country,
      state: formValue.state,
      city: formValue.city,

      zipCode: formValue.zipCode,
      email: formValue.email,
      mobileNumber: formValue.mobileNumber,
      course: formValue.course,
      branch: formValue.branch,
      candidateGroup:
        formValue.candidateGroup
    };

    console.log(
      'Student update request:',
      requestBody
    );

    this.http.put<any>(
      this.updateApiUrl,
      requestBody
    ).subscribe({
      next: (response: any) => {
        console.log(
          'Student updated successfully:',
          response
        );

        this.saving = false;
        this.isEditing = false;

        // Return form to read-only mode
        this.studentForm.disable();

        this.successMessage =
          response?.message ||
          'Student details updated successfully.';
      },

      error: (error: any) => {
        console.error(
          'Student update failed:',
          error
        );

        this.saving = false;

        if (error.status === 500) {
          this.errorMessage =
            'The server could not update this student.';
        } else {
          this.errorMessage =
            error?.error?.message ||
            'Unable to update student details.';
        }
      }
    });
  }


  /**
   * Cancels editing and restores backend values.
   */
  cancelEditing(): void {
    this.isEditing = false;
    this.successMessage = '';
    this.errorMessage = '';

    this.studentForm.disable();

    // Reload original backend values
    this.loadStudentProfile();
  }


  /**
   * Returns to Student Grid.
   */
  goBack(): void {
    this.router.navigate([
      '/admin/students'
    ]);
  }


  /**
   * Produces initials such as AK.
   */
  get studentInitials(): string {
    const firstName =
      this.studentForm
        ?.get('firstName')
        ?.value ?? '';

    const lastName =
      this.studentForm
        ?.get('lastName')
        ?.value ?? '';

    return (
      firstName.charAt(0) +
      lastName.charAt(0)
    ).toUpperCase();
  }


  /**
   * Produces the complete student name.
   */
  get studentFullName(): string {
    const firstName =
      this.studentForm
        ?.get('firstName')
        ?.value ?? '';

    const lastName =
      this.studentForm
        ?.get('lastName')
        ?.value ?? '';

    return `${firstName} ${lastName}`.trim();
  }
}