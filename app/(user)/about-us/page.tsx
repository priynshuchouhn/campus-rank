import React from 'react';
import { Rocket, Target, Code2, Users } from 'lucide-react';
import Image from 'next/image';

function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-center gap-4 text-center mb-12">
        <Image src="/logo.jpg" alt="Campus Rank" className='w-16 h-16 rounded-full' width={100} height={100} />
        <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">About Us</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-white">
          Welcome to <span className="font-semibold">Campus Rank</span> – a platform designed to track and showcase 
          students&apos; coding achievements on <span className="font-semibold">LeetCode and HackerRank</span>.
        </p>
      </div>

      <div className="space-y-16">
        <section>
          <div className="flex items-center mb-6">
            <Rocket className="h-8 w-8 text-indigo-600" />
            <h2 className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-4 dark:bg-gray-800">
            <p className="text-gray-600 dark:text-white">At <span className="font-semibold">Campus Rank</span>, we aim to:</p>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-600 dark:text-white">
                <span className="text-green-500 mr-3">✅</span>
                <span className="font-semibold dark:text-white">Motivate students</span> by providing a transparent leaderboard.
              </li>
              <li className="flex items-center text-gray-600 dark:text-white">
                <span className="text-green-500 mr-3">✅</span>
                <span className="font-semibold dark:text-white">Encourage coding practice</span> through friendly competition.
              </li>
              <li className="flex items-center text-gray-600 dark:text-white">
                <span className="text-green-500 mr-3">✅</span>
                <span className="font-semibold dark:text-white">Help recruiters and peers</span> identify top coding talent.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="flex items-center mb-6">
            <Target className="h-8 w-8 text-indigo-600" />
            <h2 className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">The Vision Behind Campus Rank</h2>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
            <p className="text-gray-600 dark:text-white leading-relaxed">
              This project was created by <span className="font-semibold dark:text-white">Priyanshu Chouhan</span>, 
              a passionate developer and tech enthusiast, to bridge the gap between 
              <span className="font-semibold dark:text-white"> coding practice and recognition</span>. Many students work hard 
              to solve coding problems daily, but their efforts often go unnoticed. 
              <span className="font-semibold"> Campus Rank ensures that every solved problem counts!</span>
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-center mb-6">
            <Code2 className="h-8 w-8 text-indigo-600" />
            <h2 className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">How It Works?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">1️⃣</span>
                <h3 className="font-semibold text-gray-900 dark:text-white">Sign up & Link Profiles</h3>
              </div>
              <p className="text-gray-600 dark:text-white">Connect your LeetCode & HackerRank accounts to get started.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">2️⃣</span>
                <h3 className="font-semibold text-gray-900 dark:text-white">Real-time Updates</h3>
              </div>
              <p className="text-gray-600 dark:text-white">Track your progress with live question solving statistics.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">3️⃣</span>
                <h3 className="font-semibold text-gray-900 dark:text-white">Compete & Climb</h3>
              </div>
              <p className="text-gray-600 dark:text-white">Challenge yourself and rise through the rankings.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">4️⃣</span>
                <h3 className="font-semibold text-gray-900 dark:text-white">Showcase Progress</h3>
              </div>
              <p className="text-gray-600 dark:text-white">Display your achievements to recruiters and mentors.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center mb-6">
            <Users className="h-8 w-8 text-indigo-600" />
            <h2 className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">Join the Community!</h2>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center dark:bg-gray-800">
            <p className="text-gray-600 dark:text-white mb-6">
              Whether you&apos;re a beginner or an expert, <span className="font-semibold">Campus Rank</span> is here to 
              <span className="font-semibold"> track, motivate, and push you to new heights</span> in competitive programming.
            </p>
            <p className="text-gray-600 dark:text-white font-semibold mb-2">🚀 Keep coding. Keep ranking.</p>
            <p className="text-gray-600 dark:text-white ">
              📩 Have questions? Reach out at <span className="font-semibold">priynshuchouhn@gmail.com</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;