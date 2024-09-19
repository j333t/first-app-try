import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import './DeliveryList.css'; // Ensure to modify this file for background styling

const DeliveryList = () => {
  // Dummy data for deliveries with tasks
  const [deliveries] = useState([
    {
      id: 1,
      client: 'SEO optimization for Client A',
      initiated: '4 days 3 hrs ago',
      deadline: '24 days 3 hrs left',
      tasksPlanned: 4,
      tasksTotal: 12,
      tasks: [
        { id: 1, name: 'Keyword Research' },
        { id: 2, name: 'On-Page Optimization' },
        { id: 3, name: 'Content Strategy' },
        { id: 4, name: 'Backlink Analysis' },
      ],
    },
    {
      id: 2,
      client: 'SEO optimization for Client B',
      initiated: '4 days 3 hrs ago',
      deadline: '24 days 3 hrs left',
      tasksPlanned: 0,
      tasksTotal: 12,
      tasks: [], // No tasks planned
    },
    {
      id: 3,
      client: 'SEO optimization for Client C',
      initiated: '4 days 3 hrs ago',
      deadline: '24 days 3 hrs left',
      tasksPlanned: 8,
      tasksTotal: 12,
      tasks: [
        { id: 1, name: 'Technical SEO Audit' },
        { id: 2, name: 'Competitor Analysis' },
        // Add more tasks as needed
      ],
    },
  ]);

  return (
    <Container>
      <h1 className="my-4">List of Deliveries</h1>
      <p>You have {deliveries.length} active deliveries</p>
      <Row>
        {deliveries.map((delivery) => {
          const progress = (delivery.tasksPlanned / delivery.tasksTotal) * 100;

          return (
            <Col xs={12} key={delivery.id} className="mb-3">
              {/* Outer card container */}
              <Link to={`/delivery/${delivery.id}`} className="card-link-wrapper">
                {/* Background card with shading */}
                <Card className="p-3 shadow-sm task-card">
                  <div
                    className="shaded-bg"
                    style={{ width: `${progress}%` }} // Shaded width based on completion percentage
                  ></div>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="d-flex align-items-center mb-2">
                          <span className="font-weight-bold" style={{ fontSize: '1.5rem' }}>
                            {delivery.tasksPlanned} of {delivery.tasksTotal} Planned
                          </span>
                        </div>
                        <div className="mb-2">
                          <ProgressBar
                            now={progress}
                            variant={progress > 50 ? 'success' : progress > 20 ? 'warning' : 'danger'}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="mb-1 text-muted">{delivery.initiated}</p>
                        <p className="mb-0 text-muted">{delivery.deadline}</p>
                      </div>
                    </div>
                    <h5 className="mt-3">{delivery.client}</h5>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default DeliveryList;
