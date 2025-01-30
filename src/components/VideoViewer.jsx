import React, { useState, useEffect } from 'react';
import './VideoViewer.css'; // ✅ VideoViewer.css 불러오기

function VideoViewer() {
  const [video, setVideo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

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

  const handleUpload = () => {
    if (selectedFile) {
      if (video && video.url) {
        URL.revokeObjectURL(video.url);
        setVideo(null);
      }

      const videoURL = URL.createObjectURL(selectedFile);
      setTimeout(() => {
        setVideo({ name: selectedFile.name, url: videoURL });
      }, 0);

      setSelectedFile(null);
      document.getElementById('videoInput').value = '';
    }
  };

  useEffect(() => {
    return () => {
      if (video && video.url) {
        URL.revokeObjectURL(video.url);
      }
    };
  }, [video]);

  return (
    <div className="video-viewer">
      <h1>비디오 뷰어</h1>

      {/* 업로드 폼 */}
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
          <video controls>
            <source src={video.url} type="video/mp4" />
            지원되지 않는 브라우저입니다.
          </video>
        </div>
      )}
    </div>
  );
}

export default VideoViewer;
