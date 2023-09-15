// import logo from './logo.svg';
import "./App.css";
import Home from "./components/home/Home";
import Header from "./components/include/header";
import Explaination from "./components/explaination/Explaination";
import Dice from "./components/play/Dice";
import MainPlay from "./components/play/MainPlay";
import Result from "./components/play/Result";
import Signin from "./components/user/Singin";
import Signup from "./components/user/Signup";
import MyPage from "./components/user/MyPage";
import Footer from "./components/include/footer";
import Default from "./components/Default";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Router basename="/puzzle-game-frontend">
        <Routes>
          <Route  path="/" element={<Home />} />
          <Route  path="/howtoplay" element={<Explaination />} />
          <Route  path="/dice" element={<Dice />} />
          <Route  path="/play" element={<MainPlay />} />
          <Route  path="/result" element={<Result />} />
          <Route  path="/user/signin" element={<Signin />} />
          <Route  path="/user/signup" element={<Signup />} />
          <Route  path="/user/mypage" element={<MyPage />} />
          <Route  path="/*" element={<Default />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
