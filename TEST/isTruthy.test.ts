import { expect, describe, it } from 'vitest';
import Verify from '../src/index';

describe('verify isTruthy', () => {
  it('error 0', () => {
    try {
      Verify(0, {
        name: 'tester',
      }).isTruthy();
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('tester must be truthy');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error 0n', () => {
    try {
      Verify(0n, {
        name: 'tester',
      }).isTruthy();
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('tester must be truthy');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error empty string', () => {
    try {
      Verify('', {
        name: 'tester',
      }).isTruthy();
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('tester must be truthy');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error false', () => {
    try {
      Verify(false, {
        name: 'tester',
      }).isTruthy();
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('tester must be truthy');
      expect(err.statusCode).to.eq(400);
    }
  });
});
