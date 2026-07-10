import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

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
    DividerModule
  ],
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


  private fb = inject(FormBuilder);
  private router = inject(Router);
  private api = inject(Api);

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

    candidateGroup: ['', Validators.required],

    file: [null, Validators.required],




  });
  console.log('Register component loaded');

  this.loadCountries();
  this.loadCourses();
 



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




loadCountries(){

  this.api.getCountries()
  .subscribe({

    next:(response:any)=>{
      console.log("Countries:",response);
      this.countries = response;

    },

    error:(error)=>{

      console.error("Error loading countries",error);

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
  

 onStateChange() {

  const stateId = this.studentForm.get('state')?.value;

console.log("Selected State ID:", stateId);

this.loadCities(stateId);
 
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
  'text/css',
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

onSubmit() {

  if (this.studentForm.invalid) {
    this.studentForm.markAllAsTouched();
    return;
  }

  const formValue = this.studentForm.value;

  const requestBody = {

    firstName: formValue.firstName,
    lastName: formValue.lastName,

    dateOfBirth: formValue.dob,
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
    )?.label


  };

  console.log("Final Request Body:", requestBody);


this.api.onCreateAccount(requestBody)
  .subscribe({

    next:(response:any)=>{

      console.log("Registration Success:", response);

      console.log("Going to login page");

      this.router.navigate(['/login']);

    },

    error:(error:any)=>{
      console.error("Registration Failed:", error);
    }

  });

  }

  onReset() {

    this.studentForm.reset();

    this.submittedData = null;

  }

onSubmiit(){
  const formValue = this.studentForm.value;
}









  

  register() {
    this.router.navigate(['/login']);
  }









}