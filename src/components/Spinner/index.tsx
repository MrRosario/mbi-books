import React from "react";
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from "styles";
const Spinner = () => (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.PRIMARY} />
    </View>
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
});

export default Spinner