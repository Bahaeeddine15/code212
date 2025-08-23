import React from 'react';
import { Mail, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a2332] text-white py-12 px-8 relative overflow-hidden">
      {/* Grid Background Effect */}
      <div className="absolute inset-0 opacity-25 pointer-events-none select-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px'
          }}
        />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Social Media */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/cd212.png"
                alt="CODE'212 Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <a 
                href="https://www.facebook.com/share/176u4P2dHd/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://www.instagram.com/code212uca/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://www.linkedin.com/company/code212-uca/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#programs" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Our Programs
                </a>
              </li>
              <li>
                <a href="/clubs-partners" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Clubs et Partenaires
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Programs</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300 text-sm">CODEUR & DÉVELOPPEUR</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">DATA SPECIALISTS</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">IOT DEVELOPER/ARCHITECT</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">SYSTÈMES ET SÉCURITÉ</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-300 text-sm">code212@uca.ac.ma</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            Copyright © 2025 <span className="text-purple-400 font-medium">Code212</span>
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
}
