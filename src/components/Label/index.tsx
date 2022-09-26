import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { Colors, Font } from 'styles';

const Label = ({ 
  label,
  bigTitle,
  bold,
  black,
  centerAlign,
  error,
  style,
  numberOfLines
}: any) => {
  const lineNumber = numberOfLines || 3
  const labelStyle = [
    styles.label,
    style,
    bigTitle ? styles.bigTitle : null,
    bold ? styles.bold : null,
    black ? styles.black : null,
    centerAlign ? styles.centerAlign : null,
    error ? styles.error : null,
  ];
  
  return (
    <Text style={labelStyle} numberOfLines={lineNumber} ellipsizeMode='tail'>
      {label}
    </Text>
  );
};

export default Label;

const styles = StyleSheet.create({
  label: {
    fontFamily: Font.FAMILY.REGULAR,
    fontSize: Font.SIZE.SIZE_14,
    color: Colors.BLACK,
  },
  bold: {
    fontFamily: Font.FAMILY.BOLD,
  },
  black: {
    fontFamily: Font.FAMILY.BLACK,
  },
  bigTitle: {
    fontSize: Font.SIZE.SIZE_28,
  },
  centerAlign: {
    alignSelf: 'center',
  },
  error: {
    color: Colors.ACTIONS.ALERT,
  },
});