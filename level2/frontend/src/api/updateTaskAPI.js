async function updateTaskAPI(
  values,
  taskId,
  handleResponse,
  handleError,
  setLoading
) {
  setLoading(true);
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = `/api/v2/task/` + taskId;
    const url = new URL(endpoint, baseUrl);

    const requestBody = JSON.stringify({
      title: values.taskTitle,
      description: values.taskDescription,
      due_date: values.taskDueDate?.toISOString(),
    });

    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
    });

    //handle data coming from fetch
    const jsonData = await response.json();

    if (!response.ok) {
      const errorMessage = jsonData.message || "Unkown Error Occured";
      throw new Error(errorMessage);
    }

    handleResponse(jsonData);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || errorMessage || "unkown error";
    handleError(new Error(errorMessage));
  } finally {
    setLoading(false);
  }
}

export default updateTaskAPI;
