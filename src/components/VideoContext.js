// VideoContext.js
import React, { createContext, useState, useRef } from 'react';

export const VideoContext = createContext();

export function VideoProvider({ children }) {
  const [videoData, setVideoData] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null); // VideoViewer의 <video> 요소에 대한 참조

  return (
    <VideoContext.Provider
      value={{
        videoData,
        setVideoData,
        videoURL,
        setVideoURL,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        videoRef,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}
