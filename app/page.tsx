import "./styles.css";

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import "./styles.css"; // link to your CSS

type FormData = {
  name: string;
  education: string;
  skills: string;
  sector: string;
  location: string;
};

export default function Home() {
  const [form, setForm] = useState<FormData>({
    name: "",
    education: "",
    skills: "",
    sector: "",
    location: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const recommendations = [
    {
      title: "Project Management Intern - Tech Startup",
      location: "Bangalore",
      skills: "Agile, Communication",
    },
    {
      title: "PM Intern - Healthcare Sector",
      location: "Hyderabad",
      skills: "Research, Data Analysis",
    },
    {
      title: "Product Analyst Intern - FinTech",
      location: "Remote",
      skills: "SQL, Problem Solving",
    },
  ];

  return (
    <div className="container">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Internship Recommendation Portal
      </motion.h1>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="education"
            placeholder="Education (e.g. B.Tech CSE)"
            value={form.education}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={form.skills}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="sector"
            placeholder="Sector of Interest (e.g. IT, Healthcare)"
            value={form.sector}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Preferred Location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <button type="submit">Get Recommendations</button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2>Hi {form.name}, here are your top recommendations:</h2>
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              className="card"
              whileHover={{ scale: 1.02 }}
            >
              <h3>{rec.title}</h3>
              <p>📍 {rec.location}</p>
              <p>Skills: {rec.skills}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
