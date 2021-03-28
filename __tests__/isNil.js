import { isNil } from '../src/js/utils/utils';
test('Data null or undefined', () => {
  expect(isNil(null)).toBe(true);
});
