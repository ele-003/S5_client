import React, { useState } from 'react';

function VideoUpload() {
  const [videoFile, setVideoFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [videoData, setVideoData] = useState(null); // JSON 데이터 저장

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile) {
      alert('파일을 선택하세요!');
      return;
    }

    const formData = new FormData();
    formData.append('file', videoFile);

    try {
      // 🎥 비디오 업로드 및 JSON 수신
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
      setVideoData(uploadResult); // 서버에서 반환된 JSON 저장
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h1>동영상 업로드 및 JSON 데이터 보기</h1>
      <form onSubmit={handleUpload}>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button type="submit">업로드</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}

      {videoData && (
        <div>
          <h2>📌 비디오 정보</h2>
          <p>
            <strong>파일명:</strong> {videoData.video.file_name}
          </p>
          <p>
            <strong>파일 경로:</strong> {videoData.video.file_path}
          </p>
          <p>
            <strong>길이:</strong> {videoData.video.duration}초
          </p>

          {/* 🎥 비디오 실행 */}
          <video controls width="600">
            <source
              src={`http://localhost:8000/videos/${videoData.video.file_name}`}
              type="video/mp4"
            />
            브라우저가 비디오 태그를 지원하지 않습니다.
          </video>

          <h2>🎼 배경음 정보</h2>
          {videoData.background_music.file_path ? (
            <>
              <p>
                <strong>파일 경로:</strong>{' '}
                {videoData.background_music.file_path}
              </p>
              <p>
                <strong>볼륨:</strong> {videoData.background_music.volume}
              </p>

              {/* 🎵 배경음 재생 */}
              <audio controls>
                <source
                  src={`http://localhost:8000/extracted_audio/${videoData.background_music.file_path
                    .replace(/^extracted_audio[\\/]/, '')
                    .replace(/\\/g, '/')}`}
                  type="audio/mp3"
                />
              </audio>
            </>
          ) : (
            <p>배경음 없음</p>
          )}

          <h2>🎙️ TTS 트랙</h2>
          {videoData.tts_tracks.length > 0 ? (
            <ul>
              {videoData.tts_tracks.map((tts) => (
                <li key={tts.tts_id}>
                  <p>
                    <strong>파일 경로:</strong> {tts.file_path}
                  </p>
                  <p>
                    <strong>시작 시간:</strong> {tts.start_time}초
                  </p>
                  <p>
                    <strong>길이:</strong> {tts.duration}초
                  </p>
                  <p>
                    <strong>목소리:</strong> {tts.voice}
                  </p>

                  {/* 🎤 TTS 음성 재생 */}
                  <audio controls>
                    <source
                      src={`http://localhost:8000/extracted_audio/${tts.file_path
                        .replace(/^extracted_audio[\\/]/, '')
                        .replace(/\\/g, '/')}`}
                      type="audio/mp3"
                    />
                  </audio>
                </li>
              ))}
            </ul>
          ) : (
            <p>TTS 트랙 없음</p>
          )}
        </div>
      )}
    </div>
  );
}

export default VideoUpload;