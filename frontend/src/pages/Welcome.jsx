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
   <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 relative overflow-hidden flex flex-col items-center justify-center text-white px-6">
     {/* Modern Animated Background Elements */}
     <div className="absolute inset-0">
       {/* Glassmorphism Orbs */}
       <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
       <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
       <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
       
       {/* Chat Bubble Shapes */}
       <div className="absolute top-24 right-32 w-8 h-8 bg-blue-400/30 rounded-full animate-bounce delay-500"></div>
       <div className="absolute top-40 right-20 w-12 h-8 bg-purple-400/30 rounded-full animate-bounce delay-700"></div>
       <div className="absolute bottom-40 left-24 w-10 h-6 bg-pink-400/30 rounded-full animate-bounce delay-1200"></div>
       
       {/* Floating Message Icons */}
       <div className="absolute top-1/3 left-12 animate-float">
         <div className="w-16 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl rounded-bl-sm border border-blue-300/20 flex items-center justify-center">
           <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
         </div>
       </div>
       
       <div className="absolute bottom-1/3 right-16 animate-float delay-1000">
         <div className="w-20 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl rounded-br-sm border border-purple-300/20 flex items-center justify-center">
           <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
         </div>
       </div>
       
       {/* Grid Pattern Overlay */}
       <div className="absolute inset-0 opacity-5">
         <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
           {Array.from({ length: 400 }, (_, i) => (
             <div key={i} className="border border-blue-300/20"></div>
           ))}
         </div>
       </div>
       
       {/* Modern Gradient Overlay */}
       <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/60"></div>
     </div>

     <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl mx-auto text-center">
       {/* Modern Chat Icon Logo */}
       <div className="relative mb-12 mt-10">
         <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-40 animate-pulse scale-110"></div>
         <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-slate-600/30 group hover:scale-105 transition-all duration-500">
           {/* Chat Bubble Stack */}
           <div className="relative w-20 h-20">
             {/* Back bubble */}
             <div className="absolute top-2 right-0 w-14 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl rounded-tr-sm opacity-80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"></div>
             {/* Front bubble */}
             <div className="absolute top-0 left-0 w-16 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl rounded-bl-sm shadow-xl group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform duration-300 flex items-center justify-center">
               <div className="flex space-x-1">
                 <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
                 <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-100"></div>
                 <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-200"></div>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Modern App Name with Glass Effect */}
       <h1 className="text-7xl md:text-8xl font-black mb-8 animate-fade-in relative">
         <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent blur-sm scale-110 opacity-50"></div>
         <span className="relative bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
           NexTalk
         </span>
       </h1>

       {/* Enhanced Modern Subtitle */}
       <p className="text-xl md:text-2xl text-slate-300/90 mb-16 max-w-3xl leading-relaxed animate-fade-in-delay font-medium">
         The next generation of instant messaging
         <br className="hidden md:block" />
         <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
           Connect instantly, chat seamlessly, live authentically
         </span>
       </p>

       {/* Modern Chat Preview with Glassmorphism */}
       <div className="relative w-full max-w-md h-80 mb-16 animate-fade-in-delay">
         {/* Phone Frame */}
         <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-2xl rounded-[3rem] border border-slate-600/30 shadow-2xl p-6">
           {/* Status Bar */}
           <div className="flex justify-between items-center mb-6 text-xs text-slate-400">
             <span>9:41</span>
             <div className="flex space-x-1">
               <div className="w-4 h-2 bg-slate-600 rounded-sm"></div>
               <div className="w-6 h-2 bg-slate-600 rounded-sm"></div>
               <div className="w-6 h-2 bg-green-500 rounded-sm"></div>
             </div>
           </div>
           
           {/* Chat Header */}
           <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-600/30">
             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
               <span className="text-sm font-bold">🚀</span>
             </div>
             <div>
               <div className="text-white font-semibold">NexTalk Team</div>
               <div className="text-xs text-green-400 flex items-center">
                 <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                 Online now
               </div>
             </div>
           </div>
           
           {/* Messages */}
           <div className="space-y-4">
             {/* Incoming Message */}
             <div className="flex items-start space-x-2 animate-slide-in-left">
               <div className="bg-gradient-to-br from-slate-700/80 to-slate-800/80 backdrop-blur-xl px-4 py-3 rounded-2xl rounded-bl-md border border-slate-600/30 max-w-xs">
                 <p className="text-sm text-white">Welcome to the future of chat! 🎉</p>
               </div>
             </div>
             
             {/* Outgoing Message */}
             <div className="flex justify-end animate-slide-in-right delay-700">
               <div className="bg-gradient-to-br from-blue-500 to-purple-600 px-4 py-3 rounded-2xl rounded-br-md shadow-lg max-w-xs">
                 <p className="text-sm text-white">This looks amazing! ✨</p>
               </div>
             </div>
             
             {/* Incoming Message */}
             <div className="flex items-start space-x-2 animate-slide-in-left delay-1400">
               <div className="bg-gradient-to-br from-slate-700/80 to-slate-800/80 backdrop-blur-xl px-4 py-3 rounded-2xl rounded-bl-md border border-slate-600/30 max-w-xs">
                 <p className="text-sm text-white">Ready to start chatting? 💬</p>
               </div>
             </div>
             
             {/* Typing Indicator */}
             <div className="flex items-center space-x-2 animate-fade-in delay-2100">
               <div className="bg-gradient-to-br from-slate-700/80 to-slate-800/80 backdrop-blur-xl px-4 py-3 rounded-2xl rounded-bl-md border border-slate-600/30">
                 <div className="flex space-x-1">
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                 </div>
               </div>
             </div>
           </div>
         </div>
         
         {/* Floating Action Indicators */}
         <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-500">
           <span className="text-xs">📱</span>
         </div>
         <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-1500">
           <span className="text-xs">💬</span>
         </div>
       </div>

       {/* Modern Glassmorphism Buttons */}
       <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-delay-2 mb-16">
         <Link
           to="/login"
           className="group relative px-10 py-5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-2xl hover:from-blue-600/30 hover:to-purple-600/30 rounded-2xl font-bold transition-all duration-500 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 border border-blue-400/20 overflow-hidden"
         >
           <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
           <span className="relative z-10 text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300">
             Sign In
           </span>
         </Link>
         
         <Link
           to="/register"
           className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl font-bold transition-all duration-500 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 border border-purple-400/30 overflow-hidden"
         >
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
           <span className="relative z-10 text-xl text-white group-hover:text-white transition-colors duration-300">
             Get Started
           </span>
         </Link>
       </div>

       {/* Modern Feature Cards with Enhanced Glassmorphism */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl animate-fade-in-delay-3">
         <div className="group bg-slate-800/30 backdrop-blur-2xl rounded-3xl p-8 border border-slate-600/30 hover:bg-slate-700/40 hover:border-blue-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
           <div className="text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
             <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-blue-400/20">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
               </svg>
             </div>
           </div>
           <h3 className="text-white font-bold text-xl mb-4">Lightning Fast</h3>
           <p className="text-slate-400 leading-relaxed">Experience real-time messaging with zero delays and instant delivery</p>
         </div>
         
         <div className="group bg-slate-800/30 backdrop-blur-2xl rounded-3xl p-8 border border-slate-600/30 hover:bg-slate-700/40 hover:border-purple-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
           <div className="text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
             <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-purple-400/20">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
               </svg>
             </div>
           </div>
           <h3 className="text-white font-bold text-xl mb-4">Secure & Private</h3>
           <p className="text-slate-400 leading-relaxed">Your conversations are protected with military-grade encryption</p>
         </div>
         
         <div className="group bg-slate-800/30 backdrop-blur-2xl rounded-3xl p-8 border border-slate-600/30 hover:bg-slate-700/40 hover:border-pink-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/10">
           <div className="text-pink-400 mb-6 group-hover:scale-110 transition-transform duration-300">
             <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-pink-400/20">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
               </svg>
             </div>
           </div>
           <h3 className="text-white font-bold text-xl mb-4">Connect Anyone</h3>
           <p className="text-slate-400 leading-relaxed">Chat with friends, family, and meet new people worldwide</p>
         </div>
       </div>
     </div>

     {/* Modern Glassmorphism Footer */}
     <footer className="relative z-10 w-full mt-24 py-12 bg-slate-900/40 backdrop-blur-2xl border-t border-slate-600/30 flex flex-col items-center text-center">
       <div className="mb-6 flex items-center justify-center gap-3">
         <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
           <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
           </svg>
         </div>
         <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
           NexTalk
         </span>
       </div>
       <p className="text-slate-400 mb-6 text-lg">
         Made with <span className="text-pink-500 animate-pulse">♥</span> for authentic connections.
       </p>
       <div className="flex gap-6 justify-center mb-6">
         <a 
           href="https://github.com/Prateek-02/ChatterHub" 
           target="_blank" 
           rel="noopener noreferrer" 
           className="text-slate-400 hover:text-blue-400 transition-colors duration-300 font-medium hover:underline decoration-blue-400/50"
         >
           GitHub
         </a>
       </div>
       <span className="text-sm text-slate-500">
         &copy; {new Date().getFullYear()} NexTalk. All rights reserved.
       </span>
     </footer>
   </div>
 );
};