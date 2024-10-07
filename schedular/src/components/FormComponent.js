import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Slider, DatePicker, Select, notification, Row, Col } from 'antd';
import moment from 'moment';
import './FormComponent.css';

const { Option } = Select;

const FormComponent = ({ onSubmit, task }) => {
    const [form] = Form.useForm();
    const [sliderCount, setSliderCount] = useState(0);
    const [hours, setHours] = useState({});
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [deliverySlot, setDeliverySlot] = useState(null);
    const [personResponsible, setPersonResponsible] = useState('');
    const [numberOfDays, setNumberOfDays] = useState(0);

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
        if (date && numberOfDays) {
            calculateEndDate(date, numberOfDays);
        }
    };

    const handleNumberOfDaysChange = (days) => {
        setNumberOfDays(days);
        if (startDate && days) {
            calculateEndDate(startDate, days);
        }
    };

    const calculateEndDate = (start, days) => {
        if (start && days) {
            const calculatedEndDate = moment(start).add(days - 1, 'days');
            setEndDate(calculatedEndDate);
            setSliderCount(days);
            setHours({}); // Reset hours when date or days change
        } else {
            setEndDate(null);
            setSliderCount(0);
        }
    };

    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                // Calculate total time (sum of all hours from each day)
                const totalTime = Object.values(hours).reduce((total, value) => total + value, 0);

                const scheduledData = {
                    ...values,
                    totalTime, // Total time from sliders
                    no_of_days_worked: sliderCount,
                    deliverySlot: deliverySlot,
                    startDate: startDate,
                    endDate: endDate,
                    hours: hours,
                    personResponsible: personResponsible,
                };

                onSubmit(scheduledData); // Pass the full data object to parent
                notification.success({
                    message: 'Task Updated',
                    description: 'Your task has been successfully updated!',
                });

                // Reset form and states after submission
                form.resetFields();
                setSliderCount(0);
                setHours({});
                setStartDate(null);
                setEndDate(null);
                setDeliverySlot(null);
                setPersonResponsible('');
                setNumberOfDays(0);
            })
            .catch(() => {
                notification.error({
                    message: 'Error',
                    description: 'Please fill in all required fields',
                });
            });
    };

    const handleSliderChange = (index, value) => {
        setHours((prev) => ({ ...prev, [index]: value }));
    };

    const handleInputChange = (index, value) => {
        let numericValue = parseInt(value, 10);
        if (isNaN(numericValue)) {
            numericValue = 0;
        }
        setHours((prev) => ({ ...prev, [index]: numericValue > 480 ? 480 : numericValue < 1 ? 1 : numericValue }));
    };

    const customMarks = {
        1: '1 m',
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

            {/* Row for Start Date, Number of Days, and End Date */}
            <Row gutter={[8, 16]}>
                <Col xs={24} sm={8}>
                    <Form.Item label="Start Date">
                        <DatePicker
                            onChange={handleStartDateChange}
                            value={startDate ? moment(startDate) : null}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    <Form.Item label="Number of Days">
                        <Input
                            type="number"
                            value={numberOfDays}
                            onChange={(e) => handleNumberOfDaysChange(e.target.value)}
                            min={1}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    <Form.Item label="End Date">
                        <DatePicker
                            value={endDate ? moment(endDate) : null}
                            disabled
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
            </Row>

            {/* Sliders for each day */}
            {Array.from({ length: sliderCount }).map((_, index) => (
                <Form.Item key={index} label={`Hours for Day ${index + 1}`}>
                    <Row gutter={20}>
                        <Col xs={20}>
                            <Slider
                                marks={customMarks}
                                min={1}
                                max={480}
                                step={1}
                                onChange={(value) => handleSliderChange(index, value)}
                                value={hours[index] || 0}
                                tooltip={{ formatter: (value) => `${value} minutes` }}
                            />
                        </Col>
                        <Col xs={1}>
                            <Input
                                type="number"
                                min={1}
                                max={480}
                                value={hours[index] || 0}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                addonAfter="min"
                            />
                        </Col>
                    </Row>
                </Form.Item>
            ))}

            <Form.Item
                name="deliverySlot"
                label="Delivery Slot"
                rules={[{ required: true, message: 'Please select a delivery slot!' }]}
            >
                <Select
                    placeholder="Select a delivery slot"
                    onChange={setDeliverySlot}
                    value={deliverySlot}
                >
                    <Option value="1pm">1pm</Option>
                    <Option value="4pm">4pm</Option>
                    <Option value="7pm">7pm</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Person Responsible"
                rules={[{ required: true, message: 'Please input the person responsible!' }]}
            >
                <Input
                    value={personResponsible}
                    onChange={(e) => setPersonResponsible(e.target.value)}
                />
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
