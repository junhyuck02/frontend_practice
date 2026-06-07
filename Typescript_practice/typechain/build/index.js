"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
/*
블록체인: 여러 개의 블록이 사슬처럼 묶인 것
그 블록 안에는 데이터가 들어있음
블록은 다른 블록에 묶여있음, 그 연결고리는 해쉬 값
*/
const crypto_1 = __importDefault(require("crypto"));
class Block {
  constructor(prevHash, height, data) {
    this.prevHash = prevHash;
    this.height = height;
    this.data = data;
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  // 생성자 ()내부는 재료를 받는 곳
  // 생성자 {}내부는 받은 재료로 뭘 할지 적는 곳
  static calculateHash(prevHash, height, data) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto_1.default.createHash("sha256").update(toHash).digest("hex");
    // 문자열을 SHA256 해시값으로 변환
  }
}
class Blockchain {
  constructor() {
    this.blocks = [];
  }
  getPrevHash() {
    if (this.blocks.length === 0) {
      return "";
    } else {
      return this.blocks[this.blocks.length - 1].hash;
    }
  }
  addBlock(data) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data,
    );
    this.blocks.push(newBlock);
  }
  getBlocks() {
    return [...this.blocks];
    // 그냥 return this.blocks 을 하면 원본 배열을 반환
    // 원본을 그대로 반환하면 외부에서 배열을 수정하게 될 수도 있음
    // return [...this.blocks] 이렇게 하면 복사본 배열 반환
  }
}
const blockchain = new Blockchain();
blockchain.addBlock("First one");
blockchain.addBlock("Second one");
blockchain.addBlock("Third one");
blockchain.addBlock("Fourth one");
console.log(blockchain.getBlocks());
// 실행 npm run dev

// npm run build로 해야 ts가 js로 변환
