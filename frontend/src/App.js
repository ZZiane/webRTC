import React, { useState } from 'react';
import Template from './components/Template';
import MainSection from './components/MainSection';
import useCallSimplify from './hooks/useCallSimplify';

const App = () => {
  const [userName, setUserName] = useState(`Guest-${Math.ceil(Math.random() * 100)}`);
  const { offers, call, answer, localStream, remoteStream } = useCallSimplify({ userName });

  return (
    <Template userState={[userName, setUserName]} offers={offers} answer={answer}>
      <MainSection userName={userName} localStream={localStream} remoteStream={remoteStream} call={call} />
    </Template>
  );
};

export default App;
