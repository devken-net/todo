import React, { PropTypes } from 'react';
import Header from '../components/common/Header';

function App({ children }) {
  return (
    <div className="container">
      <Header />
      {children}
    </div>
  );
}

export default App;
