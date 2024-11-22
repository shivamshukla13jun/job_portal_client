import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { subEmployerService } from '@/services/subemployerservice';

const SubEmployerCreateModal = ({ isOpen, onClose }) => {
    const queryClient = useQueryClient();
    const { control, handleSubmit, register, formState: { errors } } = useForm();

    // Create sub-employer mutation
    const createMutation = useMutation({
        mutationFn: (data) => subEmployerService.create(data),
        onSuccess: () => {
            toast.success('Sub-employer created successfully');
            queryClient.invalidateQueries(['subEmployers']);
            onClose();
        },
        onError: (error) => {
            toast.error('Failed to create sub-employer');
            console.error(error);
        }
    });

    const onSubmit = (data) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
        createMutation.mutate({
            ...data,
            parentEmployerId: userInfo.employerId
        });
    };

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Sub Employer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            {...register('name', { required: 'Name is required' })}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            {...register('email', { 
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control 
                            {...register('phone', { required: 'Phone is required' })}
                            isInvalid={!!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.phone?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Dashboard Permissions</Form.Label>
                        <Controller
                            name="dashboardPermissions"
                            control={control}
                            defaultValue={[]}
                            render={({ field }) => (
                                <div>
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Jobs"
                                        value="jobs" 
                                        onChange={(e) => {
                                            const permissions = e.target.checked 
                                                ? [...field.value, 'jobs'] 
                                                : field.value.filter(p => p !== 'jobs');
                                            field.onChange(permissions);
                                        }}
                                    />
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Candidates"
                                        value="candidates" 
                                        onChange={(e) => {
                                            const permissions = e.target.checked 
                                                ? [...field.value, 'candidates'] 
                                                : field.value.filter(p => p !== 'candidates');
                                            field.onChange(permissions);
                                        }}
                                    />
                                </div>
                            )}
                        />
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default SubEmployerCreateModal;