import Image from 'next/image';

function PrivacyPolicy() {
  return (
    <>
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-center gap-4 text-center mb-12">
        <Image src="/logo.jpg" alt="Campus Rank" className='w-16 h-16 rounded-full' width={100} height={100} />
        <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">Privacy Policy</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-white">Effective Date: 31st March 2025</p>
      </div>

      <div className="prose prose-indigo max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Introduction</h2>
          <p className="text-gray-600 dark:text-white">
            Welcome to <span className="font-semibold dark:text-white">Campus Rank</span>! Your privacy is important to us. 
            This Privacy Policy explains how we collect, use, and protect your personal data when you use our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Information We Collect</h2>
          <p className="text-gray-600 mb-2 dark:text-white">We collect the following types of data:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 dark:text-white">
            <li><span className="font-semibold dark:text-white">Personal Information</span>: Name, email address, and username when you sign up.</li>
            <li><span className="font-semibold dark:text-white  ">Coding Profile Data</span>: Publicly available coding statistics from LeetCode and HackerRank.</li>
            <li><span className="font-semibold dark:text-white">Usage Data</span>: IP address, device information, and interaction history to improve our platform.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 dark:text-white">
            <li>Display leaderboards and user profiles.</li>
            <li>Provide personalized user experience.</li>
            <li>Improve platform performance and security.</li>
            <li>Send important updates or notifications.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Data Sharing & Security</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 dark:text-white">
            <li>We <span className="font-bold dark:text-white">do not sell</span> your data to third parties.</li>
            <li>Your data is stored securely using industry-standard encryption.</li>
            <li>We may share data with service providers for analytics and platform improvement.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Third-Party Integrations</h2>
          <p className="text-gray-600 dark:text-white">
            We fetch coding statistics from <span className="font-semibold dark:text-white">LeetCode</span> and <span className="font-semibold dark:text-white">HackerRank</span>. 
            Please review their respective privacy policies to understand how they manage your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">6. Your Rights & Choices</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 dark:text-white">
            <li><span className="font-semibold dark:text-white">Access & Correction</span>: You can update or delete your account information.</li>
            <li><span className="font-semibold dark:text-white">Opt-Out</span>: You can unsubscribe from notifications at any time.</li>
            <li><span className="font-semibold dark:text-white">Data Deletion</span>: Request account deletion by contacting us at priynshuchouhn@gmail.com.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">7. Cookies & Tracking</h2>
          <p className="text-gray-600 dark:text-white">
            We use cookies to enhance your experience. You can manage your cookie preferences in your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">8. Changes to This Policy</h2>
          <p className="text-gray-600 dark:text-white">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">9. Contact Us</h2>
          <p className="text-gray-600 mb-4 dark:text-white">
            If you have any questions, contact us at <span className="font-semibold dark:text-white">priynshuchouhn@gmail.com</span>.
          </p>
          <p className="text-gray-600 italic dark:text-white">
            By using Campus Rank, you agree to this Privacy Policy.
          </p>
        </section>
      </div>
    </div>
    </>
  );
}

export default PrivacyPolicy;