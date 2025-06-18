import React from 'react';

interface EmailTemplateProps {
    type: 'welcome' | 'leaderboard' | 'linkedin';
    data: {
        name?: string;
        rank?: number;
        score?: number;
        userCount?: number;
        problemSolved?:number;
        postTitle?: string;
        postUrl?: string;
        topUsers?: Array<{
            name: string;
            rank: number;
            score: number;
        }>;
    };
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({ type, data }) => {
    const templates = {
        welcome: (
            <table cellPadding="0" cellSpacing="0" style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>
                <tr>
                    <td style={{ padding: '32px' }}>
                        <table cellPadding="0" cellSpacing="0" width="100%">
                            <tr>
                                <td style={{ paddingBottom: '24px' }}>
                                    <table cellPadding="0" cellSpacing="0">
                                        <tr>
                                            <td style={{ paddingRight: '12px' }}>
                                                <span style={{ fontSize: '32px' }}>💻</span>
                                            </td>
                                            <td>
                                                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Welcome to Campus Rank!</h1>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p style={{ fontSize: '18px', color: '#374151', margin: '0 0 16px 0' }}>Dear {data.name},</p>
                                    <p style={{ color: '#4b5563', margin: '0 0 24px 0' }}>
                                        Welcome to Campus Rank - your ultimate platform for tracking and improving your coding journey! Get ready to compete, learn, and climb the ranks among fellow student developers.
                                    </p>
                                    <table cellPadding="0" cellSpacing="0" width="100%" style={{ margin: '24px 0' }}>
                                        <tr>
                                            <td width="50%" style={{ paddingRight: '8px' }}>
                                                <table cellPadding="0" cellSpacing="0" width="100%" style={{ backgroundColor: '#eef2ff', borderRadius: '8px' }}>
                                                    <tr>
                                                        <td style={{ padding: '16px' }}>
                                                            <table cellPadding="0" cellSpacing="0">
                                                                <tr>
                                                                    <td style={{ paddingRight: '8px' }}>
                                                                        <span style={{ fontSize: '20px' }}>🎯</span>
                                                                    </td>
                                                                    <td>
                                                                        <h3 style={{ fontWeight: '600', color: '#312e81', margin: 0 }}>LeetCode Progress</h3>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <p style={{ color: '#4338ca', fontSize: '14px', margin: '8px 0 0 0' }}>Track your problem-solving progress and compete with peers</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td width="50%" style={{ paddingLeft: '8px' }}>
                                                <table cellPadding="0" cellSpacing="0" width="100%" style={{ backgroundColor: '#f5f3ff', borderRadius: '8px' }}>
                                                    <tr>
                                                        <td style={{ padding: '16px' }}>
                                                            <table cellPadding="0" cellSpacing="0">
                                                                <tr>
                                                                    <td style={{ paddingRight: '8px' }}>
                                                                        <span style={{ fontSize: '20px' }}>🚀</span>
                                                                    </td>
                                                                    <td>
                                                                        <h3 style={{ fontWeight: '600', color: '#581c87', margin: 0 }}>HackerRank Skills</h3>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <p style={{ color: '#6d28d9', fontSize: '14px', margin: '8px 0 0 0' }}>Master coding challenges and earn skill certificates</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <table cellPadding="0" cellSpacing="0" width="100%" style={{ background: 'linear-gradient(to right, #eef2ff, #f5f3ff)', borderRadius: '8px', marginBottom: '24px' }}>
                                        <tr>
                                            <td style={{ padding: '24px' }}>
                                                <h2 style={{ fontWeight: '600', color: '#1f2937', margin: '0 0 12px 0' }}>Quick Start Guide:</h2>
                                                <table cellPadding="0" cellSpacing="0">
                                                    <tr>
                                                        <td style={{ paddingBottom: '8px' }}>
                                                            <table cellPadding="0" cellSpacing="0">
                                                                <tr>
                                                                    <td style={{ paddingRight: '8px', verticalAlign: 'top' }}>
                                                                        <span style={{ width: '24px', height: '24px', display: 'inline-block', backgroundColor: '#4f46e5', color: '#ffffff', borderRadius: '50%', fontSize: '14px', textAlign: 'center', lineHeight: '24px' }}>1</span>
                                                                    </td>
                                                                    <td style={{ color: '#374151' }}>Connect your LeetCode & HackerRank accounts</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ paddingBottom: '8px' }}>
                                                            <table cellPadding="0" cellSpacing="0">
                                                                <tr>
                                                                    <td style={{ paddingRight: '8px', verticalAlign: 'top' }}>
                                                                        <span style={{ width: '24px', height: '24px', display: 'inline-block', backgroundColor: '#4f46e5', color: '#ffffff', borderRadius: '50%', fontSize: '14px', textAlign: 'center', lineHeight: '24px' }}>2</span>
                                                                    </td>
                                                                    <td style={{ color: '#374151' }}>Join your campus leaderboard</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <table cellPadding="0" cellSpacing="0">
                                                                <tr>
                                                                    <td style={{ paddingRight: '8px', verticalAlign: 'top' }}>
                                                                        <span style={{ width: '24px', height: '24px', display: 'inline-block', backgroundColor: '#4f46e5', color: '#ffffff', borderRadius: '50%', fontSize: '14px', textAlign: 'center', lineHeight: '24px' }}>3</span>
                                                                    </td>
                                                                    <td style={{ color: '#374151' }}>Start solving challenges to earn points</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <table cellPadding="0" cellSpacing="0" width="100%">
                                        <tr>
                                            <td>
                                                <a href="https://campusrank.org/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                                    <table cellPadding="0" cellSpacing="0" width="100%" style={{ background: 'linear-gradient(to right, #4f46e5, #9333ea)', borderRadius: '8px' }}>
                                                        <tr>
                                                            <td style={{ padding: '12px 24px', textAlign: 'center' }}>
                                                                <span style={{ color: '#ffffff', fontWeight: '500' }}>Start Your Coding Journey</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        ),

        leaderboard: (
            <table cellPadding="0" cellSpacing="0" style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>
                <tr>
                    <td style={{ padding: '32px' }}>
                        <table cellPadding="0" cellSpacing="0" width="100%">
                            <tr>
                                <td style={{ paddingBottom: '24px' }}>
                                    <table cellPadding="0" cellSpacing="0">
                                        <tr>
                                            <td style={{ paddingRight: '12px' }}>
                                                <span style={{ fontSize: '32px' }}>🏆</span>
                                            </td>
                                            <td>
                                                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Campus Rank Leaderboard</h1>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p style={{ fontSize: '18px', color: '#374151', margin: '0 0 16px 0' }}>Hi {data.name},</p>
                                    <table cellPadding="0" cellSpacing="0" width="100%" style={{ background: 'linear-gradient(to bottom right, #fef3c7, #ffedd5)', borderRadius: '8px', marginBottom: '24px' }}>
                                        <tr>
                                            <td style={{ padding: '24px' }}>
                                                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#92400e', margin: '0 0 16px 0' }}>🏆 Top Performers This Week</h2>
                                                <table cellPadding="0" cellSpacing="0" width="100%">
                                                    {data.topUsers && data.topUsers.length > 0 && data.topUsers.map((user, index) => (
                                                        <tr key={index}>
                                                            <td style={{ paddingBottom: index !== (data.topUsers?.length ?? 0) - 1 ? '16px' : 0 }}>
                                                                <table cellPadding="0" cellSpacing="0" width="100%" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '8px' }}>
                                                                    <tr>
                                                                        <td style={{ padding: '16px' }}>
                                                                            <table cellPadding="0" cellSpacing="0" width="100%">
                                                                                <tr>
                                                                                    <td style={{ width: '40px', verticalAlign: 'middle' }}>
                                                                                        <span style={{ fontSize: '24px' }}>
                                                                                            {index === 0 && '🥇'}
                                                                                            {index === 1 && '🥈'}
                                                                                            {index === 2 && '🥉'}
                                                                                        </span>
                                                                                    </td>
                                                                                    <td style={{ padding: '0 12px' }}>
                                                                                        <p style={{ fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0' }}>{user.name}</p>
                                                                                        <p style={{ fontSize: '14px', color: '#4b5563', margin: 0 }}>Score: {user.score.toFixed(2)}</p>
                                                                                    </td>
                                                                                    <td style={{ textAlign: 'right' }}>
                                                                                        <p style={{ fontSize: '14px', fontWeight: '500', color: '#92400e', margin: 0 }}>Rank #{user.rank}</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <table cellPadding="0" cellSpacing="0" width="100%" style={{ backgroundColor: '#f9fafb', borderRadius: '8px', marginBottom: '24px' }}>
                                        <tr>
                                            <td style={{ padding: '16px' }}>
                                                <h2 style={{ fontWeight: '600', color: '#1f2937', margin: '0 0 12px 0' }}>Weekly Highlights:</h2>
                                                <table cellPadding="0" cellSpacing="0">
                                                    <tr>
                                                        <td style={{ paddingBottom: '8px' }}>
                                                            <table cellPadding="0" cellSpacing="0">
                                                                <tr>
                                                                    <td style={{ paddingRight: '8px' }}>
                                                                        <span style={{ fontSize: '16px' }}>👥</span>
                                                                    </td>
                                                                    <td style={{ color: '#4b5563' }}>Total active participants: {data.userCount}</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ paddingBottom: '8px' }}>
                                                            <table cellPadding="0" cellSpacing="0">
                                                                <tr>
                                                                    <td style={{ paddingRight: '8px' }}>
                                                                        <span style={{ fontSize: '16px' }}>🎯</span>
                                                                    </td>
                                                                    <td style={{ color: '#4b5563' }}>Problems solved this week: {data.problemSolved}</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    {/* <tr>
                                                        <td style={{ paddingBottom: '8px' }}>
                                                            <table cellPadding="0" cellSpacing="0">
                                                                <tr>
                                                                    <td style={{ paddingRight: '8px' }}>
                                                                        <span style={{ fontSize: '16px' }}>🚀</span>
                                                                    </td>
                                                                    <td style={{ color: '#4b5563' }}>New certifications earned: 45</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr> */}
                                                    {/* <tr>
                                                        <td style={{ paddingBottom: '8px' }}>
                                                            <table cellPadding="0" cellSpacing="0">
                                                                <tr>
                                                                    <td style={{ paddingRight: '8px' }}>
                                                                        <span style={{ fontSize: '16px' }}>⭐</span>
                                                                    </td>
                                                                    <td style={{ color: '#4b5563' }}>Average score improvement: 12%</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr> */}
                                                    {/* <tr>
                                                        <td>
                                                            <table cellPadding="0" cellSpacing="0">
                                                                <tr>
                                                                    <td style={{ paddingRight: '8px' }}>
                                                                        <span style={{ fontSize: '16px' }}>🏆</span>
                                                                    </td>
                                                                    <td style={{ color: '#4b5563' }}>Top performer gained: 450 points</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr> */}
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <table cellPadding="0" cellSpacing="0" width="100%">
                                        <tr>
                                            <td width="50%" style={{ paddingRight: '8px' }}>
                                                <a href="https://campusrank.org/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                                    <table cellPadding="0" cellSpacing="0" width="100%" style={{ background: 'linear-gradient(to right, #f59e0b, #f97316)', borderRadius: '8px' }}>
                                                        <tr>
                                                            <td style={{ padding: '8px 24px', textAlign: 'center' }}>
                                                                <span style={{ color: '#ffffff' }}>View Full Leaderboard</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </a>
                                            </td>
                                            <td width="50%" style={{ paddingLeft: '8px' }}>
                                                <a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                                    <table cellPadding="0" cellSpacing="0" width="100%" style={{ backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
                                                        <tr>
                                                            <td style={{ padding: '8px 24px', textAlign: 'center' }}>
                                                                <span style={{ color: '#374151' }}>Practice Now</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        ),

        linkedin: (
            <table cellPadding="0" cellSpacing="0" style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>
                <tr>
                    <td style={{ padding: '32px' }}>
                        <table cellPadding="0" cellSpacing="0" width="100%">
                            <tr>
                                <td style={{ paddingBottom: '24px' }}>
                                    <table cellPadding="0" cellSpacing="0">
                                        <tr>
                                            <td style={{ paddingRight: '12px' }}>
                                                <span style={{ fontSize: '32px' }}>💼</span>
                                            </td>
                                            <td>
                                                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Check out this post on LinkedIn</h1>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table cellPadding="0" cellSpacing="0" width="100%" style={{ background: 'linear-gradient(to right, #eff6ff, #e0e7ff)', borderRadius: '8px', marginBottom: '24px' }}>
                                        <tr>
                                            <td style={{ padding: '24px' }}>
                                                <table cellPadding="0" cellSpacing="0" width="100%" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6' }}>
                                                    <tr>
                                                        <td style={{ padding: '24px' }}>
                                                            <table cellPadding="0" cellSpacing="0" width="100%" style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6' }}>
                                                                <tr>
                                                                    <td style={{ paddingRight: '12px' }}>
                                                                        <span style={{ fontSize: '24px' }}>💼</span>
                                                                    </td>
                                                                    <td style={{ verticalAlign: 'middle' }}>
                                                                        <span style={{ color: '#6b7280', fontSize: '14px' }}>LinkedIn Post</span>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>
                                                                {data.postTitle}
                                                            </h2>
                                                            <table cellPadding="0" cellSpacing="0" width="100%" style={{ marginBottom: '16px' }}>
                                                                <tr>
                                                                    <td>
                                                                        <a href={data.postUrl} target="_blank" rel="noopener noreferrer">
                                                                            <img
                                                                                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2070&h=1080"
                                                                                alt="Post cover"
                                                                                style={{ width: '100%', maxWidth: '552px', height: 'auto', borderRadius: '8px' }}
                                                                            />
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <table cellPadding="0" cellSpacing="0">
                                                                <tr>
                                                                    <td style={{ color: '#6b7280', fontSize: '14px' }}>
                                                                        <span>0 reactions</span>
                                                                        <span style={{ padding: '0 8px' }}>•</span>
                                                                        <span>0 comments</span>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <table cellPadding="0" cellSpacing="0" width="100%">
                                        <tr>
                                            <td width="50%" style={{ paddingRight: '8px' }}>
                                                <a href={data.postUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                                    <table cellPadding="0" cellSpacing="0" width="100%" style={{ backgroundColor: '#1d4ed8', borderRadius: '8px' }}>
                                                        <tr>
                                                            <td style={{ padding: '12px 24px', textAlign: 'center' }}>
                                                                <span style={{ color: '#ffffff', fontWeight: '500' }}>Share on LinkedIn</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </a>
                                            </td>
                                            <td width="50%" style={{ paddingLeft: '8px' }}>
                                                <a href={data.postUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                                    <table cellPadding="0" cellSpacing="0" width="100%" style={{ backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
                                                        <tr>
                                                            <td style={{ padding: '12px 24px', textAlign: 'center' }}>
                                                                <span style={{ color: '#374151', fontWeight: '500' }}>Copy Link</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        ),
    };

    return templates[type];
};

export default EmailTemplate;