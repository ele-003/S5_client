import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Upload from './pages/Upload';
import Sidebar from './components/Sidebar';
import Stt from './pages/SttVideo';
import './App.css'; 
import VideoViewer from './pages/VideoViewer';

function App() {
  return (
    <BrowserRouter>
      {/* 공통 레이아웃 예: Header */}
      <Header />
      <Sidebar />
      {/* 라우트 설정 */}
      <div className="content">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/stt" element={<Stt />} />
          <Route path="/videoviewer" element={<VideoViewer/>} />
          {/* 404 대응 */}
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
