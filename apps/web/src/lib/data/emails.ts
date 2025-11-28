import type { Email } from '@texuddy/types';

// 30 REAL professional communication scenarios across diverse careers
export const mockEmails: Email[] = [
  // GRAPHIC DESIGNER
  {
    id: '1',
    from: 'client@startup.com',
    fromName: 'Startup Founder',
    subject: 'Presenting Design Revisions to Client',
    category: 'Graphic Designer',
    icon: '🎨',
    reward: 'Design Skills',
    rewardCode: '7429',
    body: 'Your client rejected your first logo design. They said it\'s "too playful" and want something more professional. You\'re presenting revised designs in a video call. What do you say to explain your new approach and handle their feedback constructively?',
    response: 'Thank you for the feedback on the initial design. I understand you need something more professional. Based on your comments, I\'ve created three new concepts that focus on clean lines and a sophisticated color palette. The first uses a minimalist geometric approach, the second incorporates your industry symbolism, and the third balances modern with timeless. I\'d love to hear which direction resonates with you, and I\'m happy to refine any of these further.',
    wordCount: 73,
    keywords: ['Presentation', 'Client Feedback', 'Design', 'Professional', 'Adaptability'],
    ageLevel: 12,
    difficulty: 'medium'
  },

  // RETAIL SALES ASSOCIATE
  {
    id: '2',
    from: 'customer@email.com',
    fromName: 'Angry Customer',
    subject: 'Handling Difficult Customer In-Person',
    category: 'Retail Sales',
    icon: '🛍️',
    reward: 'Customer Service',
    rewardCode: '8351',
    body: 'A customer is upset because the item they want is out of stock. They\'re raising their voice and saying "this store is always a mess!" How do you respond calmly and professionally to de-escalate and offer a solution?',
    response: 'I completely understand your frustration, and I sincerely apologize that we don\'t have that item in stock right now. Let me check if we have it at our other location, and I can have it transferred here by tomorrow. Alternatively, I can order it online for you with free shipping to your home. I want to make sure you get what you need. Which option works better for you?',
    wordCount: 68,
    keywords: ['De-escalation', 'Customer Service', 'Problem Solving', 'Calm', 'Solution'],
    ageLevel: 12,
    difficulty: 'easy'
  },

  // BARISTA / COFFEE SHOP
  {
    id: '3',
    from: 'manager@coffeeshop.com',
    fromName: 'Café Manager',
    subject: 'Requesting Schedule Change via Text',
    category: 'Food Service',
    icon: '☕',
    reward: 'Work Communication',
    rewardCode: '9284',
    body: 'You need to swap your Saturday shift because you have a family emergency. You need to text your manager professionally but keep it brief since it\'s a text message. What do you write?',
    response: 'Hi [Manager], I have a family emergency and can\'t work Saturday. I already asked Jake and he can cover my shift. I\'ll make sure everything is handed off smoothly. Can you approve the swap? I\'m really sorry for the short notice. Thanks for understanding.',
    wordCount: 45,
    keywords: ['Text Communication', 'Professional', 'Responsibility', 'Brief', 'Respectful'],
    ageLevel: 12,
    difficulty: 'easy'
  },

  // SOFTWARE DEVELOPER
  {
    id: '4',
    from: 'senior@techcompany.com',
    fromName: 'Senior Developer',
    subject: 'Code Review Comment - Bug Report',
    category: 'Software Developer',
    icon: '💻',
    reward: 'Tech Communication',
    rewardCode: '1234',
    body: 'You found a bug in your teammate\'s code during review. The code could cause data loss. You need to write a Slack message that\'s direct about the issue but not rude or accusatory.',
    response: 'Hey! I was reviewing the checkout module and noticed the payment validation might skip error handling if the API times out. This could result in failed transactions not being logged. I think adding a try-catch block around lines 234-240 would cover this case. Want me to push a quick fix, or do you want to handle it? No rush - just flagging before it goes to prod.',
    wordCount: 69,
    keywords: ['Technical Writing', 'Feedback', 'Collaboration', 'Problem Solving', 'Diplomatic'],
    ageLevel: 12,
    difficulty: 'medium'
  },

  // SOCIAL MEDIA MANAGER
  {
    id: '5',
    from: 'smallbiz@email.com',
    fromName: 'Small Business Owner',
    subject: 'Client Wants Refund - Email Response',
    category: 'Social Media Manager',
    icon: '📱',
    reward: 'Client Relations',
    rewardCode: '5678',
    body: 'You manage social media for a small bakery. The owner is unhappy because you posted content that didn\'t get many likes. They want a refund for this month. Write an email addressing their concerns professionally.',
    response: 'Dear [Owner Name], I understand your concern about engagement on recent posts. Social media growth takes time and strategy adjustments. This month we increased your follower count by 15% and had higher reach than last month. Lower likes on one post doesn\'t reflect overall performance. I\'d love to schedule a call to review analytics and adjust our content strategy to better match what your audience engages with. I\'m committed to your success and want to make this work. Can we meet this week to discuss?',
    wordCount: 87,
    keywords: ['Client Management', 'Data', 'Professional', 'Problem Solving', 'Value'],
    ageLevel: 12,
    difficulty: 'hard'
  },

  // TUTOR / TEACHER
  {
    id: '6',
    from: 'parent@email.com',
    fromName: 'Concerned Parent',
    subject: 'Parent-Teacher Conference Conversation',
    category: 'Tutor / Educator',
    icon: '📚',
    reward: 'Teaching Skills',
    rewardCode: '9012',
    body: 'You\'re tutoring a high school student in math. The parent asks, "Why isn\'t my son improving faster? We\'re paying a lot for this." How do you respond diplomatically while explaining the learning process?',
    response: 'I completely understand your concern. Learning math is like building a house - we need a strong foundation before adding floors. Your son had some gaps in algebra basics, which we\'ve been addressing. I\'ve seen real progress in his problem-solving approach and confidence. The test scores will catch up as these fundamentals solidify. I recommend we continue our current pace for two more weeks, then reassess. I\'m also assigning practice problems he can do between sessions to accelerate progress. Would that work for you?',
    wordCount: 89,
    keywords: ['Diplomacy', 'Parent Communication', 'Education', 'Patience', 'Solution'],
    ageLevel: 12,
    difficulty: 'medium'
  },

  // PHOTOGRAPHER
  {
    id: '7',
    from: 'bride@wedding.com',
    fromName: 'Wedding Client',
    subject: 'Negotiating Photography Package Price',
    category: 'Photographer',
    icon: '📸',
    reward: 'Creative Business',
    rewardCode: '3456',
    body: 'A potential wedding client loves your portfolio but says your price is "a bit high" and asks if you can lower it. You don\'t want to undervalue your work, but you also want to book the wedding. How do you respond?',
    response: 'Thank you so much for considering me for your wedding! I understand budget is important. My pricing reflects 8+ hours of shooting, professional editing, and years of experience capturing once-in-a-lifetime moments. However, I do offer a smaller package that covers ceremony and reception highlights for less. Another option is removing the engagement shoot, which would reduce the price. I want to work with you while ensuring I deliver the quality you saw in my portfolio. Would either of these options work for your budget?',
    wordCount: 89,
    keywords: ['Negotiation', 'Value', 'Flexibility', 'Professional', 'Business'],
    ageLevel: 12,
    difficulty: 'hard'
  },

  // RESTAURANT SERVER
  {
    id: '8',
    from: 'customer@restaurant.com',
    fromName: 'Dissatisfied Diner',
    subject: 'Handling Food Complaint - In Person',
    category: 'Restaurant Server',
    icon: '🍽️',
    reward: 'Hospitality',
    rewardCode: '7890',
    body: 'A customer says their steak is overcooked and they\'re unhappy. They haven\'t eaten much of it. You need to respond immediately in person to fix the situation and keep them satisfied.',
    response: 'I\'m so sorry your steak isn\'t cooked the way you wanted. That\'s completely on us. Let me take this back to the kitchen right now and have the chef prepare a new one exactly how you like it. In the meantime, can I bring you a fresh appetizer or salad on the house? I want to make sure your experience is great. This will only take about 10 minutes.',
    wordCount: 71,
    keywords: ['Customer Service', 'Apology', 'Quick Thinking', 'Hospitality', 'Solution'],
    ageLevel: 12,
    difficulty: 'easy'
  },

  // FITNESS TRAINER
  {
    id: '9',
    from: 'client@gym.com',
    fromName: 'Gym Client',
    subject: 'Client Wants to Cancel Training Sessions',
    category: 'Fitness Trainer',
    icon: '💪',
    reward: 'Health & Wellness',
    rewardCode: '2468',
    body: 'Your training client texts you saying they want to cancel their remaining sessions because they "aren\'t seeing results fast enough." How do you respond to retain them and re-motivate them?',
    response: 'Hey! I totally understand the frustration when results feel slow. But here\'s the thing - you\'ve only been training for 3 weeks, and your body is just starting to adapt. I\'ve noticed your strength increasing and your form improving dramatically. Real, lasting change takes 8-12 weeks minimum. Can we meet this week to reassess your goals and adjust the plan? I really believe you\'re on the verge of a breakthrough. Let\'s not give up right before the progress shows!',
    wordCount: 81,
    keywords: ['Motivation', 'Retention', 'Encouragement', 'Expertise', 'Personal Connection'],
    ageLevel: 12,
    difficulty: 'medium'
  },

  // REAL ESTATE ASSISTANT
  {
    id: '10',
    from: 'buyer@realestate.com',
    fromName: 'Home Buyer',
    subject: 'Following Up with Potential Home Buyer',
    category: 'Real Estate',
    icon: '🏠',
    reward: 'Sales Skills',
    rewardCode: '1357',
    body: 'You showed a house to potential buyers last week. They seemed interested but haven\'t responded. Write a follow-up email that\'s professional, not pushy, and encourages them to make a decision.',
    response: 'Hi [Buyer Names], I hope you\'re doing well! I wanted to follow up on the property we viewed last week on Maple Street. I know buying a home is a big decision and you\'re probably weighing many factors. I\'m here to answer any questions or schedule a second showing if you\'d like to see it again. Just a heads up - there\'s another showing scheduled this weekend, so if you\'re interested, it might be worth moving quickly. No pressure though! Let me know how I can help.',
    wordCount: 88,
    keywords: ['Sales', 'Follow-up', 'Urgency', 'Professional', 'Helpful'],
    ageLevel: 12,
    difficulty: 'medium'
  },

  // VETERINARY ASSISTANT
  {
    id: '11',
    from: 'petowner@email.com',
    fromName: 'Worried Pet Owner',
    subject: 'Explaining Vet Bill to Upset Pet Owner',
    category: 'Veterinary Assistant',
    icon: '🐾',
    reward: 'Animal Care',
    rewardCode: '4567',
    body: 'A pet owner is shocked by a $450 vet bill for their dog\'s emergency visit. They thought it would be $150. They\'re upset and questioning the charges. How do you explain it compassionately?',
    response: 'I completely understand the sticker shock - vet bills can be surprising. Let me break down the charges for you. The emergency exam was $85, but we also had to do X-rays to check for internal injuries, which was $180, plus bloodwork at $95, and pain medication and antibiotics at $90. Your dog needed these tests to rule out serious internal damage from the fall. I know it\'s expensive, and I\'m sorry it\'s more than expected. We do offer payment plans if that would help. Your dog\'s health and safety were our priority.',
    wordCount: 98,
    keywords: ['Empathy', 'Explanation', 'Healthcare', 'Transparency', 'Compassion'],
    ageLevel: 12,
    difficulty: 'medium'
  },

  // MECHANIC / AUTO TECHNICIAN
  {
    id: '12',
    from: 'carowner@email.com',
    fromName: 'Car Owner',
    subject: 'Explaining Unexpected Repair Costs',
    category: 'Auto Mechanic',
    icon: '🔧',
    reward: 'Technical Skills',
    rewardCode: '8901',
    body: 'A customer brought their car in for an oil change. You discovered their brake pads are dangerously worn and need immediate replacement. The customer is annoyed because they "just came for oil." How do you explain this?',
    response: 'I totally understand this wasn\'t what you planned for today. When we had your car up on the lift for the oil change, I noticed your brake pads are down to about 10% - that\'s actually in the danger zone. If they go much longer, you risk metal-on-metal grinding, which damages the rotors and costs 3x more to fix. I can show you the pads if you want to see. Your safety is the priority, and I wouldn\'t recommend driving it as-is. We can get you fixed up today, or you can get a second opinion - totally your call.',
    wordCount: 108,
    keywords: ['Technical Explanation', 'Safety', 'Trust', 'Transparency', 'Customer Service'],
    ageLevel: 12,
    difficulty: 'medium'
  },

  // MARKETING ASSISTANT
  {
    id: '13',
    from: 'ceo@startup.com',
    fromName: 'Startup CEO',
    subject: 'Pitch Email to Potential Sponsor',
    category: 'Marketing',
    icon: '📊',
    reward: 'Marketing Skills',
    rewardCode: '2345',
    body: 'Your school robotics team needs sponsorship for a competition. You need to write a professional email to a local tech company asking for $500 sponsorship. Make it compelling and show value for them.',
    response: 'Dear [Company Name], I\'m reaching out on behalf of [School Name] Robotics Team. We\'re competing in the State Robotics Championship next month and are seeking sponsors to help cover travel and equipment costs. In exchange for a $500 sponsorship, we\'ll display your company logo on our robot, team shirts, and social media throughout the season. We\'ll also mention your support in local press coverage. Our team has 25 dedicated students passionate about STEM, and your support would mean everything to us. Would you be interested in partnering with us? I\'d love to discuss this further.',
    wordCount: 103,
    keywords: ['Sponsorship', 'Value Proposition', 'Professional', 'Persuasion', 'Partnership'],
    ageLevel: 12,
    difficulty: 'hard'
  },

  // HAIR STYLIST
  {
    id: '14',
    from: 'client@salon.com',
    fromName: 'Salon Client',
    subject: 'Client Unhappy with Haircut Result',
    category: 'Hair Stylist',
    icon: '💇',
    reward: 'Beauty Services',
    rewardCode: '6789',
    body: 'A client is unhappy with their haircut. They wanted "just a trim" but you cut more because the ends were damaged. They\'re visibly upset looking in the mirror. What do you say right now?',
    response: 'I can see you\'re not happy, and I\'m really sorry. Let me explain what happened - when I was trimming, I noticed significant split ends that would keep traveling up the hair shaft if not removed. I should have stopped and showed you before cutting more. If you\'d like, I can adjust the style to better frame your face, or we can schedule a follow-up where I can work with the length to give you a look you love. Your satisfaction is my priority, and there\'s no charge for the adjustment. What would make this right for you?',
    wordCount: 102,
    keywords: ['Customer Service', 'Apology', 'Solution', 'Accountability', 'Beauty'],
    ageLevel: 12,
    difficulty: 'medium'
  },

  // EVENT COORDINATOR
  {
    id: '15',
    from: 'client@events.com',
    fromName: 'Event Host',
    subject: 'Vendor Cancelled Last Minute - Crisis Email',
    category: 'Event Planning',
    icon: '🎉',
    reward: 'Event Management',
    rewardCode: '3210',
    body: 'You\'re coordinating a birthday party for 50 people this Saturday. The catering company just cancelled. You need to email the client immediately to explain and offer solutions.',
    response: 'Hi [Client Name], I have urgent news. The catering company called and had to cancel due to a kitchen equipment failure. I\'m extremely sorry for this stress so close to your event. However, I\'ve already reached out to two backup caterers I trust. One can match your menu exactly and has confirmed availability for Saturday. The other offers a different style but comes highly recommended. Both are within your budget. I\'m handling all the coordination and will ensure this doesn\'t impact your party. Can we jump on a quick call today to finalize? Again, I sincerely apologize and I\'m on this.',
    wordCount: 108,
    keywords: ['Crisis Management', 'Problem Solving', 'Accountability', 'Fast Action', 'Professionalism'],
    ageLevel: 12,
    difficulty: 'hard'
  },

  // CUSTOMER SUPPORT REPRESENTATIVE
  {
    id: '16',
    from: 'customer@support.com',
    fromName: 'Frustrated Customer',
    subject: 'Chat Support - Product Not Working',
    category: 'Customer Support',
    icon: '🎧',
    reward: 'Support Skills',
    rewardCode: '5432',
    body: 'You work live chat support for an electronics company. A customer types: "This headset I bought is GARBAGE. Won\'t connect. I want a refund NOW." How do you respond in the chat?',
    response: 'I\'m really sorry you\'re experiencing this! That\'s definitely frustrating. Let\'s get this fixed for you right away. Can you tell me what device you\'re trying to connect to? Also, have you tried holding the power button for 10 seconds to reset it? Sometimes that clears connection issues. If that doesn\'t work, I\'ll process a replacement or refund immediately - whichever you prefer. You shouldn\'t have to deal with faulty equipment. Let me make this right for you.',
    wordCount: 80,
    keywords: ['Customer Support', 'De-escalation', 'Troubleshooting', 'Empathy', 'Solution'],
    ageLevel: 12,
    difficulty: 'easy'
  },

  // INTERN - CORPORATE
  {
    id: '17',
    from: 'supervisor@company.com',
    fromName: 'Internship Supervisor',
    subject: 'Asking Supervisor for More Responsibility',
    category: 'Corporate Intern',
    icon: '💼',
    reward: 'Career Growth',
    rewardCode: '9876',
    body: 'You\'ve been an intern for 2 months doing basic tasks like filing and data entry. You want more challenging work. How do you ask your supervisor professionally without sounding ungrateful?',
    response: 'Hi [Supervisor Name], Do you have a few minutes this week to chat? I\'ve really enjoyed my time here so far and I\'m grateful for the opportunity to learn. I feel comfortable with my current responsibilities and I\'m wondering if there are any additional projects I could take on to learn more about the team\'s work. I\'m particularly interested in [specific area] and would love to contribute in a bigger way if there\'s an opportunity. I want to make the most of this internship and add as much value as possible. Let me know what you think!',
    wordCount: 103,
    keywords: ['Initiative', 'Professional Growth', 'Gratitude', 'Ambition', 'Respectful'],
    ageLevel: 12,
    difficulty: 'medium'
  },

  // RECEPTIONIST
  {
    id: '18',
    from: 'visitor@office.com',
    fromName: 'Office Visitor',
    subject: 'Handling Difficult Client at Front Desk',
    category: 'Receptionist',
    icon: '📞',
    reward: 'Front Desk Skills',
    rewardCode: '1111',
    body: 'A client walks into the office demanding to see the boss immediately. The boss is in a meeting for another hour. The client is impatient and annoyed. What do you say in person?',
    response: 'I completely understand you need to speak with them urgently. Unfortunately, they\'re in a meeting until 3pm that they can\'t step out of. I have a few options for you: I can interrupt them if this is truly an emergency, I can schedule you as their very next appointment at 3pm, or I can have them call you the moment they\'re available. Which would work best for you? I want to make sure you get the attention you need.',
    wordCount: 80,
    keywords: ['Front Desk', 'Diplomacy', 'Problem Solving', 'Customer Service', 'Calm'],
    ageLevel: 12,
    difficulty: 'easy'
  },

  // FREELANCE WRITER
  {
    id: '19',
    from: 'editor@publication.com',
    fromName: 'Magazine Editor',
    subject: 'Pitching Article Idea to Editor',
    category: 'Freelance Writer',
    icon: '✍️',
    reward: 'Writing Skills',
    rewardCode: '2222',
    body: 'You want to write an article for a teen lifestyle magazine. You need to pitch your article idea via email to the editor you\'ve never worked with before.',
    response: 'Dear [Editor Name], I\'m a freelance writer specializing in teen culture and technology. I\'d like to pitch an article for [Magazine Name]: "How Gen Z is Redefining Side Hustles: From Etsy Shops to TikTok Businesses." I would interview 5 teen entrepreneurs making real money online and provide actionable tips for readers who want to start their own ventures. The article would be 1,200 words and include real earnings data and startup advice. I believe this aligns perfectly with your audience\'s interests in entrepreneurship and financial independence. I have clips from [Publications]. Would you be interested? I can send a detailed outline.',
    wordCount: 109,
    keywords: ['Pitching', 'Writing', 'Professional', 'Value Proposition', 'Freelance'],
    ageLevel: 12,
    difficulty: 'hard'
  },

  // VIDEO EDITOR
  {
    id: '20',
    from: 'youtuber@content.com',
    fromName: 'Content Creator',
    subject: 'Client Wants Unlimited Revisions - Setting Boundaries',
    category: 'Video Editor',
    icon: '🎬',
    reward: 'Creative Skills',
    rewardCode: '3333',
    body: 'You edit videos for a YouTuber. They\'ve asked for the 5th round of revisions on the same video, which is beyond your contract. How do you set boundaries professionally?',
    response: 'Hey! I\'m happy to keep refining the video until it\'s perfect. Just want to clarify - our original agreement included 2 rounds of revisions, and we\'re now on round 5. I\'m absolutely willing to continue, but I\'ll need to charge $50 per additional revision round to account for the extra time. Alternatively, we could hop on a call to knock out all remaining changes in one final revision. Let me know which option works better for you, and I\'ll get it done ASAP.',
    wordCount: 88,
    keywords: ['Boundaries', 'Freelance', 'Professional', 'Value', 'Communication'],
    ageLevel: 12,
    difficulty: 'hard'
  },

  // BABYSITTER / CHILDCARE
  {
    id: '21',
    from: 'parent@family.com',
    fromName: 'Parent Employer',
    subject: 'Asking for Rate Increase After 6 Months',
    category: 'Babysitter',
    icon: '👶',
    reward: 'Childcare',
    rewardCode: '4444',
    body: 'You\'ve been babysitting for the same family for 6 months at $15/hour. You want to ask for $18/hour. How do you bring this up without making it awkward?',
    response: 'Hi [Parent Name], I wanted to chat with you about something. I\'ve absolutely loved babysitting [Kids Names] over the past 6 months, and I feel like we\'ve built a great relationship. I\'ve taken on additional responsibilities like helping with homework and meal prep, and my availability has been really consistent. I was hoping we could discuss adjusting my rate to $18/hour to reflect the increased responsibilities. I completely understand if you need time to think about it. Either way, I\'m committed to continuing to provide great care for your family.',
    wordCount: 96,
    keywords: ['Negotiation', 'Professional', 'Value', 'Respectful', 'Childcare'],
    ageLevel: 12,
    difficulty: 'medium'
  },

  // PHARMACY TECHNICIAN
  {
    id: '22',
    from: 'patient@pharmacy.com',
    fromName: 'Pharmacy Customer',
    subject: 'Explaining Insurance Issue to Customer',
    category: 'Pharmacy Technician',
    icon: '💊',
    reward: 'Healthcare',
    rewardCode: '5555',
    body: 'A customer\'s insurance won\'t cover their prescription and they need to pay $120 out-of-pocket. They\'re upset and confused. How do you explain this clearly and helpfully in person?',
    response: 'I know this is frustrating - insurance can be confusing. What\'s happening is your insurance doesn\'t cover this specific medication, so you\'d have to pay the full price of $120. However, I have a few options: I can call your doctor to see if there\'s a similar medication your insurance does cover, or I can look up a discount card that might bring the price down to around $60. Another option is checking if the pharmacy savings program helps. Let me make some calls and see what I can find for you. Give me 10 minutes?',
    wordCount: 101,
    keywords: ['Healthcare', 'Explanation', 'Problem Solving', 'Empathy', 'Customer Service'],
    ageLevel: 12,
    difficulty: 'medium'
  },

  // GRAPHIC DESIGN INTERN
  {
    id: '23',
    from: 'artdirector@agency.com',
    fromName: 'Art Director',
    subject: 'Presenting Portfolio During Job Interview',
    category: 'Job Interview',
    icon: '🎨',
    reward: 'Interview Skills',
    rewardCode: '6666',
    body: 'You\'re in a job interview for a design internship. The interviewer says, "Walk me through your portfolio." You have 3 minutes to present your best work. What do you say?',
    response: 'Absolutely! I\'ll show you three projects that represent my range. First is a rebrand I did for a local coffee shop - I focused on creating a modern, minimalist identity that appeals to their college student demographic. Next is a social media campaign for a nonprofit where I balanced emotional storytelling with clean design. The engagement increased 40%. Finally, this passion project is a typographic poster series exploring mental health themes. It shows my experimental side. I love working on projects that combine strong visual impact with meaningful messages. Each project taught me different skills I\'d bring to your team.',
    wordCount: 107,
    keywords: ['Interview', 'Portfolio', 'Presentation', 'Confidence', 'Professional'],
    ageLevel: 12,
    difficulty: 'hard'
  },

  // RETAIL MANAGER TRAINEE
  {
    id: '24',
    from: 'employee@store.com',
    fromName: 'Store Employee',
    subject: 'Delegating Tasks to Team Members',
    category: 'Retail Management',
    icon: '📋',
    reward: 'Leadership',
    rewardCode: '7777',
    body: 'You\'re the shift supervisor and the store is understaffed during a busy Saturday. You need to delegate tasks to 3 employees efficiently. How do you communicate this?',
    response: 'Hey team, quick huddle. We\'re short-staffed today and it\'s going to be busy. Here\'s the plan: Sarah, you\'re on register 1 - you\'re fastest with customers. Mike, can you handle register 2 and cover breaks? I need you on restocking and keeping the floor organized between customers. I\'ll be floating to help wherever the line gets long and handle any customer issues. If it gets overwhelming, just signal me and I\'ll jump in. We\'ve got this - let\'s knock it out. Questions?',
    wordCount: 89,
    keywords: ['Leadership', 'Delegation', 'Teamwork', 'Clear Communication', 'Management'],
    ageLevel: 12,
    difficulty: 'medium'
  },

  // DENTAL ASSISTANT
  {
    id: '25',
    from: 'patient@dental.com',
    fromName: 'Nervous Patient',
    subject: 'Calming Anxious Dental Patient',
    category: 'Dental Assistant',
    icon: '🦷',
    reward: 'Healthcare',
    rewardCode: '8888',
    body: 'A patient is extremely nervous about getting a tooth filled. They\'re visibly shaking and said they almost left. How do you calm them down before the procedure?',
    response: 'I can see you\'re really nervous, and that\'s totally normal - lots of people feel this way. Here\'s what\'s going to happen: Dr. [Name] will numb the area first, so you won\'t feel any pain during the filling, just some pressure. The whole thing takes about 20 minutes. If you need a break at any point, just raise your hand and we\'ll stop. We\'ll go at your pace. I\'ll be right here the entire time. We can also put on music or a show to distract you. Does that help? You\'re in good hands.',
    wordCount: 102,
    keywords: ['Empathy', 'Healthcare', 'Calming', 'Patient Care', 'Reassurance'],
    ageLevel: 12,
    difficulty: 'easy'
  },

  // DELIVERY DRIVER
  {
    id: '26',
    from: 'customer@delivery.com',
    fromName: 'Delivery Customer',
    subject: 'Text Message - Late Delivery Apology',
    category: 'Delivery Driver',
    icon: '🚗',
    reward: 'Customer Service',
    rewardCode: '9999',
    body: 'You\'re running 20 minutes late delivering food because of traffic. The customer texted asking where you are. Write a quick professional text response.',
    response: 'Hi! I\'m so sorry for the delay - there\'s unexpected traffic on Main St. I\'m about 15 minutes away now and your food is still hot. Really sorry about this! I\'ll get there as fast as I safely can. Thanks for your patience!',
    wordCount: 44,
    keywords: ['Apology', 'Text Communication', 'Customer Service', 'Brief', 'Professional'],
    ageLevel: 12,
    difficulty: 'easy'
  },

  // MUSIC TEACHER
  {
    id: '27',
    from: 'student@music.com',
    fromName: 'Music Student',
    subject: 'Student Not Practicing - Conversation',
    category: 'Music Teacher',
    icon: '🎸',
    reward: 'Teaching',
    rewardCode: '0000',
    body: 'You teach guitar. A student hasn\'t practiced in 3 weeks and is making no progress. Their parent is paying for lessons. How do you address this with the student directly but kindly?',
    response: 'Hey, can we talk for a sec? I\'ve noticed you haven\'t been practicing between lessons, and I totally get it - life gets busy. But here\'s the thing: if we keep going without practice, you\'re not going to improve and you\'ll get frustrated. I don\'t want you to waste your time or money. What\'s going on? Are the songs too hard? Not fun? Let\'s figure out what would make you actually want to pick up the guitar. Maybe we need different songs or a new goal. I want this to work for you.',
    wordCount: 100,
    keywords: ['Teaching', 'Motivation', 'Honest', 'Empathy', 'Problem Solving'],
    ageLevel: 12,
    difficulty: 'medium'
  },

  // LIBRARY ASSISTANT
  {
    id: '28',
    from: 'patron@library.com',
    fromName: 'Library Patron',
    subject: 'Explaining Late Fee Policy Politely',
    category: 'Library Assistant',
    icon: '📖',
    reward: 'Public Service',
    rewardCode: '1212',
    body: 'A library patron is upset about a $15 late fee on books they returned 30 days late. They\'re arguing they "forgot" and shouldn\'t have to pay. How do you handle this professionally?',
    response: 'I completely understand - late fees are frustrating. Our policy is 50 cents per day to encourage timely returns so books are available for other patrons. After 30 days, that adds up to $15. I don\'t have the ability to waive fees, but I can share a couple options: you can set up our text reminder system so you never miss a due date again, or you can volunteer at the library for 3 hours to work off the fee. Would either of those help? I want to make sure you can keep using the library.',
    wordCount: 101,
    keywords: ['Policy Explanation', 'Diplomacy', 'Problem Solving', 'Public Service', 'Helpful'],
    ageLevel: 12,
    difficulty: 'medium'
  },

  // SALES ASSOCIATE - PHONE
  {
    id: '29',
    from: 'lead@sales.com',
    fromName: 'Sales Lead',
    subject: 'Cold Call Script - Closing a Sale',
    category: 'Phone Sales',
    icon: '☎️',
    reward: 'Sales Skills',
    rewardCode: '3434',
    body: 'You work phone sales for a gym membership. You\'re calling someone who filled out an online form. They answer but sound busy. You have 30 seconds to get them interested. What do you say?',
    response: 'Hi! This is [Your Name] from [Gym Name]. You filled out our form about membership options. I know you\'re busy, so I\'ll be quick - we\'re running a promotion right now: first month free plus a free personal training session, ends Friday. I wanted to make sure you didn\'t miss it. Do you have 2 minutes to hear the details, or should I text you the offer so you can check it out when you have time? No pressure either way.',
    wordCount: 85,
    keywords: ['Sales', 'Phone Skills', 'Quick Pitch', 'Urgency', 'Respectful'],
    ageLevel: 12,
    difficulty: 'hard'
  },

  // ADMINISTRATIVE ASSISTANT
  {
    id: '30',
    from: 'executive@company.com',
    fromName: 'Company Executive',
    subject: 'Professional Email - Meeting Scheduling',
    category: 'Administrative Assistant',
    icon: '📧',
    reward: 'Office Skills',
    rewardCode: '5656',
    body: 'Your boss needs you to email 5 executives to schedule a meeting. You need to find a time that works for everyone. Write the professional email.',
    response: 'Dear [Team], I\'m reaching out on behalf of [Boss Name] to schedule a meeting to discuss Q1 strategy planning. We\'re looking at the following options: Tuesday, March 5th at 2pm, Wednesday, March 6th at 10am, or Thursday, March 7th at 3pm. The meeting will be approximately 90 minutes and will take place in Conference Room A. Please reply with your availability by end of day Friday so I can confirm the final time. If none of these times work, please let me know your availability next week. Thank you, and I look forward to confirming the details.',
    wordCount: 106,
    keywords: ['Administrative', 'Professional Email', 'Scheduling', 'Coordination', 'Clear'],
    ageLevel: 12,
    difficulty: 'easy'
  }
];

export function getEmailsByAge(age: number): Email[] {
  // All scenarios are for professional development (ages 12+)
  return mockEmails;
}

export function getEmailById(id: string): Email | undefined {
  return mockEmails.find(email => email.id === id);
}
