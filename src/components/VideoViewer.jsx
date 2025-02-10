// VideoViewer.js
import React, { useState, useContext, useEffect } from 'react';
import { VideoContext } from './VideoContext';

function VideoViewer() {
  const [videoFile, setVideoFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const { setVideoData, setVideoURL, videoURL, setCurrentTime, setDuration, videoRef } = useContext(VideoContext);

  // 파일 선택 핸들러 (실제 업로드용)
  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  // 실제 서버에 업로드하는 함수
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile) {
      alert('파일을 선택하세요!');
      return;
    }
    const formData = new FormData();
    formData.append('file', videoFile);

    try {
      const uploadResponse = await fetch('http://localhost:8000/upload-video', {
        method: 'POST',
        body: formData,
      });
      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        setResponseMessage(`업로드 실패: ${errorData.detail}`);
        return;
      }
      const uploadResult = await uploadResponse.json();
      setResponseMessage('업로드 성공!');
      // 서버에서 받은 영상 정보를 저장 (필요시)
      setVideoData(uploadResult);
      // video 객체의 file_name을 이용해 영상 URL 생성
      const url = `http://localhost:8000/videos/${uploadResult.video.file_name}`;
      setVideoURL(url);
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('오류가 발생했습니다.');
    }
  };

  // 영상 엘리먼트의 메타데이터 및 시간 업데이트 이벤트 처리
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleLoadedMetadata = () => {
      setDuration(videoEl.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(videoEl.currentTime);
    };

    videoEl.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoEl.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoEl.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoEl.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoRef, setDuration, setCurrentTime]);

  return (
    <div>
      <h1>VideoViewer (영상 업로드 및 표시)</h1>
      <form onSubmit={handleUpload}>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button type="submit">실제 업로드</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
      {videoURL && (
        <div>
          <h2>업로드된 영상</h2>
          {/* 네이티브 컨트롤 없이 영상만 표시 */}
          <video ref={videoRef} width="600">
            <source src={videoURL} type="video/mp4" />
            브라우저가 비디오 태그를 지원하지 않습니다.
          </video>
        </div>
      )}
    </div>
  );
}

export default VideoViewer;
