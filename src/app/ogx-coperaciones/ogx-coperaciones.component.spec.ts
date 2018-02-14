import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OgxCoperacionesComponent } from './ogx-coperaciones.component';

describe('OgxCoperacionesComponent', () => {
    let component: OgxCoperacionesComponent;
    let fixture: ComponentFixture<OgxCoperacionesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OgxCoperacionesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OgxCoperacionesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
