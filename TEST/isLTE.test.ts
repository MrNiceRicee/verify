import { expect, describe, it } from 'vitest';
import Verify from '../src/index';

describe('verify isLTE', () => {
  it('error - not verified', () => {
    const target = '3';
    const compare = '3.000000001';
    try {
      Verify(target).isLTE(compare);
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq(`${target} must be a verified number`);
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - compare not a number', () => {
    const target = '3';
    const compare = '3.ddd';
    try {
      Verify(target).isNumber().isLTE(compare);
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq(`${compare} must be a number`);
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - compare not a number - custom name', () => {
    const target = '3';
    const compare = '3.ddd';
    const compareName = 'comparison';
    try {
      Verify(target).isNumber().isLTE(compare, { compareName });
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq(`${compareName} must be a number`);
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error -  "3.000000001" not <= 3', () => {
    const target = '3.000000001';
    const compare = '3';
    try {
      Verify(target).isNumber().isLTE(compare);
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq(`${target} must be <= ${compare}`);
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - 3e10 not <= 3', () => {
    const target = '3e10';
    const compare = '3';
    try {
      Verify(target).isNumber().isLTE(compare);
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq(`${target} must be <= ${compare}`);
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error -  "4" not <= 3', () => {
    const target = '4';
    const compare = 3;
    try {
      Verify(target).isNumber().isLTE(compare);
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq(`${target} must be <= ${compare}`);
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error -  "3.000000001" not <= 3 - custom', () => {
    const target = '3.000000001';
    const compare = '3';
    try {
      Verify(target)
        .isNumber()
        .isLTE(compare, { message: 'bad numbers!', status: 500 });
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('bad numbers!');
      expect(err.statusCode).to.eq(500);
    }
  });
  it('error - soft ', () => {
    const target = '3.000000001';
    const compare = '3';
    const { error, steps, failed, value } = Verify(target, { soft: true })
      .isNumber()
      .isLTE(compare);
    expect(error).to.eq(`${target} must be <= ${compare}`);
    expect(steps('isLTE')).to.be.false;
    expect(failed).to.be.true;
    expect(value).to.eq(target);
  });
  it('error - soft - custom message', () => {
    const target = '3.000000001';
    const compare = '3';
    const { error, steps, failed, value } = Verify(target, { soft: true })
      .isNumber()
      .isLTE(compare, { message: 'failed! bad numbers' });
    expect(error).to.eq('failed! bad numbers');
    expect(steps('isLTE')).to.be.false;
    expect(failed).to.be.true;
    expect(value).to.eq(target);
  });
  it('success - equals', () => {
    const target = '3';
    const compare = '3.0';
    const { error, steps, failed, value, compared } = Verify(target, {
      soft: true,
    })
      .isNumber()
      .isLTE(compare);
    expect(error).to.be.false;
    expect(failed).to.be.false;
    expect(steps('isLTE')).to.be.true;
  });
  it('success - greater than', () => {
    const target = '2.0';
    const compare = '3';
    const { error, steps, failed } = Verify(target, {
      soft: true,
    })
      .isNumber()
      .isLTE(compare);
    expect(error).to.be.false;
    expect(failed).to.be.false;
    expect(steps('isLTE')).to.be.true;
  });
});
