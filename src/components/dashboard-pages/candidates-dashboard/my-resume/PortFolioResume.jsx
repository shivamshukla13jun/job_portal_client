import React from 'react';
import './portfolio.css';
import useUserInfo from '@/utils/hooks/useUserInfo';
import { useQuery } from '@tanstack/react-query';
import { getById } from '@/services/api';
import { toast } from 'react-toastify';
import { API_CANDIDATE_PATH } from '@/lib/config';

const PersonalPortfolio = () => {
    const userInfo = useUserInfo();

    const { data, isLoading } = useQuery({
        queryKey: [`candidate${userInfo._id}`],
        queryFn: async () => {
          try {
            const res = await getById('/candidate', userInfo._id);
            return res.data.data;
          } catch (error) {
            if (error.response.data.error === 'Failed to find candidate') {
              toast.info('Please fill the information to get going!')
            }
          }
        },
        enabled: !!userInfo._id,
    });

    console.log("data", data)

    return (
        <div className="wrapper">
            <div className="intro">
                <div className="profile">
                    <div className="photo">
                        <img src={data?.profile?.filename ? API_CANDIDATE_PATH + data.profile.filename : ''} alt="Profile" />
                    </div>
                  
                </div>
                <div className="intro-section">
                    <h1 className="title">Contact</h1>
                    <div className="info-section">
                        <i className="fas fa-phone"></i>
                        <span>{data?.contact?.phone || 'Phone Not Available'}</span>
                    </div>
                    <div className="info-section">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{data?.contact?.current_address?.city || 'City Not Available'}</span>
                    </div>
                    <div className="info-section d-flex">
                        <i className="fas fa-solid fa-envelope"></i> 
                        <span>{data?.contact?.email || 'Email Not Available'}</span>
                    </div>
                </div>
                
                <div className="intro-section">
                    <h1 className="title">Education</h1>
                    {data?.education && data.education.map((edu, index) => (
                        <div key={index} className="info-section">
                            <span className='education'>{edu.name} </span>
                            <br/>
                            <span className='education'>{edu.qualification}</span>
                            <br/>
                           <ul>
                           <li  style={{listStyle:"disc"}}>{new Date(edu.to || new Date()).getFullYear()}</li>
                           </ul>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="detail">
                <div className="detail-section edu">
                <div className="bio">
                        <h1 className="name">{data?.name || 'Name Not Available'}</h1>
                        <p className="profession">{data?.designation || 'Designation Not Available'}</p>
                        <span className='border-bottom'></span>
                    </div>
                    <div className="detail-title">
                        <div className="title-icon">
                            <i className="fas fa-user-graduate"></i>
                        </div>
                        <strong style={{fontSize:"1.4rem"}}> Work Experience</strong>
                    </div>
                    <div className="detail-content">
                        {data?.employment && data.employment.map((job, index) => (
                            <div key={index} className="timeline-block">
                                <time>{new Date(job.from).toLocaleDateString()} - {new Date(job.to).toLocaleDateString()}</time>
                                <h1>{job.name}</h1>
                                <p>{job.position}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* <div className="detail-section pg-skill">
                    <div className="detail-title">
                        <div className="title-icon">
                            <i className="fas fa-laptop-code"></i>
                        </div>
                        <span>Language Skills</span>
                    </div>
                    <div className="detail-content">
                        {data?.english_language?.test_score && (
                            <ul className="pg-list">
                                <li>
                                    <span>Listening</span>
                                    <div className="sb-skeleton">
                                        <div className="skillbar" style={{['--pgbar-length']: `${data.english_language.test_score.listening}%`}}></div>
                                    </div>
                                </li>
                                <li>
                                    <span>Reading</span>
                                    <div className="sb-skeleton">
                                        <div className="skillbar" style={{['--pgbar-length']: `${data.english_language.test_score.reading}%`}}></div>
                                    </div>
                                </li>
                                <li>
                                    <span>Writing</span>
                                    <div className="sb-skeleton">
                                        <div className="skillbar" style={{['--pgbar-length']: `${data.english_language.test_score.writing}%`}}></div>
                                    </div>
                                </li>
                                <li>
                                    <span>Speaking</span>
                                    <div className="sb-skeleton">
                                        <div className="skillbar" style={{['--pgbar-length']: `${data.english_language.test_score.speaking}%`}}></div>
                                    </div>
                                </li>
                            </ul>
                        )}
                    </div>
                </div> */}
                
                <div className="detail-section tool-skill">
                    <div className="detail-title">
                        <div className="title-icon">
                            <i className="fas fa-tools"></i>
                        </div>
                        <strong  style={{fontSize:"1.4rem"}}> References</strong>
                    </div>
                    <div className="detail-content">
                        <ul className="tool-list">
                            {data?.references && data.references.map((ref, index) => (
                                <li key={index}>
                                    <span className="tl-name">{ref.name}</span>
                                    <br/>
                                    <span className="tl-note">{ref.note}</span>
                                    <br/>
                                    Email: <span className="tl-email">{ref.email}</span>
                                    <br/>
                                    Phone: <span className="tl-phone">{ref.phone}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
                <div className="detail-section interests">
                    <div className="detail-title">
                        <div className="title-icon">
                            <i className="fas fa-heart"></i>
                        </div>
                        <span>Achievements</span>
                    </div>
                    <div className="detail-content">
                        <div className="outer-frame">
                            <ul className="favor-list">
                                {data?.achievement && data.achievement.map((achieve, index) => (
                                    <li key={index}>
                                        <span>{achieve.year} - {achieve.description}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalPortfolio;