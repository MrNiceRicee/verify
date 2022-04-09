import { expect, describe, it } from 'vitest';
import Verify from '../index';

describe('verify isGT', () => {
  it('error - not verified', () => {
    const target = '3';
    const compare = '3.000000001';
    try {
      Verify(target).isGT(compare);
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
      Verify(target).isNumber().isGT(compare);
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq(`${compare} must be a number`);
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error - compare not a number - custom name', () => {
    const target = '3';
    const compare = '3.ddd';
    const compareName = 'bad number';
    try {
      Verify(target).isNumber().isGT(compare, { compareName });
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq(`${compareName} must be a number`);
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error -  3 not > "3.000000001"', () => {
    const target = '3';
    const compare = '3.000000001';
    try {
      Verify(target).isNumber().isGT(compare);
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq(`${target} must be > ${compare}`);
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error -  3 not > "3e10"', () => {
    const target = '3';
    const compare = '3e10';
    try {
      Verify(target).isNumber().isGT(compare);
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq(`${target} must be > ${compare}`);
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error -  3 not > "4"', () => {
    const target = '3';
    const compare = '4';
    try {
      Verify(target).isNumber().isGT(compare);
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq(`${target} must be > ${compare}`);
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error -  3 not > "3.000000001"', () => {
    const target = '3';
    const compare = '3.000000001';
    try {
      Verify(target).isNumber().isGT(compare);
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq(`${target} must be > ${compare}`);
      expect(err.statusCode).to.eq(400);
    }
  });
  it('error -  3 not > "3.000000001" - custom', () => {
    const target = '3';
    const compare = '3.000000001';
    try {
      Verify(target)
        .isNumber()
        .isGT(compare, { message: 'bad numbers!', status: 500 });
      expect(true).to.be.false;
    } catch (err) {
      expect(err.message).to.eq('bad numbers!');
      expect(err.statusCode).to.eq(500);
    }
  });
  it('error - soft ', () => {
    const target = '3';
    const compare = '3.000000001';
    const { error, steps, failed, value } = Verify(target, { soft: true })
      .isNumber()
      .isGT(compare);
    expect(error).to.eq(`${target} must be > ${compare}`);
    expect(steps('isGT')).to.be.false;
    expect(failed).to.be.true;
    expect(value).to.eq(target);
  });
  it('error - soft - custom message', () => {
    const target = '3';
    const compare = '3.000000001';
    const { error, steps, failed, value } = Verify(target, { soft: true })
      .isNumber()
      .isGT(compare, { message: 'failed! bad numbers' });
    expect(error).to.eq('failed! bad numbers');
    expect(steps('isGT')).to.be.false;
    expect(failed).to.be.true;
    expect(value).to.eq(target);
  });
  it('success - float', () => {
    const target = '3';
    const compare = '2.99999999999999';
    const { error, steps, failed } = Verify(target, {
      soft: true,
    })
      .isNumber()
      .isGT(compare);
    expect(error).to.be.false;
    expect(failed).to.be.false;
    expect(steps('isGT')).to.be.true;
  });
  it('success - greater than', () => {
    const target = '3';
    const compare = '2.0';
    const { error, steps, failed } = Verify(target, {
      soft: true,
    })
      .isNumber()
      .isGT(compare);
    expect(error).to.be.false;
    expect(failed).to.be.false;
    expect(steps('isGT')).to.be.true;
  });
});
