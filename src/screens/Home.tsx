import React from "react";
import Label from "components/Label";
import Layout from '@components/Layout';
import { StyleSheet, View, FlatList } from "react-native";
import { useQuery } from 'react-query';
import { Font } from "styles";
import { featuredBooks } from "@services/api";
import Card from "@components/Card";
import Spinner from '@components/Spinner';

const Home = ({ navigation }: any) => {
    const featureBook = () => useQuery('featured', featuredBooks);
    
    const {isLoading, isSuccess, data } = featureBook();
    const featuredBook = data?.items;

    const renderItem = ({ item }: any) => {
        const { authors, publisher, title, imageLinks } = item?.volumeInfo;
        return (
            <Card 
                navigation={navigation}
                title={title}
                author={authors[0]} 
                publisher={publisher} 
                id={item.id}
                imgUrl={imageLinks.thumbnail}
            />
        );
    }

    console.log('featuredBook: ', featuredBook)
    return (
        <Layout>
            <Label 
                style={styles.bigTitle} 
                black 
                bigTitle
                label='Destaques' 
            />
            <View style={styles.feedContainer}>
                { isLoading && <Spinner /> }
                { isSuccess && (
                    <FlatList
                        data={featuredBook}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                )}
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    bigTitle: {
        fontSize: Font.SIZE.SIZE_28,
        fontFamily: Font.FAMILY.BLACK
    },
    feedContainer: {
        marginTop: 24
    }

})
export default Home;