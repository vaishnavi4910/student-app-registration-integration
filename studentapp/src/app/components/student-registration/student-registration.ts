import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-registration.html',
  styleUrl: './student-registration.css',

  
})
export class StudentRegistration {

  // STEP 1: store submitted data
  submittedData: any = null;

  // STEP 2: dropdown data
  countries = ['India', 'USA'];

  states: any = {
    India: ['Maharashtra', 'Karnataka', 'Delhi'],
    USA: ['California', 'Texas', 'New York']
  };

  cities: any = {
    Maharashtra: ['Mumbai', 'Pune'],
    Karnataka: ['Bangalore', 'Mysore'],
    Delhi: ['New Delhi'],
    California: ['Los Angeles', 'San Francisco'],
    Texas: ['Houston', 'Dallas'],
    'New York': ['New York City']
  };

  courseList = ['B.Tech', 'M.Tech', 'MBA', 'MCA', 'BCA'];
  branchList = ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil'];

  // STEP 3: form variable (IMPORTANT FIX)
  studentForm!: FormGroup;

  // STEP 4: constructor (SAFE initialization)
  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  // STEP 5: form creation function (BEST PRACTICE)
  initializeForm() {
    this.studentForm = this.fb.group({

      firstName: [
        '',
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern(/^[A-Za-z ]+$/)
        ]
      ],

      lastName: [
        '',
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern(/^[A-Za-z ]+$/)
        ]
      ],

      dob: ['', Validators.required],
      gender: ['', Validators.required],

      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],

      zipCode: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{1,10}$/)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
        ]
      ],

      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/)
        ]
      ],

      course: ['', Validators.required],
      branch: ['', Validators.required],

      file: [null, Validators.required]
    });
  }

  // STEP 6: country change
  onCountryChange() {
    this.studentForm.patchValue({
      state: '',
      city: ''
    });
  }

  // STEP 7: state change
  onStateChange() {
    this.studentForm.patchValue({
      city: ''
    });
  }

  // STEP 8: file upload validation
  onFileSelect(event: any) {
    const file = event.target.files[0];

    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];

      if (!allowedTypes.includes(file.type)) {
        alert('Only PDF, DOC, DOCX files allowed');
        this.studentForm.patchValue({ file: null });
        return;
      }

      this.studentForm.patchValue({ file: file });
    }
  }

  // STEP 9: submit form
  onSubmit() {
    if (this.studentForm.valid) {
      this.submittedData = this.studentForm.value;
      console.log('Student Data:', this.submittedData);
    } else {
      this.studentForm.markAllAsTouched();
    }
  }


// onSubmit() {
//   if (this.studentForm.valid) {

//     const form = this.studentForm.value;

//     const payload = {
//       name: form.firstName + ' ' + form.lastName,
//       email: form.email,
//       department: form.branch,
//       age: this.calculateAge(form.dob)
//     };

//     this.studentService.addStudent(payload).subscribe({
//       next: (res) => {
//         console.log('Saved successfully', res);
//         this.submittedData = res;
//         alert('Student Saved Successfully!');
//       },
//       error: (err) => {
//         console.error('Error:', err);
//         alert('Something went wrong!');
//       }
//     });

//   } else {
//     this.studentForm.markAllAsTouched();
//   }
// }






  // STEP 10: reset form
  onReset() {
    this.studentForm.reset();
    this.submittedData = null;
  }
}