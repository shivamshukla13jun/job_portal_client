import React, { useState, Suspense } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Table, Button, Badge } from "react-bootstrap";
import { Trash2 } from "lucide-react";
import MeetingLinkView from "./MeetingLinkView";
import { del, get } from "@/services/api";
import useUserInfo from "@/utils/hooks/useUserInfo";
import { useParams } from "react-router-dom";

const MeetingList = () => {
  const [open, setOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const { createdBy = "" } = useParams();

  const queryClient = useQueryClient();
  const userInfo = useUserInfo();

  // Fetch meeting links
  const { data: meetings, isLoading } = useQuery({
    queryKey: ["meetinglinks", createdBy, userInfo?._id],
    queryFn: async () => {
      try {
        const res = await get(`sub-employers/meetings?createdBy=${createdBy}`);
        return res.data.data;
      } catch (error) {
        toast.error("Failed to fetch meetings.");
        throw error;
      }
    },
    enabled: Boolean(createdBy),
  });

  // Delete meeting mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => del("sub-employers/meetings", id),
    onSuccess: () => {
      toast.success("Meeting deleted successfully.");
      queryClient.invalidateQueries(["meetinglinks"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this meeting?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleView = (meeting) => {
    setSelectedMeeting(meeting);
    setOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="row">
        <div className="col-lg-12">
          <div className="ls-widget">
            {/* Start table widget content */}
            <div className="widget-content">
              <div className="table-outer">
                <table className="default-table manage-job-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Message</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {meetings?.length > 0 &&
                      meetings.map((meeting, index) => (
                        <tr key={meeting._id}>
                          <td>
                            {new Intl.DateTimeFormat("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }).format(new Date(meeting.date))}{" "}
                            <br />
                          </td>
                          <td>{meeting.time}</td>
                          <td>{meeting.email}</td>
                          <td>{meeting.phone}</td>
                          <td>{meeting.message}</td>
                          <td>
                            <div className="option-box">
                              <ul className="option-list">
                                <li>
                                  <button
                                    data-text="View"
                                    onClick={() => handleView(meeting)}
                                  >
                                    <span className="la la-eye"></span>
                                  </button>
                                </li>

                                <li>
                                  <button
                                    data-text="Delete "
                                    onClick={() => handleDelete(meeting._id)}
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
            {/* End table widget content */}
          </div>
        </div>
      </div>
      {open && (
        <MeetingLinkView
          isOpen={open}
          onClose={() => setOpen(false)}
          data={selectedMeeting}
        />
      )}
    </Suspense>
  );
};

export default MeetingList;
