import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcxEstandaresComponent } from './icx-estandares.component';

describe('IcxEstandaresComponent', () => {
  let component: IcxEstandaresComponent;
  let fixture: ComponentFixture<IcxEstandaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcxEstandaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcxEstandaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
