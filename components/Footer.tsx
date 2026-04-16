import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa6'

const Footer = () => {
    return (
        <footer className="w-full bg-[#050505] border-t border-white/10 py-12 px-6 sm:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
                {/* Left Side */}
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-[#ff2f00] tracking-tight">LinkRoast</h2>
                    <p className="text-gray-500 text-xs sm:text-sm font-medium">
                        Copyright © 2022 All rev: LinkRoast
                    </p>
                </div>

                {/* Right Side */}
                <div className="flex flex-col items-center md:items-end gap-4">
                    <div className="flex gap-6 items-center">
                        <FaFacebook className="size-5 text-gray-300 hover:text-white transition-colors cursor-pointer" />
                        <FaTwitter className="size-5 text-gray-300 hover:text-white transition-colors cursor-pointer" />
                        <FaInstagram className="size-5 text-gray-300 hover:text-white transition-colors cursor-pointer" />
                    </div>
                    <div className="flex gap-6 text-xs sm:text-sm font-medium">
                        <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
                        <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
                        <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer