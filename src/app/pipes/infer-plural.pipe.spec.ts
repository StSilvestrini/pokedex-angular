import { InferPluralPipe } from './infer-plural.pipe';

describe('Pipe: InferPluralPipe', () => {
  const inferPluralPipe = new InferPluralPipe();
  it('should return the correct plural if the word ends with y', () => {
    expect(inferPluralPipe.transform('ability')).toEqual('abilities');
  });
  it('should return the correct plural if the word ends with anything but y', () => {
    expect(inferPluralPipe.transform('whatever')).toEqual('whatevers');
  });
});
