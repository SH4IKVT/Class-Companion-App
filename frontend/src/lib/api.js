import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4080",
  withCredentials: true
});

export const fetchAssignments = () => api.get("/assignments/all");
export const postAssignment   = (formData) => api.post("/assignments/upload", formData);

export const fetchNotes = () => api.get("/notes/all");
export const postNote   = (formData) => api.post("/notes/upload", formData);


export const fetchAnnouncements  = () => api.get("/announcements/all");
export const postAnnouncement    = (data) => api.post("/announcements/upload", data);
export const deleteAnnouncement  = (id) => api.delete(`/announcements/${id}`);
