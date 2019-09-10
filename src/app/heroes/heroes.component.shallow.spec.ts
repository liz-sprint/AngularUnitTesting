import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';

describe('HeroesComponent (shallow test)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    @Component({
        selector: 'app-hero',
        template: '<div></div>'
      })
     class FakeHeroComponent {
        @Input() hero: Hero;
    }

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        HEROES = [
            {id: 1, name: 'SpiderWoman', strength: 8},
            {id: 2, name: 'AquaMan', strength: 13},
            {id: 4, name: 'SuperWoman', strength: 18}
        ];

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                FakeHeroComponent
            ],
            // schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {
                    provide: HeroService,
                    useValue: mockHeroService
                }
            ]
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should set heroes correctly from service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    });

    it('should create one li for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    });

});
