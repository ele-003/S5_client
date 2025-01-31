import React from 'react';
import '../Layout.css';

function Track({
  video,
  currentTime,
  duration,
  isPlaying,
  togglePlay,
  handleSeek
}) {
  return (
    <div>
      <h2>Track Control (하단)</h2>
      {video ? (
        <>
          <button onClick={togglePlay}>
            {isPlaying ? '멈춤' : '재생'}
          </button>
          <input
            type="range"
            min="0"
            max={duration}
            step="0.01"
            value={currentTime}
            onChange={handleSeek}
          />
          <p>재생 시간: {currentTime} / {duration} 초</p>
        </>
      ) : (
        <p>아직 비디오가 업로드되지 않았습니다.</p>
      )}
    </div>
  );
}

export default Track;
