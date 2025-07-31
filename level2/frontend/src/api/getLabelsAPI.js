async function getLabelsAPI(handleResponse, handleError) {
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = "/api/v2/labels";
    const url = new URL(endpoint, baseUrl);

    const response = await fetch(url);
    const jsonData = await response.json();

    if (!response.ok) {
      const errorMessage = jsonData.message || "Unkown error occured";
      throw new Error(errorMessage);
    }
    handleResponse(jsonData);
  } catch (error) {
    handleError(error.message);
  }
}

export default getLabelsAPI;
