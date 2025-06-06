import React, { useState } from 'react';
import { Button, Card, Container, Alert } from 'react-bootstrap';
import MonitoredUsers from '../components/MonitoredUsers';
import { simulateSuspiciousActivity } from '../utils/simulateSuspiciousActivity';

const AdminTestPage: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStatus, setSimulationStatus] = useState<string | null>(null);

  const handleSimulate = async () => {
    setIsSimulating(true);
    setSimulationStatus('Starting simulation...');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      await simulateSuspiciousActivity({
        //baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000',
        baseUrl: process.env.REACT_APP_API_URL || 'https://mppanime-backend.onrender.com',
        //baseUrl: process.env.REACT_APP_API_URL || 'https://mppanime-frontend.onrender.com',
        token,
        requestCount: 30, // More requests to ensure detection
        delayMs: 50 // Faster requests to trigger monitoring
      });

      setSimulationStatus('Simulation completed successfully. Check the monitored users list above.');
    } catch (error: any) {
      setSimulationStatus(`Simulation failed: ${error?.message || 'Unknown error occurred'}`);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Admin Test Page</h1>
      
      <Card className="mb-4">
        <Card.Header>Simulate Suspicious Activity</Card.Header>
        <Card.Body>
          <p>Click the button below to simulate suspicious activity from a regular user account.</p>
          <Button 
            variant="primary" 
            onClick={handleSimulate}
            disabled={isSimulating}
          >
            {isSimulating ? 'Simulating...' : 'Start Simulation'}
          </Button>
          
          {simulationStatus && (
            <Alert variant={isSimulating ? 'info' : 'success'} className="mt-3">
              {simulationStatus}
            </Alert>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>Monitored Users</Card.Header>
        <Card.Body>
          <MonitoredUsers />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminTestPage; 