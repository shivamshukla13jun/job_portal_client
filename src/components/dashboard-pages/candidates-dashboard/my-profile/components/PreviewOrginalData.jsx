import React from 'react'

function PreviewOrginalData({ previewData}) {
  return (
    <div>
         {/* Preview Modal */}
      
        <div className="preview-modal">
          <div className="modal-content">
            <h4>Preview Your Data</h4>
            <div className="preview-section">
              {/* Personal Details */}
              <h5>Personal Details</h5>
              <table className="table">
                <tbody>
                  <tr>
                    <td><strong>Full Name:</strong></td>
                    <td>
                      {`${previewData.myProfile.candidate_name.title} ${previewData.myProfile.candidate_name.first} ${previewData.myProfile.candidate_name.middle} ${previewData.myProfile.candidate_name.last}`}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Gender:</strong></td>
                    <td>{previewData.myProfile.gender}</td>
                  </tr>
                  <tr>
                    <td><strong>Date of Birth:</strong></td>
                    <td>{new Date(previewData.myProfile.dob).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td><strong>Designation:</strong></td>
                    <td>{previewData.myProfile.designation}</td>
                  </tr>
                </tbody>
              </table>

              {/* Contact Information */}
              <h5>Contact Information</h5>
              <table className="table">
                <tbody>
                  <tr>
                    <td><strong>Email:</strong></td>
                    <td>{previewData.contact.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Phone:</strong></td>
                    <td>{previewData.contact.phone}</td>
                  </tr>
                  <tr>
                    <td><strong>Permanent Address:</strong></td>
                    <td>
                      {Object.values(previewData.contact.permanent_address)
                        .filter(Boolean)
                        .join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Current Address:</strong></td>
                    <td>
                      {Object.values(previewData.contact.current_address)
                        .filter(Boolean)
                        .join(", ")}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Education */}
              <h5>Education</h5>
              {previewData.education.map((edu, idx) => (
                <div key={idx}>
                  <p><strong>Institution:</strong> {edu.name}</p>
                  <p><strong>Qualification:</strong> {edu.qualification}</p>
                  <p>
                    <strong>To:</strong> {new Date(edu.to).toLocaleDateString()}
                  </p>
                </div>
              ))}

              {/* Employment */}
              <h5>Employment</h5>
              {previewData.employment.map((job, idx) => (
                <div key={idx}>
                  <p><strong>Company:</strong> {job.name}</p>
                  <p><strong>Position:</strong> {job.position}</p>
                  <p>
                    <strong>From:</strong> {new Date(job.from).toLocaleDateString()} -{" "}
                    <strong>To:</strong> {new Date(job.to).toLocaleDateString()}
                  </p>
                  <p><strong>Scope:</strong> {job.scope}</p>
                </div>
              ))}

              {/* Other Sections */}
              <h5>References</h5>
              {previewData.references.map((ref, idx) => (
                <div key={idx}>
                  <p><strong>Name:</strong> {ref.name}</p>
                  <p><strong>Email:</strong> {ref.email}</p>
                  <p><strong>Phone:</strong> {ref.phone}</p>
                  <p><strong>Note:</strong> {ref.note}</p>
                </div>
              ))}

              <h5>Achievements</h5>
              <ul>
                {previewData.achievement.map((ach, idx) => (
                  <li key={idx}>{ach?.year}</li>
                ))}
              </ul>

              {/* Actions */}
              
            </div>
          </div>
        </div>
      
    </div>
  )
}

export default PreviewOrginalData