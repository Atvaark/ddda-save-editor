import pako from 'pako';
import crc32 from 'crc-32';

class DDDASaveHeader {
  constructor() {
    // 21 for DDDA or 5 ofr DD
    this.version = 0;

    this.size = 0;

    this.compressedSize = 0;

    // crc32
    this.checksum = 0;

    this.littleEndian = true;

    this.maxSize = 524288;

    // size of the header in bytes
    this.byteLength = 32;
  }

  parse(buffer) {
    const view = new DataView(buffer);
    this.version = view.getInt32(0, this.littleEndian);
    this.size = view.getInt32(4, this.littleEndian);
    this.compressedSize = view.getInt32(8, this.littleEndian);
    const h1 = view.getInt32(12, this.littleEndian);
    const h2 = view.getInt32(16, this.littleEndian);
    const h3 = view.getInt32(20, this.littleEndian);
    this.checksum = view.getInt32(24, this.littleEndian);
    const h4 = view.getInt32(28, this.littleEndian);

    if (h1 !== 860693325 || h2 !== 0 || h3 !== 860700740 || h4 !== 1079398965) {
      throw new Error('Invalid DDDASaveHeader');
    }
  }

  serialize() {
    const buffer = new ArrayBuffer(this.byteLength);
    const view = new DataView(buffer);
    view.setInt32(0, this.version, this.littleEndian);
    view.setInt32(4, this.size, this.littleEndian);
    view.setInt32(8, this.compressedSize, this.littleEndian);
    view.setInt32(12, 860693325, this.littleEndian);
    view.setInt32(16, 0, this.littleEndian);
    view.setInt32(20, 860700740, this.littleEndian);
    view.setInt32(24, this.checksum, this.littleEndian);
    view.setInt32(28, 1079398965, this.littleEndian);
    return new Int8Array(buffer);
  }
}

class DDDASave {
  constructor(data) {
    this.header = new DDDASaveHeader();
    this.data = null;
    this.byteLength = 524288;

    if (data) {
      this.data = data;
    }
  }

  parse(buffer) {
    this.header.parse(buffer);

    let data = buffer.slice(this.header.byteLength, this.header.byteLength + this.header.compressedSize);
    data = this.decompress(data);

    const decoder = new TextDecoder();
    this.data = decoder.decode(data);
  }

  serialize() {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(this.data);
    const compressedData = this.compress(encodedData);

    this.header.version = 21;
    this.header.size = encodedData.byteLength;
    this.header.compressedSize = compressedData.byteLength;
    this.header.checksum = this.hash(compressedData);
    const headerData = this.header.serialize();

    const buffer = new ArrayBuffer(this.byteLength);
    const array = new Int8Array(buffer);
    array.set(headerData, 0);
    array.set(compressedData, headerData.byteLength);

    return buffer;
  }

  decompress(buffer) {
    let decompressed;
    try {
      decompressed = pako.inflate(buffer);
    } catch (err) {
      decompressed = null;
    }

    return decompressed;
  }

  compress(buffer) {
    let compressed;
    try {
      compressed = pako.deflate(buffer);
    } catch (err) {
      compressed = null;
    }

    return compressed;
  }

  hash(buffer) {
    return crc32.buf(buffer) ^ -1;
  }
}

export default DDDASave;
