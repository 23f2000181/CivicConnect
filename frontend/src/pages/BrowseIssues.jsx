import React, { useState, useEffect } from 'react';
import { issuesService } from '../services/issues';

const BrowseIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await issuesService.getIssues();
      if (response.success) {
        setIssues(response.data);
      }
    } catch (err) {
      setError('Failed to fetch issues');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  if (loading) return <div className="loading">Loading issues...</div>;
  if (error) return <div className="text-red-600 text-center p-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Reported Issues</h1>
      
      <div className="grid gap-6">
        {issues.map((issue) => (
          <div key={issue._id} className="card">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{issue.title}</h3>
              <div className="flex space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                  {issue.status.replace('_', ' ')}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                  {issue.priority}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{issue.description}</p>
            
            <div className="flex justify-between items-center text-sm text-gray-500">
              <div>
                <span className="capitalize">{issue.category.replace('_', ' ')}</span>
                {issue.location?.address && (
                  <span> • {issue.location.address}</span>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <span>↑ {issue.upvoteCount} upvotes</span>
                <span>
                  Reported by {issue.reportedBy?.name || 'Anonymous'}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {issues.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No issues reported yet.</p>
            <p className="text-gray-400">Be the first to report an issue in your area!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseIssues;