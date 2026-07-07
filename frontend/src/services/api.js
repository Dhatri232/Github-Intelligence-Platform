import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchRepository(owner, repo) {
  try {
    const response = await apiClient.get(`/github/repo/${owner}/${repo}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch repository"
    );
  }
}

export async function fetchAnalysis(owner, repo) {
  try {
    const response = await apiClient.post(
      `/github/analyze/${owner}/${repo}`
    );
    return response.data.analysis;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to analyze repository"
    );
  }
}

export async function healthCheck() {
  try {
    const response = await apiClient.get("/health");
    return response.data;
  } catch (error) {
    return null;
  }
}