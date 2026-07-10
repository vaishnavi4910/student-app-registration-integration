import { ComponentFixture, TestBed } from '@angular/core/testing';

import {NavbarComponent } from './navbar';

describe('Navbar', () => {
  let component: NavbarComponent ;
  let fixture: ComponentFixture<NavbarComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
