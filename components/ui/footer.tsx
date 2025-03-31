import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

function Footer() {
  return (
    <footer className="bg-gray-100 border-t dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
            <Image src="/logo.jpg" alt="Campus Rank" className='w-16 h-16 rounded-full' width={100} height={100} />
              <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">Campus Rank</span>
            </Link>
            <p className="text-gray-600 text-sm dark:text-white">
              Empowering students to showcase their coding skills and compete with peers within their campus.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-600 dark:text-white hover:text-gray-900">Leaderboard</Link></li>
              {/* <li><Link href="/challenges" className="text-gray-600 hover:text-gray-900">Challenges</Link></li>
              <li><Link href="/rankings" className="text-gray-600 hover:text-gray-900">University Rankings</Link></li> */}
              <li><Link href="/about-us" className="text-gray-600 dark:text-white hover:text-gray-900">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy-policy" className="text-gray-600 dark:text-white hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-gray-600 dark:text-white hover:text-gray-900">Terms of Service</Link></li>
              <li><Link href="/code-of-conduct" className="text-gray-600 dark:text-white hover:text-gray-900">Code of Conduct</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/priynshuchouhn" className="text-gray-600 dark:text-white hover:text-gray-900">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://twitter.com/priynshuchouhn" className="text-gray-600 dark:text-white hover:text-gray-900">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://linkedin.com/in/priynshuchouhn" className="text-gray-600 dark:text-white hover:text-gray-900">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 dark:text-white text-sm">
            © {new Date().getFullYear()} Campus Rank. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;