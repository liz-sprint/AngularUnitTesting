import { HeroesComponent } from './heroes.component';
// tslint:disable-next-line:import-blacklist
import { of } from 'rxjs';

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            {id: 1, name: 'SpiderWoman', strength: 8},
            {id: 2, name: 'AquaMan', strength: 13},
            {id: 4, name: 'SuperWoman', strength: 18}
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        component = new HeroesComponent(mockHeroService);
    });

    describe('delete', () => {
        it('should remove the inicated Hero from hero list ', () => {
            mockHeroService.deleteHero.and.returnValue(of(true)); // TO FIX --- TypeError: Cannot read property 'subscribe' of undefined
            component.heroes = HEROES;

            component.deleteFromParent(HEROES[2]);

            // expect(component.heroes.length).toBe(2);
            expect(component.heroes).toEqual([{id: 1, name: 'SpiderWoman', strength: 8},
            {id: 2, name: 'AquaMan', strength: 13}]);
        });

        it('should call deleteHero', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;

            component.deleteFromParent(HEROES[2]);

            // expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith({id: 4, name: 'SuperWoman', strength: 18});
        });
    });

});
