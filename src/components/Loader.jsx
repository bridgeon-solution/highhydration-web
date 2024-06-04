import React from 'react';
import loaderGif from '../assets/loaderr.gif'; 

const Loader = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{}}>
        <img
          src={loaderGif}
          alt="Loading..."
          style={{
            width: '200px', 
            height: '200px',
          }}
        /> 
      </div>
    </div>
  );
};

export default Loader;
