import React, { useEffect, useState } from 'react';
import { Table, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

interface MonitoredUser {
  id: number;
  userId: number;
  user: {
    email: string;
    username: string;
  };
  detectedAt: string;
  reason: string;
}

const MonitoredUsers: React.FC = () => {
  const [users, setUsers] = useState<MonitoredUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonitoredUsers = async () => {
      try {
        const response = await axios.get<MonitoredUser[]>('/api/monitored-users');
        setUsers(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch monitored users. Please try again later.');
        console.error('Error fetching monitored users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMonitoredUsers();
    // Refresh the list every 30 seconds
    const interval = setInterval(fetchMonitoredUsers, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mt-4">
      <h2>Monitored Users</h2>
      {users.length === 0 ? (
        <Alert variant="info">No users are currently being monitored.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Detected At</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.user.username}</td>
                <td>{user.user.email}</td>
                <td>{new Date(user.detectedAt).toLocaleString()}</td>
                <td>{user.reason}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default MonitoredUsers; 