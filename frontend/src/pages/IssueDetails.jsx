import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { issuesService } from '../services/issues';

const IssueDetails = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [upvoting, setUpvoting] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchIssue();
  }, [id]);

  const fetchIssue = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await issuesService.getIssue(id);
      if (response.success) {
        setIssue(response.data);
      } else {
        setError(response.message || 'Issue not found');
      }
    } catch (err) {
      setError('Failed to load issue');
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async () => {
    if (!issue) return;
    setUpvoting(true);
    try {
      const res = await issuesService.upvoteIssue(issue._id);
      if (res.success) {
        // optimistic update
        setIssue((prev) => ({ ...prev, upvoteCount: (prev.upvoteCount || 0) + 1 }));
      }
    } catch (err) {
      // ignore for now
    } finally {
      setUpvoting(false);
    }
  };

  if (loading) return <div className="loading">Loading issue...</div>;
  if (error) return <div className="text-red-600 text-center p-8">{error}</div>;
  if (!issue) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{issue.title}</h1>
            <div className="flex items-center gap-3 mb-4">
              <span className={`badge ${issue.status ? (issue.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800') : 'bg-gray-100 text-gray-800'}`}>
                {issue.status?.replace('_', ' ') || 'unknown'}
              </span>
              <span className={`badge ${issue.priority ? (issue.priority === 'high' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800') : 'bg-gray-100 text-gray-800'}`}>
                {issue.priority || 'n/a'}
              </span>
              <span className="muted">Reported by {issue.reportedBy?.name || 'Anonymous'}</span>
            </div>

            {issue.images && issue.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {issue.images.map((img, i) => (
                  <img
                    key={i}
                    src={img.url || img}
                    alt={`issue-${i}`}
                    className="issue-image"
                  />
                ))}
              </div>
            )}

            <p className="text-gray-700 leading-relaxed mb-6">{issue.description}</p>

            <div className="flex items-center gap-4">
              <button onClick={handleUpvote} disabled={upvoting} className="btn btn-primary">
                {upvoting ? 'Upvoting...' : `Upvote (${issue.upvoteCount || 0})`}
              </button>

              <div className="text-sm text-gray-600">
                <div>Category: <span className="capitalize">{issue.category?.replace('_', ' ')}</span></div>
                {issue.location?.address && <div>Location: {issue.location.address}</div>}
              </div>
            </div>
          </div>

          <aside className="md:w-1/3">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Details</h3>
              <p className="text-sm muted mb-2">Status: <strong className="capitalize">{issue.status}</strong></p>
              <p className="text-sm muted mb-2">Priority: <strong className="capitalize">{issue.priority}</strong></p>
              <p className="text-sm muted">Reported: {new Date(issue.createdAt).toLocaleString()}</p>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Comments</h4>
              <div className="text-sm text-gray-500">Comments will appear here (coming soon)</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
