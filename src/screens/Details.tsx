import React, { useState, useEffect } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    ScrollView, 
    TouchableWithoutFeedback, 
    TouchableOpacity
} from 'react-native';
import { useQuery } from 'react-query';
import * as WebBrowser from 'expo-web-browser';
import { DataTable } from 'react-native-paper';

import { getBookDetails } from '@services/api'
import { Colors, Font, Spacing } from "styles";
import { fechBook } from '@services/localStorage'

import Spinner from "components/Spinner";
import Label from "components/Label";
import FavoriteButton from '@components/FavoriteButton';
import Layout from "components/Layout";


const Details = ({ route }: any) => {
    const [isTruncated, setIsTruncated] = useState(true);
    const [isFavorited, setIsFavorited] = useState(false);
    const [localData, setLocalData] = useState([]);
    const { bookId } = route.params;
    const getBook = () => useQuery([ 'bookDetails', bookId ], () => 
        getBookDetails(bookId)
    );
    const { isLoading, isSuccess, data } = getBook();

    const fechBooksLocally = async () => {
        const data = await fechBook();
        const items = data !== null ? data.map((item: any) => item) : []
        setLocalData(items)
    }

    useEffect(() => {
        fechBooksLocally()
    },[isFavorited])

    const isBookStored = localData.some(((item:any) => item.id === bookId))

    if(!isSuccess){
        return null
    }
    
    const { 
        authors, 
        title, 
        description, 
        imageLinks, 
        publisher, 
        publishedDate, 
        printedPageCount, 
        language,
        industryIdentifiers,
        subtitle,
        infoLink,
    } = data?.volumeInfo;

    const forLocalStorage = {
        id: bookId,
        title,
        author: authors[0],
        publisher,
        thumbnail: imageLinks.thumbnail
    }

    const ReadMore = () => (
        <TouchableWithoutFeedback onPress={() => setIsTruncated(!isTruncated)}>
            <Text style={{ color: Colors.PRIMARY }}>
                {isTruncated ? "Ler mais" : " Ler menos"}
            </Text>
        </TouchableWithoutFeedback>
    )
    const handleOpenLink = async () => {
        await WebBrowser.openBrowserAsync(infoLink);
    };

    const formattedDate = new Date(publishedDate).
        toLocaleDateString().replace(/\b(\d)\b/g, '0$1');

    return (
        <ScrollView>
            <Layout>
                { isLoading && (<Spinner />) }
                { isSuccess && (
                    <View>
                        <View style={styles.imageWrapper}>
                            <FavoriteButton 
                                isFavorited={isFavorited}
                                setIsFavorited={setIsFavorited}
                                data={forLocalStorage}
                                isBookStored={isBookStored}
                                size={40}
                            />
                            <Image style={styles.bigImage} source={{ uri: imageLinks.large }} />
                        </View>
                        <View style={styles.titleWrapper}>
                            <Label style={styles.title} label={`${title}${subtitle ? ':' : ''}`} />
                            <Label style={styles.subtitle} label={subtitle} />
                            <Label style={styles.author} label={`por: ${authors[0]}`} />

                            <TouchableOpacity onPress={handleOpenLink}>
                                <Label style={styles.knowMore} label='Saiba mais' />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.descriptionWrapper}>
                            <Label style={styles.bigTitle} label='Descrição' />
                            <View>
                                <Label 
                                    style={styles.description} 
                                    label={description} 
                                    numberOfLines={isTruncated ? 3 : Number.MAX_SAFE_INTEGER} 
                                />
                                <ReadMore />
                            </View>
                        </View>
                        <View style={styles.detailsWrapper}>
                            <Label style={styles.bigTitle} label='Detalhes do livro' />
                            <DataTable>
                                <DataTable.Row>
                                    <DataTable.Cell>
                                        <Label style={styles.tableKey} label='Titulo original' />
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        <Label style={styles.tableValue} label={title} />
                                    </DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell>
                                        <Label style={styles.tableKey} label='Páginas' />
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        <Label style={styles.tableValue} label={printedPageCount} />
                                    </DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell>
                                        <Label style={styles.tableKey} label='Autor' />
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        <Label style={styles.tableValue} label= {authors[0]} />
                                    </DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell>
                                        <Label style={styles.tableKey} label='ISBN' />
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        <Label style={styles.tableValue} label={industryIdentifiers[1].identifier} />
                                    </DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell>
                                        <Label style={styles.tableKey} label='Idioma' />
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        <Label style={styles.tableValue} label={language} />
                                    </DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell>
                                        <Label style={styles.tableKey} label='Editora' />
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        <Label style={styles.tableValue} label={publisher} />
                                    </DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell>
                                        <Label style={styles.tableKey} label='Data da publicação' />
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        <Label style={styles.tableValue} label={formattedDate} />
                                    </DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>
                        </View>
                    </View>
                )}
            </Layout>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    imageWrapper: {
        alignItems: 'center',
    },
    favoriteButton: {
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    knowMore: {
        marginVertical: 20,
        textDecorationLine: 'underline',
        fontSize: 16,
        fontFamily: Font.FAMILY.MEDIUM
    },
    bigImage: {
        height: 350,
        width: 234,
        borderRadius: Spacing.BORDER_RADIUS
    },
    titleWrapper: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 12,
    },
    title: {
        fontFamily: Font.FAMILY.BOLD,
        fontSize: 20,
        textAlign: 'center'
    },
    bigTitle: {
        marginBottom: 10,
        fontFamily: Font.FAMILY.BOLD,
        fontSize: 20
    },
    subtitle: {
        fontFamily: Font.FAMILY.REGULAR,
        lineHeight: Font.LINE_HEIGHT._22,
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center'
    },
    author: {
        fontFamily: Font.FAMILY.THIN,
        fontSize: 14
    },
    descriptionWrapper: {
        marginBottom: 20
    },
    description: {
        fontFamily: Font.FAMILY.REGULAR,
        lineHeight: Font.LINE_HEIGHT._14,
        textAlign: 'left'

    },
    detailsWrapper: {

    },
    tableKey: {
        fontFamily: Font.FAMILY.BOLD,
        fontSize: 14
    },
    tableValue: {
        fontFamily: Font.FAMILY.THIN,
        fontSize: 14
    }
});

export default Details;