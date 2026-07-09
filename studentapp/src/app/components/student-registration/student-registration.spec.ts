import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegistration } from './student-registration';

describe('StudentRegistration', () => {
  let component: StudentRegistration;
  let fixture: ComponentFixture<StudentRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
