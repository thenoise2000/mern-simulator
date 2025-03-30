import { calculateSimpleInterest, calculateCompoundInterest, calculateFee } from './calculations';

describe('calculations', () => {
    it('should calculate simple interest correctly', () => {
        const result = calculateSimpleInterest(1000, 1, 3);
        expect(result).toEqual([
            { month: 1, profit: 10, total: 1010 },
            { month: 2, profit: 10, total: 1020 },
            { month: 3, profit: 10, total: 1030 },
        ]);
    });

    it('should calculate compound interest correctly', () => {
        const result = calculateCompoundInterest(1000, 1, 3);
        expect(result).toEqual([
            { month: 1, profit: 10, total: 1010 },
            { month: 2, profit: 10.1, total: 1020.1 },
            { month: 3, profit: 10.201, total: 1030.301 },
        ]);
    });

    it('should calculate fee correctly for different amounts', () => {
        expect(calculateFee(500)).toBe(0.02);
        expect(calculateFee(5000)).toBe(0.01);
        expect(calculateFee(20000)).toBe(0.005);
        expect(calculateFee(100000)).toBe(0.0025);
    });
});