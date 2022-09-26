import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Spacing } from 'styles';

type Props = {
    children?: JSX.Element | JSX.Element[];
};
const Layout: FC<Props> = ({ children }) => (
    <View style={styles.container}>
      {children}
    </View>
)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: Spacing.SCALE_16,
        paddingVertical: Spacing.SCALE_24
    }
})
export default Layout;
