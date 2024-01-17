import React, { useState } from 'react';
import { CommentSection } from './organisms/CommentSection/CommentSection';
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <CommentSection />
      </div>
    </div>
  );
}

export default App;
