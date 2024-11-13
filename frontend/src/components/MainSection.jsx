import React, { useEffect, useRef } from "react";

const MainSection = ({ localStream, remoteStream, call, userName }) => {
  const localVideoEl = useRef(null);
  const remoteVideoEl = useRef(null);

  const clickHandler = () => {
    if (userName) {
      call();
    } else {
      alert("Entre un nom d'utilisateur");
    }
  };

  useEffect(() => {
    if (localVideoEl.current && localStream) {
      localVideoEl.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoEl.current && remoteStream) {
      remoteVideoEl.current.srcObject = remoteStream;
    }
  }, [remoteStream]);
  return (
    <>
      <div className="flex space-x-4 w-full max-w-4xl mb-4">
        <div className="flex-1">
          <video
            ref={localVideoEl}
            autoPlay
            playsInline
            muted
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-1">
          <video
            ref={remoteVideoEl}
            autoPlay
            playsInline
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
      <button
        disabled={userName === ""}
        onClick={clickHandler}
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-300"
      >
        Broadcast Call
      </button>
    </>
  );
};

export default MainSection;
