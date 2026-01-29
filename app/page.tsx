'use client';

import { useState, useEffect } from 'react';
import PhotoGallery from './components/PhotoGallery';

const SpotifyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
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
        How you doin' ?! 
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

        <a
            href="https://github.com/sponsors/darthvader58"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z"/>
            </svg>
            Sponsor
          </a>
        <p></p>
        <p className="text-slate-400 leading-relaxed mb-6">When I'm not coding or researching, you can find me playing the flute, working on Battlebots, boxing, creating digital art, or hosting my podcast <a className="inline-flex items-center transition-all hover:text-purple-400" rel="noopener noreferrer" target="_blank" href="https://open.spotify.com/show/3hOrhL4KTN4vRYUcfstmyy?si=824fd957830546dc"><SpotifyIcon /><span className="ml-2">"Write It Out"</span></a></p>
        <p className="text-slate-400 leading-relaxed mb-8">I love travelling!</p>
      </div>

      {/* Dynamic Photo Gallery */}
      <PhotoGallery />
    </section>
  )
}