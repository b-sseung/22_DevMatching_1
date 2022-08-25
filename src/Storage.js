const storage = localStorage;

export const setStorage = (nextState) => {
    try {
        storage.setItem('state', JSON.stringify(nextState));
    } catch (e){
        Error(e);
    }
}

export const getStorage = () => {
    try {
        const value = storage.getItem('state');
        return value ? JSON.parse(value) : null;
    } catch (e){
        Error(e);
    }
}