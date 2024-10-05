'use client'
import React from 'react';
import styles from '../styles/Globe.module.css';

export default function Home() {
  const handleJoinGLOBE = () => {
    alert("Thank you for your interest in joining The GLOBE Program!");
    // Here you can add a redirect to a sign-up page or other logic
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>The GLOBE Program Overview</h1>
        <p>A Worldwide Science and Education Program</p>
      </header>

      <section className={styles.section}>
        <h2>About the Program</h2>
        <p>
          The GLOBE (Global Learning and Observations to Benefit the Environment) Program is an international science and education program 
          that focuses on promoting scientific literacy and building connections between people passionate about the environment. GLOBE has 
          three primary goals: increasing environmental awareness, contributing to increased scientific understanding of the Earth, and 
          supporting improved student achievement in science and mathematics. By participating in GLOBE, students, teachers, researchers, 
          and lifelong learners can connect with the program's global community.
        </p>
        <p>
          GLOBE learners also investigate and study Earth System Science through their own research projects and those led by NASA. These 
          projects can center around one of GLOBE’s various protocols, campaigns, or other data initiatives. By participating in these 
          initiatives, GLOBE participants contribute to scientific research and increase their understanding of environmental issues.
        </p>

        <button className={styles.button} onClick={handleJoinGLOBE}>
          Join GLOBE
        </button>
      </section>

      <section className={styles.section}>
        <h2>Benefits of Joining GLOBE</h2>
        <p>
          GLOBE is a community of people passionate about teaching and learning Earth System Science. Members across the world collaborate 
          with each other and use GLOBE's extensive collection of resources to do real science. They provide environmental data that can 
          be used to complement NASA research efforts and further community or individual investigations, thereby helping people gain a 
          better understanding of the environment.
        </p>
        <img src="/images/globe-learning.jpg" alt="GLOBE Learning" />
      </section>

      <section className={styles.section}>
        <h2>Vision and Mission</h2>
        <p>
          <strong>Vision:</strong> A worldwide community of students, educators, scientists, and citizens working together to better understand, sustain, 
          and improve Earth's environment at local, regional, and global scales.
        </p>
        <p>
          <strong>Mission:</strong> To increase awareness of individuals throughout the world about the global environment, contribute to increased scientific 
          understanding of the Earth, and support improved student achievement in science and mathematics.
        </p>
      </section>

      <section className={styles.section}>
        <h2>History</h2>
        <p>
          Announced in 1994, The GLOBE Program began operations on Earth Day 1995. Today, the international GLOBE network has grown to include representatives 
          from more than 125 participating countries coordinating GLOBE activities that are integrated into their local and regional communities.
        </p>
        <img src="/images/globe-history.jpg" alt="GLOBE History" />
      </section>
    </div>
  );
}
