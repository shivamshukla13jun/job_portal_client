import React from "react";
import { Modal, Button } from "react-bootstrap";

const MeetingLinkView = ({ isOpen, onClose, data }) => {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Meeting Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data ? (
          <div>
            <p><strong>Date:</strong> {new Date(data.date).toLocaleString()}</p>
            <p><strong>Time:</strong> {data.time}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Phone:</strong> {data.phone}</p>
            <p><strong>Message:</strong> {data.message}</p>
            <p><strong>Candidate Attendance</strong>{data?.intrviewConfirmation?.confirm ?"Yes":"No"}</p>
            <p><strong>Candidate Reply</strong>{data?.intrviewConfirmation?.message}</p>
            {
              data.meetingLink  &&
            <p>
              <strong>Meeting Link:</strong>{" "}
              <a href={data.meetingLink} target="_blank" rel="noopener noreferrer">
                {data.meetingLink}
              </a>
            </p>
            }
          </div>
        ) : (
          <p>No data available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MeetingLinkView;
