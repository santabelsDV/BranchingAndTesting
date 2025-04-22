let hamming = require('../index.js').hamming;
let assert = require('chai').assert;


describe('HammingCode', function() {
  
    it('should throw error if decode input has non-binary values', function() {
        assert.throws(() => hamming.decode([1, 0, 3, 0, 1, 0, 1]), Error);
      });
      it('should throw error if isValid input has non-binary values', function() {
        assert.throws(() => hamming.isValid([1, 0, "x", 0, 1, 0, null]), Error);
      });      

      it('should throw an error when encoding input contains undefined', function() {
        assert.throws(() => hamming.encode([1, undefined, 0, 1]), Error, "HammingCode: encode input must consist of bits");
      });

  it('should encode many times quickly', function(done) {
    let input = [1, 0, 1, 0];
    let startTime = Date.now();
    for (let i = 0; i < 10000; i++) {
      hamming.encode(input);
    }
    let endTime = Date.now();
    let duration = endTime - startTime;
    assert.isBelow(duration, 1000, 'Encoding 10000 times should take less than 1000ms');
    done();
  });

  it('should decode many times quickly', function(done) {
    let input = [1, 1, 1, 0, 0, 1, 0];
    let startTime = Date.now();
    for (let i = 0; i < 10000; i++) {
      hamming.decode(input);
    }
    let endTime = Date.now();
    let duration = endTime - startTime;
    assert.isBelow(duration, 1000, 'Decoding 10000 times should take less than 1000ms');
    done();
  });

  it('should throw an error when encoding input is not 4 bits', function() {
    assert.throws(() => hamming.encode([1, 0, 1]), Error, "HammingCode: encode input must have exactly 4 bits");
  });

  it('should throw an error when decoding input is not 7 bits', function() {
    assert.throws(() => hamming.decode([1, 0, 1, 0, 1]), Error, "HammingCode: decode input must have exactly 7 bits");
  });

  it('should throw an error when encoding input contains NaN', function() {
    assert.throws(() => hamming.encode([1, NaN, 0, 1]), Error, "HammingCode: encode input must consist of bits");
  });

  it('should correctly identify valid Hamming codes', function() {
    let validCode = [1,1,1,0,0,0,0];
    let invalidCode = [0, 1, 1, 0, 0, 1, 0];
    assert.isTrue(hamming.isValid(validCode));
    assert.isFalse(hamming.isValid(invalidCode));
  });

});
