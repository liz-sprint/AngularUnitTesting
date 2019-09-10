import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

describe('HeroesComponent (deep test)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;


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
                HeroComponent
            ],
            providers: [
                {
                    provide: HeroService,
                    useValue: mockHeroService
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should render each hero as a heroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // run ngOnInit
        fixture.detectChanges();

        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDEs.length).toEqual(3);

        // expect(heroComponentDEs[0].componentInstance.hero.name).toEqual('SpiderWoman');
        // expect(heroComponentDEs[1].componentInstance.hero.name).toEqual('AquaMan');
        // expect(heroComponentDEs[2].componentInstance.hero.name).toEqual('SuperWoman');

        for (let i = 0; i < heroComponentDEs.length; i++) {
            expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    });
});
