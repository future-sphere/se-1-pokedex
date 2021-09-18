import axios, { AxiosResponse } from 'axios';

const pokeAPI = 'https://pokeapi.co/api/v2/';

axios.defaults.baseURL = pokeAPI;

const getPokemons = (offset: number, limit: number): Promise<AxiosResponse> => {
  return axios.get('pokemon', {
    params: {
      limit,
      offset,
    },
  });
};

const PokeServices = {
  getPokemons,
};

export default PokeServices;
