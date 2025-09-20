import React, { useState } from "react";

type FormData = {
  name: string;
  email: string;
  education: string;
  skills: string;
  sector: string;
  location: string;
};

type Internship = {
  title: string;
  company: string;
  location: string;
  skillsRequired: string[];
};

const sampleInternships: Internship[] = [
  { title: "Product Management Intern", company: "TechCorp", location: "Bangalore", skillsRequired: ["communication", "analytics", "planning"] },
  { title: "Marketing Intern", company: "Creative Inc", location: "Mumbai", skillsRequired: ["creativity", "writing", "analytics"] },
  { title: "Data Analyst Intern", company: "DataWorks", location: "Hyderabad", skillsRequired: ["excel", "python", "statistics"] },
];

export default function Home() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", education: "", skills: "", sector: "", location: "" });
  const [recommendations, setRecommendations] = useState<Internship[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skills = formData.skills.toLowerCase().split(",").map(s => s.trim());
    const filtered = sampleInternships.filter(intern =>
      intern.skillsRequired.some(skill => skills.includes(skill))
    );
    setRecommendations(filtered.slice(0, 5));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Internship Recommendation Portal</h1>

      <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSubmit}>
        <input name="name" placeholder="Your Name" className="p-2 rounded bg-gray-800 text-white" value={formData.name} onChange={handleChange} required />
        <input name="email" placeholder="Your Email" type="email" className="p-2 rounded bg-gray-800 text-white" value={formData.email} onChange={handleChange} required />
        <input name="education" placeholder="Education" className="p-2 rounded bg-gray-800 text-white" value={formData.education} onChange={handleChange} required />
        <input name="skills" placeholder="Skills (comma separated)" className="p-2 rounded bg-gray-800 text-white" value={formData.skills} onChange={handleChange} required />
        <input name="sector" placeholder="Sector of Interest" className="p-2 rounded bg-gray-800 text-white" value={formData.sector} onChange={handleChange} />
        <input name="location" placeholder="Preferred Location" className="p-2 rounded bg-gray-800 text-white" value={formData.location} onChange={handleChange} />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 p-2 rounded font-bold">Get Recommendations</button>
      </form>

      {recommendations.length > 0 && (
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Top Internships for You:</h2>
          <ul className="space-y-4">
            {recommendations.map((intern, index) => (
              <li key={index} className="bg-gray-800 p-4 rounded">
                <h3 className="font-bold text-lg">{intern.title}</h3>
                <p>{intern.company} - {intern.location}</p>
                <p className="text-sm">Skills Required: {intern.skillsRequired.join(", ")}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
