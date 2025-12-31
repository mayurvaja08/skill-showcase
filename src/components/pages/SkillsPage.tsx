import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Skills } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Star } from 'lucide-react';

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skills[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    async function loadSkills() {
      try {
        const { items } = await BaseCrudService.getAll<Skills>('skills');
        setSkills(items);
      } catch (error) {
        console.error('Error loading skills:', error);
      } finally {
        setLoading(false);
      }
    }

    loadSkills();
  }, []);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category).filter(Boolean)))];

  // Filter skills by category
  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  // Group skills by category for display
  const skillsByCategory = filteredSkills.reduce((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, Skills[]>);

  // Separate key skills
  const keySkills = skills.filter(s => s.isKeySkill);

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
            MY SKILLS
          </h1>
          <div className="h-1 w-32 bg-primary mb-6"></div>
          <p className="font-paragraph text-base lg:text-lg text-primary max-w-3xl">
            A comprehensive overview of my technical expertise, tools, and competencies developed through years of hands-on experience.
          </p>
        </motion.div>
      </section>

      {/* Key Skills Highlight */}
      {keySkills.length > 0 && (
        <section className="w-full bg-secondary mb-16">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-12 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-secondary-foreground mb-8 flex items-center gap-3">
                <Star size={32} className="text-secondary-foreground" />
                Key Expertise
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {keySkills.map((skill, index) => (
                  <motion.div
                    key={skill._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-primary text-primary-foreground p-4 lg:p-6 text-center"
                  >
                    <h3 className="font-heading text-lg font-bold">
                      {skill.skillName}
                    </h3>
                    {skill.yearsExperience && (
                      <p className="font-paragraph text-sm text-primary-foreground/70 mt-2">
                        {skill.yearsExperience} {skill.yearsExperience === 1 ? 'year' : 'years'}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      {categories.length > 1 && (
        <section className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 pb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 font-paragraph text-sm font-semibold transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Skills by Category */}
      <section className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 pb-24">
        {Object.keys(skillsByCategory).length === 0 ? (
          <div className="text-center py-16">
            <p className="font-paragraph text-lg text-primary/60">No skills available yet.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {Object.entries(skillsByCategory).map(([category, categorySkills], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              >
                {selectedCategory === 'All' && (
                  <>
                    <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-8">
                      {category}
                    </h2>
                    <div className="h-px bg-subtledivider mb-8"></div>
                  </>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categorySkills.map((skill, index) => (
                    <motion.div
                      key={skill._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="border-l-4 border-brandaccent pl-6 py-2"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-heading text-xl font-bold text-primary">
                          {skill.skillName}
                        </h3>
                        {skill.isKeySkill && (
                          <Star size={20} className="text-brandaccent fill-brandaccent" />
                        )}
                      </div>

                      {skill.proficiencyLevel && (
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground font-paragraph text-xs font-semibold">
                            {skill.proficiencyLevel}
                          </span>
                        </div>
                      )}

                      {skill.description && (
                        <p className="font-paragraph text-sm text-primary/70 mb-3">
                          {skill.description}
                        </p>
                      )}

                      {skill.yearsExperience && (
                        <p className="font-paragraph text-sm text-primary/60">
                          <span className="font-semibold">{skill.yearsExperience}</span> {skill.yearsExperience === 1 ? 'year' : 'years'} of experience
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16 lg:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl lg:text-5xl font-bold text-primary-foreground mb-6">
              See These Skills in Action
            </h2>
            <p className="font-paragraph text-base lg:text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Explore my portfolio to see how I've applied these skills to real-world projects and challenges.
            </p>
            <a
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brandaccent text-primary-foreground font-paragraph text-sm font-semibold hover:bg-brandaccent/90 transition-colors"
            >
              VIEW MY PROJECTS
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
