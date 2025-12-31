import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ProfileInformation } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const [profile, setProfile] = useState<ProfileInformation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const { items } = await BaseCrudService.getAll<ProfileInformation>('profileinformation');
        if (items.length > 0) {
          setProfile(items[0]);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
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
            ABOUT ME
          </h1>
          <div className="h-1 w-32 bg-primary mb-6"></div>
          {profile?.tagline && (
            <p className="font-paragraph text-lg lg:text-xl text-primary max-w-3xl">
              {profile.tagline}
            </p>
          )}
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {profile?.profilePicture && (
              <div className="aspect-[3/4] overflow-hidden sticky top-32">
                <Image
                  src={profile.profilePicture}
                  alt={profile.fullName || 'Profile picture'}
                  className="w-full h-full object-cover"
                  width={600}
                />
              </div>
            )}
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Name and Title */}
            <div>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-3">
                {profile?.fullName || 'Professional Name'}
              </h2>
              {profile?.professionalTitle && (
                <p className="font-paragraph text-lg lg:text-xl text-brandaccent font-semibold">
                  {profile.professionalTitle}
                </p>
              )}
            </div>

            <div className="h-px bg-subtledivider"></div>

            {/* Introduction */}
            {profile?.introductoryText && (
              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">
                  My Story
                </h3>
                <p className="font-paragraph text-base lg:text-lg text-primary leading-relaxed whitespace-pre-line">
                  {profile.introductoryText}
                </p>
              </div>
            )}

            {/* CV Download */}
            {profile?.cvFileUrl && (
              <div className="pt-4">
                <a
                  href={profile.cvFileUrl}
                  download
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-paragraph text-sm font-semibold hover:bg-brandaccent transition-colors"
                >
                  <Download size={20} />
                  DOWNLOAD MY CV
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Divider Section with Color Block */}
      <section className="w-full bg-secondary">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl lg:text-5xl font-bold text-secondary-foreground mb-6">
                Let's Create Something Amazing
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="font-paragraph text-base lg:text-lg text-secondary-foreground leading-relaxed mb-6">
                I'm passionate about bringing ideas to life through innovative solutions and creative problem-solving. Explore my work to see what we can achieve together.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-paragraph text-sm font-semibold hover:bg-brandaccent transition-colors"
                >
                  VIEW PROJECTS
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/skills"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-secondary-foreground text-secondary-foreground font-paragraph text-sm font-semibold hover:bg-secondary-foreground hover:text-secondary transition-colors"
                >
                  VIEW SKILLS
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
