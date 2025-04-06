import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-page">

      {/* Hero Section with Animated Background */}
      <section className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-content">
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
        </div>
      </section>

      {/* Timeline Section */}
      <section className="journey">
        <h2>Our Deployment Journey</h2>
        <p>Here’s how we achieved this milestone step by step:</p>
        <div className="journey-timeline">
          {[
            "Defined the project scope, brainstormed ideas, and finalized the tech stack.",
            "Designed UI wireframes and created the homepage and navigation components.",
            "Developed the \"Features\" and \"About Us\" sections with responsive design.",
            "Integrated FinAi chatbot for real-time financial advice.",
            "Implemented advanced features for portfolio tracking and real-life applications.",
            "Performed rigorous testing, identified bugs, and made improvements based on feedback.",
            "Optimized performance, finalized deployment strategy, and ensured cross-browser compatibility.",
            "Deployed the project successfully and prepared for final presentation."
          ].map((text, index) => (
            <div className="timeline-item" key={index}>
              <span className="timeline-week">Week {index + 1}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
