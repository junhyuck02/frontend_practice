const quotes = [
  {
    quote: "인생은 우리가 무엇을 하며 보내는가에 따라 결정되는 것이 아니라, 우리가 무엇을 느끼며 보내는가에 따라 결정된다.",
    author: "Walt Disney",
  },
  {
    quote: "성공은 최종적인 것이 아니며, 실패는 치명적인 것이 아니다. 중요한 것은 지속하고자 하는 용기다.",
    author: "Winston Churchill",
  },
  {
    quote: "당신이 할 수 있다고 믿든 할 수 없다고 믿든, 당신의 믿음대로 될 것이다.",
    author: "Henry Ford",
  },
  {
    quote: "위대한 일을 해내는 유일한 방법은 당신이 하는 일을 사랑하는 것이다.",
    author: "Steve Jobs",
  },
  {
    quote: "가장 어두운 밤도 언젠가는 끝나고 해는 떠오를 것이다.",
    author: "Victor Hugo",
  },
  {
    quote: "어제와 똑같이 살면서 다른 미래를 기대하는 것은 정신병 초기 증세이다.",
    author: "Albert Einstein",
  },
  {
    quote: "천재는 1%의 영감과 99%의 노력으로 이루어진다.",
    author: "Thomas Edison",
  },
  {
    quote: "행복은 이미 만들어져 있는 것이 아니다. 그것은 당신의 행동으로부터 온다.",
    author: "Dalai Lama",
  },
  {
    quote: "사람들은 당신이 한 말이나 행동은 잊을지 몰라도, 당신으로 인해 느꼈던 기분만큼은 절대 잊지 않는다.",
    author: "Maya Angelou",
  },
  {
    quote: "상대방의 입장에 서지 않고서는 그 사람을 진정으로 이해할 수 없다.",
    author: "Harper Lee",
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child"); 

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;