// import React, { useEffect, useState } from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { Container, Card, ListGroup, Row, Col, Spinner } from 'react-bootstrap';
// import Dropdown from 'rc-dropdown';
// import Menu, { Item as MenuItem } from 'rc-menu';
// import { FaPause, FaPlay, FaStop, FaCalendarAlt } from 'react-icons/fa';
// import FormComponent from './FormComponent'; // Ensure your form component is imported
// import 'rc-dropdown/assets/index.css';
// import './DeliveryDetail.css';

// const DeliveryDetail = () => {
//   const location = useLocation();
//   const delCode = location.pathname.substring(location.pathname.lastIndexOf("/data/") + 11); // Adjust to your actual path

//   const [delivery, setDelivery] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTaskKey, setActiveTaskKey] = useState(null); // To track which task is active for scheduling/other actions
//   const [actionType, setActionType] = useState(''); // To differentiate between actions like 'schedule', 'reschedule'
//   const [tasks, setTasks] = useState([]);

//   // Fetching delivery details from the server
//   useEffect(() => {
//     const fetchDeliveryDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/api/data`);

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();

//         // Check if the delivery code exists in the response
//         if (data.hasOwnProperty(delCode)) {
//           const fetchedTasks = data[delCode].map((task) => ({
//             ...task,
//             scheduled: !!task.personResponsible // Mark as scheduled if personResponsible exists
//           }));
//           setDelivery(data[delCode]);
//           setTasks(fetchedTasks); // Setting tasks with scheduling info
//         } else {
//           setError('Delivery not found.');
//         }
//       } catch (err) {
//         console.error('Error fetching delivery details:', err);
//         setError('Failed to fetch delivery details.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDeliveryDetails();
//   }, [delCode]);

//   // Handling task click for scheduling or editing
//   const handleTaskClick = (task) => {
//     if (!task.scheduled) {
//       setActionType('Schedule');
//       setActiveTaskKey(task.Key); // Using task.Key instead of task.id
//     }
//   };

//   // Dropdown menu for rescheduling or reassigning task
//   const handleMenuClick = (task, { key }) => {
//     if (key === 'reschedule') {
//       setActionType('Reschedule');
//     } else if (key === 'reassign') {
//       setActionType('Reassign');
//     }
//     setActiveTaskKey(task.Key); // Using task.Key instead of task.id
//   };

//   const handleFormSubmit = (formData) => {
//     const updatedTasks = tasks.map((task) =>
//       task.Key === activeTaskKey ? {
//         ...task,
//         scheduled: true,
//         personResponsible: formData.personResponsible,
//         totalTime: formData.totalTime
//       } : task
//     );
//     setTasks(updatedTasks);
//     setActiveTaskKey(null); // Reset after form submission
//   };

//   // Timer control logic for tasks
//   const toggleTimer = (taskKey) => {
//     const updatedTasks = tasks.map((task) => {
//       if (task.Key === taskKey) {
//         return { ...task, isPlaying: !task.isPlaying };
//       }
//       return task;
//     });
//     setTasks(updatedTasks);
//   };

//   const taskMenu = (task) => (
//     <Menu onClick={(info) => handleMenuClick(task, info)}>
//       <MenuItem key="reschedule">Reschedule Task</MenuItem>
//       <MenuItem key="reassign">Reassign Task</MenuItem>
//     </Menu>
//   );

//   if (loading) {
//     return (
//       <Container className="text-center my-5">
//         <Spinner animation="border" role="status">
//           <span className="sr-only">Loading...</span>
//         </Spinner>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="text-center my-5">
//         <p className="text-danger">{error}</p>
//         <Link to="/">Back to Deliveries</Link>
//       </Container>
//     );
//   }

//   if (!delivery) {
//     return (
//       <Container className="text-center my-5">
//         <p>No delivery found</p>
//         <Link to="/">Back to Deliveries</Link>
//       </Container>
//     );
//   }

//   const client = delivery[0]?.Client || 'Unknown Client';
//   const shortDescription = delivery[0]?.Short_description || 'No description available';
//   const plannedStart = delivery[0]?.Planned_Start_Timestamp?.value ? new Date(delivery[0].Planned_Start_Timestamp.value).toLocaleString() : 'N/A';
//   const plannedDelivery = delivery[0]?.Planned_Delivery_Timestamp?.value ? new Date(delivery[0].Planned_Delivery_Timestamp.value).toLocaleString() : 'N/A';
  
//   return (
//     <Container>
//       <h1 className="my-4">Delivery Details for {client}</h1>

//       <Card className="mb-4">
//         <Card.Body>
//           <Card.Title>{shortDescription}</Card.Title>
//           <Card.Subtitle className="mb-2 text-muted">
//             Start Time: {plannedStart}
//           </Card.Subtitle>
//           <Card.Subtitle className="mb-2 text-muted">
//             Delivery Deadline: {plannedDelivery}
//           </Card.Subtitle>
//         </Card.Body>
//       </Card>

//       <h3>Tasks</h3>
//       <Row>
//         {tasks.length > 0 ? (
//           tasks.map((task, index) => (
//             <Col xs={12} key={index}>
//               <Dropdown trigger={['contextMenu']} overlay={taskMenu(task)}>
//                 <div
//                   className="task-card"
//                   onClick={() => handleTaskClick(task)}
//                   style={{ cursor: task.scheduled ? 'default' : 'pointer' }}
//                 >
//                   <Card className="mb-3">
//                     <Card.Body>
//                       <div className="d-flex align-items-center">
//                         <div className="timer-controls" style={{ marginRight: '10px' }}>
//                           {!task.scheduled ? (
//                             <FaCalendarAlt
//                               onClick={() => handleTaskClick(task)}
//                               style={{ cursor: 'pointer' }}
//                             />
//                           ) : (
//                             <>
//                               {task.isPlaying ? (
//                                 <FaPause
//                                   onClick={() => toggleTimer(task.Key)} // Using task.Key instead of task.id
//                                   style={{ cursor: 'pointer' }}
//                                 />
//                               ) : (
//                                 <FaPlay
//                                   onClick={() => toggleTimer(task.Key)} // Using task.Key instead of task.id
//                                   style={{ cursor: 'pointer' }}
//                                 />
//                               )}
//                               <FaStop
//                                 onClick={() => toggleTimer(task.Key)} // Using task.Key instead of task.id
//                                 style={{ cursor: 'pointer', marginLeft: '5px' }}
//                               />
//                             </>
//                           )}
//                         </div>

//                         <div className="flex-grow-1 text-center">
//                           <h5 className="mb-1">{task.Task_Details}</h5>
//                           <span className="text-muted">{task.Responsibility || 'Unassigned'}</span>
//                         </div>

//                         <span>
//                           {task.totalTime
//                             ? `${Math.floor(task.totalTime / 60)}h ${task.totalTime % 60
//                             }m`
//                             : '0m'}
//                         </span>
//                       </div>

//                       <div className="task-status mt-2">
//                         {task.isPlaying ? (
//                           <p className="text-success">On time for going live</p>
//                         ) : (
//                           <p className="text-muted">Paused</p>
//                         )}
//                       </div>

//                       {activeTaskKey === task.Key && actionType && (
//                         <div className="mt-3">
//                           <h6>{actionType} Task: {task.Task_Details}</h6>
//                           <FormComponent
//                             onSubmit={handleFormSubmit}
//                             task={task}
//                           />
//                         </div>
//                       )}
//                     </Card.Body>
//                   </Card>
//                 </div>
//               </Dropdown>
//             </Col>
//           ))
//         ) : (
//           <ListGroup.Item>No tasks available for this delivery.</ListGroup.Item>
//         )}
//       </Row>

//       <Link to="/" className="btn btn-primary mt-4">
//         Back to Deliveries
//       </Link>
//     </Container>
//   );
// };

// export default DeliveryDetail;

import React, { useEffect, useState } from 'react'; 
import { useLocation, Link } from 'react-router-dom';
import { Container, Card, ListGroup, Row, Col, Spinner } from 'react-bootstrap';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import { FaPause, FaPlay, FaStop, FaCalendarAlt } from 'react-icons/fa';
import FormComponent from './FormComponent'; // Ensure your form component is imported
import 'rc-dropdown/assets/index.css';
import './DeliveryDetail.css';

const DeliveryDetail = () => {
  const location = useLocation();
  const delCode = location.pathname.substring(location.pathname.lastIndexOf("/data/") + 11); // Adjust to your actual path

  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTaskKey, setActiveTaskKey] = useState(null); // Track active task for scheduling/actions
  const [actionType, setActionType] = useState(''); // Distinguish between scheduling actions
  const [tasks, setTasks] = useState([]);

  // Fetching delivery details from the server
  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      try {
        const response = await fetch(`/api/data`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Check if the delivery code exists in the response
        if (data.hasOwnProperty(delCode)) {
          const fetchedTasks = data[delCode].map((task) => ({
            ...task,
            scheduled: !!task.personResponsible // Mark as scheduled if personResponsible exists
          }));
          setDelivery(data[delCode]);
          setTasks(fetchedTasks); // Setting tasks with scheduling info
        } else {
          setError('Delivery not found.');
        }
      } catch (err) {
        console.error('Error fetching delivery details:', err);
        setError('Failed to fetch delivery details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryDetails();
  }, [delCode]);

  // Handling task click for scheduling or editing
  const handleTaskClick = (task) => {
    if (!task.scheduled) {
      setActionType('Schedule');
      setActiveTaskKey(task.Key); // Using task.Key instead of task.id
    }
  };

  // Dropdown menu for rescheduling or reassigning task
  const handleMenuClick = (task, { key }) => {
    if (key === 'reschedule') {
      setActionType('Reschedule');
    } else if (key === 'reassign') {
      setActionType('Reassign');
    }
    setActiveTaskKey(task.Key); // Using task.Key instead of task.id
  };

  const handleFormSubmit = (formData) => {
    const updatedTasks = tasks.map((task) =>
      task.Key === activeTaskKey ? {
        ...task,
        scheduled: true,
        personResponsible: formData.personResponsible,
        totalTime: formData.totalTime
      } : task
    );
    setTasks(updatedTasks);
    setActiveTaskKey(null); // Reset after form submission
  };

  // Timer control logic for tasks
  const toggleTimer = (taskKey) => {
    const updatedTasks = tasks.map((task) => {
      if (task.Key === taskKey) {
        return { ...task, isPlaying: !task.isPlaying };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const taskMenu = (task) => (
    <Menu onClick={(info) => handleMenuClick(task, info)}>
      <MenuItem key="reschedule">Reschedule Task</MenuItem>
      <MenuItem key="reassign">Reassign Task</MenuItem>
    </Menu>
  );

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <p className="text-danger">{error}</p>
        <Link to="/">Back to Deliveries</Link>
      </Container>
    );
  }

  if (!delivery) {
    return (
      <Container className="text-center my-5">
        <p>No delivery found</p>
        <Link to="/">Back to Deliveries</Link>
      </Container>
    );
  }

  const client = delivery[0]?.Client || 'Unknown Client';
  const shortDescription = delivery[0]?.Short_description || 'No description available';
  const plannedStart = delivery[0]?.Planned_Start_Timestamp?.value ? new Date(delivery[0].Planned_Start_Timestamp.value).toLocaleString() : 'N/A';
  const plannedDelivery = delivery[0]?.Planned_Delivery_Timestamp?.value ? new Date(delivery[0].Planned_Delivery_Timestamp.value).toLocaleString() : 'N/A';
  
  return (
    <Container>
      <h1 className="my-4">Delivery Details for {client}</h1>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{shortDescription}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Start Time: {plannedStart}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Delivery Deadline: {plannedDelivery}
          </Card.Subtitle>
        </Card.Body>
      </Card>

      <h3>Tasks</h3>
      <Row>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <Col xs={12} key={index}>
              <Dropdown trigger={['contextMenu']} overlay={taskMenu(task)}>
                <div
                  className="task-card"
                  onClick={() => handleTaskClick(task)}
                  style={{ cursor: task.scheduled ? 'default' : 'pointer' }}
                >
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
                                <FaPause
                                  onClick={() => toggleTimer(task.Key)} // Using task.Key instead of task.id
                                  style={{ cursor: 'pointer' }}
                                />
                              ) : (
                                <FaPlay
                                  onClick={() => toggleTimer(task.Key)} // Using task.Key instead of task.id
                                  style={{ cursor: 'pointer' }}
                                />
                              )}
                              <FaStop
                                onClick={() => toggleTimer(task.Key)} // Using task.Key instead of task.id
                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                              />
                            </>
                          )}
                        </div>

                        <div className="flex-grow-1 text-center">
                          <h5 className="mb-1">{task.Task_Details}</h5>
                          <span className="text-muted">{task.Responsibility || 'Unassigned'}</span>
                        </div>

                        <span>
                          {task.totalTime
                            ? `${Math.floor(task.totalTime / 60)}h ${task.totalTime % 60
                            }m`
                            : '0m'}
                        </span>
                      </div>

                      <div className="task-status mt-2">
                        {task.isPlaying ? (
                          <p className="text-success">On time for going live</p>
                        ) : (
                          <p className="text-muted">Paused</p>
                        )}
                      </div>

                      {activeTaskKey === task.Key && actionType && (
                        <div className="mt-3">
                          <h6>{actionType} Task: {task.Task_Details}</h6>
                          <FormComponent
                            onSubmit={handleFormSubmit}
                            task={task}
                          />
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              </Dropdown>
            </Col>
          ))
        ) : (
          <ListGroup.Item>No tasks available for this delivery.</ListGroup.Item>
        )}
      </Row>

      <Link to="/" className="btn btn-primary mt-4">
        Back to Deliveries
      </Link>
    </Container>
  );
};

export default DeliveryDetail;
