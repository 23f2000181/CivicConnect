import api from './api';

export const issuesService = {
  getIssues: async (params = {}) => {
    const response = await api.get('/issues', { params });
    return response.data;
  },

  getIssue: async (id) => {
    const response = await api.get(`/issues/${id}`);
    return response.data;
  },

  createIssue: async (issueData) => {
    const formData = new FormData();
    
    // Append basic fields
    Object.keys(issueData).forEach(key => {
      if (key === 'images' && issueData.images) {
        issueData.images.forEach(image => {
          formData.append('images', image);
        });
      } else {
        formData.append(key, issueData[key]);
      }
    });

    const response = await api.post('/issues', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  upvoteIssue: async (id) => {
    const response = await api.post(`/issues/${id}/upvote`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/issues/stats/overview');
    return response.data;
  }
};