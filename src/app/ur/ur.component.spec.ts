import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrComponent } from './ur.component';

describe('UrComponent', () => {
    let component: UrComponent;
    let fixture: ComponentFixture<UrComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UrComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UrComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
