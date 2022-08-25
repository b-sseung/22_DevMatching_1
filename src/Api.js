const base = 'https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev';

const cache = {};
export const request = async (keyword) => {
    try {
        if (cache[keyword]) {
            return cache[keyword];
        }

        const res = await fetch(`${base}${keyword === '' ? '' : '/languages?keyword='}${keyword}`);

        if (res.ok) {
            const json = await res.json();
            cache[keyword] = json;
            return json;
        }
        
    } catch (e) {
        Error(e);
    }
}