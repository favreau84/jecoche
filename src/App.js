import React from 'react';
import CreateCertificateButton from './components/CreateCertificateButton'
import OutingReasonsCheckboxes from './components/OutingReasonsCheckboxes'

import './App.css';

function App() {
  return (
    <div className="App">
       <OutingReasonsCheckboxes/>
       <CreateCertificateButton/>
    </div>
  );
}

export default App;
