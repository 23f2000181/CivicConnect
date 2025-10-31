import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { issuesService } from '../services/issues';

const BrowseIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [upvotingId, setUpvotingId] = useState(null);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await issuesService.getIssues();
      if (response.success && Array.isArray(response.data)) {
        setIssues(response.data);
      } else {
        setIssues([]);
      }
    } catch (err) {
      setError('');
      setIssues([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!id) return; // sample cards
    setUpvotingId(id);
    setIssues((prev) => prev.map(it => it._id === id ? { ...it, upvoteCount: (it.upvoteCount || 0) + 1 } : it));
    try {
      await issuesService.upvoteIssue(id);
    } catch (err) {
      setIssues((prev) => prev.map(it => it._id === id ? { ...it, upvoteCount: Math.max(0, (it.upvoteCount || 1) - 1) } : it));
    } finally {
      setUpvotingId(null);
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

  const isFlagged = (issue) => issue.priority === 'critical' || issue.flagged === true;

  const sampleIssues = [
    {
      _id: null,
      title: 'Pothole near Community Center',
      description: 'Large pothole causing traffic slowdown and potential vehicle damage on Elm Street.',
      category: 'pothole',
      status: 'pending',
      priority: 'critical',
      upvoteCount: 42,
      reportedBy: { name: 'Rakesh Sharma' },
      images: ['https://images.unsplash.com/photo-1586728595683-3e9a4d9a9152?q=80&w=1400&auto=format&fit=crop']
    },
    {
      _id: null,
      title: 'Broken streetlight in Block A',
      description: 'Streetlight not working for 2 weeks; the lane is very dark at night.',
      category: 'streetlight',
      status: 'in_progress',
      priority: 'high',
      upvoteCount: 18,
      reportedBy: { name: 'Ananya Gupta' },
      images: ['https://images.unsplash.com/photo-1542349314-e3b0a1bcd0d3?q=80&w=1400&auto=format&fit=crop']
    },
    {
      _id: null,
      title: 'Garbage not collected',
      description: 'Overflowing dumpsters near Market Road. Needs immediate attention from sanitation.',
      category: 'garbage',
      status: 'pending',
      priority: 'medium',
      upvoteCount: 9,
      reportedBy: { name: 'Priya Verma' },
      images: ['https://images.unsplash.com/photo-1608571424021-2d4dfdc2621d?q=80&w=1400&auto=format&fit=crop']
    }
  ];

  const displayIssues = (issues && issues.length > 0) ? issues : sampleIssues;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest community reports</h1>

      {loading && (
        <div className="loading">Loading issues...</div>
      )}

      {!loading && (
        <div className="issue-grid">
          {displayIssues.map((issue, idx) => {
            const CardWrapper = issue._id ? Link : 'div';
            const cardProps = issue._id ? { to: `/issues/${issue._id}` } : {};
            return (
              <CardWrapper
                key={issue._id || `sample-${idx}`}
                {...cardProps}
                className="card block text-inherit hover:no-underline overflow-hidden"
              >
                {/* Image with overlays */}
                <div className="relative mb-4">
                  {issue.images && issue.images.length > 0 ? (
                    <img
                      src={issue.images[0].url || issue.images[0]}
                      alt={issue.title}
                      loading="lazy"
                      className="issue-image"
                    />
                  ) : (
                    <div className="issue-image" style={{ background: 'linear-gradient(180deg, #e5e7eb, #f3f4f6)' }} />
                  )}
                  <div className="image-gradient" />
                  <div className="image-overlay-top-right flex gap-2">
                    <span className={`badge ${getStatusColor(issue.status || 'pending')}`}>{(issue.status || 'pending').replace('_', ' ')}</span>
                    <span className={`badge ${getPriorityColor(issue.priority || 'medium')}`}>{issue.priority || 'medium'}</span>
                  </div>
                  {isFlagged(issue) && (
                    <span className="badge bg-red-100 text-red-700 image-overlay-top-left">Flagged</span>
                  )}
                </div>

                {/* Title and description */}
                <h3 className="text-xl font-semibold text-gray-900 mb-1 line-clamp-1">{issue.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{issue.description}</p>

                {/* Meta and actions */}
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div>
                    <span className="capitalize">{(issue.category || 'other').replace('_', ' ')}</span>
                    {issue.location?.address && (
                      <span> • {issue.location.address}</span>
                    )}
                    <span> • Reported by {issue.reportedBy?.name || 'Community Member'}</span>
                  </div>
                  <button
                    onClick={(e) => handleUpvote(e, issue._id)}
                    className="chip chip-ghost"
                    disabled={upvotingId === issue._id}
                    aria-label="Upvote issue"
                  >
                    <svg className="chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5l6 6H6l6-6z" />
                    </svg>
                    {upvotingId === issue._id ? 'Voting…' : (issue.upvoteCount || 0)}
                  </button>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BrowseIssues;