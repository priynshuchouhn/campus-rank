import React from 'react';
import Image from 'next/image';

function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center mb-12">
        <Image src="/logo.jpg" alt="Campus Rank" className='w-16 h-16 rounded-full' width={100} height={100} />
        <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">Terms of Service</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-white">Effective Date: 31st March 2025</p>
      </div>

      <div className="prose prose-indigo max-w-none dark:prose-invert">
        <p className="text-gray-600 dark:text-white mb-8">
          Welcome to <span className="font-semibold dark:text-white">Campus Rank</span>! These Terms of Service (&quot;Terms&quot;) govern your use of our website and services. 
          By accessing or using <span className="font-semibold dark:text-white">Campus Rank</span>, you agree to comply with these Terms. 
          If you do not agree, please do not use our platform.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Overview</h2>
          <p className="text-gray-600 dark:text-white">
            Campus Rank is a platform that tracks students&apos; coding progress from LeetCode and HackerRank, 
            providing a leaderboard and profile-based ranking system.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Eligibility</h2>
          <p className="text-gray-600 dark:text-white mb-4">To use <span className="font-semibold dark:text-white">Campus Rank</span>, you must:</p>
          <ul className="space-y-2 text-gray-600 dark:text-white">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              Be at least 13 years old (or the legal age in your country).
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              Agree to these Terms and our Privacy Policy.
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              Use the platform only for lawful purposes.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Account Registration</h2>
          <ul className="list-disc pl-6 text-gray-600 dark:text-white space-y-2">
            <li>You must provide accurate and complete information during sign-up.</li>
            <li>You are responsible for maintaining the security of your account.</li>
            <li>You must not share your login credentials with others.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. User Responsibilities</h2>
          <p className="text-gray-600 dark:text-white mb-4">By using <span className="font-semibold dark:text-white">Campus Rank</span>, you agree that you will not:</p>
          <ul className="space-y-2 text-gray-600 dark:text-white">
            <li className="flex items-center">
              <span className="text-red-500 mr-2">❌</span>
              Use false information or impersonate others.
            </li>
            <li className="flex items-center">
              <span className="text-red-500 mr-2">❌</span>
              Attempt to hack, exploit, or disrupt the platform.
            </li>
            <li className="flex items-center">
              <span className="text-red-500 mr-2">❌</span>
              Violate any laws, including data protection and intellectual property laws.
            </li>
            <li className="flex items-center">
              <span className="text-red-500 mr-2">❌</span>
              Use automated bots to extract data from the platform.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Use of LeetCode & HackerRank Data</h2>
          <ul className="list-disc pl-6 text-gray-600 dark:text-white space-y-2">
            <li>Campus Rank fetches public data from LeetCode and HackerRank based on the usernames you provide.</li>
            <li>We do <span className="font-bold">not</span> store your passwords or private coding data.</li>
            <li>We are <span className="font-bold">not affiliated with</span> LeetCode or HackerRank.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">6. Intellectual Property</h2>
          <ul className="list-disc pl-6 text-gray-600 dark:text-white space-y-2">
            <li><span className="font-semibold dark:text-white">Campus Rank</span> and all associated content (logos, design, and software) are <span className="font-bold dark:text-white">owned by us</span>.</li>
            <li>You may not copy, modify, distribute, or reverse-engineer any part of our platform without permission.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">7. Termination of Services</h2>
          <p className="text-gray-600 dark:text-white mb-4">We reserve the right to:</p>
          <ul className="space-y-2 text-gray-600 dark:text-white">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              Suspend or delete accounts that violate our Terms.
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              Modify or discontinue any part of our services at any time.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">8. Disclaimer of Warranties</h2>
          <ul className="list-disc pl-6 text-gray-600 dark:text-white space-y-2">
            <li><span className="font-bold">Campus Rank is provided &quot;as is&quot; and &quot;as available.&quot;</span></li>
            <li>We <span className="font-bold">do not guarantee</span> that the platform will be error-free or always available.</li>
            <li>We <span className="font-bold">are not responsible</span> for inaccuracies in your LeetCode or HackerRank data.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">9. Limitation of Liability</h2>
          <ul className="list-disc pl-6 text-gray-600 dark:text-white space-y-2">
            <li>We are <span className="font-bold">not liable</span> for any direct, indirect, or incidental damages arising from your use of <span className="font-semibold dark:text-white">Campus Rank</span>.</li>
            <li>If you encounter issues with your LeetCode or HackerRank data, you should contact those platforms directly.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">10. Changes to These Terms</h2>
          <ul className="list-disc pl-6 text-gray-600 dark:text-white space-y-2">
            <li>We may update these Terms from time to time.</li>
            <li>Continued use of <span className="font-semibold dark:text-white">Campus Rank</span> after changes means you accept the new Terms.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">11. Governing Law</h2>
          <p className="text-gray-600 dark:text-white">
            These Terms are governed by the laws of the United States. Any disputes will be handled in the appropriate jurisdiction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">12. Contact Us</h2>
          <p className="text-gray-600 dark:text-white">
            For questions or concerns regarding these Terms, contact us at:
            <br />
            <span className="font-semibold">📩 priynshuchouhn@gmail.com</span>
          </p>
        </section>
      </div>
    </div>
  );
}

export default TermsOfService;