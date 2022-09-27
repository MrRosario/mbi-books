import React, { FC } from "react";
import { View, StyleSheet } from "react-native";

type Props = {
    children: JSX.Element | JSX.Element[],
}
const NotFound: FC<Props> = ({ children }) => (
    <View style={styles.container}>
        {children}
    </View>
)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 100,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})
export default NotFound