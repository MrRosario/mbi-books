import React, { FC } from "react";
import Label from "components/Label";
import { StyleSheet, View, TouchableOpacity, Image} from "react-native";
import { Font, Spacing, Colors } from "styles";

type Props = {
    title: String, 
    author: String[], 
    publisher: String,
    id: string,
    subtitle: String,
    imgUrl: any,
    navigation: any
}

const Card: FC<Props> = ({title, author, publisher, imgUrl, id, navigation, subtitle}) => {
    const goToDetailsPage = () => {
        navigation.navigate('DetailsScreen', {
            bookId: id,
            title: title,
            subtitle: subtitle,
          });
    }

    return (
        <TouchableOpacity onPress={goToDetailsPage}>
            <View style={styles.card} >
                <Image 
                    style={styles.thumbnail} 
                    source={{uri: imgUrl}} 
                />
                <View style={styles.textContainer}>
                    <Label style={styles.title} label={title} numberOfLines={2} />
                    <Label style={styles.author} label={`por: ${author}`} />
                    <Label style={styles.publisher} label={publisher} />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const borderStyle = {
    borderColor: Colors.GREY,
    borderRadius: Spacing.BORDER_RADIUS,
    borderWidth: 2,
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        maxHeight: 145,
        padding: 10,
        flexDirection: 'row',
        ...borderStyle,
        marginBottom: 10
    },
    textContainer: {
        flexDirection: 'column',
        width: '70%',
        marginLeft: 10,
        padding: 10,
        // borderWidth: 1,
        // borderColor: 'black'
    },
    authorWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    thumbnail: {
        width: 97,
        height: 120,
        borderRadius: Spacing.BORDER_RADIUS,
    },
    title: {
        fontSize: Font.SIZE.SIZE_16,
        fontFamily: Font.FAMILY.MEDIUM,
        fontWeight: '700',
        marginBottom: 10,
        flexShrink: 1,
        flexWrap: 'wrap'
    },
    author: {
        fontSize: Font.SIZE.SIZE_14,
        fontFamily: Font.FAMILY.THIN,
        marginBottom: 10,
    },
    publisher: {
        fontSize: Font.SIZE.SIZE_12,
        fontFamily: Font.FAMILY.LIGHT
    }
});
export default Card;