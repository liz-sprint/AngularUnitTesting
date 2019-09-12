import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe(('HeroDetailComponent'), () => {
    let fixture: ComponentFixture<HeroDetailComponent>;
    let mockActivatedRoute, mockHeroService, mockLocation;

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);
        mockActivatedRoute = { snapshot: { paramMap : { get: () => '3'}}};

        TestBed.configureTestingModule({
            imports: [FormsModule], // Can't bind to 'ngModel' since it isn't a known property of 'input'. ("
            declarations: [ HeroDetailComponent],
            providers:
            [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: Location, useValue: mockLocation },
                { provide: HeroService, useValue: mockHeroService }
            ]
        });

        fixture = TestBed.createComponent(HeroDetailComponent);

        mockHeroService.getHero.and.returnValue(of({id: 2, name: 'WonderWoman', strength: 30}));
    });

    it ('should renter Hero name in H2 tag', () => {
        fixture.detectChanges();
        
        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('WONDERWOMAN');
    });
});
