import React from 'react';
import './VideoViewer.css';

function VideoViewer({
  video,
  selectedFile,
  error,
  currentTime,
  duration,
  isPlaying,
  videoRef,
  handleFileChange,
  handleUpload,
}) {
  return (
    <div className="video-viewer">
      <h2>Video Viewer</h2>
      <div className="upload-section">
        <input
          type="file"
          id="videoInput"
          accept="video/*"
          onChange={handleFileChange}
        />
        <button onClick={handleUpload} disabled={!selectedFile}>
          업로드
        </button>
        {error && <p className="error-text">{error}</p>}
      </div>

      {/* 업로드된 비디오 표시 */}
      {video && (
        <div className="video-container">
          <video ref={videoRef}>
            <source src={video.url} type="video/mp4" />
            지원되지 않는 브라우저입니다.
          </video>
          <p>
            재생 상태: {isPlaying ? '재생 중' : '정지'} <br />
            재생 시간: {currentTime} / {duration} 초
          </p>
        </div>
      )}
    </div>
  );
}

export default VideoViewer;
