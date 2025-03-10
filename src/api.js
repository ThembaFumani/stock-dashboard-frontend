import axios from 'axios';

//const API_URL = 'https://localhost:7187/api';
const API_URL = 'https://stockdashboard-api-cacuesc5h8auhgan.southafricanorth-01.azurewebsites.net/api';

export const getStockPrices = async (symbol) => {
    try {
        const response = await axios.get(`${API_URL}/stocks/${symbol}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}