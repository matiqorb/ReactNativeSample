import React, { Component }     from 'react';
import PropTypes from 'prop-types';
import {Button}   from 'react-native-paper';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator
  } from 'react-native-indicators';

const propTypes = {
  bsStyle:        PropTypes.string,
  children:       PropTypes.node,
  disabled:       PropTypes.bool,
  icon:           PropTypes.node,
  loading:        PropTypes.bool,
  spinColor:      PropTypes.string,
  spinAlignment:  PropTypes.string
};
function ButtonLoader({
    bsStyle   = 'default',
    children  = null,
    disabled  = false,
    icon      = null,
    loading   = false,
    spinColor = '#fff',
    spinAlignment = 'left',
    ...rest
  }) {
   function  renderIcon() {
      if (loading) {
        return <SkypeIndicator  style={{flex: 0}}  color={spinColor} spinAlignment={spinAlignment} />;
      }
  
      return  icon;
    }
    function renderChildren(){
      return children; 
  }
    const buttonDisabled = disabled || loading;
    return <Button {...rest}  disabled={buttonDisabled} >{renderIcon()}{ renderChildren()}</Button>;
  }
  
  //ButtonLoader.propTypes = propTypes;
  
  export default ButtonLoader;
  




