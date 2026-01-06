# ORGO: Building a Scheduling Engine for Real Life

---

## At a Glance

**ROLE**  
Co-Founder, Head of Product & Design

**TEAM**  
Michael Garvey (me), Zoya Lehrer (CEO), Development team

**TIMELINE**  
April 2023 - Present (2.5 years)

**IMPACT**  
- 140 paying families in 4 months of monetization, $8K ARR
- 4.8 App Store rating from 1,100+ weekly active users
- 40% free-to-paid conversion (3-4x industry standard)
- 4x daily opens per user - highly engaged
- Grew to 2,500 users completely organically before any paid marketing

**MY CONTRIBUTION**  
Solo product designer who taught himself React Native to build it. Led all user research, designed every screen, coded the frontend, set up analytics infrastructure, managed app deployments, and handled everything from brand to monetization strategy.

**TOOLS**  
Figma, React Native, Expo, Supabase, PostHog, RevenueCat, Adobe After Effects

[IMAGE: Hero image - 3 phone screens showing the app in action: calendar view, event detail, and crew management]

---

## The Problem

Picture this: Your kid has soccer at 5:30 PM. The field is 20 minutes away. You want to arrive 10 minutes early. You need 15 minutes to get them ready. Suddenly you're doing mental math to figure out you need to start at 4:45 PM.

Now multiply that by three kids, across different activities, with different drivers, at different locations.

**30 million sports families** in the US are drowning in this complexity. They're juggling Google Calendar, team apps like TeamSnap, group texts, and mental math—all while trying not to be late.

[IMAGE: The "crazy calendar" - actual screenshot of a parent's day with overlapping events, texts, and chaos]

### What we heard from parents:

> "When I put a 10:30 in my calendar, it's not actually a 10:30—we have to leave at 9:45."  
> — Adam, dad of 2

> "I'm not a teleporting unicorn, but my calendar thinks I am."  
> — Zoya, mom of 3

> "The only enjoyable part of this is when an activity gets cancelled."  
> — Katie, mom of 2

**The core problem:** Calendars track when things happen, not when you need to act. No tool handled prep time, travel time, early arrival, driver coordination, or the reality that your 6-year-old can't teleport between locations.

---

## How I Got Here

In March 2023, my boss's boss at Webster Bank quit to solve this problem. Zoya had been a tech exec for 20+ years but became a sports mom and realized the logistics were impossible.

She asked if I wanted to help build something—unpaid, nights and weekends. I was 24, working on digital banking products for 800K users, and ready for a new challenge. I said yes.

We met at a Starbucks in Morristown, New Jersey with a developer named Mike. My first question: "How do we know this is actually a problem?"

**I refused to build anything without validation.**

---

## Validation: Talking to 20+ Families

I ran a focus group at Zoya's house with 12 parents. Then Zoya and I interviewed 20 more individually.

[IMAGE: Photos from focus group sessions or notes/affinity mapping]

### The five pain points we heard repeatedly:

1. **Coordinating people, places, and times** across multiple kids and activities
2. **Reverse-calculating departure times** and forgetting prep steps
3. **Adapting to constant changes** (weather, cancellations, carpool swaps)
4. **Collaborating across families** for carpools without endless texts
5. **Maintaining an accurate view** of what the day actually looks like

**The insight:** People don't just need a calendar. They need a *logistics engine* that works backward from when things happen to when they need to act.

We had our problem. Now we needed to build the solution.

---

## From Sketches to Alpha: Designing the Core Experience

I started in FigJam, sketching the four core areas:

1. **Registration** - Get people in fast
2. **Crew Management** - Who's in your family/circle
3. **Activity Addition** - The heart of the product
4. **Calendar Views** - See your day unfold realistically

[IMAGE: Early FigJam sketches showing initial screen concepts]

Then I moved to Figma to create detailed wireframes and user flows.

[IMAGE: Low-fidelity wireframes of registration flow]

### The First Big Decision: Activity Structure

Traditional calendars ask: "What time does it start?"

We needed to ask: "When do you need to START PREPARING?"

I designed events with multiple segments:
- **Prep time** (get ready at home)
- **Early arrival buffer** (don't be late)
- **Travel time** (auto-calculated)
- **Event time** (the actual activity)
- **Return trip** (home or next location)

[IMAGE: Early wireframe of activity creation showing these segments]

This meant building something fundamentally different from Google Calendar. It was riskier, but it solved the actual problem.

---

## October 2023: Alpha Launch & Brutal Feedback

We launched to 25 users via Expo (not even TestFlight yet—they had to scan QR codes to download).

**The feedback was swift and humbling:**

Users loved the concept but kept asking: *"Where's my Google Calendar data?"* and *"How do I change the default location?"*

Two critical flaws emerged:

### Flaw #1: No Integration
People already had their schedules in Google Calendar and TeamSnap. Asking them to manually re-enter everything was a non-starter.

### Flaw #2: Assumed Everyone Lives at Home
Our events assumed origin and return were always "home." But real life is messier—pickup from school, going straight to the next activity, carpooling from a friend's house.

**The hard truth:** We'd built for our idealized version of the problem, not the messy reality of how families actually live.

---

## April 2024: Public Launch (And Things Got Worse)

We pushed a public App Store release. Users flooded in organically—500 registered users, all from word of mouth.

For 8 months, we iterated within the constraints of our initial platform. Our developers were talented but moonlighting like we were, which meant limited bandwidth for the ambitious features users wanted.

[IMAGE: Timeline graphic showing the evolution from alpha to V2]

By January 2025, we faced a strategic choice: continue incremental improvements or rebuild the foundation to unlock faster iteration. We chose the latter.

---

## The Pivot: Rebuilding Everything

We converted from LLC to C-Corp and raised $80K from angel investors. We immediately hired a development team in Brazil and started a complete rewrite.

**May-July 2025:** Three months of ground-up rebuilding.
- Firebase → Supabase (I taught myself SQL to query the database directly)
- Everything hardened, optimized, professionalized

**I became the operational glue:**
- Set up RevenueCat for monetization
- Implemented PostHog for analytics
- Configured iOS SKAN tracking for Meta ads
- Handled every app deployment
- Built the financial model
- Created the pitch deck

All while freelancing on the side to pay rent.

---

## The Iteration Cycle: Building the Features That Mattered

Once we had a solid foundation, we moved fast. Here's how the product evolved through user feedback:

### Round 1: Adding Origin & Return Locations (April 2024)
**The problem:** Events assumed everything started and ended at home.

**The solution:** Let users specify origin, destination, and return addresses for each trip segment.

**Why it mattered:** Parents needed to go from school → soccer → home, not just home → soccer → home.

[IMAGE: Before/after comparison showing events WITHOUT origin/return vs WITH]

### Round 2: Calendar Integration (June 2025)
**The problem:** Manual entry was killing adoption.

**The solution:** Deep integration with Google Calendar, Apple Calendar, and TeamSnap. Events flow in automatically.

**Why it mattered:** This was the #1 user request. It went from "nice idea" to "actively using daily."

[IMAGE: Integration flow - showing calendars importing into Orgo]

### Round 3: Import Rules (October 2025)
**The problem:** When 50 events imported from Google, they all defaulted to the user. But "Tommy's Soccer Practice" should auto-assign to Tommy.

**The solution:** Smart import rules that let users set defaults (participants, drivers, locations) + AI name detection in event titles.

**Why it mattered:** Turned 2 hours of setup into 5 minutes.

[IMAGE: Import rules interface showing bulk assignment UI]

### Round 4: Multi-Stop Trips (September 2025)
**The problem:** Real life has stops. "Grab Starbucks on the way" or "Pick up Emma before practice."

**The solution:** Let users add multiple stops to any trip, with time buffers for each.

**Why it mattered:** Finally reflected how people *actually* move through their day.

[IMAGE: Event detail showing multi-stop interface]

### Round 5: Other Crews (November 2025)
**The problem:** Carpooling required coordinating across families via endless texts.

**The solution:** Connect with other families ("crews") in the app. Assign drivers from other crews, they get notified, confirm or decline.

**Why it mattered:** Eliminated the "who's driving?" group text chaos.

[IMAGE: Crew connection flow + driver assignment interface]

### Round 6: Weather Integration (October 2025)
**The problem:** Parents constantly checking weather for outdoor activities.

**The solution:** Auto-display location-specific weather for every event, right in the calendar.

**Why it mattered:** One less thing to think about. It delighted users.

[IMAGE: Calendar view with weather indicators on events]

---

## Current Product: The Full Experience

[VIDEO: After Effects demo video of the app in action]

### What makes Orgo different:

**For Scheduling:**
- Auto-calculated travel times using actual routes
- Prep time tracked separately from event time  
- Early arrival buffers (show up 15 min before start)
- Multi-stop routing for errands and carpools

**For Coordination:**
- Driver assignment for pickup, dropoff, and staying
- Cross-family crew connections for carpooling
- Smart notifications (only when you need to act)
- Three views: Calendar, Agenda, Text summary

**For Accuracy:**
- Import rules for bulk setup from existing calendars
- AI name detection in event titles
- Weather integrated per event location
- Conflict detection on a per-person basis

[IMAGE: Split screen showing all 3 views - Calendar, Agenda, Text]

---

## The Results

### From Launch to Traction

**April 2024 - Public Launch:**
- 500 registered users in first few months, 100% organic
- 4.8 App Store rating
- Feature requests flooding in

**January 2025 - Platform Rewrite:**
- Transitioned development teams
- Rebuilt on stronger technical foundation
- 3 months to ship V2 with calendar integrations

**August 2025 - Monetization Launch:**
- Switched from no-credit-card trial → upfront payment
- Conversion jumped from 10% → 40%
- Started first paid marketing campaigns

**Current (January 2026):**
- 140 paid families ($6.95/month = ~$8K ARR)
- 1,100 weekly active users
- 4x daily opens per user (highly habitual)
- 400K notifications sent from 85K created events
- 2,500 beta users still active (grandfathered free)

**Marketing Efficiency:**
- $50.61 CAC with 30% install-to-paid (3-4x industry standard)
- Grew organically to 2,500 users before any paid marketing
- Started paid ads in August 2025, now at 250K+ monthly impressions

[IMAGE: Metrics dashboard or data visualization showing growth]

### What Users Say:

> "Orgo allowed me to have a single version of the truth."  
> — Brosseau Family, 5-star review

> "I never thought that type of reminder would be so useful until now."  
> — Ammlswcc, 5-star review

> "My husband and I know exactly what is happening each day!"  
> — Kstap4, 5-star review

---

## What I Learned

### 1. Start with validation, not vision
Running that first focus group was the best decision we made. It prevented us from building in a vacuum.

### 2. Users will tell you what's broken—listen
Every major feature came from user feedback. Google Calendar integration, origin/return locations, import rules—all user-driven.

### 3. Being designer + developer = better product decisions
Learning React Native let me make real-time tradeoffs between ideal design and technical feasibility. No "hand it off and hope" friction.

### 4. Bootstrapping requires strategic tradeoffs
Working unpaid for 2.5 years while freelancing taught me to ruthlessly prioritize. Limited time meant every feature decision had to count. When we finally raised funding, the difference in velocity was night and day.

### 5. Operational skills matter as much as design skills
Setting up analytics, monetization, ad tracking, database queries—these aren't "design" but they're essential to shipping real products.

---

## What's Next

We're not done. The vision is bigger than sports families.

**Near term:**
- Deeper AI features (suggest optimal carpool routes, predict conflicts)
- B2B expansion into real estate, caregiving, enterprise teams
- Continued funnel optimization to reach profitability

**Long term:**
- Become the scheduling infrastructure for any team coordinating people, places, and time
- $16.3B TAM across sports families, real estate, and caregiving

[IMAGE: Product roadmap visualization or market expansion graphic]

But the core insight remains: **Calendars should reflect reality, not just record events.** That's what we built. That's what users love.

---

## Download Orgo

[App Store Button]
[Google Play Button]

---

**Want to see more?** Check out my separate case study on [Orgo's Brand Identity](#) where I designed the logo, color system, and marketing site.

---

*Building Orgo taught me that great products come from deep user empathy, relentless iteration, and the willingness to rebuild when something's not working. It also showed me the value of wearing multiple hats—being both designer and developer created a tighter feedback loop and better product decisions.*