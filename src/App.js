// import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home';
import Header from "./components/include/header";
import Explaination from './components/explaination/Explaination';
import Dice from './components/play/Dice';
import MainPlay from './components/play/MainPlay';
import Result from './components/play/Result';
import Footer from './components/include/footer';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (<div className="App">
    <Header />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/howtoplay" element={<Explaination/>} />
          <Route path="/dice" element={<Dice/>} />
          <Route path="/play" element={<MainPlay/>} />
          <Route path="/result" element={<Result/>} />
          <Route component={<>asdfasdf</>}/>
        </Routes>
      </Router>
    <Footer />
    </div>
  );
}

export default App;
