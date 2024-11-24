import React, { useState, Suspense } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { subEmployerService } from '@/services/subemployerservice';
import SubEmployerCreateModal from './SubEmployerCreateModal';
import SubEmployerEditModal from './SubEmployerEditModal';
import useUserInfo from '@/utils/hooks/useUserInfo';
import { get, put, request } from '@/services/api';



const SubEmployerList = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editSubEmployer, setEditSubEmployer] = useState(null);
    
    const queryClient = useQueryClient();
    
    // Get user info from context or local storage
    const userInfo = useUserInfo();

    // Fetch sub-employers
    const { data: subEmployers, isLoading } = useQuery({
        queryKey: ['subemployer'],
        queryFn: async () => {
            try {
                const res = await get('sub-employers');
                return res.data.data;
            } catch (error) {
                if (error.response?.data?.error === 'Failed to find resume') {
                    toast.info('Please fill the information to get going!');
                }
            }
        },
        enabled: Boolean(userInfo?._id), // Check if userInfo and ID exist
       
    });

    // Deactivate sub-employer mutation
    const deleteMutation = useMutation({
        mutationFn: ({id,isActive}) =>{
            console.log("isActive???",isActive)
            put("sub-employers",id, {isActive:isActive})
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success(`Sub-employer ${!data?.data?.isActive?"deactivated":"Activted"} successfully'`);
            queryClient.invalidateQueries(['subemployer']);
        },
        onError: (error) => {
            toast.error(error?.response?.data?.error || 'An error occurred');
            console.error(error);
        }
    });

    const handleDelete = ({id,isActive}) => {
        if (window.confirm('Are you sure you want to deactivate this sub-employer?')) {
            deleteMutation.mutate({id,isActive});
        }
    };

    const handleEdit = (subEmployer) => {
        setEditSubEmployer(subEmployer);
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <Suspense fallback={<div>Loading...</div>}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ls-widget">
                            <div className="tabs-box">
                                <div className="widget-title">
                                    <h4>Sub Employers</h4>
                                    <div className="chosen-outer">
                                        <button 
                                            onClick={() => setCreateModalOpen(true)} 
                                            className="btn btn-primary mb-3"
                                        >
                                            Add Sub Employer
                                        </button>
                                    </div>
                                </div>

                                <div className="widget-content">
                                    <div className="table-outer">
                                        <table className="default-table manage-job-table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {subEmployers?.map((subEmployer) => (
                                                    <tr key={subEmployer._id}>
                                                        <td>{subEmployer.name}</td>
                                                        <td>{subEmployer.email}</td>
                                                        <td>{subEmployer.phone}</td>
                                                        <td>{subEmployer.isActive ? 'Active' : 'Inactive'}</td>
                                                        <td>
                                                            <button 
                                                                onClick={() => handleEdit(subEmployer)}
                                                                className="btn btn-sm btn-warning mr-2"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDelete({id:subEmployer._id,isActive:subEmployer.isActive?false:true})}
                                                                className="btn btn-sm btn-danger"
                                                            >
                                                              {subEmployer.isActive?"Deactivate":"Activate"}  
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {createModalOpen && (
                    <SubEmployerCreateModal 
                        isOpen={createModalOpen}
                        onClose={() => setCreateModalOpen(false)}
                    />
                )}

                {editSubEmployer && (
                    <SubEmployerEditModal 
                        subEmployer={editSubEmployer}
                        isOpen={!!editSubEmployer}
                        onClose={() => setEditSubEmployer(null)}
                    />
                )}

        </Suspense>
    );
};

export default SubEmployerList;