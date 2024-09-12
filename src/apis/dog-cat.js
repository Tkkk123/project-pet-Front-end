import request from '@/utils/request';

const fetchData = async (url) => {
    try {
        const { data } = await request.get(url);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const DogData = async () => {
    return fetchData('/dog');
};

export const CatData = async () => {
    return fetchData('/cat');
};

