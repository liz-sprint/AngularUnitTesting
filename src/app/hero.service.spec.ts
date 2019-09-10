import { TestBed, inject } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HeroService', () => {

    const mockMessageService = jasmine.createSpyObj(['add']);
    let httpTestingControler: HttpTestingController;
    let service: HeroService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                HeroService,
                {
                    provide: MessageService,
                    useValue: mockMessageService
                }
            ]
        });

        httpTestingControler = TestBed.get(HttpTestingController);
        service = TestBed.get(HeroService);

    });

    describe('getHero', () => {

        it('should get with the correct URL', () => {
            service.getHero(4).subscribe();
            // service.getHero(3).subscribe();

            const request = httpTestingControler.expectOne('api/heroes/4');
            request.flush({id: 4, name: 'SuperWoman', strength: 100 });
            httpTestingControler.verify();
        });

    });

    describe('getHeroes', () => {
        it('should load all heroes', () => {
            service.getHeroes().subscribe();

            const request = httpTestingControler.expectOne('api/heroes');
            request.flush([{id: 4, name: 'SuperWoman', strength: 100 }, {id: 5, name: 'SuperWoman2', strength: 200 }]);
            httpTestingControler.verify();
        });
    });

    describe('getHeroNo404', () => {
        it('should return undefined', () => {
            service.getHeroNo404(2).subscribe();

            const request = httpTestingControler.expectOne('api/heroes/?id=2');
            request.flush({});
            httpTestingControler.verify();
        });
    });

    describe('searchHeroes', () => {
        it('should search hero by name', () => {
            service.searchHeroes('SuperWoman').subscribe();

            const request = httpTestingControler.expectOne('api/heroes/?name=SuperWoman');
            request.flush({id: 4, name: 'SuperWoman', strength: 100 });
            httpTestingControler.verify();
        });
    });

    describe('addHero', () => {
        it('should new hero object', () => {
            service.addHero({id: 11, name: 'SuperWoman', strength: 100}).subscribe();

            const request = httpTestingControler.expectOne('api/heroes');
            httpTestingControler.verify();
        });
    });

    describe('deleteHero', () => {
        it('should remove hero from object', () => {
            service.deleteHero(3).subscribe();

            const request = httpTestingControler.expectOne('api/heroes/3');
            httpTestingControler.verify();
        });
    });

    describe('updateHero', () => {
        it('should update hero in object', () => {
            service.deleteHero({id: 11, name: 'SuperWoman', strength: 100}).subscribe();

            const request = httpTestingControler.expectOne('api/heroes/11');
            httpTestingControler.verify();
        });
    });
});
