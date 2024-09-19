// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, Slider, DatePicker, Select, notification } from 'antd';
// import moment from 'moment';

// const { Option } = Select;

// const FormComponent = ({ onSubmit, task }) => {
//     const [form] = Form.useForm();
//     const [sliderCount, setSliderCount] = useState(0);
//     const [hours, setHours] = useState({});
//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);
//     const [deliverySlot, setDeliverySlot] = useState(null);
//     const [personResponsible, setPersonResponsible] = useState('');

//     useEffect(() => {
//         if (task) {
//             form.setFieldsValue({
//                 name: task.name,
//             });
//             // Simulate pre-filled scheduling data (if applicable)
//             setStartDate(task.startDate || null);
//             setEndDate(task.endDate || null);
//             setPersonResponsible(task.personResponsible || '');
//         }
//     }, [task, form]);

//     const handleStartDateChange = (date) => {
//         setStartDate(date);
//         if (date && endDate) {
//             calculateSliderCount(date, endDate);
//         }
//     };

//     const handleEndDateChange = (date) => {
//         setEndDate(date);
//         if (startDate && date) {
//             calculateSliderCount(startDate, date);
//         }
//     };

//     const calculateSliderCount = (start, end) => {
//         if (start && end) {
//             const difference = end.diff(start, 'days') + 1;
//             setSliderCount(difference);
//             setHours({});
//         } else {
//             setSliderCount(0);
//         }
//     };

//     const handleSubmit = () => {
//         form
//             .validateFields()
//             .then((values) => {
//                 const scheduledData = {
//                     ...values,
//                     no_of_days_worked: sliderCount,
//                     delivery_slot: deliverySlot,
//                     startDate: startDate,
//                     endDate: endDate,
//                     hours: hours,
//                     personResponsible: personResponsible,
//                 };
//                 onSubmit(scheduledData); // Call parent component's handler
//                 notification.success({
//                     message: 'Task Updated',
//                     description: 'Your task has been successfully updated!',
//                 });
//                 form.resetFields();
//                 setSliderCount(0);
//                 setHours({});
//                 setStartDate(null);
//                 setEndDate(null);
//                 setDeliverySlot(null);
//                 setPersonResponsible('');
//             })
//             .catch((error) => {
//                 notification.error({
//                     message: 'Error',
//                     description: 'Please fill in all required fields',
//                 });
//             });
//     };

//     return (
//         <Form form={form} layout="vertical" onFinish={handleSubmit}>
//             <Form.Item
//                 name="name"
//                 label="Task Name"
//                 rules={[{ required: true, message: 'Please input the task name!' }]}
//             >
//                 <Input />
//             </Form.Item>
//             <Form.Item label="Start Date">
//                 <DatePicker onChange={handleStartDateChange} value={startDate ? moment(startDate) : null} />
//             </Form.Item>
//             <Form.Item label="End Date">
//                 <DatePicker onChange={handleEndDateChange} value={endDate ? moment(endDate) : null} />
//             </Form.Item>
//             {Array.from({ length: sliderCount }).map((_, index) => (
//                 <Form.Item key={index} label={`Hours for Day ${index + 1}`}>
//                     <Slider
//                         min={0}
//                         max={24}
//                         step={0.5}
//                         onChange={(value) => setHours((prev) => ({ ...prev, [index]: value }))}
//                         value={hours[index] || 0}
//                     />
//                 </Form.Item>
//             ))}
//             <Form.Item
//                 name="deliverySlot"
//                 label="Delivery Slot"
//                 rules={[{ required: true, message: 'Please select a delivery slot!' }]}
//             >
//                 <Select placeholder="Select a delivery slot" onChange={setDeliverySlot} value={deliverySlot}>
//                     <Option value="1pm">1pm</Option>
//                     <Option value="4pm">4pm</Option>
//                     <Option value="7pm">7pm</Option>
//                 </Select>
//             </Form.Item>
//             <Form.Item
//                 label="Person Responsible"
//                 rules={[{ required: true, message: 'Please input the person responsible!' }]}
//             >
//                 <Input value={personResponsible} onChange={(e) => setPersonResponsible(e.target.value)} />
//             </Form.Item>
//             <Form.Item>
//                 <Button type="primary" htmlType="submit">
//                     Submit
//                 </Button>
//             </Form.Item>
//         </Form>
//     );
// };

// export default FormComponent;







import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Slider, DatePicker, Select, notification } from 'antd';
import moment from 'moment';

const { Option } = Select;

const FormComponent = ({ onSubmit, task }) => {
    const [form] = Form.useForm();
    const [sliderCount, setSliderCount] = useState(0);
    const [hours, setHours] = useState({});
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [deliverySlot, setDeliverySlot] = useState(null);
    const [personResponsible, setPersonResponsible] = useState('');

    useEffect(() => {
        if (task) {
            form.setFieldsValue({
                name: task.name,
            });
            setStartDate(task.startDate || null);
            setEndDate(task.endDate || null);
            setPersonResponsible(task.personResponsible || '');
        }
    }, [task, form]);

    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (date && endDate) {
            calculateSliderCount(date, endDate);
        }
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        if (startDate && date) {
            calculateSliderCount(startDate, date);
        }
    };

    const calculateSliderCount = (start, end) => {
        if (start && end) {
            const difference = end.diff(start, 'days') + 1;
            setSliderCount(difference);
            setHours({});
        } else {
            setSliderCount(0);
        }
    };

    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                const scheduledData = {
                    ...values,
                    no_of_days_worked: sliderCount,
                    delivery_slot: deliverySlot,
                    startDate: startDate,
                    endDate: endDate,
                    hours: hours,
                    personResponsible: personResponsible,
                };
                onSubmit(scheduledData);
                notification.success({
                    message: 'Task Updated',
                    description: 'Your task has been successfully updated!',
                });
                form.resetFields();
                setSliderCount(0);
                setHours({});
                setStartDate(null);
                setEndDate(null);
                setDeliverySlot(null);
                setPersonResponsible('');
            })
            .catch((error) => {
                notification.error({
                    message: 'Error',
                    description: 'Please fill in all required fields',
                });
            });
    };

    const customMarks = {
        1: '1 m',
        10: '10 m',
        60: '1 h',
        120: '2 h',
        180: '3 h',
        240: '4 h',
        300: '5 h',
        360: '6 h',
        420: '7 h',
        480: '8 h',
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
                name="name"
                label="Task Name"
                rules={[{ required: true, message: 'Please input the task name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="Start Date">
                <DatePicker onChange={handleStartDateChange} value={startDate ? moment(startDate) : null} />
            </Form.Item>
            <Form.Item label="End Date">
                <DatePicker onChange={handleEndDateChange} value={endDate ? moment(endDate) : null} />
            </Form.Item>

            {Array.from({ length: sliderCount }).map((_, index) => (
                <Form.Item key={index} label={`Hours for Day ${index + 1}`}>
                    <Slider
                        marks={customMarks} // Using custom marks for the slider
                        min={1}
                        max={480}
                        step={1} // Allow selecting any value
                        onChange={(value) => setHours((prev) => ({ ...prev, [index]: value }))}
                        value={hours[index] || 0}
                        tooltip={{ formatter: value => `${value} minutes` }} // Tooltip with time value
                    />
                </Form.Item>
            ))}

            <Form.Item
                name="deliverySlot"
                label="Delivery Slot"
                rules={[{ required: true, message: 'Please select a delivery slot!' }]}
            >
                <Select placeholder="Select a delivery slot" onChange={setDeliverySlot} value={deliverySlot}>
                    <Option value="1pm">1pm</Option>
                    <Option value="4pm">4pm</Option>
                    <Option value="7pm">7pm</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Person Responsible"
                rules={[{ required: true, message: 'Please input the person responsible!' }]}
            >
                <Input value={personResponsible} onChange={(e) => setPersonResponsible(e.target.value)} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormComponent;
