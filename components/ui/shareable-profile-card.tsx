'use client';

import { Trophy, Target, Award } from "lucide-react";

interface ShareableProfileCardProps {
    name: string;
    username: string;
    image?: string | null;
    totalSolved: number;
    campusRank: number;
    leetcodeRank: number;
    gfgRank: string;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    gfgSolved: number;
    gfgScore: number;
    badges?: Array<{
        name: string;
        stars: string;
    }>;
}

export function ShareableProfileCard({
    name,
    username,
    totalSolved,
    campusRank,
    leetcodeRank,
    gfgRank,
    easySolved,
    mediumSolved,
    hardSolved,
    gfgSolved,
    gfgScore,
    badges
}: ShareableProfileCardProps) {
    return (
        <div style={{ width: '800px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 4px #cccccc', padding: '24px' }}>
            {/* Title */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '40px', fontWeight: 'bold', color: '#1976d2', marginBottom: '8px' }}>Campus Rank</h1>
                <p style={{ fontSize: '20px', color: '#666666', marginBottom: '4px' }}>College Coding Leaderboard</p>
            </div>

            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#000000' }}>{name}</h2>
                <p style={{ color: '#666666' }}>@{username}</p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
                <div style={{ backgroundColor: '#e3f2fd', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                    <p style={{ fontSize: '14px', color: '#666666' }}>Total Solved</p>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>{totalSolved}</p>
                </div>
                <div style={{ backgroundColor: '#f3e5f5', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                    <p style={{ fontSize: '14px', color: '#666666' }}>Campus Rank</p>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#7b1fa2' }}>#{campusRank > 0 ? campusRank : 'N/A'}</p>
                </div>
                <div style={{ backgroundColor: '#ffebee', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                    <p style={{ fontSize: '14px', color: '#666666' }}>LeetCode Rank</p>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#d32f2f' }}>#{leetcodeRank}</p>
                </div>
                <div style={{ backgroundColor: '#fff3e0', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                    <p style={{ fontSize: '14px', color: '#666666' }}>GFG Institute Rank</p>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>#{gfgRank}</p>
                </div>
            </div>

            {/* LeetCode Progress */}
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#000000', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Target style={{ width: '20px', height: '20px', color: '#ff9800' }} />
                    LeetCode Progress
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    <div style={{ backgroundColor: '#e8f5e9', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                        <p style={{ fontSize: '14px', color: '#666666' }}>Easy</p>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2e7d32' }}>{easySolved}</p>
                    </div>
                    <div style={{ backgroundColor: '#fff3e0', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                        <p style={{ fontSize: '14px', color: '#666666' }}>Medium</p>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>{mediumSolved}</p>
                    </div>
                    <div style={{ backgroundColor: '#ffebee', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                        <p style={{ fontSize: '14px', color: '#666666' }}>Hard</p>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#d32f2f' }}>{hardSolved}</p>
                    </div>
                </div>
            </div>

            {/* GFG Stats */}
            <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#000000', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Award style={{ width: '20px', height: '20px', color: '#7b1fa2' }} />
                    GeeksforGeeks Progress
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    <div style={{ backgroundColor: '#f3e5f5', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                        <p style={{ fontSize: '14px', color: '#666666' }}>Problems Solved</p>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#7b1fa2' }}>{gfgSolved}</p>
                    </div>
                    <div style={{ backgroundColor: '#f3e5f5', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                        <p style={{ fontSize: '14px', color: '#666666' }}>Coding Score</p>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#7b1fa2' }}>{gfgScore}</p>
                    </div>
                </div>
            </div>

            {/* HackerRank Badges */}
            {badges && badges.length > 0 && (
                <div>
                    <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#000000', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Trophy style={{ width: '20px', height: '20px', color: '#2e7d32' }} />
                        HackerRank Badges
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
                        {badges.slice(0, 5).map((badge, idx) => (
                            <div key={idx} style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏆</div>
                                <p style={{ fontSize: '14px', fontWeight: '500', color: '#000000', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {badge.name}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '8px' }}>
                                    {[...Array(parseInt(badge.stars))].map((_, i) => (
                                        <span key={i} style={{ color: '#ffd700' }}>★</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
} 