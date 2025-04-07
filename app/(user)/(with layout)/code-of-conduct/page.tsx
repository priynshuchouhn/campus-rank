import React from 'react';
import { Shield } from 'lucide-react';

function CodeOfConduct() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Shield className="h-12 w-12 text-indigo-600 mx-auto" />
        <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">Code of Conduct</h1>
        <p className="mt-2 text-lg text-gray-600">Guidelines for our community</p>
      </div>

      <div className="prose prose-indigo max-w-none">
        <p className="text-gray-600 mb-8">
          At <span className="font-semibold">Campus Rank</span>, we are committed to maintaining a 
          <span className="font-semibold"> respectful, fair, and inclusive</span> platform for all users. 
          This Code of Conduct outlines the expectations for all participants to ensure a 
          <span className="font-semibold"> positive and productive</span> environment.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">1. Respect & Integrity</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Treat all users with <span className="font-semibold">respect and professionalism</span>.</li>
            <li>No harassment, hate speech, or personal attacks.</li>
            <li>Avoid any form of discrimination based on gender, race, religion, or background.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">2. Fair Play & Honesty</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Do not manipulate rankings, submit false data, or engage in fraudulent activities.</li>
            <li>Respect the integrity of the platform and other users&apos; progress.</li>
            <li>Any attempt to <span className="font-semibold">misuse, exploit, or hack</span> Campus Rank is strictly prohibited.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">3. Responsible Communication</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Keep discussions <span className="font-semibold">constructive and professional</span>.</li>
            <li>Do not post spam, self-promotional content, or misleading information.</li>
            <li>Maintain a <span className="font-semibold">helpful and encouraging</span> environment for all users.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">4. Data Privacy & Security</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Do not share or misuse other users&apos; personal data.</li>
            <li>Only link your own <span className="font-semibold">LeetCode & HackerRank</span> profiles.</li>
            <li>If you notice a security issue, report it instead of exploiting it.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">5. Compliance with Laws & Policies</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Follow all applicable laws, including those related to <span className="font-semibold">data protection and cybersecurity</span>.</li>
            <li>Adhere to Campus Rank&apos;s <span className="font-semibold">Privacy Policy</span> and <span className="font-semibold">Terms of Service</span>.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">6. Reporting Violations</h2>
          <p className="text-gray-600">
            If you witness any violation of this Code of Conduct, please report it to 
            <span className="font-semibold"> priynshuchouhn@gmail.com</span>. We will review all reports 
            confidentially and take appropriate action.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">7. Consequences of Violations</h2>
          <p className="text-gray-600 mb-4">Failure to follow this Code of Conduct may result in:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li><span className="font-semibold">Warnings or temporary suspension</span></li>
            <li><span className="font-semibold">Permanent account ban</span></li>
            <li><span className="font-semibold">Legal action in severe cases</span></li>
          </ul>
        </section>

        <div className="mt-12 p-6 bg-indigo-50 rounded-lg">
          <p className="text-gray-800 text-center mb-4">
            We believe that by following these guidelines, <span className="font-semibold">Campus Rank</span> will 
            remain a <span className="font-semibold">fair, motivating, and growth-driven</span> platform for all.
          </p>
          <p className="text-gray-800 text-center font-semibold">
            Let&apos;s build a community that encourages learning, competition, and success.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CodeOfConduct;