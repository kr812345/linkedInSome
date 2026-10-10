/**
 * Deterministic roasts for local runs when MOCK_LLM=true.
 * Unique sentinels let tests prove the teaser does not leak the full write-up.
 */

export const PROFILE_LEAK = 'I help B2B founders turn LinkedIn into a client channel';
export const POSTS_LEAK = 'Your pipeline is quiet because your posts are written for other founders to nod at';

export function mockProfileRoast() {
  return {
    score: 34,
    verdict: 'A buyer can tell you build things. They cannot tell which problem you solve, or why they should book a call.',
    highlights: [
      'The headline is a job title, not a client outcome.',
      'The About section never names who you help or what changes after they hire you.',
      'There is no proof — no numbers, no named result, no offer.',
    ],
    sections: {
      banner: 'The banner is a default gradient. It is the first thing a buyer sees, and it says nothing about the business.',
      profilePicture: 'The photo is fine. The words around it are the problem.',
      headline: '"Founder | Building in public" could belong to ten thousand people. A client cannot tell what you sell.',
      about: 'The About reads like a biography. It starts with your journey and never gets to their problem.',
      proof: 'No metrics, no client names, no before-and-after. Credibility is implied, not shown.',
      clientMagnet: 'Would this profile make a buyer book a call? Not yet. There is no offer, no specificity, and no reason to message you instead of scrolling.',
    },
    rewrites: [
      {
        label: 'Headline',
        text: 'I help B2B founders turn LinkedIn into a client channel — without sounding like a content agency.',
      },
      {
        label: 'About opener',
        text: 'If your LinkedIn gets compliments and zero calls, the profile is introducing you instead of selling the next conversation. I fix that for founders who already have a real offer.',
      },
    ],
  };
}

export function mockPostsRoast() {
  return {
    score: 47,
    verdict: 'These posts can earn agreement. They are not built to earn a client.',
    highlights: [
      'Hooks describe your week. They do not name a buyer’s pain in the first line.',
      'Nothing says who this is for, so the right people do not self-select.',
      'The posts end on a thought, not a next step.',
    ],
    sections: {
      hook: 'The first lines are about you: a launch, a lesson, a feeling. A buyer is scanning for their own stalled deal.',
      whoYouHelp: 'A stranger cannot tell whether this is for founders, operators, or other creators. If everyone is the audience, no one books.',
      clarity: 'The point of each post arrives late, after the story. Say the claim in the first two lines.',
      consistency: 'The topics jump from productivity to fundraising to a photo dump. A client cannot see a point of view they can hire.',
      proof: 'Opinions are doing the work that a number, a client result, or a specific scene should do.',
      cta: 'Most posts stop. The ones that ask for something ask for "thoughts?", which is not a client conversation.',
      clientMagnet: 'Would this content attract clients? It might attract peers. It does not give a buyer a reason to reply about their problem.',
    },
    rewrites: [
      {
        label: 'Post 1 hook',
        text: 'Your pipeline is quiet because your posts are written for other founders to nod at — not for a buyer to recognize themselves.',
      },
      {
        label: 'Post 1 rewrite',
        text: 'Most founder posts die in the first line because they start with "I". Start with the buyer’s stalled deal, show the move you made, then invite one specific person to reply.',
      },
    ],
  };
}
