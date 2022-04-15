import { expect, describe, it } from 'vitest';
import Verify from '../src/index';

describe('verify isInt', () => {
  it('error - string', () => {
    try {
      Verify('string').isInt();
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('string must be an int');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - float', () => {
    try {
      Verify('2.99999999999').isInt();
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('2.99999999999 must be an int');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - float - custom name', () => {
    try {
      Verify('2.99999999999', { name: 'float' }).isInt();
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('float must be an int');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - boolean', () => {
    try {
      Verify(true).isInt();
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('true must be an int');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - custom', () => {
    try {
      Verify(true, { name: 'bool' }).isInt({
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
    }).isInt();
    expect(value).to.eq('string');
    expect(failed).to.be.true;
    expect(error).to.eq('custom! must be an int');
    expect(steps('isInt')).to.be.false;
  });
  it('error - soft - custom message', () => {
    const { value, failed, error, steps } = Verify('string', {
      soft: true,
      name: 'custom!',
    }).isInt({
      message: 'oops not an int',
    });
    expect(value).to.eq('string');
    expect(failed).to.be.true;
    expect(error).to.eq('oops not an int');
    expect(steps('isInt')).to.be.false;
  });
  it('error - soft - 2.999999999999999999', () => {
    const target = '2.999999999999999999';

    const { value, error, type, steps, verifiedNumber } = Verify(target, {
      soft: true,
    }).isInt();
    expect(value).to.eq(target);
    expect(error).to.eq('2.999999999999999999 must be an int');
    expect(type).to.eq(null);
    expect(verifiedNumber).to.eq(null);
    expect(steps('isInt')).to.eq(false);
  });
  it('success - string number', () => {
    const target = '3';
    const { value, error, type, steps, verifiedNumber } =
      Verify(target).isInt();
    expect(value).to.eq(target);
    expect(error).to.be.false;
    expect(type).to.eq('number');
    expect(verifiedNumber.toFixed()).to.eq(target);
    expect(steps('isInt')).to.eq(true);
  });
  it('success - string number', () => {
    const target = '-1';
    const { value, error, type, steps, verifiedNumber } =
      Verify(target).isInt();
    expect(value).to.eq(target);
    expect(error).to.be.false;
    expect(type).to.eq('number');
    expect(verifiedNumber.toFixed()).to.eq(target);
    expect(steps('isInt')).to.eq(true);
  });
});
