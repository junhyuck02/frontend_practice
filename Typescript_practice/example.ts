interface User {
  name: string;
}
interface Player extends User {}

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
