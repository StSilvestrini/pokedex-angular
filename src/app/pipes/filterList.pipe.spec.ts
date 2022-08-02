import { FilterListPipe } from './filterList.pipe';

describe('Pipe: FilterListPipe', () => {
  const filterListPipe = new FilterListPipe();
  const pokemonsArray = [
    { name: 'bulbasaur' },
    { name: 'ivysaur' },
    { name: 'venusaur' },
  ];
  it('should not do anything if there is no search query', () => {
    expect(filterListPipe.transform(pokemonsArray, '')).toEqual(pokemonsArray);
  });
  it('should not do anything if the array is empty', () => {
    expect(filterListPipe.transform([], 'bulba')).toEqual([]);
  });
  it('should not do anything if the startSearch is higer than the array length', () => {
    expect(filterListPipe.transform(pokemonsArray, 'bulba', 10)).toEqual(
      pokemonsArray
    );
  });
  it('should pick just the correct element in the array', () => {
    expect(filterListPipe.transform(pokemonsArray, 'bulba')).toEqual([
      { name: 'bulbasaur' },
    ]);
  });
  it('should return an empty array if there are no matches', () => {
    expect(filterListPipe.transform(pokemonsArray, 'charme')).toEqual([]);
  });
});
