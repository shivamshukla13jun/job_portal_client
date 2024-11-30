import React from 'react';
import { Button, Modal, Form, Table, Card, Row,Badge, Col, Alert } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { subEmployerService } from '@/services/subemployerservice';
import SubEMployerForm from './SubEMployerForm';
import { put } from '@/services/api';

const SubEmployerEditModal = ({ subEmployer, isOpen, onClose }) => {
    const queryClient = useQueryClient();
    const { control, handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
            name: subEmployer.name,
            email: subEmployer.email,
            phone: subEmployer.phone,
            // dashboardPermissions: subEmployer.dashboardPermissions.map(p => p.resource)
        }
    });

    // Update sub-employer mutation
    const updateMutation = useMutation({
        mutationFn: (data) => put("sub-employers",subEmployer._id, data),
        onSuccess: () => {
            toast.success('Sub-employer updated successfully');
            queryClient.invalidateQueries(['sub-employers']);
            onClose();
        },
        onError: (error) => {
            // toast.error('Failed to update sub-employer');
            console.error(error);
            toast.error(error?.response?.data?.error);

        }
    });

    const onSubmit = (data) => {
        updateMutation.mutate(data);
    };

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Sub Employer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                <SubEMployerForm control={control} register={register} errors={errors}/>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default SubEmployerEditModal;