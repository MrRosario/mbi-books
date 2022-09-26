import AsyncStorage from '@react-native-async-storage/async-storage';

interface IValues {
    id: String,
    title: String,
    thumbnail: String,
    publisher: String,
    author: String
}
type storageType = {
    key: string;
    values?: IValues;
}
const DATA_KEY = '@MBI_BOOKS';

const fechBook = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(DATA_KEY);
        console.log(`jsonValue: ${jsonValue}`);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (err) {
        console.error(err);
    }
}
const storeBook = async (newData: IValues): Promise<any> => {
    const updatedData = [newData];
    try {
        const existingData:any = await fechBook();
        
        console.log('existingData: ', existingData);

        if(existingData !== null) {
            const updatedData = [...existingData, newData];
            console.log('pushed data')
            await AsyncStorage.setItem(DATA_KEY, JSON.stringify(updatedData));
        } 
        else {
            await AsyncStorage.setItem(DATA_KEY,JSON.stringify(updatedData));
            console.log('NewData setted')
        }
    }
    catch (err) {
        console.warn(err);
    }
}
const removeBook = async (bookId: String) => {
    try {
        const existingData:any = await fechBook();
        const filteredItems = existingData.filter((item:any) => item.id != bookId);
        await AsyncStorage.setItem(DATA_KEY, JSON.stringify(filteredItems));
        console.log(`book: ${bookId} removed`);
    } catch(err) {
        console.error(err);
    }
}
const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
        console.warn(e);
    }
    console.log('clear all done')
}

export {
    storeBook,
    fechBook,
    clearAll,
    removeBook
}
