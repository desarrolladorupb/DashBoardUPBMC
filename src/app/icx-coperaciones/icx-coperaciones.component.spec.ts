import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcxCoperacionesComponent } from './icx-coperaciones.component';

describe('IcxCoperacionesComponent', () => {
  let component: IcxCoperacionesComponent;
  let fixture: ComponentFixture<IcxCoperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcxCoperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcxCoperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
