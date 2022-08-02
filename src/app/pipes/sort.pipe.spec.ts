import { SortListPipe } from './sort.pipe';

describe('Pipe: SortListPipe', () => {
  const sortListPipe = new SortListPipe();
  it('should sort the array', () => {
    expect(
      sortListPipe.transform([{ id: '9' }, { id: '4' }, { id: '12' }], 'id')
    ).toEqual([{ id: '4' }, { id: '9' }, { id: '12' }]);
  });
  it('should sort the array with a different key', () => {
    expect(
      sortListPipe.transform(
        [{ name: '33' }, { name: '1' }, { name: '12' }],
        'name'
      )
    ).toEqual([{ name: '1' }, { name: '12' }, { name: '33' }]);
  });
});
