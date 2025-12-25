import React, { useEffect, useState } from 'react';

const MobileBlocker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
      const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword));
      const isSmallScreen = window.innerWidth < 1024;
      
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6 overflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Main content card */}
        <div className="relative z-10 max-w-md w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-white/20 to-white/10 p-6 rounded-full border border-white/30">
                <svg 
                  className="w-16 h-16 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-white mb-3 animate-fade-in">
            Desktop Only
          </h1>

          {/* Subtitle with emoji */}
          <div className="text-6xl mb-4 animate-bounce-slow">
            💻
          </div>

          {/* Description */}
          <p className="text-white/90 text-lg mb-2 leading-relaxed">
            This admin dashboard is optimized for desktop use only
          </p>
          
          <p className="text-white/70 text-sm mb-8 leading-relaxed">
            For the best experience and full functionality, please access this platform from your PC or laptop.
          </p>

          {/* Feature cards */}
          <div className="space-y-3 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 flex items-start gap-3 text-left hover:bg-white/10 transition-all duration-300">
              <div className="text-2xl mt-1">⚡</div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">Better Performance</h3>
                <p className="text-white/70 text-xs">Handle complex data with ease on a larger screen</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 flex items-start gap-3 text-left hover:bg-white/10 transition-all duration-300">
              <div className="text-2xl mt-1">📊</div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">Enhanced Visualization</h3>
                <p className="text-white/70 text-xs">View detailed analytics and charts clearly</p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 flex items-start gap-3 text-left hover:bg-white/10 transition-all duration-300">
              <div className="text-2xl mt-1">🎯</div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">Full Functionality</h3>
                <p className="text-white/70 text-xs">Access all features without limitations</p>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-[2px] hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
            <div className="bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl px-6 py-3">
              <p className="text-white font-semibold text-sm">
                ✨ Switch to desktop for the full experience
              </p>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-white/50 text-xs mt-6">
            DR-Drills Admin Dashboard
          </p>
        </div>

        {/* Floating elements decoration */}
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-lg rotate-12 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 border-2 border-white/20 rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute top-1/3 right-10 w-12 h-12 border-2 border-white/20 rounded-lg -rotate-12 animate-float animation-delay-4000"></div>

        <style>{`
          @keyframes blob {
            0%, 100% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(10deg);
            }
          }

          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .animate-blob {
            animation: blob 7s infinite;
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-fade-in {
            animation: fade-in 0.8s ease-out;
          }

          .animate-bounce-slow {
            animation: bounce-slow 2s ease-in-out infinite;
          }

          .animation-delay-2000 {
            animation-delay: 2s;
          }

          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
};

export default MobileBlocker;
