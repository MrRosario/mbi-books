import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, FlatList } from 'react-native';
import { Colors, Font, Spacing } from "styles";

import { useQuery } from 'react-query';
import { searchBook } from '@services/api'
import Layout from "components/Layout";
import Label from "components/Label";
import NotFound from "components/NotFound";
import Spinner from "components/Spinner";
import Card from "components/Card";
import useDebounce from "hooks/useDebounce";

const Search = ({ navigation }: any) => {

    const [searchTerm, setSearchTerm] = useState<String>('');
    const [page, setPage] = useState<Number>(0);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const { isLoading, data, refetch } = useQuery(
        ["book", debouncedSearchTerm], async () => 
        await searchBook(debouncedSearchTerm, page)
    );

    const searchResults = data?.items;
    const hasData = searchResults?.length > 0;

    const renderItem = ({ item }: any) => {
        const { authors, publisher, title, imageLinks } = item?.volumeInfo;

        return (
            <Card 
                navigation={navigation}
                title={title}
                author={authors} 
                publisher={publisher} 
                id={item.id}
                imgUrl={imageLinks?.thumbnail}
            />
        );
    }

    return (
        <Layout>
            <Label black bigTitle label='Buscar' />
            <View style={styles.container}>
                <TextInput
                    style={styles.textInputStyle}
                    placeholderTextColor={Colors.TRANSPARENT}
                    onChangeText={(text) => setSearchTerm(text)}
                    value={searchTerm}
                    underlineColorAndroid="transparent"
                    placeholder="Busque livros"
                />

                <View style={ styles.contentContainer}>
                    { !hasData && isLoading && <Spinner /> }

                    { !hasData && !isLoading && (
                        <NotFound>
                            <Label style={styles.text} 
                                label='Por favor, use a barra de busca para encontrar o livro em que procuras.' 
                            />
                        </NotFound>
                    )}
                    { hasData && (
                        <FlatList
                            data={searchResults}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => item.id}
                        />
                    )}
                </View>
            </View>
        </Layout>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    contentContainer: {
        paddingTop: 40,
    },
    text: {
        textAlign: 'center',
        fontFamily: Font.FAMILY.THIN,
        fontSize: 18
    },
    textInputStyle: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: Colors.TRANSPARENT,
        borderRadius: Spacing.BORDER_RADIUS,
        paddingHorizontal: 10,
    }
})
export default Search;