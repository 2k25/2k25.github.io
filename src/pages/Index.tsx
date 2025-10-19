import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, ExternalLink, Briefcase } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  skills: string[];
}

interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  skills: string[];
  projects: Project[];
  experience: Experience[];
}

const Index = () => {
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    fetch('/src/data/portfolio-data.json')
      .then(response => response.json())
      .then(jsonData => setData(jsonData))
      .catch(error => console.error('Error loading portfolio data:', error));
  }, []);

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <nav className="flex gap-4">
            <a href={data.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href={`mailto:${data.email}`} className="hover:text-primary transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <h2 className="text-5xl font-bold mb-4">{data.title}</h2>
          <p className="text-xl text-muted-foreground mb-8">{data.bio}</p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold mb-8">Skills & Technologies</h3>
        <div className="flex flex-wrap gap-3">
          {data.skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Experience & Timeline Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold mb-12">Experience & Timeline</h3>
        <div className="space-y-8">
          {data.experience.map((exp, index) => (
            <div key={index} className="relative pl-8 border-l-2 border-border pb-8">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary hidden md:block"></div>
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary md:hidden"></div>
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <Briefcase className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-card-foreground mb-1">{exp.role}</h4>
                    <p className="text-lg text-muted-foreground mb-2">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mb-3">{exp.period}</p>
                    <p className="text-card-foreground mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold mb-8">Featured Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.projects.map((project, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h4 className="text-xl font-semibold mb-3 text-card-foreground">{project.title}</h4>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  View Project <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 {data.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
