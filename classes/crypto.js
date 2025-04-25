 function xorEncode(plaintext, key) {
    const result = plaintext.map((byte, i) => byte ^ key[i % key.length]);
    return Array.from(result, b => b.toString(16).padStart(2, '0')).join('');
}

 function calculateParity(byte) {
    let count = 0;
    for (; byte; byte &= (byte - 1)) count++;
    return count % 2;
}

 module.exports={calculateParity,xorEncode};