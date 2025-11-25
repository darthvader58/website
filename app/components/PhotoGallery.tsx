'use client';

import { useEffect, useState } from 'react';

export default function PhotoGallery() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        setImages(data.images || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching gallery:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-slate-400 text-center py-8">
        Loading gallery...
      </div>
    );
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
        {images.map((src, index) => (
          <div key={src} className="relative inline-block group" style={{ flexShrink: 0 }}>
            {/* Book pages behind - stacked and slightly offset */}
            <div className="absolute left-1 top-1 w-full h-full bg-slate-700/30 rounded-sm shadow-md transition-transform duration-500 group-hover:rotate-2" style={{ transform: 'translateX(-3px)' }}></div>
            <div className="absolute left-0.5 top-0.5 w-full h-full bg-slate-600/20 rounded-sm shadow-md transition-transform duration-500 group-hover:rotate-1" style={{ transform: 'translateX(-1.5px)' }}></div>
            
            {/* Main photo page */}
            <div className="relative bg-gradient-to-br from-purple-950 to-indigo-950 p-2 shadow-2xl border-l-4 border-purple-800/40 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105">
              <img 
                src={src}
                alt={`Gallery photo ${index + 1}`}
                className="block opacity-0 animate-fadeInSlow"
                style={{ 
                  animationFillMode: 'forwards', 
                  animationDelay: `${index * 0.1}s`,
                  height: '350px',
                  width: 'auto',
                  objectFit: 'cover'
                }}
              />
              {/* Paper texture and fold effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/10 to-indigo-900/20 pointer-events-none"></div>
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-r from-purple-800/50 to-transparent"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
