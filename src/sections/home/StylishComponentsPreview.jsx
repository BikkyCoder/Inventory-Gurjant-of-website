import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard, NeonButton, MorphIcon, FloatingTag } from '../../components/StylishComponents';
import { Link } from 'react-router-dom';

export default function StylishComponentsPreview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#0a0e27] via-[#0f1638] to-[#0a0e27]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Stylish Components
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              For Modern Web
            </span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Beautiful, reusable React components with glass-morphism, neon effects, and smooth animations
          </p>
        </motion.div>

        {/* Components Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {/* Glass Card Preview */}
          <motion.div variants={itemVariants}>
            <GlassCard
              title="Glass Card"
              subtitle="Modern & Stylish"
              accent="from-pink-500 to-orange-400"
            >
              <p className="text-sm text-white/90 mb-4">
                Beautiful glass-morphism cards with gradient overlays and smooth backdrop blur effects.
              </p>
              <div className="flex gap-2">
                <NeonButton size="sm">Learn More</NeonButton>
              </div>
            </GlassCard>
          </motion.div>

          {/* Neon Button Preview */}
          <motion.div variants={itemVariants}>
            <GlassCard
              title="Neon Buttons"
              subtitle="Interactive & Glowy"
              accent="from-cyan-500 to-blue-600"
            >
              <p className="text-sm text-white/90 mb-4">
                Eye-catching buttons with neon glow effects and interactive hover animations.
              </p>
              <div className="flex gap-2">
                <NeonButton size="sm" colorClass="cyan">Explore</NeonButton>
              </div>
            </GlassCard>
          </motion.div>

          {/* Morph Icon Preview */}
          <motion.div variants={itemVariants}>
            <GlassCard
              title="Morph Icons"
              subtitle="Animated & Responsive"
              accent="from-green-500 to-emerald-600"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/90 flex-1">
                  Smooth morphing icons with delightful micro-interactions.
                </p>
                <MorphIcon size={56} variant="round" />
              </div>
            </GlassCard>
          </motion.div>

          {/* Floating Tags */}
          <motion.div variants={itemVariants}>
            <GlassCard
              title="Floating Tags"
              subtitle="Hover to Reveal"
              accent="from-purple-500 to-pink-600"
            >
              <p className="text-sm text-white/90 mb-4">
                Interactive tags that float and show helpful hints on hover.
              </p>
              <div className="flex gap-3 flex-wrap">
                <FloatingTag label="Pro" hint="Premium features included" />
                <FloatingTag label="Beta" hint="Early access version" />
              </div>
            </GlassCard>
          </motion.div>

          {/* Timeline Stepper */}
          <motion.div variants={itemVariants}>
            <GlassCard
              title="Timeline Stepper"
              subtitle="Step by Step"
              accent="from-yellow-500 to-orange-600"
            >
              <p className="text-sm text-white/90 mb-4">
                Beautiful timeline component for showing progress and steps.
              </p>
              <p className="text-xs text-white/60">Perfect for onboarding flows and processes</p>
            </GlassCard>
          </motion.div>

          {/* Showcase All */}
          <motion.div variants={itemVariants}>
            <Link to="/components">
              <GlassCard
                title="View All"
                subtitle="Complete Library"
                accent="from-indigo-500 to-purple-600"
              >
                <p className="text-sm text-white/90 mb-4">
                  Explore our complete component library with live examples and code snippets.
                </p>
                <NeonButton size="sm">Browse</NeonButton>
              </GlassCard>
            </Link>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-white/70 mb-6">
            Ready to build something amazing? Start using these components in your project.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <NeonButton size="lg">Get Started</NeonButton>
            <button className="px-7 py-3 text-lg font-semibold rounded-full text-white border border-white/20 hover:border-white/40 transition-colors">
              View Docs
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
