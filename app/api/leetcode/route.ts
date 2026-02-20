import { NextResponse } from 'next/server';

const LEETCODE_GRAPHQL = 'https://leetcode.com/graphql';
const USERNAME = 'Chole_Bhature_';

const query = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

export async function GET() {
  try {
    const res = await fetch(LEETCODE_GRAPHQL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { username: USERNAME },
      }),
      cache: 'no-store',
    });

    const data = await res.json();
    const user = data.data.matchedUser;

    const stats = user.submitStatsGlobal.acSubmissionNum;
    const totalSolved = stats.find((s: any) => s.difficulty === 'All')?.count || 0;
    const easySolved = stats.find((s: any) => s.difficulty === 'Easy')?.count || 0;
    const mediumSolved = stats.find((s: any) => s.difficulty === 'Medium')?.count || 0;
    const hardSolved = stats.find((s: any) => s.difficulty === 'Hard')?.count || 0;
    const ranking = user.profile.ranking;

    return NextResponse.json({
      username: user.username,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      ranking,
    });
  } catch (e) {
    return NextResponse.json({
      username: USERNAME,
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      ranking: 0,
    });
  }
}
