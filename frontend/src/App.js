import React, { useState } from 'react';
import Template from './components/Template';
import MainSection from './components/MainSection';
import useCallSimplify from './hooks/useCallSimplify';

const App = () => {
  const [userChoices, setUserChoices] = useState({
    userName: `Guest-${Math.ceil(Math.random() * 100)}`,
    isScreenShare: false,
    withAudio: false,
  });
  const { offers, call, answer, localStream, remoteStream } = useCallSimplify({ ...userChoices });

  return (
    <Template userState={[userChoices, setUserChoices]} offers={offers} answer={answer}>
      <MainSection userName={userChoices.userName} localStream={localStream} remoteStream={remoteStream} call={call} />
    </Template>
  );
};

export default App;
