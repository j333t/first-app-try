import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import FormComponent from './FormComponent';
import Menu, { Item as MenuItem } from 'rc-menu';
import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css'; // Import styles for rc-dropdown

const DeliveryDetail = () => {
  const { id } = useParams();

  // Dummy data to simulate fetching delivery tasks by id
  const deliveryData = {
    1: {
      client: 'SEO optimization for Client A',
      tasks: [
        { id: 1, name: 'Keyword Research', scheduled: false },
        { id: 2, name: 'On-Page Optimization', scheduled: false },
        { id: 3, name: 'Content Strategy', scheduled: false },
        { id: 4, name: 'Backlink Analysis', scheduled: true }, // Example of an already scheduled task
      ],
    },
    2: {
      client: 'SEO optimization for Client B',
      tasks: [],
    },
    3: {
      client: 'SEO optimization for Client C',
      tasks: [
        { id: 1, name: 'Technical SEO Audit', scheduled: true },
        { id: 2, name: 'Competitor Analysis', scheduled: false },
      ],
    },
  };

  const delivery = deliveryData[id];

  const [activeTaskId, setActiveTaskId] = useState(null);
  const [actionType, setActionType] = useState(''); // Track if it's reschedule or reassign

  if (!delivery) {
    return <p>Delivery not found</p>;
  }

  const handleTaskClick = (task) => {
    if (!task.scheduled) {
      setActionType('Schedule'); // When clicking unscheduled tasks, we schedule
      setActiveTaskId(task.id);
    }
  };

  const handleMenuClick = (task, { key }) => {
    if (key === 'reschedule') {
      setActionType('Reschedule');
    } else if (key === 'reassign') {
      setActionType('Reassign');
    }
    setActiveTaskId(task.id);
  };

  const handleFormSubmit = (formData) => {
    // Simulate scheduling/reassigning the task
    const updatedTasks = delivery.tasks.map((task) =>
      task.id === activeTaskId ? { ...task, scheduled: true } : task
    );
    delivery.tasks = updatedTasks;
    setActiveTaskId(null); // Close the form after submission
  };

  // Context menu for task options (Reschedule or Reassign)
  const taskMenu = (task) => (
    <Menu onClick={(info) => handleMenuClick(task, info)}>
      <MenuItem key="reschedule">Reschedule Task</MenuItem>
      <MenuItem key="reassign">Reassign Task</MenuItem>
    </Menu>
  );

  return (
    <div className="container">
      <h2>{delivery.client}</h2>
      <h4>Tasks</h4>
      <Row>
        {delivery.tasks.length > 0 ? (
          delivery.tasks.map((task) => (
            <Col xs={12} key={task.id}> {/* Each task will occupy a full row */}
              <Dropdown trigger={['contextMenu']} overlay={taskMenu(task)}>
                {/* Entire card is clickable */}
                <div onClick={() => handleTaskClick(task)} style={{ cursor: task.scheduled ? 'default' : 'pointer' }}>
                  <Card className="mb-3">
                    <Card.Body>
                      <h5>{task.name}</h5>
                      {task.scheduled ? (
                        <Button variant="success" disabled>
                          Task Scheduled
                        </Button>
                      ) : (
                        <Button variant="primary">Task Unscheduled</Button>
                      )}

                      {/* If the task is clicked for schedule, reschedule, or reassign, show the form */}
                      {activeTaskId === task.id && (
                        <div className="mt-3">
                          <h6>{actionType} Task: {task.name}</h6>
                          <FormComponent onSubmit={handleFormSubmit} task={task} />
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              </Dropdown>
            </Col>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </Row>
    </div>
  );
};

export default DeliveryDetail;
