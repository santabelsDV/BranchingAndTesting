//Huffman
class HuffmanCode {
    static buildFrequencyTable(data) {
        const frequencyTable = {};

        for (let i = 0; i < data.length; i++) {
            const symbol = data[i];
            if (frequencyTable[symbol]) {
                frequencyTable[symbol]++;
            } else {
                frequencyTable[symbol] = 1;
            }
        }

        return frequencyTable;
    }

    static buildHuffmanTree(frequencyTable) {
        class Node {
            constructor(value, frequency) {
                this.value = value;
                this.frequency = frequency;
                this.left = null;
                this.right = null;
            }
        }

        const priorityQueue = [];
        for (const symbol in frequencyTable) {
            const frequency = frequencyTable[symbol];
            const node = new Node(symbol, frequency);
            priorityQueue.push(node);
        }

        while (priorityQueue.length > 1) {
            priorityQueue.sort((a, b) => a.frequency - b.frequency);
            const leftNode = priorityQueue.shift();
            const rightNode = priorityQueue.shift();

            const parentNode = new Node(null, leftNode.frequency + rightNode.frequency);
            parentNode.left = leftNode;
            parentNode.right = rightNode;

            priorityQueue.push(parentNode);
        }

        return priorityQueue[0];
    }


    static buildCodeTable(huffmanTree, code = '', codeTable = {}) {
        if (!huffmanTree) return codeTable;

        if (!huffmanTree.left && !huffmanTree.right) {
            if (huffmanTree.value !== null) {
                // Коли в дереві тільки один символ — даємо йому код '0'
                const bit = code.length > 0 ? code : '0';
                codeTable[huffmanTree.value] = bit;
            }
            return codeTable;
        }

        if (huffmanTree.left) {
            this.buildCodeTable(huffmanTree.left, code + '0', codeTable);
        }
        if (huffmanTree.right) {
            this.buildCodeTable(huffmanTree.right, code + '1', codeTable);
        }

        return codeTable;
    }


    static compressData(data, codeTable) {
        if (typeof data !== 'string' || data.length === 0) {
            throw new Error('Invalid input data for compression');
        }
        if (typeof codeTable !== 'object' || codeTable === null) {
            throw new Error('Invalid code table for compression');
        }

        let compressedData = '';
        for (let i = 0; i < data.length; i++) {
            const symbol = data[i];
            const bits = codeTable[symbol];
            if (typeof bits !== 'string') {
                throw new Error(`No code for symbol "${symbol}"`);
            }
            compressedData += bits;
        }
        return compressedData;
    }

    static decompressData(compressedData, huffmanTree) {
        if (typeof compressedData !== 'string' || compressedData.length === 0) {
            throw new Error('Invalid compressed data for decompression');
        }
        if (!huffmanTree) {
            throw new Error('Invalid Huffman tree for decompression');
        }

        if (!huffmanTree.left && !huffmanTree.right) {
            return huffmanTree.value.repeat(compressedData.length);
        }

        let decompressedData = '';
        let currentNode = huffmanTree;

        for (let i = 0; i < compressedData.length; i++) {
            const bit = compressedData[i];
            if (bit === '0') {
                currentNode = currentNode.left;
            } else if (bit === '1') {
                currentNode = currentNode.right;
            } else {
                throw new Error(`Invalid bit "${bit}" in compressed data`);
            }

            // Якщо дійшли до листа — додаємо символ і повертаємося до кореня
            if (!currentNode.left && !currentNode.right) {
                decompressedData += currentNode.value;
                currentNode = huffmanTree;
            }
        }
        return decompressedData;
    }
}

module.exports = HuffmanCode;
