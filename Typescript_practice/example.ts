interface UserN {
  name: string;
}
interface Player extends UserN {}

type User2 = {
  name: string;
};
type Player2 = User2 & {};
// 두개는 동일한 방법임

const nico: Player = {
  name: "nico",
};
const lynn: Player2 = {
  name: "lynn",
};

// abstract 클래스와 인터페이스
// abstract로 상속받은 클래스를 js로 변환하게되면, abstract코드도 js파일에 남게된다.
// 그래서 코드 최적화를 위해, interface와 implements를 사용한다.
// 이 두 기능은 js에는 없으므로 ts를 js로 변환한 코드에서 보이지 않는다.
// 즉 코드 최적화 완료!
// abstract와 interface/implements는 둘다 같은 기능을 구현한다.
// (상속받는 클래스가 구현할 기능들을 명시함)
