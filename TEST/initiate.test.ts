import { expect, describe, it } from 'vitest';
import Verify from '../src/index';

describe('verify initialize', () => {
  it('error undefined', () => {
    try {
      Verify(undefined, {
        name: 'tester',
      });
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('missing tester');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error undefined - customs', () => {
    try {
      Verify(undefined, {
        name: 'tester',
        missing: 'oops!',
        status: 500,
      });
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('oops!');
      expect(err.statusCode).to.eq(500);
    }
  });
  // null
  it('error null', () => {
    try {
      Verify(null, {
        name: 'tester',
      });
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('missing tester');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error null - customs', () => {
    try {
      Verify(null, {
        name: 'tester',
        missing: 'oops!',
        status: 500,
      });
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('oops!');
      expect(err.statusCode).to.eq(500);
    }
  });

  it('success', () => {
    const { value, error, steps } = Verify('neat!', {
      name: 'tester',
      missing: 'oops!',
    });
    expect(value).to.eq('neat!');
    expect(error).to.be.false;
    expect(steps('isDefined')).to.eq(true);
  });
});
