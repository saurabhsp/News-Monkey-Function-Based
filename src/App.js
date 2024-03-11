import React, { useState, useEffect } from "react";
import Navbar from "./Component/Navbar";
import News from "./Component/News";
import Footer from './Component/Footer';
import "./App.css";
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App =()=> {
  const pageSize=12;
  
  const [progress, setProgress] = useState(0)
  const [mode,setMode]=useState("light")

  const toggleMode = () => {
    setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    setBodyBackgroundColor();
  }, [mode]);

  const setBodyBackgroundColor = () => {
    document.body.style.backgroundColor = mode === "light" ? "white" : "#060131";
    document.body.style.color = mode === "light" ? "black" : "white";
  };

  return (
    <div>
       <LoadingBar
      color='red'
      height={4}
      progress={progress}
    />
      <Router>
        <Navbar mode={mode} toggleMode={toggleMode} />
        <Routes>
          <Route exact path="/business" element={<News setProgress={setProgress}    key="business" pageSize={pageSize} country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress}    key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} />
          <Route exact path="/general" element={<News setProgress={setProgress}    key="general" pageSize={pageSize} country="in" category="general" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} key="health" pageSize={pageSize} country="in" category="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress}     key="science" pageSize={pageSize} country="in" category="science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress}    key="sports" pageSize={pageSize} country="in" category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress}    key="technology" pageSize={pageSize} country="in" category="technology" />} />
          <Route exact path="/" element={<News setProgress={setProgress}    key="/" pageSize={pageSize} category="health" />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
