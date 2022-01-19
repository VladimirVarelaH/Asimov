import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './main/index.jsx';
import Alert from './alert/index.jsx';

function App() {
  const [alert, setAlert] = useState(0);
  useEffect(()=>{
    if (alert != 0){
      setTimeout(()=>setAlert(0), 7500);
    }
  }, [alert])

  return (
    <>
      <header id="header">
        Agenda tu hora con la <br/> MUERTE
      </header>
      <Alert type={alert} handler={setAlert}/>
      <Form handler={setAlert}/>
    </>
  );
}

export default App;
