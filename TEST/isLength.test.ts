import { expect, describe, it } from 'vitest';
import Verify from '../src/index';

describe('verify isLength', () => {
  it('unknown type - number', () => {
    try {
      Verify(2, { name: 'test' }).isLength(2);
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('unknown type');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('unknown type - string (pre string chain)', () => {
    try {
      Verify('hello', { name: 'test' }).isLength(2);
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('unknown type');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('unknown type - array (pre array chain)', () => {
    try {
      Verify(['hello', 'world', 'eat', 'shrimp'], { name: 'test' }).isLength(2);
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('unknown type');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error string length 5', () => {
    try {
      Verify('hey', { name: 'test' }).isString().isLength(5);
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('test must have length = 5');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error string length =  5', () => {
    try {
      Verify('hey', { name: 'test' }).isString().isLength(5);
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('test must have length = 5');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error string length > 5', () => {
    try {
      Verify('hey', { name: 'test' })
        .isString()
        .isLength(5, { operator: 'gt' });
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('test must have length > 5');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error string length >= 5', () => {
    try {
      Verify('hey', { name: 'test' })
        .isString()
        .isLength(5, { operator: 'gte' });
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('test must have length >= 5');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error string length < 5', () => {
    try {
      Verify('eat shrimp', { name: 'test' })
        .isString()
        .isLength(5, { operator: 'lt' });
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('test must have length < 5');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error array length = 5', () => {
    try {
      Verify(['eat'], { name: 'test' }).isArray().isLength(5);
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('test must have length = 5');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error array length > 5', () => {
    try {
      Verify(['eat'], { name: 'test' })
        .isArray()
        .isLength(5, { operator: 'gt' });
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('test must have length > 5');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error array length > 5', () => {
    try {
      Verify(['eat'], { name: 'test' })
        .isArray()
        .isLength(5, { operator: 'gte' });
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('test must have length >= 5');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error array length < 5', () => {
    try {
      Verify(['go', 'eat', 'shrimp', 'fried', 'rice', 'today'], {
        name: 'test',
      })
        .isArray()
        .isLength(5, { operator: 'lt' });
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('test must have length < 5');
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error array length <= 5', () => {
    try {
      Verify(['go', 'eat', 'shrimp', 'fried', 'rice', 'today'], {
        name: 'test',
      })
        .isArray()
        .isLength(5, { operator: 'lte' });
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('test must have length <= 5');
      expect(err.statusCode).to.eq(400);
    }
  });
});
