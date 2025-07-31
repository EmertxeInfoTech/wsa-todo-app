async function fetchTasksAPI(handleResponse, handleError, options = {}) {
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = "/api/v2/tasks";

    const url = new URL(endpoint, baseUrl);
    if (options.sortOption) {
      // http://localhost:5000/api/v2/tasks?sort_by=date_added&sort_type=asc
      url.searchParams.append("sort_by", options.sortOption);
      url.searchParams.append("sort_type", "asc");
    }

    // http://localhost:5000/api/v2/tasks?status=["open","In-progess"]
    if (options.selectedStatus?.length) {
      const strigifiedArray = JSON.stringify(options.selectedStatus);
      url.searchParams.append("status", strigifiedArray);
    }

    // http://localhost:5000/api/v2/tasks?labels=["React","assignment"]
    if (options.selectedLabels?.length) {
      const strigifiedArray = JSON.stringify(options.selectedLabels);
      url.searchParams.append("labels", strigifiedArray);
    }

    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("error response", errorText);
      throw new Error(`HTTP Error ${response.status}: ${errorText}`);
    }

    const jsonData = await response.json();
    console.log(jsonData);
    handleResponse(jsonData);
  } catch (error) {
    handleError(error.message);
  }
}

export default fetchTasksAPI;
