import React, { useState, Suspense } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useUserInfo from '@/utils/hooks/useUserInfo';
import { get, put, request } from '@/services/api';



const SubEmployerList = () => {
    
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


  

    if (isLoading) return <div>Loading...</div>;

    return (
        <Suspense fallback={<div>Loading...</div>}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ls-widget">
                            <div className="tabs-box">
                                <div className="widget-title">
                                    <h4>Sub Employers</h4>
                                  
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
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {subEmployers?.map((subEmployer) => (
                                                    <tr key={subEmployer._id}>
                                                        <td>{subEmployer.name}</td>
                                                        <td>{subEmployer.email}</td>
                                                        <td>{subEmployer.phone}</td>
                                                        <td>{subEmployer.isActive ? 'Active' : 'Inactive'}</td>
                                                       
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

              

        </Suspense>
    );
};

export default SubEmployerList;