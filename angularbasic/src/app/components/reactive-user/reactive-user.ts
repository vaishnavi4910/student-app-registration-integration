import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Api } from '../../service/api';

@Component({
  selector: 'app-reactive-user',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-user.html',
  styleUrl: './reactive-user.css',
})
export class ReactiveUser implements OnInit {

  private api = inject(Api);
  private fb = inject(FormBuilder);

  userList: any[] = [];

  userForm: FormGroup = this.fb.group({

    userId: [0],

    emailId: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._-]+@[a-zA-Z.-]+\\.[a-zA-Z]{2,}')
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)
      ]
    ],

    fullName: [
      '',
      [
        Validators.required
      ]
    ],

    mobileNo: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]
    ],

    // FormArray
    skills: this.fb.array([
      this.fb.control('')
    ])

  });


  ngOnInit(): void {
    this.getUsers();
  }

  // Getter for FormArray
  get skills(): FormArray {
    return this.userForm.get('skills') as FormArray;
  }

  // Add new skill
  addSkill() {
    this.skills.push(this.fb.control(''));
  }

  // Remove a skill
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  getUsers() {
    this.api.getUsers().subscribe((result: any) => {
      this.userList = result;
      console.log(this.userList);
    });
  }

  onSaveUser() {

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    console.log(this.userForm.value);

    this.api.createUser(this.userForm.value).subscribe({

      next: () => {

        alert('User created successfully');

        this.getUsers();

        this.onReset();

      },

      error: (err) => {

        alert('User creation failed');
        console.log(err);

      }

    });

  }

  onReset() {

    this.userForm.reset({
      userId: 0,
      emailId: '',
      password: '',
      fullName: '',
      mobileNo: ''
    });

    // Clear all skills
    this.skills.clear();

    // Add one empty skill field again
    this.addSkill();

  }

}