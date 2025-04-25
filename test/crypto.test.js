const { expect } = require('chai');
const { xorEncode, calculateParity } = require('../classes/crypto');

describe('xorEncode', () => {
    it('шифрує простий рядок з однобайтовим ключем', () => {
        const plaintext = Uint8Array.from([0x0f, 0xa5, 0x33]);
        const key = Uint8Array.from([0xff]);
        expect(xorEncode(plaintext, key)).to.equal('f05acc');
    });

    it('шифрує простий рядок з багатобайтовим ключем', () => {
        const plaintext = Uint8Array.from([0x10, 0x20, 0x30]);
        const key = Uint8Array.from([0x01, 0x02, 0x03, 0x04]);
        expect(xorEncode(plaintext, key)).to.equal('112233');

    });
});

describe('calculateParity', () => {
    it('повертає 0 для байта 0x00 (0 бітів)', () => {
        expect(calculateParity(0x00)).to.equal(0);
    });

    it('повертає 0 для байта 0xff (8 бітів - парна кількість)', () => {
        expect(calculateParity(0xff)).to.equal(0);
    });

    it('повертає 0 для байта 0x0f (4 біти - парна кількість)', () => {
        expect(calculateParity(0x0f)).to.equal(0);
    });

    it('повертає 1 для байта 0x01 (1 біт - непарна кількість)', () => {
        expect(calculateParity(0x01)).to.equal(1);
    });
});