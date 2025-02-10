// App.js
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Upload from './pages/Upload';
import Sidebar from './components/Sidebar';
import Stt from './pages/SttVideo';
import './App.css';  // 예: 여기에 container, topLeft, topRight, bottom 등 grid CSS
import './Layout.css';
import VideoViewer from './components/VideoViewer';
import Track from './components/Track';
import Asd from './components/asd';
import { VideoProvider } from './components/VideoContext';

function App() {
  // =================== 비디오 상태 ===================
  const [video, setVideo] = useState(null); // { name, url }
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setSelectedFile(file);
        setError('');
      } else {
        setError('비디오 파일만 업로드할 수 있습니다.');
        setSelectedFile(null);
      }
    }
  };

  // 업로드
  const handleUpload = () => {
    if (selectedFile) {
      // 기존 blob URL 정리
      if (video && video.url) {
        URL.revokeObjectURL(video.url);
        setVideo(null);
      }
      // 새 blob URL 생성
      const videoURL = URL.createObjectURL(selectedFile);
      setVideo({ name: selectedFile.name, url: videoURL });

      // 인풋 초기화
      setSelectedFile(null);
      document.getElementById('videoInput').value = '';
    }
  };

  // cleanup
  useEffect(() => {
    return () => {
      if (video && video.url) {
        URL.revokeObjectURL(video.url);
      }
    };
  }, [video]);

  // timeupdate, loadedmetadata 이벤트
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const updateTime = () => {
        setCurrentTime(parseFloat(videoElement.currentTime.toFixed(2)));
      };
      const updateDuration = () => {
        setDuration(parseFloat(videoElement.duration.toFixed(2)));
      };

      videoElement.addEventListener('timeupdate', updateTime);
      videoElement.addEventListener('loadedmetadata', updateDuration);

      return () => {
        videoElement.removeEventListener('timeupdate', updateTime);
        videoElement.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [video]);

  // 재생/멈춤
  const togglePlay = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 슬라이더로 재생 위치 변경
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        {/* 왼쪽 상단 영역 */}
        <div className="topLeft">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/stt" element={<Stt />} />
            <Route path="*" element={<h2>404 Not Found</h2>} />

          </Routes>
        </div>

        {/* 오른쪽 상단 영역 */}
        <div className="topRight">
          <VideoProvider>
            <VideoViewer />
            <Asd/>
          </VideoProvider>
        </div>

        {/* 하단 영역 */}
        <div className="bottom">
          <Track
            video={video}
            currentTime={currentTime}
            duration={duration}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            handleSeek={handleSeek}
          />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
