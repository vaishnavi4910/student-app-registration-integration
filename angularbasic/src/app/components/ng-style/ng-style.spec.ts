import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgStyle } from './ng-style';

describe('NgStyle', () => {
  let component: NgStyle;
  let fixture: ComponentFixture<NgStyle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgStyle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgStyle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
