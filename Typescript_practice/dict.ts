type Words = {
  [key: string]: string;
};

class Dict {
  private words: Words;
  constructor() {
    // property가 바로 생성자로부터 초기화 되는게 아니라 수동으로 시켜주는 방법임
    this.words = {};
  }
  // 클래스 안에서는 그냥 바로 함수 이름 쓰면 됨, java랑 같음
  add(word: Word) {
    if (this.words[word.term] === undefined) {
      this.words[word.term] = word.def;
    }
  }
  def(term: string) {
    return this.words[term];
  }
}

class Word {
  constructor(
    public readonly term: string,
    public readonly def: string,
  ) {}
}

const kimchi = new Word("kimchi", "한국의 음식");
const dict = new Dict();
dict.add(kimchi);
dict.def("kimchi");
