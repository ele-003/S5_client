import React, { useState, useEffect } from 'react';

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
      // 기존 비디오 삭제
      if (video && video.url) {
        URL.revokeObjectURL(video.url);
        setVideo(null);
      }

      // 새로운 비디오 URL 생성
      const videoURL = URL.createObjectURL(selectedFile);
      setTimeout(() => {
        setVideo({ name: selectedFile.name, url: videoURL });
      }, 0);

      // 파일 선택 초기화
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
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>비디오 업로더</h1>

      {/* 업로드 폼 */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="file"
          id="videoInput"
          accept="video/*"
          onChange={handleFileChange}
        />
        <button onClick={handleUpload} disabled={!selectedFile} style={{ marginLeft: '10px' }}>
          업로드
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {/* 업로드된 비디오 표시 */}
      {video && (
        <div style={{ marginBottom: '20px' }}>
          <p>{video.name}</p>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <video
              controls
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                border: '2px solid #ccc',
                borderRadius: '10px'
              }}
            >
              <source src={video.url} type="video/mp4" />
              지원되지 않는 브라우저입니다.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoViewer;
