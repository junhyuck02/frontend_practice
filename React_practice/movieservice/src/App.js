import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// 리액트 앱에서 페이지 이동(화면 전환) 기능을 만들기 위한 필수 도구들을 불러오는 것
import Detail from "./routes/Detail";
import Home from "./routes/Home";
function App() {
  return (
    <Router>
      {/* 브라우저의 주소창과 연동되는 페이지 이동 기능을 사용하겠다 라고 선언하는 가장 바깥쪽 껍데기 */}
      <Switch>
        {/* 여러 개의 route중에서 주소에 맞는 하나만 딱 맞춰서 보여주는 것 */}
        {/* 
        요즘에는 Switch가 아니라 Routes씀 
        <Routes>
          <Route path="/movie/:id" element={<Detail />} />
          <Route path="/" element={<Home />} />
        </Routes>
        */}
        <Route path="/movie/:id">
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
// App 컴포넌트를 다른 파일에서 가져다 쓸 수 있도록 밖으로 내보내겠다
