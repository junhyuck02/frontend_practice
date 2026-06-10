/*
블록체인: 여러 개의 블록이 사슬처럼 묶인 것
그 블록 안에는 데이터가 들어있음
블록은 다른 블록에 묶여있음, 그 연결고리는 해쉬 값
*/
import crypto from "crypto";
// Node.js 환경에서 암호화, 복호화, 해시 생성 등 보안과 관련된 기능을 사용하겠다는 거임
// default export 된 것만 가져옴
// import * as crypto from "crypto"
// 해당 모듈 안의 모든 것을 crypto라는 이름으로 묶어서 가져옴

interface BlockShape {
  hash: string; // 해쉬값
  prevHash: string; // 이전 해쉬값
  height: number; // 블록의 위치를 표시해주는 숫자
  data: string; // 블록이 보호할 데이터
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string,
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  // 생성자 ()내부는 재료를 받는 곳
  // 생성자 {}내부는 받은 재료로 뭘 할지 적는 곳
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
    // 문자열을 SHA256 해시값으로 변환
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPrevHash() {
    if (this.blocks.length === 0) {
      return "";
    } else {
      return this.blocks[this.blocks.length - 1].hash;
    }
  }
  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data,
    );
    this.blocks.push(newBlock);
  }
  public getBlocks() {
    return [...this.blocks];
    // 그냥 return this.blocks 을 하면 원본 배열을 반환
    // 원본을 그대로 반환하면 외부에서 배열을 수정하게 될 수도 있음
    // return [...this.blocks] 이렇게 하면 복사본 배열 반환
    // this.blocks는 이미 배열임, 이 요소들을 꺼내서 펼치고 다시 []로 감싸서 복사된 완전히 새로운 배열을 만드는거임
  }
}

const blockchain = new Blockchain();

blockchain.addBlock("First one");
blockchain.addBlock("Second one");
blockchain.addBlock("Third one");
blockchain.addBlock("Fourth one");

console.log(blockchain.getBlocks());
// 실행 npm run dev
