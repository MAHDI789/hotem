export const URL = "https://bayut.p.rapidapi.com";
/**
 *   headers: {
    'x-rapidapi-host': 'bayut.p.rapidapi.com',
    'x-rapidapi-key': '6c30b806f6msh9f27190e0592871p1aa72fjsn80307d0d7a1c'
  }
 */

export const fetchApi = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "bayut.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_CODE,
    },
  });
  return response.json();
};
