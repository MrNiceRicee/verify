import { expect, describe, it } from 'vitest';
import Verify from '../index';

describe('verify isBoolean', () => {
  it('error - string', () => {
    try {
      Verify('string', { name: 'test' }).isBoolean();
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('test must be a boolean');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - number', () => {
    try {
      Verify(123).isBoolean();
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('123 must be a boolean');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - custom message', () => {
    try {
      Verify('string').isBoolean({ message: 'oops not a bool' });
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('oops not a bool');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - soft - custom', () => {
    const { value, failed, error, steps } = Verify('string', {
      soft: true,
      name: 'custom!',
    }).isBoolean();
    expect(value).to.eq('string');
    expect(failed).to.be.true;
    expect(error).to.eq('custom! must be a boolean');
    expect(steps('isBoolean')).to.be.false;
  });
  it('error - soft - custom message', () => {
    const { value, failed, error, steps } = Verify('string', {
      soft: true,
      name: 'custom!',
    }).isBoolean({
      message: 'oops not a bool',
    });
    expect(value).to.eq('string');
    expect(failed).to.be.true;
    expect(error).to.eq('oops not a bool');
    expect(steps('isBoolean')).to.be.false;
  });
  it('success', () => {
    const { value, error, steps, type } = Verify(true).isBoolean();
    expect(value).to.eq(true);
    expect(error).to.be.false;
    expect(type).to.eq('boolean');
    expect(steps('isBoolean')).to.eq(true);
  });
  it('success - false', () => {
    const { value, error, steps, type } = Verify(false).isBoolean();
    expect(value).to.eq(false);
    expect(error).to.be.false;
    expect(type).to.eq('boolean');
    expect(steps('isBoolean')).to.eq(true);
  });
});
