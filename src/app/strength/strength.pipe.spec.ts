import { StrengthPipe } from './strength.pipe';

describe('Testing pipe', () => {
    it('should call week', () => {
        const pipe = new StrengthPipe;

        const val = pipe.transform(2);

        expect(val).toBe('2 (weak)');
    });

    it('should call strong', () => {
        const pipe = new StrengthPipe;

        expect(pipe.transform(12)).toBe('12 (strong)');
    });

    it('should call unbelievable', () => {
        const pipe = new StrengthPipe;

        expect(pipe.transform(22)).toBe('22 (unbelievable)');
    });
});
