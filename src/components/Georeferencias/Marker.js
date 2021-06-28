  
import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
const styleW = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '18px',
  height: '18px',
  backgroundColor: '#000',
  border: '2px solid #fff',
  borderRadius: '100%',
  userSelect: 'none',
  transform: "translate(-50%, -50%)",
  // cursor: ${(props) => (props.onClick ? 'pointer' : 'default')}
}

const Wrapper = () => <div style={styleW}></div>

const Marker = ({ text, onClick }) => (
  <Wrapper
    alt={text}
    onClick={onClick}
  />
);

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default Marker;