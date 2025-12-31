import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const { items } = await BaseCrudService.getAll<Projects>('projects');
        setProjects(items);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="font-paragraph text-lg text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full max-w-[120rem] mx-auto pt-32 pb-16 px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-5xl lg:text-7xl font-black text-brandaccent mb-6">
            MY PROJECTS
          </h1>
          <div className="h-1 w-32 bg-primary mb-6"></div>
          <p className="font-paragraph text-base lg:text-lg text-primary max-w-3xl">
            A collection of my work showcasing diverse skills, creative solutions, and technical expertise across various domains.
          </p>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 pb-24">
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-paragraph text-lg text-primary/60">No projects available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/projects/${project._id}`}>
                  {/* Project Image */}
                  {project.projectThumbnail && (
                    <div className="aspect-[16/10] overflow-hidden mb-6">
                      <Image
                        src={project.projectThumbnail}
                        alt={project.projectName || 'Project thumbnail'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        width={600}
                      />
                    </div>
                  )}

                  {/* Project Info */}
                  <div>
                    <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary group-hover:text-brandaccent transition-colors mb-3">
                      {project.projectName}
                    </h2>

                    {project.shortDescription && (
                      <p className="font-paragraph text-base text-primary/70 mb-4 line-clamp-3">
                        {project.shortDescription}
                      </p>
                    )}

                    {/* Technologies */}
                    {project.technologiesUsed && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {project.technologiesUsed.split(',').map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-secondary text-secondary-foreground font-paragraph text-xs font-semibold"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Date */}
                    {project.completionDate && (
                      <div className="flex items-center gap-2 text-primary/60 mb-4">
                        <Calendar size={16} />
                        <span className="font-paragraph text-sm">
                          {format(new Date(project.completionDate), 'MMMM yyyy')}
                        </span>
                      </div>
                    )}

                    {/* View Project Link */}
                    <div className="inline-flex items-center gap-2 font-paragraph text-sm font-semibold text-brandaccent group-hover:gap-3 transition-all">
                      VIEW PROJECT DETAILS
                      <ExternalLink size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
