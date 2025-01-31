// src/components/VideoPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import VideoViewer from './VideoViewer';
import Track from './Track';

function VideoPage() {
  // ====== 비디오 상태 ======
  const [video, setVideo] = useState(null); // { name, url } 형태
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  // 재생 시간 관련
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // <video> DOM에 접근하기 위한 ref
  const videoRef = useRef(null);

  // ----- 파일 선택 -----
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 비디오 파일인지 체크
      if (file.type.startsWith('video/')) {
        setSelectedFile(file);
        setError('');
      } else {
        setError('비디오 파일만 업로드할 수 있습니다.');
        setSelectedFile(null);
      }
    }
  };

  // ----- 업로드 로직 (단순 Blob URL) -----
  const handleUpload = () => {
    if (selectedFile) {
      // 기존 blob URL 정리
      if (video && video.url) {
        URL.revokeObjectURL(video.url);
        setVideo(null);
      }
      // 새 blob URL 만들기
      const videoURL = URL.createObjectURL(selectedFile);
      setTimeout(() => {
        setVideo({ name: selectedFile.name, url: videoURL });
      }, 0);

      // 선택 파일 초기화
      setSelectedFile(null);
      // input[type='file'] DOM 초기화
      document.getElementById('videoInput').value = '';
    }
  };

  // 컴포넌트 unmount 시 blob URL 정리
  useEffect(() => {
    return () => {
      if (video && video.url) {
        URL.revokeObjectURL(video.url);
      }
    };
  }, [video]);

  // 비디오 이벤트 (timeupdate, metadata 로딩)
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

      // cleanup
      return () => {
        videoElement.removeEventListener('timeupdate', updateTime);
        videoElement.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [video]);

  // ----- 재생/멈춤 -----
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

  // ----- 슬라이더로 재생 위치 이동 -----
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      {/* 비디오 업로드/표시 컴포넌트 */}
      <VideoViewer
        video={video}
        selectedFile={selectedFile}
        error={error}
        currentTime={currentTime}
        duration={duration}
        isPlaying={isPlaying}
        videoRef={videoRef}
        handleFileChange={handleFileChange}
        handleUpload={handleUpload}
      />

      {/* 별도의 컨트롤 UI 컴포넌트 */}
      <Track
        video={video}
        currentTime={currentTime}
        duration={duration}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        handleSeek={handleSeek}
      />
    </div>
  );
}

export default VideoPage;
