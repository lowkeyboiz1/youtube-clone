import axios from "axios";




export const fetchAPIYoutube = async (searchKey) => {
  const BASE_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${searchKey}&key=AIzaSyAj0ppf0XbBM45_TTyO4RXOhjHm91DmQfc`;
  const { data } = await axios.get(`${BASE_URL}`);
  return data;
};
