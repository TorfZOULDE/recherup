import React from 'react';

export default function SocialAuth() {
  return (
    <div className="space-y-4 mt-8">
      <div className="text-center text-gray-500 text-xs font-semibold uppercase tracking-widest my-6">Ou continuer avec</div>
      
      <button className="w-full flex items-center justify-center gap-3 border border-white/10 py-3.5 rounded-xl text-white hover:bg-white/5 transition-all">
        {/* Icône Google - Taille 6x6, couleur héritée */}
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.35 11.1H12v2.8h5.36c-.45 2.1-2.3 3.6-4.36 3.6-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7c1.2 0 2.3.4 3.1 1.2l2.1-2.1c-1.3-1.2-3.1-2-5.2-2-4.4 0-8 3.6-8 8s3.6 8 8 8c4.6 0 7.8-3.2 7.8-7.8 0-.5-.1-1-.2-1.4z"/>
        </svg>
        <span className="font-medium">Google</span>
      </button>

      <button className="w-full flex items-center justify-center gap-3 border border-white/10 py-3.5 rounded-xl text-white hover:bg-white/5 transition-all">
        {/* Icône LinkedIn - Taille 6x6, couleur bleue */}
        <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9H12.75v1.602h.048c.473-.89 1.63-1.826 3.356-1.826 3.59 0 4.253 2.362 4.253 5.435v6.241zM5.339 7.426c-1.14 0-2.065-.927-2.065-2.067 0-1.141.925-2.067 2.065-2.067 1.142 0 2.066.926 2.066 2.067 0 1.14-.924 2.067-2.066 2.067zm1.777 13.026H3.562V9h3.554v11.452z"/>
        </svg>
        <span className="font-medium">LinkedIn</span>
      </button>
    </div>
  );
}