/**
 * Created on 15-Sep-18.
 */
import getNextPageUrl from './getNextPageUrl';

describe('getNextPageUrl()', () => {
  describe('when `response` argument does not have `link` property', () => {
    it('returns null', () => {
      const response = {headers: {link: undefined}};
      expect(getNextPageUrl(response)).toBe(null);
    });
  });

  describe('when `response` argument has `link` property', () => {
    describe('when `link` string does not contain `next` attribute', () => {
      it('returns null', () => {
        const response = {headers: {link: 'www.linkdoesnotcontainnext.com'}};
        expect(getNextPageUrl(response)).toBe(null);
      });
    });

    describe('when `link` string contains `next` attribute', () => {
      it('extracts `next` link', () => {
        const response = {
          headers: {
            link: '<https://api.github.com/user/repos?page=3&per_page=100>; rel="next",\n' +
            '  <https://api.github.com/user/repos?page=50&per_page=100>; rel="last"'
          }
        };
        expect(getNextPageUrl(response)).toBe('https://api.github.com/user/repos?page=3&per_page=100');
      });
    });
  });
});
