interface SStorage<T> {
  [key: string]: T;
}

class LocalStorage<T> {
  private storage: SStorage<T> = {};
  set(key: string, value: T) {
    this.storage[key] = value;
  }
  remove(key: string) {
    delete this.storage[key]; // js에 내장되어있는 객체를 삭제하는 연산자
  }
  get(key: string): T {
    // 반환값이 필요하니까 :T를 해주는거임
    return this.storage[key];
  }
  clear() {
    this.storage = {};
  }
}

const stringsStorage = new LocalStorage<string>();
stringsStorage.get("key");
stringsStorage.set("key", "value");
stringsStorage.remove("key");
stringsStorage.clear();

const booleansStorage = new LocalStorage<boolean>();
booleansStorage.get("key2");
booleansStorage.set("key2", true);
booleansStorage.remove("key2");
booleansStorage.clear();
