// Asd.jsx
import React, { useContext, useState, useEffect, useRef } from 'react';
import { VideoContext } from './VideoContext';

function Asd() {
  const { videoURL, currentTime, duration, videoRef, setCurrentTime } = useContext(VideoContext);
  const sliderRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  // 슬라이더가 렌더링된 후 슬라이더의 너비를 측정
  useEffect(() => {
    if (sliderRef.current) {
      setSliderWidth(sliderRef.current.offsetWidth);
    }
  }, [sliderRef, videoURL, duration]);

  // 진행률 (0~1)
  const progress = duration > 0 ? currentTime / duration : 0;
  // thumb의 중앙(8px)에서 막대기의 절반 폭(1px) 만큼 빼서 계산
  const finalLeft = progress * sliderWidth + 7;

  const handleSliderChange = (e) => {
    const newTime = parseFloat(e.target.value);
    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  if (!videoURL) return <p>영상이 업로드되지 않았습니다.</p>;

  return (
    <>
      {/* 통합 CSS */}
      <style>
        {`
          .hidden-track-range {
            -webkit-appearance: none;
            width: 100%;
            background: transparent;
            margin: 10px 0;
          }
          .hidden-track-range::-webkit-slider-runnable-track {
            background: transparent;
            border: none;
          }
          .hidden-track-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #f00;
            margin-top: -5px;
            cursor: pointer;
          }
          .hidden-track-range::-moz-range-track {
            background: transparent;
            border: none;
          }
          .hidden-track-range::-moz-range-thumb {
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #f00;
            cursor: pointer;
          }
          .hidden-track-range::-ms-track {
            background: transparent;
            border: none;
          }
          .hidden-track-range::-ms-thumb {
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #f00;
            cursor: pointer;
          }
          /* 슬라이더 컨테이너는 상대 위치 */
          .slider-container {
            position: relative;
            width: 100%;
          }
          /* 세로 막대기: 높이 100px, 폭 2px, 빨간색 */
          .vertical-bar {
            position: absolute;
            height: 100px;
            width: 2px;
            background-color: red;
            top: 30px; /* 슬라이더 아래에 배치 (필요에 따라 조정) */
          }
        `}
      </style>

      <div>
        <h2>Asd 컴포넌트 (재생 컨트롤)</h2>
        <div className="slider-container">
          <input
            ref={sliderRef}
            type="range"
            min="0"
            max={duration}
            step="0.1"
            value={currentTime}
            onChange={handleSliderChange}
            className="hidden-track-range"
          />
          <div className="vertical-bar" style={{ left: `${finalLeft}px` }}></div>
        </div>
        <div>
          {currentTime.toFixed(1)} / {duration.toFixed(1)} seconds
        </div>
      </div>
    </>
  );
}

export default Asd;
