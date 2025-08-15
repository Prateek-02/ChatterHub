// /src/pages/Welcome.jsx
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Welcome = () => {
 const navigate = useNavigate();

 // Auto-redirect if already logged in
 useEffect(() => {
   const token = localStorage.getItem(import.meta.env.VITE_JWT_KEY);
   if (token) navigate("/home");
 }, [navigate]);

 return (
   <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 relative overflow-hidden flex flex-col items-center justify-center text-white px-6">
     {/* Animated Background Elements */}
     <div className="absolute inset-0">
       {/* Geometric Shapes */}
       <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-3xl rotate-45 animate-geometric-float"></div>
       <div className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-teal-400/15 to-cyan-400/15 rounded-full animate-geometric-float delay-700"></div>
       <div className="absolute bottom-1/4 left-32 w-40 h-40 bg-gradient-to-br from-cyan-400/10 to-emerald-400/10 rounded-2xl rotate-12 animate-geometric-float delay-1400"></div>
       <div className="absolute bottom-20 right-40 w-28 h-28 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full animate-geometric-float delay-2100"></div>
       
       {/* Floating Network Nodes */}
       <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-emerald-400 rounded-full animate-network-pulse"></div>
       <div className="absolute top-2/4 left-1/4 w-2 h-2 bg-teal-400 rounded-full animate-network-pulse delay-500"></div>
       <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-cyan-400 rounded-full animate-network-pulse delay-1000"></div>
       <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-emerald-300 rounded-full animate-network-pulse delay-1500"></div>
       
       {/* Connecting Lines */}
       <svg className="absolute inset-0 w-full h-full opacity-20">
         <defs>
           <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
             <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.6" />
             <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
           </linearGradient>
         </defs>
         <path 
           d="M100,200 Q300,100 500,250 T900,200" 
           stroke="url(#line-gradient)" 
           strokeWidth="2" 
           fill="none"
           className="animate-path-draw"
         />
         <path 
           d="M200,400 Q400,300 600,450 T1000,400" 
           stroke="url(#line-gradient)" 
           strokeWidth="1.5" 
           fill="none"
           className="animate-path-draw delay-1000"
         />
       </svg>
       
       {/* Hexagon Pattern */}
       <div className="absolute inset-0 opacity-5">
         <div className="absolute inset-0 hexagon-pattern"></div>
       </div>
       
       {/* Gradient Overlay */}
       <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
     </div>

     <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto text-center">
       {/* Logo with Glow Effect */}
       <div className="relative mb-8">
         <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
         <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 p-6 rounded-full shadow-2xl mb-6 border-2 border-emerald-300/20">
           <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
           </svg>
         </div>
       </div>

       {/* App Name with Enhanced Typography */}
       <h1 className="text-6xl md:text-7xl font-extrabold mb-6 animate-fade-in">
         <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
           Chatter
         </span>
         <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
           Hub
         </span>
       </h1>

       {/* Enhanced Subtitle */}
       <p className="text-xl md:text-2xl text-emerald-100/80 mb-12 max-w-2xl leading-relaxed animate-fade-in-delay font-light">
         Connect, chat, and create memories with friends in real-time. 
         <br className="hidden md:block" />
         <span className="text-teal-300">Experience conversations like never before.</span>
       </p>

       {/* Enhanced Chat Animation */}
       <div className="relative w-80 md:w-96 h-48 mb-12 animate-fade-in-delay">
         {/* First Message */}
         <div className="absolute top-0 left-0 bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 rounded-2xl shadow-2xl animate-slide-in-left border border-emerald-300/20 backdrop-blur-sm">
           <div className="flex items-center space-x-2">
             <span>Hey there! 👋</span>
             <div className="flex space-x-1">
               <div className="w-1 h-1 bg-emerald-200 rounded-full animate-ping"></div>
               <div className="w-1 h-1 bg-emerald-200 rounded-full animate-ping delay-100"></div>
               <div className="w-1 h-1 bg-emerald-200 rounded-full animate-ping delay-200"></div>
             </div>
           </div>
         </div>
         
         {/* Second Message */}
         <div className="absolute top-14 right-0 bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 rounded-2xl shadow-2xl animate-slide-in-right delay-500 border border-teal-300/20 backdrop-blur-sm">
           <span>Welcome to ChatterHub! 💬✨</span>
         </div>
         
         {/* Third Message */}
         <div className="absolute bottom-8 left-4 bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3 rounded-2xl shadow-2xl animate-slide-in-left delay-1000 border border-cyan-300/20 backdrop-blur-sm">
           <span>Ready to start chatting? 🚀</span>
         </div>
         
         {/* Floating Hearts */}
         <div className="absolute top-12 right-12 text-pink-300 animate-bounce delay-700">❤️</div>
         <div className="absolute bottom-16 left-16 text-yellow-300 animate-bounce delay-1200">⭐</div>
       </div>

       {/* Enhanced Buttons */}
       <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
         <Link
           to="/login"
           className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 border border-emerald-300/20 backdrop-blur-sm overflow-hidden"
         >
           {/* Button Shimmer Effect */}
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
           <span className="relative z-10 text-lg">Sign In</span>
         </Link>
         
         <Link
           to="/register"
           className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 rounded-xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-teal-500/25 transform hover:scale-105 border border-teal-300/20 backdrop-blur-sm overflow-hidden"
         >
           {/* Button Shimmer Effect */}
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
           <span className="relative z-10 text-lg">Get Started</span>
         </Link>
       </div>

       {/* Feature Highlights */}
       <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl animate-fade-in-delay-3">
         <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
           <div className="text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
             <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
             </svg>
           </div>
           <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
           <p className="text-emerald-200/60 text-sm">Experience real-time messaging with zero delays</p>
         </div>
         
         <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
           <div className="text-teal-400 mb-3 group-hover:scale-110 transition-transform">
             <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
             </svg>
           </div>
           <h3 className="text-white font-semibold mb-2">Secure & Private</h3>
           <p className="text-teal-200/60 text-sm">Your conversations are protected with end-to-end encryption</p>
         </div>
         
         <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
           <div className="text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
             <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
             </svg>
           </div>
           <h3 className="text-white font-semibold mb-2">Connect Anyone</h3>
           <p className="text-cyan-200/60 text-sm">Chat with friends, family, and meet new people worldwide</p>
         </div>
       </div>
     </div>
   </div>
 );
};