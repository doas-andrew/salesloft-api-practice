import React from 'react'
import github from '../images/github_cloud.png';
import linkedin from '../images/linkedin.png';
import asallen from '../images/asallen-profile.png';

export default function Links() {
	return (
    <div className="links-container">
      <a className="link" href="https://github.com/ASAllen67/salesloft-api-practice" target="_blank" rel="noopener noreferrer">
        <img className="github icon" src={github} alt="github-icon" />
      </a>
      <a className="link" href="https://www.linkedin.com/in/asallen67/" target="_blank" rel="noopener noreferrer">
        <img className="linkedin icon" src={linkedin} alt="linkedin-icon" />
      </a>
      <a className="link" href="https://asallen.info" target="_blank" rel="noopener noreferrer">
        <img className="asallen icon" src={asallen} alt="asallen-icon" />
      </a>
    </div>
	)
}