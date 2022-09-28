import AsyncStorage from '@react-native-async-storage/async-storage';
import { IStorage } from './localStorage.types';

const DATA_KEY = '@MBI_BOOKS';

const fechBook = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(DATA_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (err) {
        console.error(err);
    }
}
const storeBook = async (newData: IStorage): Promise<any> => {
    const updatedData = [newData];
    try {
        const existingData:any = await fechBook();

        if(existingData !== null) {
            const updatedData = [...existingData, newData];
            await AsyncStorage.setItem(DATA_KEY, JSON.stringify(updatedData));
        } 
        else {
            await AsyncStorage.setItem(DATA_KEY,JSON.stringify(updatedData));
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
}

export {
    storeBook,
    fechBook,
    clearAll,
    removeBook
}
