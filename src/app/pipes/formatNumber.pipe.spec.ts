import { FormatNumberPipe } from './formatNumber.pipe';

describe('Pipe: FormatNumberPipe', () => {
  const formatNumberPipe = new FormatNumberPipe();
  it('should return the number formatted in case of one digit', () => {
    expect(formatNumberPipe.transform(4)).toEqual('004');
  });
  it('should return the number formatted in case of two digits', () => {
    expect(formatNumberPipe.transform(41)).toEqual('041');
  });
  it('should return the number formatted in case of three digits', () => {
    expect(formatNumberPipe.transform(412)).toEqual('412');
  });
});
