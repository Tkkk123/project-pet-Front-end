import request from '@/utils/request'
const fetchData = async (url) => {
    try {
        const { title, subtitle, data } = await request.get(url);
        if (title && subtitle && data) {
            return { title, subtitle, data };
        }
    } catch (error) {
        console.error('获取数据时出现错误:', error);
    }
};
export const ScrollbarNewApi = async () => {
    return fetchData('/new');
};
