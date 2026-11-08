import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PortfolioTabs from './PortfolioTabs';
import ProjectsTab from './ProjectsTab';
import ProjectDetail from './ProjectDetail';
import CertificatesTab from './CertificatesTab';
import AchievementsTab from './AchievementsTab';
import TechStackTab from './TechStackTab';
import CertificateModal from './CertificateModal';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalItem, setModalItem] = useState(null);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSelectedProject(null); // Reset detail jika berganti tab
  };

  return (
    <section id="portfolio" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Section (Hanya tampil jika tidak sedang membuka detail project) */}
      {!selectedProject && (
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
              Portfolio
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
              Eksplorasi karya proyek, sertifikasi kompetensi, pencapaian, dan teknologi yang saya gunakan.
            </p>
          </motion.div>
        </div>
      )}

      {/* Tab Navigation (Hanya tampil jika tidak sedang membuka detail project) */}
      {!selectedProject && (
        <PortfolioTabs activeTab={activeTab} onSelectTab={handleTabChange} />
      )}

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {selectedProject ? (
          <ProjectDetail
            key="project-detail"
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
          />
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'projects' && (
              <ProjectsTab onSelectProject={(p) => setSelectedProject(p)} />
            )}
            {activeTab === 'certificates' && (
              <CertificatesTab onSelectCertificate={(c) => setModalItem(c)} />
            )}
            {activeTab === 'achievements' && (
              <AchievementsTab onSelectAchievement={(a) => setModalItem(a)} />
            )}
            {activeTab === 'tech-stack' && <TechStackTab />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal untuk Sertifikat & Piagam */}
      {modalItem && (
        <CertificateModal
          item={modalItem}
          onClose={() => setModalItem(null)}
        />
      )}
    </section>
  );
}
