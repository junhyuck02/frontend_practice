type PlayerA = {
  name: string;
};
type PlayerAA = PlayerA & {
  lastName: string;
};
const playerA: PlayerAA = {
  name: "nico",
  lastName: "xxx",
};

//

interface PlayerB {
  name: string;
}
interface PlayerBB extends PlayerB {
  lastName: string;
}
const playerB: PlayerBB = {
  name: "nico",
  lastName: "xxx",
};

// 위에 두개는 동일함 ㄹㅇ

type PlayerC = {
  firstName: string;
};
interface PlayerD {
  firstName: string;
}
class User implements PlayerC {
  // C대신 PlayerD를 해도 그냥 동일한거임
  constructor(public firstName: string) {}
}
// type과 interface 둘 다 js에서는 사라짐
// 보통 ts에게 오브젝트의 모양을 알려주기 위해서는 인터페이스를 쓰고 나머지는 타입 사용
