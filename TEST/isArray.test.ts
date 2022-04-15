import { expect, describe, it } from 'vitest';
import Verify from '../src/index';

describe('verify isArray', () => {
  it('error - number', () => {
    try {
      Verify(123).isArray();
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('123 must be an array');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - bool', () => {
    try {
      Verify(false).isArray();
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('false must be an array');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - string', () => {
    try {
      Verify('string', { name: 'beef!' }).isArray();
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('beef! must be an array');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - custom message', () => {
    try {
      Verify('string!').isArray({
        message: 'oops not an array',
        status: 500,
      });
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('oops not an array');
      expect(err.statusCode).to.eq(500);
    }
  });
  it('error - soft - custom', () => {
    const target = 'string';
    const { value, failed, error, steps } = Verify(target, {
      soft: true,
      name: 'custom!',
    }).isArray();
    expect(value).to.deep.eq(target);
    expect(failed).to.be.true;
    expect(error).to.eq('custom! must be an array');
    expect(steps('isArray')).to.be.false;
  });
  it('error - soft - custom message', () => {
    const target = 'string';
    const { value, failed, error, steps } = Verify(target, {
      soft: true,
      name: 'custom!',
    }).isArray({
      message: 'oops not an array',
    });
    expect(value).to.deep.eq(target);
    expect(failed).to.be.true;
    expect(error).to.eq('oops not an array');
    expect(steps('isArray')).to.be.false;
  });
  it('success - an array', () => {
    const target = ['neat', 'an', 'array'];
    const { value, error, type, steps } = Verify(target).isArray();
    expect(value).to.eq(target);
    expect(error).to.be.false;
    expect(type).to.eq('array');
    expect(steps('isArray')).to.eq(true);
  });
});
