import path from 'path';
import fs from 'fs';
import prettier from "prettier"
import { transformFileSync } from '@babel/core';

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

const clean = s => prettier.format(trim(s), { parser: "babel" });

describe('The copy-jsx-attribute plugin copies one attribute to another', () => {
  const fixturesDir = path.join(__dirname, 'fixtures');
  fs.readdirSync(fixturesDir).map((caseName) => {
    it(`should ${caseName.split('-').join(' ')}`, () => {
      const fixtureDir = path.join(fixturesDir, caseName);
      const actualPath = path.join(fixtureDir, 'actual.jsx');
      const actual = transformFileSync(actualPath).code;

      const expected = fs.readFileSync(
          path.join(fixtureDir, 'expected.jsx')
      ).toString();

      expect(clean(actual)).toEqual(clean(expected));
    });
  });
});
