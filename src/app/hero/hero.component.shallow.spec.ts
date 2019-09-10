import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe ('HeroComponent (shallow test)', () => {

    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroComponent);

    });

    it ('should have correct hero', () => {
        fixture.componentInstance.hero = { id: 2, name: 'superWoman', strength: 10 };

        expect(fixture.componentInstance.hero.name).toEqual('superWoman');
    });

    it ('should render hero name in <a> tag', () => {
        fixture.componentInstance.hero = { id: 4, name: 'superWoman', strength: 12 };
        fixture.detectChanges();

        const deA = fixture.debugElement.query(By.css('a'));
        expect(deA.nativeElement.textContent).toContain('superWoman');

        // expect(fixture.nativeElement.querySelector('a').textContent).toContain('superWoman');
    });
});
