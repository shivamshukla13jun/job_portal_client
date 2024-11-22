import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { subEmployerService } from '@/services/subemployerservice';
import SubEmployerCreateModal from './SubEmployerCreateModal';
import SubEmployerEditModal from './SubEmployerEditModal';


const SubEmployerList = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editSubEmployer, setEditSubEmployer] = useState(null);
    const queryClient = useQueryClient();
    
    // Get user info from context or local storage
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

    // Fetch sub-employers
    const { data: subEmployers, isLoading } = useQuery({
        queryKey: ['subEmployers', userInfo.employerId],
        queryFn: () => subEmployerService.getByEmployer(userInfo.employerId),
        enabled: !!userInfo.employerId
    });

    // Deactivate sub-employer mutation
    const deleteMutation = useMutation({
        mutationFn: (id) => subEmployerService.delete(id),
        onSuccess: () => {
            toast.success('Sub-employer deactivated successfully');
            queryClient.invalidateQueries(['subEmployers', userInfo.employerId]);
        },
        onError: (error) => {
            toast.error('Failed to deactivate sub-employer');
            console.error(error);
        }
    });

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to deactivate this sub-employer?')) {
            deleteMutation.mutate(id);
        }
    };

    const handleEdit = (subEmployer) => {
        setEditSubEmployer(subEmployer);
    };

    if (isLoading) return <div>Loading...</div>;

    return (
            <div className="row">
      <div className="col-lg-12">
        {/* <!-- Ls widget --> */}
        <div className="ls-widget">
         {/* tble */}
       
  
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Sub Eployers</h4>

        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <button 
                onClick={() => setCreateModalOpen(true)} 
                className="btn btn-primary mb-3"
            >
                Add Sub Employer
            </button>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
             <th>Actions</th>
              </tr>
            </thead>

            <tbody>
                    {subEmployers && subEmployers.map((subEmployer) => (
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
                                    onClick={() => handleDelete(subEmployer._id)}
                                    className="btn btn-sm btn-danger"
                                >
                                    Deactivate
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
          </table>
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
        </div>
      </div>
      {/* End table widget content */}
    </div>
  

         {/* table */}
        </div>
      </div>
    </div>
            
        
        
    );
};

export default SubEmployerList;