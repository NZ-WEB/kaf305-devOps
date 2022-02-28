import axios from 'axios';
import { SERVER_BASE_URL } from '../../../utils/constants';
import { HomePageNewsInterface } from '../../../interfaces/HomePageNews.interface';

export default class HomePageNewsService {
  async getAll() {
    try {
      console.log(SERVER_BASE_URL, 'base url');

      const response = await axios.get(`${SERVER_BASE_URL}/home-page/news/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.allTopNews;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }

  async create(data: HomePageNewsInterface) {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;

      const body = JSON.stringify({
        news: data,
      });

      const response = await axios.post(
        `${SERVER_BASE_URL}/home-page/news/`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      );
      return response.data.topNews;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
}
