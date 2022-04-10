import { expect, describe, it } from 'vitest';
import Verify from '../index';

describe('verify isEquals', () => {
  it('error - 3 must be == "3"', () => {
    try {
      Verify(3).isEquals('3');
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('3 must be == 3');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - string must be == aString', () => {
    try {
      Verify('string').isEquals('aString');
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('string must be == aString');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - string must be == aString - custom name', () => {
    try {
      Verify('string').isEquals('aString', { compareName: 'another string' });
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('string must be == another string');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - 3 must be == 4', () => {
    const target = 3;
    const compare = '4';
    const { value, failed, error, type, steps, compared } = Verify(target, {
      soft: true,
    })
      .isNumber()
      .isEquals(compare);
    expect(compared).to.eq(compared);
    expect(value).to.eq(target);
    expect(failed).to.be.true;
    expect(error).to.eq('3 must be == 4');
    expect(type).to.eq('number');
    expect(steps('isEquals')).to.be.false;
  });
  it('error - 3 must be == 2.999999999999999999', () => {
    const target = 3;
    const compare = '2.999999999999999999';
    const { value, failed, error, type, steps, compared } = Verify(target, {
      soft: true,
    })
      .isNumber()
      .isEquals(compare);
    expect(compared).to.eq(compared);
    expect(value).to.eq(target);
    expect(failed).to.be.true;
    expect(error).to.eq(`${target} must be == ${compare}`);
    expect(type).to.eq('number');
    expect(steps('isEquals')).to.be.false;
  });
  it('pass - 3 === 3', () => {
    const target = 3;
    const compare = '3';
    const { value, error, type, steps } = Verify(target)
      .isNumber()
      .isEquals(compare);
    expect(value).to.eq(target);
    expect(error).to.be.false;
    expect(type).to.eq('number');
    expect(steps('isEquals')).to.be.true;
  });
});
