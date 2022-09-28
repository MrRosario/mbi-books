import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

import { fechBook, clearAll } from '@services/localStorage'
import { Font, Colors } from "styles";

import Layout from "components/Layout";
import NotFound from "components/NotFound";
import Label from "components/Label";
import Card from "components/Card";

const Favorite = ({ navigation }: any) => {

    const [localData, setLocalData] = useState<any>([]);
    const isFocused = useIsFocused();

    const fechBooksLocally = async () => {
        const data = await fechBook();
        const items = data !== null ? data.map((item: any) => item) : []
        setLocalData(items)
    }
    useEffect(() => {
        fechBooksLocally();
    },[isFocused]);

    const hasData:any = localData.length > 0;

    const renderItem = ({ item }: any) => {
        const { author, publisher, title, thumbnail } = item;
        return (
            <Card 
                navigation={navigation}
                title={title}
                author={author} 
                publisher={publisher} 
                id={item.id}
                imgUrl={thumbnail}
            />
        );
    }

    const handleDeleteAll = async () => {
        await clearAll();
        await fechBooksLocally();
    }
    
    return (
        <Layout>
            <Label black  bigTitle label='Favoritos' />
            <View style={styles.container}>
                    {hasData && (
                        <View>
                            <TouchableOpacity style={styles.iconContainer} onPress={handleDeleteAll}>
                                <Ionicons name="ios-trash" size={30} color={Colors.PRIMARY} />
                            </TouchableOpacity>
                            <FlatList
                                data={localData}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    )}
                    {!hasData && (
                        <NotFound>
                            <Label 
                                style={styles.text} 
                                label="Nenhum livro favoritado, acesse a "
                            />
                            <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                                <Label style={[styles.text, styles.hilightedText]} bold label="busca" />
                            </TouchableOpacity>
                            <Label 
                                style={styles.text} 
                                label="para buscar e favoritar algum livro." 
                            />
                        </NotFound>
                    )}
                </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 120
    },
    text: {
        fontFamily: Font.FAMILY.THIN,
        fontSize: 18
    },
    hilightedText: {
        fontFamily: Font.FAMILY.BOLD,
        fontSize: 22,
        color: Colors.PRIMARY
    },
    iconContainer: {
        width: 30,
        borderColor: '#000',
        marginBottom: 20
    }
});
export default Favorite;