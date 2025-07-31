async function deleteTaskAPI(taskId, handleResponse, handleError, setLoading) {
  setLoading(true);
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = `/api/v2/task/` + taskId;
    const url = new URL(endpoint, baseUrl);

    const response = await fetch(url, {
      method: "DELETE",
    });

    const jsonData = await response.json();

    if (!response.ok) {
      const errorMessage = jsonData.message || "Unkown Error Occured";
      throw new Error(errorMessage);
    }
    handleResponse(jsonData);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Unkown Error";
    handleError(new Error(errorMessage));
  } finally {
    setLoading(false);
  }
}

export default deleteTaskAPI;
