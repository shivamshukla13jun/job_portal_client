import React from 'react';
import './portfolio.css'; // Make sure to include the CSS file in your project
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
      console.log("data",data)
  return (
    <div className="wrapper">
      <div className="intro">
        <div className="profile">
          <div className="photo">
            <img src={API_CANDIDATE_PATH+data?.profile?.filename} alt="Profile" />
          </div>
          <div className="bio">
            <h1 className="name">{data?.name}</h1>
            <p className="profession">{data?.designation}</p>
          </div>
        </div>
        
        <div className="intro-section about">
          <h1 className="title">about me</h1>
          <p className="paragraph">
            Hi everyone, I am a web front-end developer, graduated from NTHU, Taiwan and my major is CS. 
            I recently try my best to improve my skills on web front-end. My favorite thing is to observe others' portfolio.
          </p>
        </div>
        
        <div className="intro-section">
          <h1 className="title">Contact</h1>
          <div className="info-section">
            <i className="fas fa-phone"></i>
            <span>{data?.contact?.phone}</span>
          </div>
          <div className="info-section ">
            <i className="fas fa-map-marker-alt"></i>
            <span>{data?.contact?.current_address?.city}</span>
          </div>
          <div className="info-section d-flex">
          <i className="fas fa-solid fa-envelope"></i> 
            <span>{data?.contact?.email}</span>
          </div>
        </div>
        <div className="intro-section">
          <h1 className="title">Education</h1>
          <div className="info-section">
            <span>{data?.contact?.phone}</span>
          </div>
         
        </div>
      </div>
      
      <div className="detail">
        <div className="detail-section edu">
          <div className="detail-title">
            <div className="title-icon">
              <i className="fas fa-user-graduate"></i>
            </div>
            <span>Education</span>
          </div>
          <div className="detail-content">
            <div className="timeline-block">
              <h1>Department of Computer Science</h1>
              <p>National Tsing Hua University, Taiwan</p>
              <time>2015 - 2019</time>
            </div>
            <div className="timeline-block">
              <h1>Institute of Computer Science and Engineering</h1>
              <p>National Chiao Tung University, Taiwan</p>
              <time>2020 - present</time>
            </div>
          </div>
        </div>
        
        <div className="detail-section pg-skill">
          <div className="detail-title">
            <div className="title-icon">
              <i className="fas fa-laptop-code"></i>
            </div>
            <span>Programming skills</span>
          </div>
          <div className="detail-content">
            <ul className="pg-list">
              <li>
                <span>HTML5</span>
                <div className="sb-skeleton">
                  <div className="skillbar" style={{['--pgbar-length']: '90%'}}></div>
                </div>
              </li>
              <li>
                <span>CSS3</span>
                <div className="sb-skeleton">
                  <div className="skillbar" style={{['--pgbar-length']: '75%'}}></div>
                </div>
              </li>
              <li>
                <span>Javascript</span>
                <div className="sb-skeleton">
                  <div className="skillbar" style={{['--pgbar-length']: '70%'}}></div>
                </div>
              </li>
              <li>
                <span>JQuery</span>
                <div className="sb-skeleton">
                  <div className="skillbar" style={{['--pgbar-length']: '50%'}}></div>
                </div>
              </li>
              <li>
                <span>NodeJS</span>
                <div className="sb-skeleton">
                  <div className="skillbar" style={{['--pgbar-length']: '70%'}}></div>
                </div>
              </li>
              <li>
                <span>ReactJS</span>
                <div className="sb-skeleton">
                  <div className="skillbar" style={{['--pgbar-length']: '75%'}}></div>
                </div>
              </li>
              <li>
                <span>VueJS</span>
                <div className="sb-skeleton">
                  <div className="skillbar" style={{['--pgbar-length']: '40%'}}></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="detail-section tool-skill">
          <div className="detail-title">
            <div className="title-icon">
              <i className="fas fa-tools"></i>
            </div>
            <span>Development Tools</span>
          </div>
          <div className="detail-content">
            <ul className="tool-list">
              <li>
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45"></circle>
                  <circle className="cbar" cx="50" cy="50" r="45" style={{['--percent']: 0.6}}></circle>
                </svg>
                <span className="tl-name">Photoshop</span>
                <span className="tl-exp">60%</span>
              </li>
              <li>
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45"></circle>
                  <circle className="cbar" cx="50" cy="50" r="45" style={{['--percent']: 0.8}}></circle>
                </svg>
                <span className="tl-name">Sublime</span>
                <span className="tl-exp">80%</span>
              </li>
              <li>
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45"></circle>
                  <circle className="cbar" cx="50" cy="50" r="45" style={{['--percent']: 0.7}}></circle>
                </svg>
                <span className="tl-name">Git</span>
                <span className="tl-exp">70%</span>
              </li>
              <li>
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45"></circle>
                  <circle className="cbar" cx="50" cy="50" r="45" style={{['--percent']: 0.74}}></circle>
                </svg>
                <span className="tl-name">NPM</span>
                <span className="tl-exp">74%</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="detail-section interests">
          <div className="detail-title">
            <div className="title-icon">
              <i className="fas fa-heart"></i>
            </div>
            <span>Interests</span>
          </div>
          <div className="detail-content">
            <div className="outer-frame">
              <ul className="favor-list">
                <li>
                  <i className="fas fa-gamepad"></i>
                  <span>Game</span>
                </li>
                <li>
                  <i className="fas fa-paw"></i>
                  <span>Pet</span>
                </li>
                <li>
                  <i className="far fa-headphones-alt"></i>
                  <span>Music</span>
                </li>
                <li>
                  <i className="fas fa-book-spells"></i>
                  <span>Self-learning</span>
                </li>
                <li>
                  <i className="fas fa-user-edit"></i>
                  <span>Blog</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalPortfolio;