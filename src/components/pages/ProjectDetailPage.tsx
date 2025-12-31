import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Projects | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      if (!id) return;
      
      try {
        const projectData = await BaseCrudService.getById<Projects>('projects', id);
        setProject(projectData);
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="font-paragraph text-lg text-primary">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 pt-32 pb-24 text-center">
          <h1 className="font-heading text-3xl font-bold text-primary mb-4">Project Not Found</h1>
          <Link to="/projects" className="inline-flex items-center gap-2 font-paragraph text-sm font-semibold text-brandaccent hover:gap-3 transition-all">
            <ArrowLeft size={16} />
            BACK TO PROJECTS
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Back Button */}
      <section className="w-full max-w-[120rem] mx-auto pt-32 pb-8 px-6 lg:px-12">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-paragraph text-sm font-semibold text-primary hover:text-brandaccent hover:gap-3 transition-all"
        >
          <ArrowLeft size={16} />
          BACK TO PROJECTS
        </Link>
      </section>

      {/* Project Header */}
      <section className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-4xl lg:text-6xl font-black text-brandaccent mb-6">
            {project.projectName}
          </h1>
          
          {project.shortDescription && (
            <p className="font-paragraph text-lg lg:text-xl text-primary mb-8 max-w-4xl">
              {project.shortDescription}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 mb-8">
            {project.completionDate && (
              <div className="flex items-center gap-2 text-primary/70">
                <Calendar size={20} />
                <span className="font-paragraph text-sm font-semibold">
                  {format(new Date(project.completionDate), 'MMMM yyyy')}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-paragraph text-sm font-semibold hover:bg-brandaccent transition-colors"
              >
                <ExternalLink size={16} />
                LIVE DEMO
              </a>
            )}
            {project.githubRepoUrl && (
              <a
                href={project.githubRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-primary text-primary font-paragraph text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Github size={16} />
                VIEW CODE
              </a>
            )}
          </div>
        </motion.div>
      </section>

      {/* Project Image */}
      {project.projectThumbnail && (
        <section className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 pb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="aspect-[16/9] overflow-hidden"
          >
            <Image
              src={project.projectThumbnail}
              alt={project.projectName || 'Project image'}
              className="w-full h-full object-cover"
              width={1200}
            />
          </motion.div>
        </section>
      )}

      {/* Project Details */}
      <section className="w-full bg-secondary">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Description */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-secondary-foreground mb-6">
                Project Overview
              </h2>
              {project.fullDescription && (
                <div className="font-paragraph text-base lg:text-lg text-secondary-foreground leading-relaxed whitespace-pre-line">
                  {project.fullDescription}
                </div>
              )}
            </div>

            {/* Technologies Sidebar */}
            <div>
              {project.technologiesUsed && (
                <div className="bg-background p-6 lg:p-8">
                  <h3 className="font-heading text-xl font-bold text-primary mb-4">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologiesUsed.split(',').map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-2 bg-primary text-primary-foreground font-paragraph text-xs font-semibold"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 py-16 lg:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-6">
            Interested in More Projects?
          </h2>
          <p className="font-paragraph text-base lg:text-lg text-primary/70 mb-8 max-w-2xl mx-auto">
            Explore my full portfolio to see more examples of my work and expertise.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-paragraph text-sm font-semibold hover:bg-brandaccent transition-colors"
          >
            VIEW ALL PROJECTS
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
