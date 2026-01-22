module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/roast/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

// 'use client';
// import { useState, useEffect } from 'react';
// import { Upload, X, BrainCircuit, BotMessageSquare, BadgeCheck, Clapperboard, TextSelect, FileText } from 'lucide-react';
// import { useDropzone } from 'react-dropzone';
// import { PulseLoader } from 'react-spinners';
// import { motion, AnimatePresence } from 'framer-motion';
// const MOCK_ROAST_DATA = {
//   "Banner / Cover Photo": "Is that a stock photo or did you actually go outside? Shocking. It’s blander than unseasoned chicken. At least use a gradient.",
//   "Profile Picture": "You look like you're trying to solve a complex math problem, but the problem is your camera's focus. Please, smile like you don't have three overdue bills.",
//   "Bio / Headline": "‘Aspiring disruptor’? You’re disrupting my peace with that font. Your headline has more buzzwords than a beehive at a tech conference. It's impressively meaningless.",
//   "About Section": "Wow, a whole section dedicated to you. It reads like the terms and conditions of a software update nobody asked for. I fell asleep twice.",
//   "Featured / Recent Activity": "Congrats on liking a post from 2019. Your 'featured' section is a digital graveyard. It’s less 'featured' and more 'forgotten'.",
// };
// const loadingTexts = [
//   "Analyzing cringe levels...",
//   "Judging your font choices...",
//   "Preparing insults...",
//   "Calibrating sarcasm...",
//   "Finding the perfect meme to describe your profile...",
//   "Definitely not stealing your data...",
// ];
// type RoastSection = keyof typeof MOCK_ROAST_DATA;
// const iconMap: { [key in RoastSection]: React.ElementType } = {
//   "Banner / Cover Photo": Clapperboard,
//   "Profile Picture": BadgeCheck,
//   "Bio / Headline": TextSelect,
//   "About Section": FileText,
//   "Featured / Recent Activity": BotMessageSquare,
// };
// export default function RoasterPage() {
//   const [image, setImage] = useState<string | null>(null);
//   const [roastComplete, setRoastComplete] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadingText, setLoadingText] = useState(loadingTexts[0]);
//   useEffect(() => {
//     if (isLoading) {
//       const interval = setInterval(() => {
//         setLoadingText(prev => {
//           const currentIndex = loadingTexts.indexOf(prev);
//           return loadingTexts[(currentIndex + 1) % loadingTexts.length];
//         });
//       }, 2000);
//       return () => clearInterval(interval);
//     }
//   }, [isLoading]);
//   const onDrop = (acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImage(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
//     multiple: false,
//   });
//   const handleRoast = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       setRoastComplete(true);
//     }, 8000);
//   };
//   const handleReset = () => {
//     setImage(null);
//     setRoastComplete(false);
//     setIsLoading(false);
//   };
//   const cardContainerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,
//       },
//     },
//   };
//   const cardVariants = {
//     hidden: { opacity: 0, x: 50 },
//     visible: { opacity: 1, x: 0 },
//   };
//   return (
//     <div className="bg-background min-h-screen text-white p-4 sm:p-8 overflow-hidden">
//       <div className="max-w-7xl mx-auto">
//         <header className="flex justify-between items-center mb-12">
//             <h1 className="text-3xl font-bold text-primary tracking-tighter">RoastMyProfile.ai</h1>
//             <AnimatePresence>
//               {(image || roastComplete) && (
//                  <motion.button
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   onClick={handleReset}
//                   className="bg-secondary hover:bg-opacity-80 text-white font-semibold py-2 px-4 rounded-lg shadow-[0_0_10px_theme(colors.secondary)] transition-all duration-300 ease-in-out flex items-center"
//                  >
//                    <X className="mr-2 h-5 w-5" />
//                    Start Over
//                  </motion.button>
//               )}
//             </AnimatePresence>
//         </header>
//         <AnimatePresence mode="wait">
//           {!roastComplete ? (
//             <motion.div
//               key="input"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="text-center"
//             >
//               {image ? (
//                 <div className="flex flex-col items-center">
//                   <div className="relative w-full max-w-2xl mx-auto border-2 border-dashed border-border rounded-lg p-4 mb-8">
//                       <img src={image} alt="Profile screenshot preview" className="max-h-[60vh] rounded-lg mx-auto" />
//                   </div>
//                   <motion.button
//                     onClick={handleRoast}
//                     disabled={isLoading}
//                     className="bg-primary text-white font-bold text-xl px-12 py-4 rounded-lg shadow-[0_0_20px_theme(colors.primary)] transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-700 disabled:scale-100 disabled:cursor-not-allowed"
//                     whileHover={{ scale: isLoading ? 1 : 1.05 }}
//                     whileTap={{ scale: isLoading ? 1 : 0.95 }}
//                   >
//                     {isLoading ? (
//                       <div className="flex flex-col items-center justify-center w-48 h-12">
//                         <PulseLoader color="white" size={10} />
//                         <span className="mt-4 text-sm font-normal">{loadingText}</span>
//                       </div>
//                     ) : (
//                       <span className="w-48 h-12 flex items-center justify-center">ROAST ME</span>
//                     )}
//                   </motion.button>
//                 </div>
//               ) : (
//                 <div
//                   {...getRootProps()}
//                   className={`border-4 border-dashed border-border rounded-xl p-16 text-center cursor-pointer transition-colors duration-300 ${isDragActive ? 'border-primary bg-primary/10' : 'hover:border-primary/70'}`}
//                 >
//                   <input {...getInputProps()} />
//                   <div className="flex flex-col items-center text-gray-400">
//                     <Upload className="w-16 h-16 mb-4 text-gray-500" />
//                     <h2 className="text-2xl font-bold mb-2">Drop your tragic screenshot here</h2>
//                     <p>or click to select a file (PNG/JPG only)</p>
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           ) : (
//             <motion.div
//               key="results"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="relative"
//             >
//               <div className="lg:absolute lg:left-0 lg:top-0 lg:w-1/2 lg:h-full flex items-center justify-center">
//                   <motion.img 
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.2, duration: 0.5 }}
//                     src={image!} alt="Uploaded screenshot" 
//                     className="rounded-xl shadow-2xl max-h-[80vh] opacity-30 lg:opacity-50"
//                   />
//               </div>
//               <motion.div 
//                 variants={cardContainerVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className="relative lg:w-1/2 lg:ml-auto space-y-4"
//               >
//                 <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><BrainCircuit className="mr-3"/> The AI's Verdict</h2>
//                 {Object.entries(MOCK_ROAST_DATA).map(([key, value]) => {
//                    const Icon = iconMap[key as RoastSection] || BotMessageSquare;
//                    return (
//                     <motion.div 
//                       key={key}
//                       variants={cardVariants}
//                       whileHover={{ scale: 1.03, rotate: 1 }}
//                       className="bg-gray-900/50 border border-border rounded-lg p-4 shadow-lg backdrop-blur-sm"
//                       style={{ transformOrigin: 'bottom left' }}
//                     >
//                       <h3 className="text-xl font-semibold text-secondary flex items-center mb-2"><Icon className="mr-2 h-5 w-5"/>{key}</h3>
//                       <p className="text-gray-300">{value}</p>
//                     </motion.div>
//                    )
//                 })}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }
}),
"[project]/app/roast/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/roast/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1fd00d4d._.js.map