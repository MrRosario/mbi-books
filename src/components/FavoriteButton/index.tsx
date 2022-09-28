import React, { FC } from "react";
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from "styles";
import { Ionicons } from '@expo/vector-icons';
import { storeBook, removeBook } from '@services/localStorage';
import { IStorage } from '@services/localStorage.types';

type Props = {
    isFavorited: Boolean,
    setIsFavorited: (value: boolean) => void,
    isBookStored: Boolean,
    size: any,
    data: IStorage
}

const FavoriteButton: FC<Props> = ({ isBookStored, isFavorited, setIsFavorited, size, data }) => {
    const toggleStoreBook = async () => {
        if(!isBookStored){
            await storeBook(data);
            setIsFavorited(!isFavorited)
            return;
        }
        await removeBook(data.id)
        setIsFavorited(!isFavorited)
    }

    const HeaderIcon = () => {
        if(isBookStored) {
            return <Ionicons name='heart' size={size} color={Colors.RED} />
        } 
        return <Ionicons name='heart-outline' size={size} color={Colors.BLACK} />
    }

    return (
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleStoreBook}>
            <HeaderIcon />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    favoriteButton: {
        position: 'absolute',
        bottom: 0,
        left: 0
    }
});

export default FavoriteButton;