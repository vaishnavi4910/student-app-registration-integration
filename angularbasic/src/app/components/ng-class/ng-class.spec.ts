import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgClass } from './ng-class';

describe('NgClass', () => {
  let component: NgClass;
  let fixture: ComponentFixture<NgClass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgClass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgClass);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
