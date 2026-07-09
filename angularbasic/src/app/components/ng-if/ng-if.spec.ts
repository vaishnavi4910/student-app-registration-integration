import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgIf } from './ng-if';

describe('NgIf', () => {
  let component: NgIf;
  let fixture: ComponentFixture<NgIf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgIf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgIf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
