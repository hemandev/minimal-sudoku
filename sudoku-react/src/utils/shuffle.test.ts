import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('returns an array of same length after shuffle', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle(arr);
    
    expect(result).toHaveLength(5);
  });

  it('returns an array with same elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle(arr);

    expect(result).toContain(1);
    expect(result).toContain(2);
    expect(result).toContain(3);
    expect(result).toContain(4);
    expect(result).toContain(5);
  });
});
