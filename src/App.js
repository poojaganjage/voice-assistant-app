import {useEffect} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import './App.css';

function App() {
  const commands = [
    {
      command: 'reset',
      callback: ({resetTranscript}) => resetTranscript()
    },
    {
      command: 'clear',
      callback: ({resetTranscript}) => resetTranscript()
    },
    {
      command: 'open *',
      callback: (site) => window.open('http://' + site)
    },
    {
      command: 'increase text size',
      callback: () => document.getElementById('content').style.fontSize = '25px'
    },
    {
      command: 'decrease text size',
      callback: () => document.getElementById('content').style.fontSize = '15px'
    },
    {
      command: 'change text colour to *',
      callback: (color1) => document.getElementById('content').style.color = color1
    }
  ];

  useEffect(() => {
    SpeechRecognition.startListening({continuous: true, language: 'en-IN'});
  }, []);

  const {transcript, browserSupportsSpeechRecognition} = useSpeechRecognition({commands});
  
  if(!browserSupportsSpeechRecognition) {
    return 'Oops!! Browser does not support the speech recognition';
  }
  return (
    <div className='container'>
      <div className='nav'>
        <h2>Please Speak Something to write</h2>
      </div>
      <div id='content'>
        {transcript}
      </div>
    </div>
  );
}
export default App;
