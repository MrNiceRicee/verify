import { expect, describe, it } from 'vitest';
import Verify from '../index';

describe('verify isNumber', () => {
  it('error - string', () => {
    try {
      Verify('string').isNumber();
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('string must be a number');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - boolean', () => {
    try {
      Verify(true, { name: 'bool' }).isNumber();
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('bool must be a number');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - custom', () => {
    try {
      Verify(true, { name: 'bool' }).isNumber({
        message: 'big OUCH!',
        status: 500,
      });
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('big OUCH!');
      expect(err.statusCode).to.eq(500);
    }
  });
  it('error - soft - custom', () => {
    const { value, failed, error, steps } = Verify('string', {
      soft: true,
      name: 'custom!',
    }).isNumber();
    expect(value).to.eq('string');
    expect(failed).to.be.true;
    expect(error).to.eq('custom! must be a number');
    expect(steps('isNumber')).to.be.false;
  });
  it('error - soft - custom message', () => {
    const { value, failed, error, steps } = Verify('string', {
      soft: true,
      name: 'custom!',
    }).isNumber({
      message: 'oops not a number',
    });
    expect(value).to.eq('string');
    expect(failed).to.be.true;
    expect(error).to.eq('oops not a number');
    expect(steps('isNumber')).to.be.false;
  });
  it('success - string number', () => {
    const target = '3.23';
    const { value, error, type, steps, verifiedNumber } =
      Verify(target).isNumber();
    expect(value).to.eq(target);
    expect(error).to.be.false;
    expect(type).to.eq('number');
    expect(verifiedNumber.toFixed()).to.eq(target);
    expect(steps('isNumber')).to.eq(true);
  });
  it('success - 2.999999999999999999', () => {
    const target = '2.999999999999999999';

    const { value, error, type, steps, verifiedNumber } =
      Verify(target).isNumber();
    expect(value).to.eq(target);
    expect(error).to.be.false;
    expect(type).to.eq('number');
    expect(verifiedNumber.toFixed()).to.eq(target);
    expect(steps('isNumber')).to.eq(true);
  });
});