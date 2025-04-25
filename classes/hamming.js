class HammingCode {
  // dataToEncode — [i1, i2, i3, i4]
  static encode(dataToEncode) {
    // 1) Перевірка довжини
    if (!Array.isArray(dataToEncode) || dataToEncode.length !== 4) {
      throw new Error("HammingCode: encode input must have exactly 4 bits");
    }
    // 2) Перевірка бітів
    for (let i = 0; i < 4; i++) {
      const b = dataToEncode[i];
      if (b !== 0 && b !== 1) {
        throw new Error("HammingCode: encode input must consist of bits");
      }
    }

    // власне кодування
    const [i1, i2, i3, i4] = dataToEncode;
    const h = [0,0,i1,0,i2,i3,i4];
    h[0] = h[2] ^ h[4] ^ h[6]; // p1
    h[1] = h[2] ^ h[5] ^ h[6]; // p2
    h[3] = h[4] ^ h[5] ^ h[6]; // p3
    return h;
  }

  // dataToDecode — [b1, b2, b3, b4, b5, b6, b7]
  static decode(dataToDecode) {
    // 1) Перевірка довжини
    if (!Array.isArray(dataToDecode) || dataToDecode.length !== 7) {
      throw new Error("HammingCode: decode input must have exactly 7 bits");
    }
    // 2) Перевірка бітів
    for (let i = 0; i < 7; i++) {
      const b = dataToDecode[i];
      if (b !== 0 && b !== 1) {
        throw new Error("HammingCode: decode input must consist of bits");
      }
    }

    // обчислення перевіркових бітів
    const p1 = dataToDecode[2] ^ dataToDecode[4] ^ dataToDecode[6];
    const p2 = dataToDecode[2] ^ dataToDecode[5] ^ dataToDecode[6];
    const p3 = dataToDecode[4] ^ dataToDecode[5] ^ dataToDecode[6];

    // знаходження позиції помилки
    let errPos = 0;
    if (p1 !== dataToDecode[0]) errPos += 1;
    if (p2 !== dataToDecode[1]) errPos += 2;
    if (p3 !== dataToDecode[3]) errPos += 4;

    // виправлення (якщо є)
    if (errPos !== 0) {
      dataToDecode[errPos - 1] ^= 1;
    }

    // повертаємо тільки інформаційні біти
    return [dataToDecode[2], dataToDecode[4], dataToDecode[5], dataToDecode[6]];
  }

  static injectError(data, position) {
    if (!Array.isArray(data) || data.length !== 7) {
      throw new Error("injectError: input must be 7-bit array");
    }
    if (typeof position !== 'number' || position < 1 || position > 7) {
      throw new Error("injectError: position must be in range 1-7");
    }
    const copy = [...data];
    copy[position - 1] ^= 1;
    return copy;
  }

  static isValid(data) {
    if (!Array.isArray(data) || data.length !== 7) {
      throw new Error("isValid: input must be 7-bit array");
    }
    for (let i = 0; i < 7; i++) {
      const b = data[i];
      if (b !== 0 && b !== 1) {
        throw new Error("isValid: input must consist of bits");
      }
    }

    const p1 = data[2] ^ data[4] ^ data[6];
    const p2 = data[2] ^ data[5] ^ data[6];
    const p3 = data[4] ^ data[5] ^ data[6];

    const errPos =
        (p1 !== data[0] ? 1 : 0) +
        (p2 !== data[1] ? 2 : 0) +
        (p3 !== data[3] ? 4 : 0);

    return errPos === 0;
  }
}

module.exports = HammingCode;
