// HPI 1.6-V
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowRight, ExternalLink, ArrowUpRight, Sparkles, Layers, Code2 } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { ProfileInformation, Projects, Skills } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- 1. UTILITIES & HOOKS ---

// Mandatory AnimatedElement for scroll reveals (Intersection Observer)
type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: string; // CSS delay string e.g. "0.2s"
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, threshold = 0.1, delay = "0s" }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
        observer.unobserve(element);
      }
    }, { threshold });

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div 
      ref={ref} 
      className={`reveal-trigger ${className || ''}`}
      style={{ '--reveal-delay': delay } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

// Custom Hook for Parallax
function useParallax(value: any, distance: number) {
  return useTransform(value, [0, 1], [0, -distance]);
}

// --- 2. MAIN COMPONENT ---

export default function HomePage() {
  // --- CANONICAL DATA SOURCES ---
  const [profile, setProfile] = useState<ProfileInformation | null>(null);
  const [featuredProjects, setFeaturedProjects] = useState<Projects[]>([]);
  const [skills, setSkills] = useState<Skills[]>([]);
  const [loading, setLoading] = useState(true);

  // Scroll hooks for global parallax effects
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch Profile
        const { items: profiles } = await BaseCrudService.getAll<ProfileInformation>('profileinformation');
        if (profiles.length > 0) {
          setProfile(profiles[0]);
        }

        // Fetch Projects
        const { items: projects } = await BaseCrudService.getAll<Projects>('projects');
        setFeaturedProjects(projects);

        // Fetch Skills
        const { items: skillsData } = await BaseCrudService.getAll<Skills>('skills');
        setSkills(skillsData.slice(0, 8)); // Take top 8 for homepage

      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brandaccent border-t-transparent rounded-full animate-spin"></div>
          <div className="font-heading text-xl font-bold text-primary tracking-widest">LOADING EXPERIENCE</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-clip selection:bg-brandaccent selection:text-white">
      <style>{`
        .reveal-trigger {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: var(--reveal-delay);
        }
        .reveal-trigger.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }
        
        .marquee-container {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        
        .text-stroke-sm {
          -webkit-text-stroke: 1px rgba(0,0,0,0.2);
          color: transparent;
        }
        
        .grain-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
          pointer-events: none;
        }
      `}</style>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brandaccent z-50 origin-left"
        style={{ scaleX }}
      />

      <Header />

      <main className="relative w-full">
        
        {/* --- HERO SECTION --- 
            Structure inspired by "DOCKSIDE" image: 
            Massive Left Heading, Right-aligned Subhead/CTA, Full-width Image below.
        */}
        <section className="relative w-full pt-32 lg:pt-48 pb-0">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            
            {/* Top Row: Massive Typography */}
            <div className="relative z-10 mb-12 lg:mb-24">
              <AnimatedElement className="max-w-7xl">
                <h1 className="font-heading text-[12vw] lg:text-[9rem] leading-[0.85] font-black text-brandaccent tracking-tighter uppercase break-words">
                  {profile?.fullName?.split(' ')[0] || 'CREATIVE'}
                  <br />
                  <span className="text-primary">
                    {profile?.fullName?.split(' ').slice(1).join(' ') || 'PORTFOLIO'}
                  </span>
                </h1>
              </AnimatedElement>
            </div>

            {/* Middle Row: Subhead & CTA (Right Aligned) */}
            <div className="flex flex-col lg:flex-row justify-end items-start lg:items-center gap-8 mb-16 lg:mb-24 relative z-20">
              <AnimatedElement delay="0.2s" className="max-w-md lg:text-right">
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-primary mb-4">
                  {profile?.tagline || 'Designing the future of digital experiences.'}
                </h2>
                <div className="h-1 w-full bg-primary mb-6 origin-left lg:origin-right transform scale-x-100"></div>
                
                <div className="flex flex-col lg:flex-row gap-4 lg:justify-end">
                  {profile?.cvFileUrl && (
                    <a
                      href={profile.cvFileUrl}
                      download
                      className="group inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground font-heading font-bold text-sm tracking-wider hover:bg-brandaccent transition-colors duration-300"
                    >
                      <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                      DOWNLOAD CV
                    </a>
                  )}
                  <Link
                    to="/about"
                    className="group inline-flex items-center gap-3 px-6 py-3 border-2 border-primary text-primary font-heading font-bold text-sm tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  >
                    ABOUT ME
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </AnimatedElement>
            </div>
          </div>

          {/* Bottom Row: Full Bleed Parallax Image */}
          <div className="relative w-full h-[60vh] lg:h-[85vh] overflow-hidden clip-diagonal">
            <div className="absolute inset-0 bg-primary/10 z-10 mix-blend-multiply"></div>
            {profile?.profilePicture ? (
              <ParallaxImage src={profile.profilePicture} alt={profile.fullName || "Profile"} />
            ) : (
              <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                <span className="font-heading text-9xl text-neutral-300 font-black">IMAGE</span>
              </div>
            )}
            
            {/* Floating Badge */}
            <div className="absolute bottom-24 left-6 lg:left-12 z-20 bg-background p-6 lg:p-10 shadow-2xl max-w-xs lg:max-w-sm border-l-8 border-brandaccent">
              <p className="font-heading text-sm font-bold text-brandaccent mb-2 tracking-widest uppercase">Current Status</p>
              <p className="font-paragraph text-lg lg:text-xl font-medium text-primary leading-tight">
                {profile?.professionalTitle || 'Available for new opportunities and collaborations.'}
              </p>
            </div>
          </div>
        </section>

        {/* --- MARQUEE SECTION --- */}
        <section className="bg-secondary py-8 lg:py-12 overflow-hidden border-y border-primary">
          <div className="marquee-container relative flex w-full overflow-hidden">
            <motion.div 
              className="flex whitespace-nowrap gap-12 lg:gap-24"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            >
              {[...Array(4)].map((_, i) => (
                <React.Fragment key={i}>
                  <span className="font-heading text-6xl lg:text-8xl font-black text-secondary-foreground">
                    CREATIVE
                  </span>
                  <span className="font-heading text-6xl lg:text-8xl font-black text-stroke-sm">
                    DEVELOPER
                  </span>
                  <span className="font-heading text-6xl lg:text-8xl font-black text-secondary-foreground">
                    DESIGNER
                  </span>
                  <span className="font-heading text-6xl lg:text-8xl font-black text-stroke-sm">
                    STRATEGIST
                  </span>
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- ABOUT / INTRO SECTION --- */}
        <section className="relative w-full bg-background py-24 lg:py-40 px-6 lg:px-12">
          <div className="max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Sticky Title */}
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <AnimatedElement>
                  <h2 className="font-heading text-5xl lg:text-7xl font-black text-primary mb-8 leading-none">
                    THE<br /><span className="text-brandaccent">VISION</span>
                  </h2>
                  <div className="w-24 h-2 bg-primary mb-8"></div>
                  <p className="font-paragraph text-lg text-primary/60 max-w-xs">
                    A glimpse into my professional journey and the philosophy that drives my work.
                  </p>
                </AnimatedElement>
              </div>
            </div>

            {/* Content Flow */}
            <div className="lg:col-span-8 flex flex-col gap-16 lg:gap-32">
              <AnimatedElement delay="0.2s">
                <p className="font-paragraph text-2xl lg:text-4xl leading-tight font-medium text-primary indent-12 lg:indent-24">
                  {profile?.introductoryText || "I craft digital experiences that merge form and function. My approach is rooted in a deep understanding of user behavior and a passion for clean, efficient code."}
                </p>
              </AnimatedElement>

              {/* Stats / Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatedElement delay="0.3s" className="bg-neutral-50 p-8 lg:p-12 border border-neutral-200 hover:border-brandaccent transition-colors duration-500 group">
                  <Layers className="w-12 h-12 text-brandaccent mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="font-heading text-2xl font-bold mb-4">Full Stack Architecture</h3>
                  <p className="font-paragraph text-primary/70">Building robust, scalable applications from database design to frontend interactivity.</p>
                </AnimatedElement>
                
                <AnimatedElement delay="0.4s" className="bg-neutral-50 p-8 lg:p-12 border border-neutral-200 hover:border-brandaccent transition-colors duration-500 group">
                  <Sparkles className="w-12 h-12 text-brandaccent mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="font-heading text-2xl font-bold mb-4">UI/UX Design</h3>
                  <p className="font-paragraph text-primary/70">Creating intuitive, accessible, and visually stunning interfaces that delight users.</p>
                </AnimatedElement>
              </div>
            </div>
          </div>
        </section>

        {/* --- FEATURED PROJECTS (Dark Mode) --- */}
        <section className="relative w-full bg-primary text-primary-foreground py-32 lg:py-48 px-6 lg:px-12 clip-diagonal-reverse">
          <div className="absolute inset-0 grain-overlay opacity-20"></div>
          
          <div className="max-w-[120rem] mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-24 border-b border-white/20 pb-8">
              <AnimatedElement>
                <h2 className="font-heading text-5xl lg:text-8xl font-black text-white tracking-tight">
                  SELECTED<br /><span className="text-brandaccent">WORKS</span>
                </h2>
              </AnimatedElement>
              <AnimatedElement delay="0.2s">
                <Link to="/projects" className="hidden lg:flex items-center gap-2 font-heading font-bold text-lg hover:text-brandaccent transition-colors">
                  VIEW ALL ARCHIVE <ArrowRight className="w-5 h-5" />
                </Link>
              </AnimatedElement>
            </div>

            {/* Projects List - Vertical Stack with Sticky/Parallax feel */}
            <div className="flex flex-col gap-24 lg:gap-40">
              {featuredProjects.slice(0, 3).map((project, index) => (
                <ProjectRow key={project._id} project={project} index={index} />
              ))}
            </div>

            <div className="mt-24 lg:mt-40 text-center lg:hidden">
              <Link to="/projects" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-heading font-bold text-sm hover:bg-brandaccent hover:text-white transition-colors">
                VIEW ALL PROJECTS
              </Link>
            </div>
          </div>
        </section>

        {/* --- SKILLS & CTA --- */}
        <section className="relative w-full bg-background py-24 lg:py-40 px-6 lg:px-12">
          <div className="max-w-[120rem] mx-auto">
            
            {/* Skills Grid */}
            <div className="mb-32">
              <AnimatedElement className="mb-12 text-center">
                <h2 className="font-heading text-3xl lg:text-5xl font-bold text-primary mb-4">TECHNICAL ARSENAL</h2>
                <div className="w-16 h-1 bg-brandaccent mx-auto"></div>
              </AnimatedElement>
              
              <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
                {skills.map((skill, i) => (
                  <AnimatedElement key={skill._id} delay={`${i * 0.05}s`}>
                    <div className="px-6 py-3 bg-neutral-100 border border-neutral-200 rounded-full font-paragraph font-medium text-primary hover:bg-brandaccent hover:text-white hover:border-brandaccent transition-all duration-300 cursor-default">
                      {skill.skillName}
                    </div>
                  </AnimatedElement>
                ))}
                <AnimatedElement delay="0.5s">
                  <Link to="/skills" className="px-6 py-3 border-2 border-dashed border-primary/30 rounded-full font-paragraph font-medium text-primary/60 hover:border-brandaccent hover:text-brandaccent transition-all duration-300 flex items-center gap-2">
                    View All Skills <ArrowRight className="w-4 h-4" />
                  </Link>
                </AnimatedElement>
              </div>
            </div>

            {/* Final CTA */}
            <div className="relative bg-secondary rounded-3xl p-12 lg:p-24 overflow-hidden text-center">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[200%] bg-white rotate-12"></div>
              </div>
              
              <div className="relative z-10 max-w-4xl mx-auto">
                <AnimatedElement>
                  <h2 className="font-heading text-5xl lg:text-8xl font-black text-secondary-foreground mb-8 leading-[0.9]">
                    LET'S BUILD<br />SOMETHING<br />LEGENDARY
                  </h2>
                </AnimatedElement>
                
                <AnimatedElement delay="0.2s">
                  <p className="font-paragraph text-xl lg:text-2xl text-secondary-foreground/80 mb-12 max-w-2xl mx-auto">
                    I'm currently available for freelance projects and open to full-time opportunities.
                  </p>
                </AnimatedElement>
                
                <AnimatedElement delay="0.3s" className="flex flex-col sm:flex-row justify-center gap-6">
                  <a href="mailto:contact@example.com" className="px-10 py-5 bg-primary text-white font-heading font-bold text-lg tracking-wide hover:bg-primary/80 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1 transform duration-300">
                    START A PROJECT
                  </a>
                  <Link to="/about" className="px-10 py-5 bg-transparent border-2 border-primary text-primary font-heading font-bold text-lg tracking-wide hover:bg-primary hover:text-white transition-colors duration-300">
                    READ MY STORY
                  </Link>
                </AnimatedElement>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

// --- 3. SUB-COMPONENTS ---

// Parallax Image Component
const ParallaxImage = ({ src, alt }: { src: string, alt: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="w-full h-full overflow-hidden relative">
      <motion.div style={{ y }} className="w-full h-[120%] relative -top-[10%]">
        <Image
          src={src}
          alt={alt}
          width={1920}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

// Project Row Component
const ProjectRow = ({ project, index }: { project: Projects, index: number }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center group`}>
      
      {/* Image Side */}
      <div className="w-full lg:w-3/5">
        <AnimatedElement className="relative aspect-[16/9] overflow-hidden bg-neutral-900">
          <Link to={`/projects/${project._id}`} className="block w-full h-full">
            <div className="absolute inset-0 bg-brandaccent/0 group-hover:bg-brandaccent/20 z-10 transition-colors duration-500"></div>
            {project.projectThumbnail ? (
              <Image
                src={project.projectThumbnail}
                alt={project.projectName || 'Project'}
                width={1200}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-800">
                <Code2 className="w-24 h-24 text-neutral-700" />
              </div>
            )}
          </Link>
        </AnimatedElement>
      </div>

      {/* Content Side */}
      <div className="w-full lg:w-2/5">
        <AnimatedElement delay="0.2s">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-heading text-6xl font-black text-white/10 group-hover:text-brandaccent/20 transition-colors duration-500">
              0{index + 1}
            </span>
            <div className="h-px flex-grow bg-white/20 group-hover:bg-brandaccent/50 transition-colors duration-500"></div>
          </div>
          
          <h3 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-6 group-hover:text-brandaccent transition-colors duration-300">
            <Link to={`/projects/${project._id}`}>
              {project.projectName}
            </Link>
          </h3>
          
          <p className="font-paragraph text-lg text-neutral-400 mb-8 line-clamp-3">
            {project.shortDescription || project.fullDescription}
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {project.technologiesUsed?.split(',').slice(0, 3).map((tech, i) => (
              <span key={i} className="text-xs font-bold uppercase tracking-wider px-3 py-1 border border-white/20 text-white/60 rounded-full">
                {tech.trim()}
              </span>
            ))}
          </div>

          <Link 
            to={`/projects/${project._id}`}
            className="inline-flex items-center gap-2 text-brandaccent font-heading font-bold tracking-wide hover:text-white transition-colors"
          >
            EXPLORE CASE STUDY <ArrowUpRight className="w-5 h-5" />
          </Link>
        </AnimatedElement>
      </div>
    </div>
  );
};