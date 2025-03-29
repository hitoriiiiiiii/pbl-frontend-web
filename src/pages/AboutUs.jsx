import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* Project Introduction Section */}
      <section className="project-intro">
        <h1>About Our Project</h1>
        <p>
          This fintech platform is our university project, developed over the course of two months
          by <strong>Prarthana, Ruturaj, and Uday Kiran</strong>. Our mission was to create a user-friendly 
          and feature-rich financial management tool while enhancing our technical and problem-solving skills.
        </p>
        <p>
          Through this project, we gained valuable experience in UI/UX design, coding practices, and 
          deploying a real-world application.
        </p>
      </section>

      {/* Team and Journey Section */}
      <section className="journey">
        <h2>Our Deployment Journey</h2>
        <p>Here’s how we achieved this milestone step by step:</p>
        <div className="journey-timeline">
          <div className="timeline-item">
            <span className="timeline-week">Week 1</span>
            <p>Defined the project scope, brainstormed ideas, and finalized the tech stack.</p>
          </div>
          <div className="timeline-item">
            <span className="timeline-week">Week 2</span>
            <p>Designed UI wireframes and created the homepage and navigation components.</p>
          </div>
          <div className="timeline-item">
            <span className="timeline-week">Week 3</span>
            <p>Developed the "Features" and "About Us" sections with responsive design.</p>
          </div>
          <div className="timeline-item">
            <span className="timeline-week">Week 4</span>
            <p>Integrated FinAi chatbot for real-time financial advice.</p>
          </div>
          <div className="timeline-item">
            <span className="timeline-week">Week 5</span>
            <p>Implemented advanced features for portfolio tracking and real-life applications.</p>
          </div>
          <div className="timeline-item">
            <span className="timeline-week">Week 6</span>
            <p>Performed rigorous testing, identified bugs, and made improvements based on feedback.</p>
          </div>
          <div className="timeline-item">
            <span className="timeline-week">Week 7</span>
            <p>Optimized performance, finalized deployment strategy, and ensured cross-browser compatibility.</p>
          </div>
          <div className="timeline-item">
            <span className="timeline-week">Week 8</span>
            <p>Deployed the project successfully and prepared for final presentation.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
