import axios from "axios";

const client = axios.create({
  baseURL: 'http://challenge-react.alkemy.org/'
});

export const login = async (data) => {
  try {
    const response = await client.post('', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};