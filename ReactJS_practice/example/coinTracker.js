import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  // 1. 내가 입력한 금액(USD)과 선택한 코인의 가격(USD)
  const [amount, setAmount] = useState(0); // 내가 입력한 금액을 기억해둘 방
  const [selectedPrice, setSelectedPrice] = useState(0); // 선택한 코인의 1개당 가격을 기억해둘 방

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        if (json.length > 0) {
          // 가져온 코인 데이터가 비어있지 않다면
          setSelectedPrice(json[0].quotes.USD.price);
          // 처음에 리스트의 맨 첫 번째 코인 가격으로 기본 설정
        }
        setLoading(false);
      });
  }, []);

  // 2. 입력창(input) 값이 바뀔 때 실행될 함수
  const onAmountChange = (event) => {
    setAmount(event.target.value);
  };

  // 3. 코인(select) 선택이 바뀔 때 실행될 함수
  const onCoinChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>

      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          {/* 금액 입력창 */}
          <input
            onChange={onAmountChange}
            value={amount}
            type="number"
            placeholder="Please enter USD"
          />
          USD
          <br />
          <br />
          {/* 코인 선택창 (value에 가격을 심어둠) */}
          <select onChange={onCoinChange}>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <br />
          <br />
          {/* 4. 최종 계산 결과 보여주기 */}
          <h3>
            You can buy:{" "}
            {selectedPrice > 0 ? (amount / selectedPrice).toFixed(6) : 0} 개의
            코인
          </h3>
        </div>
      )}
    </div>
  );
}

export default App;
