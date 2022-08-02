import { CutListPipe } from './cut-list.pipe';

describe('Pipe: CutListPipe', () => {
  const cutListPipe = new CutListPipe();
  it('should not do anything if applypipe is false', () => {
    expect(cutListPipe.transform(['hello'], 12, false)).toEqual(['hello']);
  });
  it('should cut the array', () => {
    expect(cutListPipe.transform([1, 2, 3, 4, 5, 6], 3)).toEqual([1, 2, 3]);
  });
  it('should return the same value if cuttingPoint is bigger than the array length', () => {
    expect(cutListPipe.transform([1, 2, 3, 4, 5, 6], 12)).toEqual([
      1, 2, 3, 4, 5, 6,
    ]);
  });
});
