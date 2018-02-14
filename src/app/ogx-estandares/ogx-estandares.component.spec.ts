import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OgxEstandaresComponent } from './ogx-estandares.component';

describe('OgxEstandaresComponent', () => {
    let component: OgxEstandaresComponent;
    let fixture: ComponentFixture<OgxEstandaresComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OgxEstandaresComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OgxEstandaresComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
