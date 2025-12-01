'use client';

import { useState, useEffect } from 'react';
import PhotoGallery from './components/PhotoGallery';

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z" fill="currentColor" />
  </svg>
);

export default function HomePage() {
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    // Show greeting after a brief delay
    const showTimer = setTimeout(() => {
      setShowGreeting(true);
    }, 500);

    // Hide greeting after 2.5 seconds
    const hideTimer = setTimeout(() => {
      setShowGreeting(false);
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <section className="fade">
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
        <img src="https://raw.githubusercontent.com/TheDudeThatCode/TheDudeThatCode/master/Assets/Hi.gif" alt="Hi" className="inline-block align-middle w-12 h-12 mr-2"/> Hey, I'm Shashwat Raj
      </h1>
      
      {/* Animated greeting */}
      <div 
        className={`mb-6 text-xl text-purple-400 font-medium transition-all duration-1500 ${
          showGreeting 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-8'
        }`}
      >
        How's your day going?
      </div>
      
      <div className="relative mb-8 inline-block w-full group" style={{ maxWidth: '215px' }}>
        {/* Book pages behind - stacked and slightly offset */}
        <div className="absolute left-1 top-1 w-full h-full bg-slate-700/30 rounded-sm shadow-md transition-transform duration-500 group-hover:rotate-2" style={{ transform: 'translateX(-3px)' }}></div>
        <div className="absolute left-0.5 top-0.5 w-full h-full bg-slate-600/20 rounded-sm shadow-md transition-transform duration-500 group-hover:rotate-1" style={{ transform: 'translateX(-1.5px)' }}></div>
        
        {/* Main photo page */}
        <div className="relative bg-gradient-to-br from-slate-100 to-slate-50 p-2 shadow-2xl border-l-4 border-slate-800/20 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105">
          <img 
            src="/images/Myself.png" 
            alt="Shashwat Raj" 
            className="block w-full h-auto opacity-0 animate-fadeInSlow"
            style={{ animationFillMode: 'forwards' }}
          />
          {/* Paper texture and fold effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-slate-200/20 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-r from-slate-300/50 to-transparent"></div>
        </div>
      </div>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          I'm a junior at Arizona State University majoring in Computer Systems Engineering and Math, with a passion for building innovative solutions at the intersection of hardware and software. 
        </p>

        <p className="text-slate-400 leading-relaxed mb-6">
          I'm passionate about robotics, machine learning, and software development. Currently, I'm working as a Machine Learning Developer and Researcher at the Collective Design (CoDe) lab at ASU, where I'm developing Reinforcement Learning techniques to optimize Earth science missions for autonomous priority observations in space. </p>
        <p className="text-slate-400 leading-relaxed mb-6">I'm also the Founder & CEO of <span className="font-medium">WoofCare Solutions</span>, a mobile app connecting dog lovers and care services to improve the lives of stray dogs in India. This project is funded by EPICS (Engineering Projects In Community Service) at ASU and partners with over 60+ NGOs.</p>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="border border-slate-800 rounded-lg p-6 bg-slate-950/30">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Education</h3>
            <p className="text-slate-300 font-medium">Arizona State University</p>
            <p className="text-slate-400 text-sm">BSE Computer Science & Engineering</p>
            <p className="text-slate-400 text-sm">BS Mathematics</p>
            <p className="text-slate-500 text-sm">GPA: 3.78/4.0</p>
          </div>

          <div className="border border-slate-800 rounded-lg p-6 bg-slate-950/30">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Interests</h3>
            <p className="text-slate-400 text-sm">AI, Machine Learning and GPU Programming</p>
            <p className="text-slate-400 text-sm">Full-Stack Development</p>
            <p className="text-slate-400 text-sm">Embedded Systems, IoT & Robotics</p>
            <p className="text-slate-400 text-sm">Operating Systems</p>
          </div>
        </div>

        <p className="text-slate-400 leading-relaxed mb-6">When I'm not coding or researching, you can find me playing the flute, working on Battlebots, boxing, creating digital art, or hosting my podcast <a className="inline-flex items-center transition-all hover:text-purple-400" rel="noopener noreferrer" target="_blank" href="https://github.com/darthvader58"><ArrowIcon /><span className="ml-2">"Write It Out"</span></a></p>
        <p className="text-slate-400 leading-relaxed mb-8">I love travelling!</p>
      </div>

      {/* Dynamic Photo Gallery */}
      <PhotoGallery />
    </section>
  )
}