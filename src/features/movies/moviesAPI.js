import { httpAPI } from "../../service/httpService";
import { config } from '../../config/settings';

export const getMoviesAPI = async ({
  url = `?apikey=${config.omdbAPIKey}&plot=full&t=`,
  title = ''
}) => {
  let fullUrl = `${url}${title}`;
  const response = await httpAPI().get(`${fullUrl}`);
  return response.data;
};
