import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Layers, Sparkles } from 'lucide-react';
import { memories, memoryCategories } from '../data/memories';
import MediaLightbox from './MediaLightbox';

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState('All Moments');
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  const filteredPhotos = selectedCategory === 'All Moments'
    ? memories
    : memories.filter(photo => photo.category.toLowerCase() === selectedCategory.toLowerCase());

  const currentPhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  const handlePrev = () => {
    if (activePhotoIndex !== null && activePhotoIndex > 0) {
      setActivePhotoIndex(activePhotoIndex - 1);
    }
  };

  const handleNext = () => {
    if (activePhotoIndex !== null && activePhotoIndex < filteredPhotos.length - 1) {
      setActivePhotoIndex(activePhotoIndex + 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap sm:justify-center">
        {memoryCategories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 whitespace-nowrap select-none font-mono flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-gradient-to-r from-[#743BFF] to-[#35D5FF] text-white shadow-glow-sm'
                  : 'bg-[#171328]/80 text-[#A5A0B5] hover:text-white hover:bg-[#171328] border border-white/5'
              }`}
            >
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Masonry Editorial Photo Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <AnimatePresence>
          {filteredPhotos.map((photo, index) => (
            <motion.div
              layout
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              onClick={() => setActivePhotoIndex(index)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#171328] border border-white/10 hover:border-[#9B70FF]/50 transition-all duration-300 shadow-xl"
            >
              {/* Media Thumbnail */}
              <div className={`relative w-full ${photo.aspect || 'aspect-[4/3]'} overflow-hidden bg-[#100D1D]`}>
                <img
                  src={photo.image}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080811] via-[#080811]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Cyberpunk Category Pill */}
                <div className="absolute top-3 left-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-[#100D1D]/90 text-[#35D5FF] border border-[#35D5FF]/30 backdrop-blur-md">
                    {photo.category}
                  </span>
                </div>

                {/* Inspect Action Glow Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#743BFF]/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-1 group-hover:translate-y-0 shadow-lg">
                  <Eye size={15} />
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <h4 className="text-sm sm:text-base font-bold text-white font-heading group-hover:text-[#35D5FF] transition-colors leading-snug">
                    {photo.title}
                  </h4>
                  {photo.caption && (
                    <p className="text-xs text-[#A5A0B5] line-clamp-1 mt-1 font-normal">
                      {photo.caption}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Component */}
      <MediaLightbox
        item={currentPhoto}
        onClose={() => setActivePhotoIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={activePhotoIndex !== null && activePhotoIndex > 0}
        hasNext={activePhotoIndex !== null && activePhotoIndex < filteredPhotos.length - 1}
      />
    </div>
  );
}

