import { get, put } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useAcceptApplication = (job) => {
  const queryClient = useQueryClient();

const acceptApplication=   useMutation({
    mutationFn: ({ _id, status }) => 
     put('/application/status',_id, {  status }),
    onSuccess: (res) => {
      if (res.data.success) {
        toast.success(res.data.message);
        queryClient.invalidateQueries([`application/job`]);
      }
    },
    onError: (err) => {
      toast.error(err.response.data.error);
    },
  });
  const handleAccept = (_id, status) => {
    acceptApplication.mutate({ _id, status });
  };
  return handleAccept
};

export const useDeleteApplication = (searchParams) => {
  const queryClient = useQueryClient();

  const deleteApplication = useMutation({
    mutationFn: ({ _id, jobid }) => 
      get(`/application/job/${jobid}/${_id}`),
    onSuccess: (res) => {
      if (res.data.success) {
        toast.success(res.data.message);
        
        // Invalidate specific queries to refetch updated data
        queryClient.invalidateQueries([`application/tracking`, searchParams]);
        queryClient.invalidateQueries([`job${jobid}`]);
      }
    },
    onError: (err) => {
      toast.error(err.response.data.error);
    },
  });

  const handleDelete = (_id, jobid) => {
    deleteApplication.mutate({ _id, jobid });
  };

  return handleDelete;
};

