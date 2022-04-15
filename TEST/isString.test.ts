import { expect, describe, it } from 'vitest';
import Verify from '../src/index';

describe('verify isString', () => {
  it('error - number', () => {
    try {
      Verify(123).isString();
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('123 must be a string');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - bool', () => {
    try {
      Verify(false).isString();
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('false must be a string');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - custom message', () => {
    try {
      Verify(['string!']).isBoolean({
        message: 'oops not a string',
        status: 500,
      });
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('oops not a string');
      expect(err.statusCode).to.eq(500);
    }
  });
  it('error - soft - custom', () => {
    const { value, failed, error, steps } = Verify(['string'], {
      soft: true,
      name: 'custom!',
    }).isString();
    expect(value).to.deep.eq(['string']);
    expect(failed).to.be.true;
    expect(error).to.eq('custom! must be a string');
    expect(steps('isString')).to.be.false;
  });
  it('error - soft - custom message', () => {
    const { value, failed, error, steps } = Verify(['string'], {
      soft: true,
      name: 'custom!',
    }).isString({
      message: 'oops not a string',
    });
    expect(value).to.deep.eq(['string']);
    expect(failed).to.be.true;
    expect(error).to.eq('oops not a string');
    expect(steps('isString')).to.be.false;
  });
  it('success - a string', () => {
    const target = '2.12String!';
    const { value, error, type, steps } = Verify(target).isString();
    expect(value).to.eq(target);
    expect(error).to.be.false;
    expect(type).to.eq('string');
    expect(steps('isString')).to.eq(true);
  });
});
