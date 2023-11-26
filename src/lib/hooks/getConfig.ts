export const getConfig = async () => {
  return fetch("/configuration.json")
    .then(response => response.json())
    .then(data => {
      return data;
    });
};