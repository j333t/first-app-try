import React, { useState } from 'react'; 
import { useParams } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import FormComponent from './FormComponent';
import Menu, { Item as MenuItem } from 'rc-menu';
import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';
import { FaPause, FaPlay, FaStop, FaCalendarAlt } from 'react-icons/fa';
import './DeliveryDetail.css';

const DeliveryDetail = () =>
{
  const { id } = useParams();

  const deliveryData = {
    1: {
      client: 'SEO optimization for Client A',
      tasks: [
        { id: 1, name: 'Keyword Research', scheduled: false, isPlaying: false, duration: 400 },
        { id: 2, name: 'On-Page Optimization', scheduled: false, isPlaying: false, duration: 380 },
        { id: 3, name: 'Content Strategy', scheduled: false, isPlaying: false, duration: 0 },
        { id: 4, name: 'Backlink Analysis', scheduled: false, isPlaying: false, duration: 300 },
      ],
    },
    2: {
      client: 'SEO optimization for Client B',
      tasks: [],
    },
    3: {
      client: 'SEO optimization for Client C',
      tasks: [
        { id: 1, name: 'Technical SEO Audit', scheduled: false, isPlaying: false, duration: 450 },
        { id: 2, name: 'Competitor Analysis', scheduled: false, isPlaying: false, duration: 240 },
      ],
    },
  };

  const delivery = deliveryData[id];
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [actionType, setActionType] = useState('');
  const [tasks, setTasks] = useState(delivery.tasks);

  if (!delivery) {
    return <p>Delivery not found</p>;
  }

  const handleTaskClick = (task) => {
    if (!task.scheduled) {
      setActionType('Schedule');
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
    const updatedTasks = tasks.map((task) =>
      task.id === activeTaskId ? { 
        ...task, 
        scheduled: true,
        personResponsible: formData.personResponsible,
        totalTime: formData.totalTime
      } : task
    );
    setTasks(updatedTasks);
    setActiveTaskId(null);
  };

  const taskMenu = (task) => (
    <Menu onClick={(info) => handleMenuClick(task, info)}>
      <MenuItem key="reschedule">Reschedule Task</MenuItem>
      <MenuItem key="reassign">Reassign Task</MenuItem>
    </Menu>
  );

  const toggleTimer = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isPlaying: !task.isPlaying };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h2>{delivery.client}</h2>
      <h4>You have {tasks.length} unplanned tasks</h4>
      <Row>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Col xs={12} key={task.id}>
              <Dropdown trigger={['contextMenu']} overlay={taskMenu(task)}>
                <div className="task-card" onClick={() => handleTaskClick(task)} style={{ cursor: task.scheduled ? 'default' : 'pointer' }}>
                  <Card className="mb-3">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <div className="timer-controls" style={{ marginRight: '10px' }}>
                          {!task.scheduled ? (
                            <FaCalendarAlt
                              onClick={() => handleTaskClick(task)}
                              style={{ cursor: 'pointer' }}
                            />
                          ) : (
                            <>
                              {task.isPlaying ? (
                                <FaPause onClick={() => toggleTimer(task.id)} style={{ cursor: 'pointer' }} />
                              ) : (
                                <FaPlay onClick={() => toggleTimer(task.id)} style={{ cursor: 'pointer' }} />
                              )}
                              <FaStop onClick={() => toggleTimer(task.id)} style={{ cursor: 'pointer', marginLeft: '5px' }} />
                            </>
                          )}
                        </div>

                        <div className="flex-grow-1 text-center">
                          <h5 className="mb-1">{task.name}</h5>
                          <span className="text-muted">{task.personResponsible || 'Unassigned'}</span>
                        </div>

                        <span>{task.totalTime ? `${Math.floor(task.totalTime / 60)}h ${task.totalTime % 60}m` : '0m'}</span>
                      </div>

                      <div className="task-status mt-2">
                        {task.isPlaying ? (
                          <p className="text-success">On time for going live</p>
                        ) : (
                          <p className="text-muted">Paused</p>
                        )}
                      </div>

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
