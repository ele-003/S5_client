import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Upload from './pages/Upload';
import Sidebar from './components/Sidebar';
import Stt from './pages/SttVideo';
import Track from './components/Track';
import './App.css';
import VideoViewer from './components/VideoViewer';
import './Layout.css';


function App() {
  return (
    <BrowserRouter>
      {/* 공통 레이아웃 예: Header */}
      <Header />
      
      {/* 라우트 설정 */}
      <div className="container">
        <div className="topLeft">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/stt" element={<Stt />} />
            {/* 404 대응 */}
            <Route path="*" element={<h2>404 Not Found</h2>} />
          </Routes>
        </div>
        <div className="topRight"><VideoViewer /></div>
        <div className="bottom"><Track /></div>


      </div>





    </BrowserRouter>
  );
}

export default App;
