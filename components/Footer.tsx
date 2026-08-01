import Link from 'next/link'
import React from 'react'
import { FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa6'

const Footer = () => {
    return (
        <footer className="w-full bg-[#050505] border-t border-white/10 py-12 px-6 sm:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400 justify-center sm:justify-start border-b border-white/5 pb-6">
                    <span className="text-gray-500 font-semibold">Products:</span>
                    <a href="https://itskrishna.live" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Portfolio</a>
                    <a href="https://tavyn.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Tavyn AI</a>
                    <a href="https://market.itskrishna.live" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Market</a>
                    <a href="https://sellscript.itskrishna.live" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">SellScript</a>
                    <a href="https://auto-x-omega.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">AutoX</a>
                    <a href="https://newsletter.itskrishna.live" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Newsletter</a>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
                    {/* Left Side */}
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                        <img src="/linkRoast_logo.svg" alt="LinkRoast Logo" className="h-6 w-6 object-contain" />
                        <h2 className="text-2xl font-bold text-[#ff2f00] tracking-tight">LinkRoast</h2>
                    </div>
                    <p className="text-gray-500 text-xs sm:text-sm font-medium">
                        Copyright © 2026 All rev: LinkRoast
                    </p>
                </div>

                {/* Right Side */}
                <div className="flex flex-col items-center md:items-end gap-4">
                    <div className="flex gap-6 items-center">
                        <a href="mailto:krishnay812345@gmail.com" target="_blank" rel="noopener noreferrer">
                            <FaEnvelope className="size-5 text-gray-300 hover:text-white transition-colors cursor-pointer" />
                        </a>
                        <a href="https://x.com/kr812345" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="size-5 text-gray-300 hover:text-white transition-colors cursor-pointer" />
                        </a>
                        <a href="https://linkedin.com/in/krishna-yadav-kr812345" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="size-5 text-gray-300 hover:text-white transition-colors cursor-pointer" />
                        </a>
                    </div>
                    <div className="flex gap-6 text-xs sm:text-sm font-medium">
                        <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
                        <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
                        <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
                    </div>
                </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer