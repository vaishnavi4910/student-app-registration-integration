import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,

} from '@angular/forms';
// ================= PASSWORD STEP: RouterLink import =================
import { Router, RouterLink } from '@angular/router';
// ================= SUCCESS TOAST IMPORTS =================
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { Api } from '../../services/api';
// ================= PASSWORD STEP: PrimeNG password =================
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DatePickerModule,
    SelectModule,
    RadioButtonModule,
    CheckboxModule,
    CardModule,
    DividerModule,
    ToastModule,
    

  // ================= PASSWORD STEP: Added modules =================
  PasswordModule,
  RouterLink,
    
    NavbarComponent
  ],


// ================= TOAST FUNCTIONALITY: PROVIDER =================
// Allows Angular to create MessageService for this component.
  providers: [MessageService],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  
countries:any[] = [];
states:any[] = [];

cities:any[] = [];

courseList: any[] = [];
branchList: any[] = [];
candidateGroupList: any[]=[];
formSubmitted = false;



// ================= MOBILE API VALIDATION =================
mobileStatusMessage = '';
mobileAlreadyExists = false;
checkingMobile = false;




// ================= REGISTRATION STEP CONTROL =================
// Step 1 displays personal information.
// Step 2 displays password fields.
currentStep: 1 | 2 = 1;

// Only these fields are checked when the user clicks Next.
// Password fields are not checked until Step 2.
private readonly registrationControlNames = [
  'firstName',
  'lastName',
  'dob',
  'gender',
  'country',
  'state',
  'city',
  'zipCode',
  'email',
  'mobile',
  'course',
  'branch',
  'candidateGroup'
];

private fb = inject(FormBuilder);
private router = inject(Router);
private api = inject(Api);
// ================= TOAST FUNCTIONALITY: SERVICE =================
// Used to send success messages to <p-toast>.
private messageService = inject(MessageService);

submittedData: any = null;
studentForm!: FormGroup;




ngOnInit(): void {

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

    gender: ['Male', Validators.required],

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
    Validators.pattern(/^[6-9][0-9]{9}$/)
  ]
],
    course: ['', Validators.required],

    branch: ['', Validators.required],

    candidateGroup: ['', Validators.required],

file: [null],

// ================= PASSWORD STEP: Form controls =================
password: [
  '',
  [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/
    )
  ]
],

confirmPassword: ['', Validators.required]
// ================= END PASSWORD CONTROLS =================



  });
  console.log('Register component loaded');

  this.loadCountries();
  this.loadCourses();
 



}



// loadCountries(): void {
//   this.api.getCountries().subscribe({
//     next: (response: any) => {
//       this.countries = response;

//       const india = this.countries.find(
//         (country: any) =>
//           country.countryName?.toLowerCase() === 'india'
//       );

//       if (india) {
//         this.studentForm.patchValue({
//           country: india.id
//         });

//         this.loadStates(india.id);
//       }
//     },

//     error: (error) => {
//       console.error('Error loading countries', error);
//     }
//   });
// }


loadCountries():void{
  this.api.getCountries().subscribe({
    next: (response : any)=>{
      this.countries= response;
      
      const india=this.countries.find(
        (country: any)=>country.countryName?.toLowerCase() == "india"
      );

      if(india){
        this.studentForm.patchValue({
          country: india.id
        });
        this.loadStates(india.id);
      }

    },



  error: (error) => {
      console.error('Error loading countries', error);
    }
  })
}









loadStates(CountryId: number): void {

  this.api.getStates(CountryId).subscribe({

    next:(response:any)=>{

      console.log("state API Response:", response);
      console.log("Calling states API with Country ID:", CountryId);

      this.states = response;

    },

    error:(error)=>{

      console.error("Error loading states:", error);

    }

  });

}
















onCountryChange() {

  const countryId = this.studentForm.get('country')?.value;

  console.log("Selected country ID:", countryId);

  // clear old state and city
  this.studentForm.patchValue({
    state: null,
    city: null
  });

  this.states = [];
  this.cities = [];

  this.loadStates(countryId);
}
  

onStateChange(): void {
  const stateId = this.studentForm.get('state')?.value;

  console.log('Selected State ID:', stateId);

  // Remove previously selected city
  // this.studentForm.get('city')?.reset(null);

    this.studentForm.patchValue({
    city: null
  });

  // Remove previous city options
  this.cities = [];

  // if (stateId) {
    this.loadCities(stateId);
  // }
}


loadCities(stateId: number){
 
 this.api.getCities(stateId)
 .subscribe({

   next:(response:any)=>{

      console.log("Cities:", response);
      console.log("Calling city API with stateId:", stateId);

      this.cities = response;

   },

   error:(error)=>{

      console.log(error);

   }

 });

}


loadCourses(){

  this.api.getCourses()
  .subscribe({

    next:(response:any)=>{

      console.log("CCourses:",response);

      this.courseList = response;

    },

    error:(error)=>{

      console.error("Error loading courss",error);

    }

  });

}



loadBranches(courseCode: string) {

  console.log("Calling Branch API:", courseCode);

  this.api.getBranches(courseCode).subscribe({

    next: (response: any) => {

      console.log("Branches:", response);

      this.branchList = response;

    },

    error: (error) => {

      console.error(error);

    }

  });

}




  onCourseChange() {

  console.log("Course Changed");

  console.log(this.studentForm.value);
  const courseCode = this.studentForm.get('course')?.value;

  console.log("Selected Course Code:", courseCode);

  this.studentForm.patchValue({
  branch: null,
  candidateGroup: null
});
 this.branchList= [];
  this.candidateGroupList = [];

  this.loadBranches(courseCode);

}


onBranchChange() {

  const branchCode = this.studentForm.get('branch')?.value;

  console.log("Selected Course Code:",branchCode );

  this.loadCandidateGroup(branchCode);

}



loadCandidateGroup(branchCode: string) {

  console.log("Calling Branch API:", branchCode);

  this.api.getCandidateGroup(branchCode).subscribe({

    next: (response: any) => {

      console.log("Branches:", response);

      this.candidateGroupList = response;

    },

    error: (error) => {

      console.error(error);

    }

  });

}



  onFileSelect(event: any) {

    const file = event.target.files[0];

    if (file) {

     const allowedTypes = [
  'application/pdf',
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
];

      if (!allowedTypes.includes(file.type)) {
        alert('Only PDF, DOC and DOCX files are allowed.');
        this.studentForm.patchValue({ file: null });
        return;
      }

      this.studentForm.patchValue({
        file: file
      });
    }
  }



// ================= STEP 1: NEXT BUTTON =================
// ================= STEP 1: NEXT BUTTON =================
goToPasswordStep(): void {
  console.log('Next button clicked');

  this.formSubmitted = true;

  const registrationIsInvalid =
    this.registrationControlNames.some(controlName => {
      const control = this.studentForm.get(controlName);

      // Shows which registration field is invalid
      if (control?.invalid) {
        console.log(
          'Invalid field:',
          controlName,
          'Value:',
          control.value,
          'Errors:',
          control.errors
        );
      }

      return control?.invalid;
    });

  if (registrationIsInvalid) {
    this.registrationControlNames.forEach(controlName => {
      this.studentForm.get(controlName)?.markAsTouched();
    });

    console.log('Password step blocked because form is invalid');
    return;
  }

  // Registration fields are valid
  this.formSubmitted = false;
  this.currentStep = 2;

  console.log('Current step:', this.currentStep);
}

// ================= STEP 2: BACK BUTTON =================
goBackToRegistration(): void {
  // Form values are not reset, so entered information remains available.
  this.currentStep = 1;
}


// ================= PASSWORD MATCH CHECK =================
get passwordsMatch(): boolean {
  const password =
    this.studentForm.get('password')?.value;

  const confirmPassword =
    this.studentForm.get('confirmPassword')?.value;

  return (
    !!password &&
    !!confirmPassword &&
    password === confirmPassword
  );
}


// ================= CREATE ACCOUNT BUTTON STATE =================
get canCreateAccount(): boolean {
  return (
    this.studentForm.get('password')?.valid === true &&
    this.studentForm.get('confirmPassword')?.valid === true &&
    this.passwordsMatch
  );
}

onSubmit(): void {
  this.formSubmitted = true;

  // ================= FINAL PASSWORD VALIDATION =================
// ================= FINAL FORM AND PASSWORD VALIDATION =================
// Check the entire registration form again before calling the POST API.
if (this.studentForm.invalid || !this.canCreateAccount) {
  this.studentForm.markAllAsTouched();
  return;
}

  const formValue = this.studentForm.value;
  const dob: Date = formValue.dob;

const formattedDob =
  `${dob.getFullYear()}-` +
  `${String(dob.getMonth() + 1).padStart(2, '0')}-` +
  `${String(dob.getDate()).padStart(2, '0')}`;

  const requestBody = {

    firstName: formValue.firstName,
    lastName: formValue.lastName,

    dateOfBirth: formattedDob,
    gender: formValue.gender,

    country: this.countries.find(
      (c:any) => c.id === formValue.country
    )?.countryName,

    state: this.states.find(
      (s:any) => s.id === formValue.state
    )?.stateName,

    city: this.cities.find(
      (c:any) => c.id === formValue.city
    )?.cityName,

    zipCode: formValue.zipCode,

    email: formValue.email,

    mobileNumber: formValue.mobile,

    course: this.courseList.find(
      (c:any) => c.code === formValue.course
    )?.label,

    branch: this.branchList.find(
      (b:any) => b.code === formValue.branch
    )?.label,

    candidateGroup: this.candidateGroupList.find(
      (cg:any) => cg.code === formValue.candidateGroup
    )?.label , 



// ================= PASSWORD SENT TO POST API =================
password: formValue.password

  };

  console.log("Final Request Body:", requestBody);


this.api.onCreateAccount(requestBody)
  .subscribe({

    next: (response: any) => {
  console.log('Registration successful:', response);

  this.formSubmitted = false;
  this.studentForm.reset();
    // ================= SHOW SUCCESS TOAST =================
      this.messageService.add({
        severity: 'success',
        summary: 'Registration Successful',

        // Use the backend message when available.
        detail:
          response?.message ||
          'Your account has been created successfully.',

        // Toast remains visible for 5 seconds.
        life: 5000
      });

      // ================= NAVIGATE AFTER 5 SECONDS =================
      // Wait for the toast to finish before leaving this page.
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 5000);
    },

    // ================= ERROR RESPONSE =================
    error: (error: any) => {
      console.error('Registration failed:', error);
      console.error('Backend error body:', error.error);
      console.error('HTTP status:', error.status);
    }

  });

  }

//  onReset(): void {
//   const india = this.countries.find(
//     country =>
//       country.countryName?.toLowerCase() === 'india'
//   );

//   this.studentForm.reset({
//     gender: 'Male',
//     country: india?.id ?? null
//   });

//   this.states = [];
//   this.cities = [];
//   this.branchList = [];
//   this.candidateGroupList = [];

//   if (india) {
//     this.loadStates(india.id);
//   }
// }











onReset():void{
  const india = this.countries.find(
    country => country.countryName?.toLowerCase()=== 'india'
  );

  this.studentForm.reset({
    gender :'Male',
    country: india?.id??null
  });
  // ================= RESET REGISTRATION STEP =================
  this.currentStep = 1;
  this.formSubmitted = false;
  this.states = [];
  this.cities = [];
  this.branchList = [];
  this.candidateGroupList = [];

  if(india){
    this.loadStates(india.id);
  }

}


onSubmiit(){
  const formValue = this.studentForm.value;
}









  

  register() {
    this.router.navigate(['/login']);
  }


  getNameError(controlName: 'firstName' | 'lastName'): string {
  const control = this.studentForm.get(controlName);

  const fieldName =
    controlName === 'firstName'
      ? 'First name'
      : 'Last name';

  if (!control?.touched || !control.errors) {
    return '';
  }

  if (control.hasError('required')) {
    return `${fieldName} is required.`;
  }

  if (control.hasError('maxlength')) {
    return `${fieldName} cannot contain more than 40 characters.`;
  }

  if (control.hasError('pattern')) {
    return `${fieldName} must contain only letters and spaces.`;
  }

  return '';
}





getMobileError(): string {
  const control = this.studentForm.get('mobile');
  const value = control?.value ?? '';

  if (!control?.touched && !control?.dirty) {
    return '';
  }

  if (!value) {
    return 'Mobile number is required.';
  }

  if (!/^[6-9]/.test(value)) {
    return 'Mobile number must start with 6, 7, 8 or 9.';
  }

  if (value.length < 10) {
    return 'Mobile number must contain exactly 10 digits.';
  }

  if (!/^[0-9]+$/.test(value)) {
    return 'Mobile number must contain only digits.';
  }

  return '';
}





checkEmailExists(): void {
  const emailControl = this.studentForm.get('email');
  const email = emailControl?.value?.trim();

  // Don't call API for empty or incorrectly formatted email
  if (
    !email ||
    emailControl?.hasError('required') ||
    emailControl?.hasError('pattern')
  ) {
    return;
  }

this.api.validateEmail(email).subscribe({
  next: (response: any) => {
    console.log('Email validation response:', response);

    if (response.status === true) {
      emailControl?.setErrors({
        ...(emailControl.errors ?? {}),
        emailExists: true
      });

      console.log('Email already exists');
    } else {
      const errors = { ...(emailControl?.errors ?? {}) };

      delete errors['emailExists'];

      emailControl?.setErrors(
        Object.keys(errors).length > 0 ? errors : null
      );

      console.log('Email is available');
    }
  },

  error: (error: any) => {
    console.error('Email validation failed:', error);
  }
});
}









checkMobile(): void {
  const mobileControl = this.studentForm.get('mobile');
  const mobileNumber = mobileControl?.value;

  // Clear the previous API message
  this.mobileStatusMessage = '';
  this.mobileAlreadyExists = false;

  // Do not call the API when mobile validation fails
  if (!mobileNumber || mobileControl?.invalid) {
    return;
  }

  this.checkingMobile = true;

  this.api.validateMobile(mobileNumber).subscribe({
    next: (response: any) => {
      console.log('Mobile validation response:', response);

      this.checkingMobile = false;
      this.mobileStatusMessage = response.message;

      // status true means the mobile number already exists
      this.mobileAlreadyExists = response.status;

      if (response.status) {
        mobileControl.setErrors({
          ...mobileControl.errors,
          mobileExists: true
        });
      }
    },

    error: (error: any) => {
      console.error('Mobile validation failed:', error);

      this.checkingMobile = false;
      this.mobileStatusMessage =
        'Unable to validate mobile number.';
    }
  });
}


}