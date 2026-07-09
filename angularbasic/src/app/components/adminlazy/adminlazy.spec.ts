import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminlazy } from './adminlazy';

describe('Adminlazy', () => {
  let component: Adminlazy;
  let fixture: ComponentFixture<Adminlazy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminlazy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminlazy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
