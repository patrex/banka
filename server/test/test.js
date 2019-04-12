import chai from 'chai';
import assert from 'assert';

const expect = chai.expect;

describe('init tests', () => {
  it('should be ok', () => {
    assert.equal(1, 1, '1 should equal 1');
  });

  it('should be ok', () => {
    expect(1).to.equal(1);
  });
});
