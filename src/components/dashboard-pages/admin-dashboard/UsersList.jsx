import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useUserInfo from '@/utils/hooks/useUserInfo';
import { get } from '@/services/api';
import DashboardHeader from '@/components/header/DashboardHeader';
import MobileMenu from '@/components/header/MobileMenu';
import LoginPopup from '@/components/common/form/login/LoginPopup';
import DashboardAdminSidebar from '@/components/header/DashboardAdminSidebar';
import Breadcrumb from '@/components/common/Breadcrumb';
import CopyrightFooter from '@/components/footer/common-footer/CopyrightFooter';
import MenuToggler from '../MenuToggler';

// Pagination Component
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  const pageNumbers = [];
  
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Previous
      </button>
      
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-4 py-2 border rounded ${
            currentPage === number ? 'bg-blue-500 text-white' : ''
          }`}
        >
          {number}
        </button>
      ))}
      
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

// Reusable User List Component
const UserList = ({ userType }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  const userInfo = useUserInfo();

  // Fetch users with pagination and search
  const { 
    data: usersData, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['users', userType, currentPage, searchTerm],
    queryFn: async () => {
      try {
        const response = await get(`admin/users?userType=${userType}&search=${searchTerm}&page=${currentPage}&limit=${itemsPerPage}`);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch users:', error);
        toast.error('Failed to fetch users');
        return null;
      }
    },
    enabled: Boolean(userInfo?._id)
  });

  // Determine columns and map user details based on user type
  const getColumns = () => {
    switch(userType) {
      case 'Candidate':
        return [
          { 
            key: 'name', 
            label: 'Full Name', 
            getValue: (user) => user.candidateDetails?.name  || 'N/A' 
          },
          { 
            key: 'email', 
            label: 'Email',
            getValue: (user) => user.email  || 'N/A' 
          },
          { 
            key: 'skills', 
            label: 'Skills', 
            getValue: (user) => user.candidateDetails?.skills?.join(', ') || 'N/A' 
          },
          { 
            key: 'isActive', 
            label: 'Status', 
            getValue: (user) => user.isActive ? 'Active' : 'Inactive'  || 'N/A' 
          }
        ];
      case 'Employer':
        return [
          { 
            key: 'name', 
            label: 'Company Name', 
            getValue: (user) => user.employerDetails?.business_name  || 'N/A' 
          },
          { 
            key: 'email', 
            label: 'Email',
            getValue: (user) => user.email   || 'N/A' 
          },
          { 
            key: 'categories', 
            label: 'Job Sector', 
            getValue: (user) => user.employerDetails?.categories?.map((item)=>item.label).join(", ") || 'N/A' 
          },
          { 
            key: 'isActive', 
            label: 'Status', 
            getValue: (user) => user.isActive ? 'Active' : 'Inactive'   || 'N/A' 
          }
        ];
      case 'Subemployer':
        return [
          { 
            key: 'name', 
            label: 'Name', 
            getValue: (user) => user.subEmployerDetails?.name  || 'N/A' 
          },
          { 
            key: 'email', 
            label: 'Email',
            getValue: (user) => user.email  || 'N/A' 
          },
          { 
            key: 'phone', 
            label: 'Phone', 
            getValue: (user) => user.subEmployerDetails?.phone || 'N/A' 
          },
          { 
            key: 'isActive', 
            label: 'Status', 
            getValue: (user) => user.isActive ? 'Active' : 'Inactive' 
          }
        ];
      default:
        return [];
    }
  };

  const columns = getColumns();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users</div>;
  }

  return (
    <div className="tabs-box user-list-container">
      {/* Search and Filter Section */}
      <div className="widget-title flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">{userType}s List</h4>
        
        <div className="chosen-outer">
          <input 
            type="text"
            placeholder={`Search ${userType}s...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="chosen-single form-select w-full px-3 py-2 border rounded"
          />
        </div>
      </div>
    
      {/* User Table */}
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table w-full">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th 
                    key={column.key} 
                    className="px-4 py-2 text-left"
                  >
                    {column.label}
                  </th>
                ))}
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
    
            <tbody>
              {usersData?.users?.map((user) => (
                <tr key={user._id} className="border-b">
                  {columns.map((column) => (
                    <td 
                      key={column.key} 
                      className="px-4 py-2"
                    >
                      {column.getValue(user)}
                    </td>
                  ))}
                  <td className="px-4 py-2">
                    <div className="option-box">
                      <ul className="option-list flex space-x-2">
                        <li>
                          <button 
                            data-text="View"
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => {/* View/Edit Logic */}}
                          >
                            <span className="la la-eye"></span>
                          </button>
                        </li>
                        <li>
                          <button 
                            data-text="Delete"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => {/* Delete Logic */}}
                          >
                            <span className="la la-trash"></span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
      {/* Pagination */}
      {usersData?.pagination && (
        <div className="widget-footer">
          <Pagination 
            currentPage={usersData.pagination.currentPage}
            totalPages={usersData.pagination.totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

// Specific User Type Components
const SubEmployerList = () => (
  <div className="page-wrapper dashboard">
  <span className="header-span"></span>
  {/* <!-- Header Span for hight --> */}

  <LoginPopup />
  {/* End Login Popup Modal */}

  <DashboardHeader />
  {/* End Header */}

  <MobileMenu />
  {/* End MobileMenu */}

  <DashboardAdminSidebar />
  {/* <!-- End User Sidebar Menu --> */}

  {/* <!-- Dashboard --> */}
  <section className="user-dashboard">
    <div className="dashboard-outer">
      <Breadcrumb title="Subemployers!" />
      {/* breadCrumb */}

      <MenuToggler />
      {/* Collapsible sidebar button */}

      <div className="row">
        <div className="col-lg-12">
          {/* <!-- Ls widget --> */}
          <div className="ls-widget">
          <UserList userType="Subemployer" />      
         </div>
        </div>
      </div>
      {/* End .row */}
    </div>
    {/* End dashboard-outer */}
  </section>
  {/* <!-- End Dashboard --> */}

  <CopyrightFooter />
  {/* <!-- End Copyright --> */}
</div>
);

const EmployerList = () => (
  <div className="page-wrapper dashboard">
  <span className="header-span"></span>
  {/* <!-- Header Span for hight --> */}

  <LoginPopup />
  {/* End Login Popup Modal */}

  <DashboardHeader />
  {/* End Header */}

  <MobileMenu />
  {/* End MobileMenu */}

  <DashboardAdminSidebar />
  {/* <!-- End User Sidebar Menu --> */}

  {/* <!-- Dashboard --> */}
  <section className="user-dashboard">
    <div className="dashboard-outer">
      <Breadcrumb title="Employers !" />
      {/* breadCrumb */}

      <MenuToggler />
      {/* Collapsible sidebar button */}

      <div className="row">
        <div className="col-lg-12">
          {/* <!-- Ls widget --> */}
          <div className="ls-widget">
          <UserList userType="Employer" />    
          </div>
        </div>
      </div>
      {/* End .row */}
    </div>
    {/* End dashboard-outer */}
  </section>
  {/* <!-- End Dashboard --> */}

  <CopyrightFooter />
  {/* <!-- End Copyright --> */}
</div>
);

const CandidateList = () => (
  <div className="page-wrapper dashboard">
  <span className="header-span"></span>
  {/* <!-- Header Span for hight --> */}

  <LoginPopup />
  {/* End Login Popup Modal */}

  <DashboardHeader />
  {/* End Header */}

  <MobileMenu />
  {/* End MobileMenu */}

  <DashboardAdminSidebar />
  {/* <!-- End User Sidebar Menu --> */}

  {/* <!-- Dashboard --> */}
  <section className="user-dashboard">
    <div className="dashboard-outer">
      <Breadcrumb title="Candidates" />
      {/* breadCrumb */}

      <MenuToggler />
      {/* Collapsible sidebar button */}

      <div className="row">
        <div className="col-lg-12">
          {/* <!-- Ls widget --> */}
          <div className="ls-widget">
          <UserList userType="Candidate" />      
           </div>
        </div>
      </div>
      {/* End .row */}
    </div>
    {/* End dashboard-outer */}
  </section>
  {/* <!-- End Dashboard --> */}

  <CopyrightFooter />
  {/* <!-- End Copyright --> */}
</div>
);

export { 
  SubEmployerList, 
  EmployerList, 
  CandidateList 
};