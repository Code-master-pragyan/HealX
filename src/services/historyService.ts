export async function fetchHistory() {
  const API_BASE = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${API_BASE}/api/history`);
    if (!response.ok) throw new Error("Failed to load history");
    return await response.json();
  } catch (error) {
    console.error("History fetch error:", error);
    return [];
  }
}
