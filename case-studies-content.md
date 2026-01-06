# All Case Studies Content

---

## ORGO: THE APP

### Summary

**TEAM**
- Me (Founder and principal designer)
- Michal Glowacki (Founder and principal engineer)
- Zoya Lehrer (Founder and CEO)

**TIMELINE**
April 2023 - Present

**TASK**
Design and code a mobile app to help families get the right people, to the right places, on time.

**TOOLS & LANGUAGES**
Figma, Illustrator, After Effects, React Native

Orgo is a mobile app that streamlines personal logistics—ensuring the right people get to the right places on time. While our initial focus is on busy families, the app's utility extends to various scheduling scenarios. As a co-founder, I contributed across multiple areas: brand creation, marketing site design, and app design and development.

(image of summary placeholder)

### The problem

Picture this: You have a 6:00 PM dinner reservation. The restaurant's 20 minutes away, you want to arrive 5 minutes early, and you need 20 minutes to get ready. Suddenly, you're doing mental gymnastics to figure out you should start preparing at 5:15 PM.

We're constantly performing these reverse calculations, but they often evaporate from our minds. For parents, it's even more complex. You're not just calculating for yourself, but for your kids too.

(image of problem visualization)

### User Interviews

To validate our concept, we began with a focus group I facilitated, followed by individual user interviews. Our goal was to confirm if this problem was real and identify its most painful aspects. We engaged 12 parents in the initial focus group and interviewed over 20 before starting any design work.

**User Quotes:**
- "When I put a 10:30 in my calendar, it's not actually a 10:30 - we have to leave at 9:45." — Adam, dad of 2
- "I'm not a teleporting unicorn, but my calendar thinks I am." — Zoya, mom of 3
- "The only enjoyable part of this is when an activity gets cancelled." — Katie, mom of 2

Our research confirmed the problem and highlighted five recurring pain points:
1. Coordinating people, places, and times
2. Managing departure times and necessary preparations
3. Adapting to unexpected changes
4. Collaborating within and across families
5. Maintaining an overall schedule

### Ideation and design

With our interview data synthesized, we moved into the ideation phase. We started by drafting requirements and sketching initial screen designs.

(image of ideation sketches)
(image of initial designs)

### Testing and iteration

Before moving to development, we conducted design testing using Figma's prototyping tool. This allowed us to validate our initial designs and make necessary adjustments.

**A concrete example: adding an activity**

A core feature of Orgo is activity addition. Below are four key iterations of our design, each informed by user feedback.

**Round 1**
Description of changes made in this iteration based on user feedback. Key improvements focused on usability and addressing pain points discovered through testing.
(image of Round 1 mockup)

**Round 2**
Description of changes made in this iteration based on user feedback. Key improvements focused on usability and addressing pain points discovered through testing.
(image of Round 2 mockup)

**Round 3**
Description of changes made in this iteration based on user feedback. Key improvements focused on usability and addressing pain points discovered through testing.
(image of Round 3 mockup)

**Round 4**
Description of changes made in this iteration based on user feedback. Key improvements focused on usability and addressing pain points discovered through testing.
(image of Round 4 mockup)

### The current product

Currently, Orgo has been live for about 90 days and has attracted approximately 500 registered users, all without a marketing budget. We're actively iterating towards product-market fit based on user feedback.

(video placeholder)

### Reflection

Building Orgo from concept to launch has reinforced several key lessons about product development and user-centered design:

**Start with the problem, not the solution**
Our extensive user research phase prevented us from building features users didn't need. By talking to over 20 families before designing a single screen, we understood the nuances of the scheduling problem and avoided common pitfalls.

**Iterate quickly, but deliberately**
Each iteration of our activity addition flow was informed by specific user feedback. Rather than making sweeping changes, we adjusted one or two elements at a time, allowing us to measure the impact of each decision.

**Balance founder vision with user needs**
While user feedback is invaluable, we learned that not every suggestion should be implemented. The key is understanding the underlying need behind the feedback and solving it in a way that aligns with the product vision.

**Design and development go hand-in-hand**
Wearing both the designer and developer hat allowed me to make informed tradeoffs between ideal design and technical feasibility. This dual perspective led to more practical solutions that didn't compromise on user experience.

**Next steps**
As we continue to refine Orgo, our focus remains on achieving product-market fit through continuous iteration and user feedback. We're committed to regular testing and updates, ensuring that each new feature or adjustment directly addresses user needs.

---

## WEBSTER BANK

### Summary

**TEAM**
- Me (designer, "implementer")
- Ryan Carey (UI designer, advisor)

**TIMELINE**
August - September 2022

**TASK**
Migrate Webster Bank's design system from Sketch to Figma.

**TOOLS & LANGUAGES**
Figma, Sketch, Miro, Excel

(image of summary)

### Background

**A design system revamp**

After joining Webster Bank in June of 2022, I noticed that they were in the process of migrating their design system from Sketch to Figma. However, progress on this migration had been limited, with the only step taken being a direct import of the Sketch design file into Figma.

Recognizing the potential benefits that a revamp of the design system could bring, I offered to lead the initiative and use my extensive knowledge of Figma, which I had gained through self-study. I jokingly called it the "Figmatization of Webster" and set out to give the team a design system we could be proud of.

### Final product

**Logical organization, scalability, and accessibility**

The design system is now fully integrated with Figma's capabilities, resulting in a more scalable and accessible system. A consistent naming convention and organization of colors and typography has been established, making it easier to identify, add, and categorize elements.

(image of final product)

For example, I standardized the buttons to align with industry best practices using features such as auto layout, constraints, absolute positioning, variants, and boolean properties. This made the system more adaptable and easy to update in response to future changes.

### Previous state

The design system in Sketch was a well-organized collection of nested symbols, but it didn't translate well to Figma. Despite the generally good setup, there were a few key areas that needed improvement.

**The Sketch UI library**
(image of Sketch library)

Firstly, there were a lot of redundant components due to Sketch's limitations. For example, there were two separate hero components - one with one link, and another with two, all other elements being identical. This meant that in order to change the hero's design, you would have to make identical edits to both components. By leveraging booleans properties in Figma, I could reduce the number of components and create a cleaner, more organized setup.

Additionally, certain components had unnecessary layers, adding to the clutter in the layers panel. Furthermore, there was an excessive number of text and color styles, which presented a challenge when it came to making the design system more manageable. Some styles were simply listed as "New Color Variable" and others numbered with no apparent logic to the numbering convention.

Lastly, the design system lacked smart layout features, making it a bit of a hassle to resize and move elements around. To fix this, I wanted to take advantage of Figma's powerful auto layout feature to make the design process a lot smoother.

### Scope definition

When reviewing the existing design system components, I noticed that not all of them were being used. I created an Excel sheet listing all of the components to better assess which were necessary and which were not. I also noted inconsistencies in the naming conventions and usage of certain components, such as several that skipped directly from "medium" to "extra large" when it came to sizing.

To address this, I used the spreadsheet to brainstorm and ideate on the necessary variants and property values for each component. This allowed me to create a set of necessary components and variants that were tailored to our specific needs. I also consulted with the other designers to ensure that my choices were in line with the overall design strategy.

(image of scope spreadsheet)

### Styles

In this design system revamp project, we focused on updating our color palette and typography to ensure accessibility and scalability. We adopted a naming convention for colors and used a contrast checker to test for accessibility. For typography, we sorted through existing styles and created categories for consistency and ease of editing. These changes simplified the hierarchy and ensured consistency throughout the design system.

**Colors: A colorful upgrade**

For styling, we wanted to update the color palette to make sure we had all the colors we needed and that they were accessible. To start this, we adopted a naming convention used by other well-established design systems where colors are defined by a letter representing their function (e.g., P = Primary) followed by a number. In our design system, the number 500 represents the base color, with lower numbers representing lighter shades and higher numbers representing darker shades.

To make sure our design system met accessibility standards, I used the contrast checker to test the neutral shades against our background colors. This helped us identify and implement color combinations that met these standards, something that wasn't given much attention before.

**Typography: Type-Rework**

In terms of typography, I sorted through the 143 Sketch styles and came up with four categories: Headings, Body, Body Sans, and Taxonomy. The usual body font was a serif font, but there were several places on the site where our heading font doubled as a body font (e.g., form text). In the previous design system, this alternate body font was spread out and ungrouped, making it hard to manage.

To fix this, I created the separate category "Body Sans," which not only simplified the hierarchy of text styles but also made it easier to design pages that used this font. I linked the styles to the components so that any change in a style would reflect across all components, ensuring consistency and making it easy to edit our design system.

### Components

The bulk of the work I did had to do with organizing the components. In my scope definition, I had defined the components and their variants, which was a great starting point. From there, I knew I needed to leverage Figma's formatting capabilities to come up with components that were pixel-perfect.

**Auto layout, constraints, and absolute positioning**

Auto layout in Figma simplifies responsive design by automatically resizing content based on the container or its own content, reducing tedious manual adjustments. In the old design system, we weren't using the similar feature in Sketch, so it was a great opportunity to finally implement it during the revamp.

**Atomic design: Smaller building blocks**

By breaking down our components into smaller, modular parts using the principles of atomic design, I was able to create a more flexible and efficient system. For example, our input component consisted of a label and a field, which allowed me to easily make changes that needed to be applied across multiple variants of the same component.

### Fixes

I made several updates to the design system, but there were two updates that had the highest impact. The first pertains to the accessibility of our color palette, specifically addressing the issue of dark gray text on a yellow background. The second update concerns the primary button style, where we made the decision to switch to a solid button style, in line with general design practices.

**Accessibility: Ensuring we meet color contrast standards**

An immediate fix I noticed had to do with the contrast ratio of some of our main components. Specifically, when we had what was called "Dark Gray" (#5F5F5F) on "Webster Yellow" (#FFD107), the text did not adequately contrast the background, and this had caused some accessibility issues on our public-facing site.

To solve this, I decided to make a slight change to our "Dark Gray" color. I re-established it as N700 instead of N600, which increased the contrast ratio to meet accessibility requirements. This little tweak made a big difference in ensuring our website is accessible to all of our users.

**Buttons: Building out our button component**

Second, in the previous state, Webster had been using a button with an outline (commonly called a "ghost button") as its primary button. This is inconsistent with general design practice - typically, primary buttons are solid colors.

The designers collectively made a decision that a solid blue button would be the primary one going forward. I took this opportunity to also define some hover, active, and focus states for the new buttons as there was no clear pattern to these states in the previous design system.

(image of button states)

### Tokens

Now that all of the components had been updated, we wanted to research design tokens to make our design system more scalable. To brainstorm, I made a list of all of the possible tokens within the Tokens Studio for Figma plugin (formerly Figma Tokens; fonts, colors, border radius, sizing, etc.) using a mind map in Miro.

Using this Miro board, I mapped our styles to specific tokens and aliases. For example, our primary blue color was labeled as "color-primary-dark" and also aliased as "color-background-dark" to specifically point out where that color is used throughout the design system.

As a first step in implementing these tokens, I organized our typography tokens, which are a composition of several other tokens such as font family and font size. This helped to simplify the hierarchy of text styles, making it easier to edit and maintain consistency throughout the design system.

(image of tokens)

### Next steps

There's still a lot of work to do in terms of building out the tokens and getting our developers to adopt Figma. However, this process allowed me to familiarize myself with the design system and its complexities, and it was a valuable opportunity to further develop my Figma skills. I look forward to scaling the system and making continuous improvements as we implement it.

**Design systems, when executed well, are incredibly valuable**
I found it interesting that by having a single input component, it could be applied to any input field needed. Additionally, utilizing tokens allows for easy scalability, and I'm excited to see them in action with our developers.

**Planning ahead was crucial for this process**
By taking inventory of the existing design system and mapping out a plan for its revamp, I was able to gain a comprehensive understanding of all its parts and sort them in a logical manner.

**Test, test, test**
This is a great first iteration, but it's important to continue testing and using the design system to identify areas for improvement and optimize it for our workflow. While it's off to a strong start, it's important to keep in mind that design systems are constantly evolving and there is always room for improvement.

---

## INKBENCH EZ MODE

### Summary

**TEAM**
Me (UI designer)

**TIMELINE**
September 2021

**TASK**
Convert wireframes to high-fidelity designs while incorporating insights from customer feedback and support requests.

**TOOLS & LANGUAGES**
Figma

(image of summary)

### Background

**What's Inkbench?**

Inkbench is a now-defunct brand management SaaS startup I worked for from May 2020 until May 2022. The startup aimed to address a common pain point for marketing teams in multi-location franchise or enterprise systems, where those distributing the marketing materials - primarily, franchisees - often "go rogue" and distribute off-brand materials because they're easy to make (think two-sentence memos printed on an 8.5 x 11 using Microsoft Word).

In Inkbench, a franchise could store their digital assets (logos, images, etc.) and tag them so they're easy to find. Then, they could use these assets in an in-platform design canvas, where they could make templates where certain elements are locked down and others open for customization. Then, administrators could push these templates to standard users.

The Inkbench dashboard was the first screen post-login. However, there were issues with the dashboard that made it not as useful as it could be. I was tasked with the UI design portion of a dashboard redesign.

### Final product

**Analytics and simplified template editing**

View the final prototype (link)

Though the designs were never developed due to Inkbench's shutdown, it was clear that users desired a dashboard with these capabilities. For many, it would have greatly reduced stress related to the distribution of branded materials by providing pre-approved options and significantly speeding up their workflow. Additionally, it would have allowed each franchise location to customize materials to their specific needs, reducing the need for one-off creations.

You can explore the prototype above to gain a better understanding of each aspect of the design.

**For franchisors, a true analytics dashboard**
(image of franchisor dashboard)

**For franchisees, a form-powered, always-on-brand template editor**
(image of franchisee dashboard)

**KEY FEATURES:**
- **Messaging system.** Franchisors can give their franchisees directions, materials, and customizable templates all in the same place.
- **Usage trends.** Detailed graphs that give franchisors a sense of platform engagement with the option to export as a PDF or CSV.
- **Pre-approved, locked-down templates.** Users can export immediately from the customization screen, eliminating any back-and-forth between franchisor and franchisee.

### Previous dashboard

I analyzed the previous dashboard to better understand the differences between that state and the wireframes that I had been given. It helped me identify areas for improvement and informed my decisions on future designs. I also used it to understand user needs and ensure the new design met their expectations.

**How it looked and worked**

The previous dashboard's goal was to provide the user with the most relevant items to them when they logged in. Administrators could pin certain brand assets or design templates to the dashboard for everyone to see, and support articles could be accessed at the bottom of the screen.

**THE PREVIOUS DASHBOARD**
(image of previous dashboard)

Key elements:
1. **Action buttons.** Search or open the Brand Library, or create a new project.
2. **Tabs setup.** The Home tab is the same across the Enterprise (i.e., everyone sees the same stuff). Approvals are projects pending approval, and favorites are assets or projects you've marked as special to you.
3. **Pinned items.** Administrators can "pin" items to the dashboard for everyone to see, access, and use.
4. **Support links.** Helpful Center articles to get started on the platform

**Untapped potential**

**THE DESIGN CANVAS**
(image of design canvas)

The initial dashboard design had good intentions but failed to meet user expectations. One major issue was that administrators and users were presented with the same screens despite having different goals.

For example, franchisees were looking for an easy way to customize a template and export it for distribution. However, many expressed frustration with the complex design canvas (pictured above). They often only needed to make small changes such as an address, color, or photo.

On the other hand, franchisors wanted to monitor franchisee activity and access analytics such as who had done what, when, and which templates were getting the most use. The current format did not provide these analytics even though they were available in the backend and sent out in weekly status reports to customer success employees. This led us to consider democratizing the data for administrator use in the redesign.

Overall, the dashboard redesign would be the largest single project in terms of added functionality and user impact that I had participated in yet.

**AREAS OF OPPORTUNITY:**
- **It's the same for everyone.** Franchisors and franchisees have very different goals when using the platform, but the first thing they see is identical. The different goals imply that seeing different things to cater to these goals may be helpful.
- **No oversight for franchisors.** Franchisors can't see what franchisees are doing. They want more oversight and insight into their platform usage-- what's being used, who's using it, and how the platform is being picked up.
- **Lack of communication ability.** While franchisors can pin items to the dashboard, there's no way to communicate what they want their franchisees to do or send them messages, requiring them to leave the platform to communicate.

### Analyzing the wireframes

I was tasked with converting wireframes to high-fidelity designs. Heather O'Neill, CEO of Pixels for Humans, created these wireframes after conducting in-depth interviews with our clients. To ensure a successful outcome, I needed to understand the design decisions made in the wireframes.

The wireframes consisted of two parts: the franchisor dashboard and the franchisee dashboard. The franchisee dashboard included a simpler templating functionality that avoided the need for using the more complex design canvas. The franchisor dashboard included a usage analytics section. In general, franchises were our target audience, but as a general use case, one dashboard is intended for administrators and the other for standard users.

**FRANCHISOR DASHBOARD WIREFRAME**
(image of franchisor wireframe)

Key features:
1. **Communication with franchisees.** Administrators can push content to users, such as messages and "recommendations" they can customize.
2. **Active users.** Active = has signed in and made one export, download, or print, for today, the last week, and the last month.
3. **Most active users.** (Excludes administrators) Who's done the most of the actions?
4. **Most active projects and templates.** What projects have the greatest number of unique users exporting them?
5. **Recently used projects and templates.** What is the most recent activity on the platform?
6. **Notifications.** A hub for updates about usage statistics, approval workflow requests, and messages from franchisees.

The wireframes were designed with two main principles in mind: 1) to enable franchisors to provide franchisees with all the necessary materials while monitoring their activity, and 2) to make it as simple as possible for franchisees to customize their designs. With this understanding, and armed with valuable insights gathered through customer success conversations, I proceeded with the UI design.

### UI Design

The UI design process was the majority of my work, and it required me to define a set of styles and apply them consistently throughout the product. By making adjustments to some functionality represented in the wireframes, I was able to better align the design with user expectations and incorporate any missing features.

**Defining design standards**

As Inkbench did not have an established design system in place, I took the initiative to create my own UI kit based on industry best practices and design principles. This helped ensure consistency and usability throughout the product, which is crucial for a positive user experience. Additionally, by following a set of design guidelines, I was able to create a more polished and user-friendly interface.

(image of UI kit)

**High-fidelity mockups**

Below are mockups of the three areas depicted in the wireframes: the franchisor dashboard, the franchisee dashboard, and the (affectionately titled) "EZ" templating feature. These mockups were created to provide a clear visual representation of the final product.

(image of franchisor mockup)
(image of franchisee mockup)
(image of EZ templating mockup)

**Key changes from the wireframes**

As I progressed through the UI design, I identified several opportunities to better meet user expectations and improve accessibility. As a result, certain areas of the high-fidelity UI differ from the wireframes. The two main changes I made involve EZ templating and the usage overview, and you can fully experience them in the prototype.

**Change 1: EZ templating → form**

WIREFRAME STATE: Clickable fields (outlined with a dotted, pink border below) that allow users to customize a template.
(image of wireframe)

PROBLEMS:
- **Accessibility.** The low visibility of these pink borders may cause confusion for users, as they may not be able to see the editable elements within the design.
- **Potential overwhelm.** The graphics that franchisees are often already detailed, and including borders on top of that could result in overwhelm and users contacting us to ask if the borders would be visible on export, creating additional workload for customer support.

HI-FI STATE: Instead of having clickable fields embedded within the graphic, I implemented a form-like structure for editing.
(image of hi-fi mockup)

HOW IT ADDRESSES THE PROBLEMS:
- **Fewer accessibility concerns.** The fields users can edit can be named by the template creator, helping to better identify them on the graphic and view their potential options in the form.
- **The preview is what you get.** Users can rest assured that whatever they see in the preview is exactly what they'll see on export.

**Change 2: Building out the usage overview**

WIREFRAME STATE: Each segment of the usage overview included a link to more in-depth analytics (inferred). No detailed screens showed these views.
(image of wireframe)

PROBLEMS:
- **Completeness.** To provide our developers with these mockups, it was necessary to define the destinations of these links.

HI-FI STATE: Each button opens a modal containing more in-depth views of the data.
(image of hi-fi mockup)

HOW IT ADDRESSES THE PROBLEMS:
- **Completion.** The screens exist! Woo!
- **Facilitates data analysis.** Giving the user the option to download as a PDF or CSV allows them to perform data analysis that is not native to Inkbench.

### Final UI

Below, you'll find a screenshot of the final UI design. To fully experience the product, I recommend exploring the prototype. The "user preview" button allows you to toggle between the franchisor and franchisee dashboard views.

It is worth noting that if Inkbench were still with us, I would have loved to conduct usability tests with our clients to validate some of the changes I made. This would have provided valuable insights and feedback and helped ensure that the final product met the needs of our users.

Overall, my goal was to create a user-friendly, efficient, and accessible product that would meet the needs of both franchisors and franchisees. I believe that the changes I made and the final UI design achieved this goal and would have been well-received by our clients.

(image of final UI)

**TAKEAWAYS:**
- **Participating in the research is something I want.** I regret not being able to participate in the initial research process, as it made the project more challenging for me. However, it was a great learning experience and an opportunity for me to test and strengthen my skills.
- **Design systems are important.** The absence of a pre-existing design system presented an additional challenge for the project and required me to create one from scratch. This introduced me to new concepts, such as atomic design, and allowed me to expand my design knowledge.
- **Communication with developers is essential.** Designing within technical constraints is crucial, and I collaborated with developers to ensure the feasibility of my design.

---

## ORGO: THE BRAND

### Summary

**TEAM**
- Me (Founder and Principal Designer)
- Zoya Lehrer (Founder and CEO)
- Christiana Davies (Design Advisor)

**TIMELINE**
June 2023 - Present

**TASK**
Create a brand for a B2C mobile app.

**TOOLS & LANGUAGES**
Figma, Illustrator, After Effects, React Native

Orgo is a mobile app that streamlines personal logistics—ensuring the right people get to the right places on time. While our initial focus is on busy families, the app's utility extends to various scheduling scenarios. As a co-founder, I contributed across multiple areas: brand creation, marketing site design, and app design and development.

This case study outlines the journey of creating Orgo's brand identity and web presence from scratch. I created the original logo files, and, using Webflow, I personally designed and built each iteration of our site. The process unfolded in several key stages:

1. **Brand Creation:** Developing our logo and visual identity
2. **Initial teaser site:** A minimalist web presence during stealth mode
3. **Expanded teaser site:** An enhanced site with more information, still pre-launch
4. **Launch Site:** Our current website, featuring app visuals and a download CTA

Throughout this process, I adapted our online presence to match Orgo's development stages, from building anticipation to driving app adoption. My hands-on approach ensured consistency across our brand and web presence at every step.

### Brand creation

Our journey began with finding the perfect name. After exploring various options, we landed on 'Orgo'. This name resonated as a clever derivative of 'organization on the go', and our target audience found it appealing and memorable. Importantly, both the domain and App Store names were available. We deliberately avoided terms like 'fam' or 'kids' to ensure our brand could expand beyond our initial family-oriented use case. Feedback from potential users described the name as 'super cute', which we saw as a positive sign for its broader appeal. With our name in place, we moved on to the crucial task of logo design.

**Logo development**

We centered our logomark on a circular shape, echoing the leading 'O' in Orgo. Our goal was to incorporate elements of time, driving, or movement within this form, reflecting our app's core functions. Through multiple iterations, we explored various designs, trying to balance simplicity with meaningful representation of Orgo's purpose.

(image of logo iterations)

Parallel to logomark development, we crafted a complementary wordmark and color scheme. We tested various typographic styles, prioritizing readability based on user feedback. Simultaneously, we explored vibrant color combinations using orange, yellow, and blue to create an appealing palette that aligned with our brand vision.

(image of color/typography explorations)

Our breakthrough concept centered on the transition from chaos to order. We designed the 'O' in Orgo with a fragmented left side evolving into a whole right side, symbolizing this transformation. This design represented our app's purpose: bringing order to chaotic schedules.

(image of chaos to order concept)

For the remaining letters 'rgo', we kept the design clean and whole, ensuring readability. This approach addressed user preferences for clarity while complementing the dynamic 'O' concept.

**THE FINAL LOGO**
(image of final logo)

The final Orgo logo embodies our core concept through its thoughtful design:
- The 'O' transitions from fragmented to whole, representing the shift from chaotic schedules to organized routines
- The circular shapes evokes ideas of time, cycles, and continuous improvement
- Clean, readable typography in 'rgo' balances the dynamic 'O', ensuring clarity and brand recognition

### Initial teaser site

Our initial web presence aimed to generate interest and build a waitlist while maintaining a level of stealth. We created a flashy, exciting, and professional site without revealing app images, using animations to engage visitors and lead them to the waitlist. Our target audience was primarily our professional network and potential consumers, reached through LinkedIn and Facebook groups.

The site featured a 20-second animated introduction:
1. **Text messages:** Building tension with real family scheduling messages
2. **Brand introduction:** Our logo 'absorbing' messages, symbolizing clarity
3. **Brand explanation:** Revealing our concept of 'order out of chaos' and 'organization on the go'
4. **Waitlist signup:** A focused CTA on a non-scrollable page

This approach allowed us to drum up interest, begin building accountability to potential users, and introduce our brand concept in an engaging way.

View the teaser site (link)

(image of teaser site)

The site proved highly effective in capturing attention. We received numerous compliments and observed audible laughs during the text buildup, as well as 'aha' moments when people realized the meaning behind Orgo. Over two months, we garnered over 300 signups, a satisfying result for our teaser site approach.

### Expanded teaser site

As we approached launch, we recognized the need to evolve our web presence. This new iteration had two primary objectives: provide more detailed information to our waitlist members and capture the interest of potential investors. While not actively fundraising, we aimed to establish a meaningful presence in the investment community. This expanded site allowed us to build upon our initial narrative and showcase more of Orgo's potential.

We established specific goals for this iteration of the site:

| Goal | Action plan |
|------|-------------|
| Continue waitlist growth | Maintain the signup form from the previous site as the primary CTA |
| Articulate the problem | Highlight the challenges of managing children's calendars, emphasizing the inefficiencies of current tools |
| Introduce our solution | Draw parallels between the identified problems and our solution, without revealing specific features or app screenshots |

With these goals in mind, we focused on designing an impactful hero section, recognizing it as the most crucial element for driving conversions. We mocked up several options to find the most effective approach.

(image of hero section mockups)

Eventually, one concept emerged as the clear winner:

View the expanded teaser site (link)

(image of expanded teaser site)

This design resonated with our audience for several key reasons. The appealing color scheme caught viewers' attention, while a dynamic, rotating H1 headline maintained their interest. Our engaging storytelling approach effectively communicated our value proposition.

Below the hero, we structured the content to reinforce our message:
1. **Problem orientation:** Clearly articulating the challenges in family scheduling
2. **Limitations of current tools:** Highlighting the shortcomings of existing solutions
3. **Orgo's solutions:** Drawing direct parallels between each limitation and how Orgo addresses it

This comprehensive approach deepened understanding among those already familiar with Orgo, clarifying both the problem we were addressing and our solution. The enhanced design and content structure served their purpose well, generating increased engagement and interest in our product during the development phase.

### Launch site

As we prepared to launch our app, we recognized the need for a website that would effectively showcase Orgo and drive downloads. We set three primary goals for this iteration:

| Goal | Action plan |
|------|-------------|
| Drive downloads | Implement direct download links, with QR codes for desktop users to easily access the mobile app |
| Explain the problem | Refine our problem statement based on feedback, maintaining the core message from our previous site while adding more specific details |
| Provide app overview | Lead with app functionality, showcasing specific screens and explaining key features |

This approach aimed to create a seamless transition from website visitor to app user, while providing a clear understanding of Orgo's value proposition and functionality.

View the current site (link)

(image of launch site)

### Next steps

Our launch site is effectively driving downloads and showcasing Orgo. However, we're aware that for mobile apps, websites aren't typically the primary conversion driver. With this in mind, we're content with the site's current performance and are now focusing on other channels for user acquisition.

We periodically review the site to ensure it aligns with our evolving product and brand. This includes updating app screenshots and feature descriptions to accurately reflect Orgo's current functionality. While no longer our primary focus, the website remains a valuable component of our overall marketing strategy, serving as a reliable information source for potential users and partners.

---

## NEWPORT IN BLOOM

### Summary

**TEAM**
Me (researcher, designer, developer)

**TIMELINE**
April - May 2022

**TASK**
Design and develop a site that combines Newport in Bloom with the Daffodil Days Festival.

**TOOLS & LANGUAGES**
Figma, Adobe Illustrator, WordPress, Elementor Pro, CSS & HTML

(image of Newport in Bloom mockup)

### Background

**"Two" many sites**

Newport in Bloom and Daffodil Days are nonprofits committed to beautifying Newport, Rhode Island, with flowers. Newport in Bloom hosts city events, and Daffodil Days is a festival to celebrate the daffodils they plant in fall, which bloom every April. These two groups have significant membership overlap and wanted to combine their websites. Specifically, the Newport in Bloom site wanted to absorb Daffodil Days.

**Newport in Bloom: Before**
(image of before Newport in Bloom)

**Daffodil Days: Before**
(image of before Daffodil Days)

### Final product

**A new brand, consolidation, intuitive structure, and responsivity**

The design system is now fully integrated with modern web capabilities, resulting in a more scalable and accessible system.

View the live site | Figma prototype

**RESULTS:**
- **Website costs cut in half.** The hosting costs for the Newport Daffodil Days site were eliminated, and having all the information in one place simplifies their web hosting process.
- **A reorganized site map.** This simplified website updates and improved user navigation. The redesign was tailored to the needs of the new Newport in Bloom webmaster and the users who would visit the site.
- **An opportunity to show off their new brand.** They feel proud and happy to put their new logo on their stationery, flyers, and posters!
- **Full responsivity.** Whatever device you're viewing the site on, its layout makes sense and adjusts to fit the screen.

### Research

Before beginning the design process, I formulated a set of research questions to guide my investigation. These questions pertained to the current websites, the users, and the goals of the committees. The guiding questions were:

- What are the current purposes of the sites?
- Why do stakeholders want the sites merged and redesigned?
- What do people think of the current sites?
- Has anyone ever visited these sites? If so, why?
- How do other nonprofits structure their sites?

**Stakeholder interviews: Getting to know the organizations**

First, I needed to understand who and what I was working with-- what do committee members want, why do they want it, and what are the sites like now? I talked to three committee members and the Newport in Bloom webmaster to figure this out.

**User interviews: Gathering user perspectives**

With a clear understanding of the committees' goals, I conducted user research by interviewing 6 individuals, evenly divided between those who had participated in Newport in Bloom events (gardeners) and those who had not (non-gardeners). The aim was to gain insights into their goals and needs.

**Peer analysis: Analyzing navigation and site structure**

I analyzed 20 nonprofit websites to understand the common components and site structures. I found two common approaches to designing nonprofit homepages.

**Strategy 1: Blatant call to action, not much information**
This strategy presents a blatant call to action (donate, volunteer, etc.) without giving you much information about the organization. It's a more visual experience-- the site "grabs you" with imagery and a lack of words.
(image of Strategy 1 example)

**Strategy 2: More info about the organization**
This strategy provides more information about the organization. More words, more sections, more info that might be found in the "about" page. Calls to action are usually in the navigation bar and less obvious on the page itself.
(image of Strategy 2 example)

**TAKEAWAYS:**
While both types of sites displayed the information users were likely to want to find, they differed in the amount of clutter. I knew from stakeholders that Newport in Bloom wanted their site to be image-heavy, but I also knew from the research that they wanted to share their story and mission with everyone who landed on the site.

It was important to **find a balance where the home page could tell their story but also avoid text-heavy chunks.**

### Define

The goals were ambitious: I had to combine two nonprofit websites, make a better user experience, implement Newport in Bloom's new brand, and make the site responsive to tablet and phone screens. Once the research was concluded, I synthesized the results to define two design goals. These goals specifically targeted the aspects I wanted to prioritize in order to create a more user-friendly site.

**Goal 1: Minimize site clutter and streamline content across all pages.**
The main issue with the current sites (particularly the Newport in Bloom site) is that there is too much to sift through to find the information a user wants. Ultimately, all types of users want simple information. The way the old site presents itself does not help users do this. I will design this site to guide every category of users toward the information that would be most relevant to them-- quickly and clearly.

**Goal 2: Design the site to be accessible on multiple devices.**
I heard from a couple people that they wished these sites looked good on their phones. The site should be fully accessible on phones, tablets, laptops, and desktops. I chose to follow a mobile-first design process in order to ensure responsivity.

**Content and structure: Merging and reorganizing**

I evaluated the existing content to find what should stay and what should go. This was very collaborative with the stakeholders: I made some recommendations, they made some recommendations, and we worked toward a final site map.

**BEFORE: TWO SITES**

Newport in Bloom:
- Home
- About Us
- Beautification Projects
- Adopt-A-Spot
- How You Can Help
- Events
- Calendar
- Gallery
- Contact Us

Daffodil Days:
- Home
- Festival Events
- Photo Contest
- About Us
- Support Our Mission
- Contact

**AFTER: ONE CONSOLIDATED SITE**
- Home
- About
- Beautification Projects
- Daffodil Days Festival
- Gallery
- Get Involved
- Contact

(image of site map)

### Design

With a clear understanding of the goals, I began the design process. I started with wireframes to establish the structure and flow, then moved into high-fidelity mockups that incorporated Newport in Bloom's new branding.

**Wireframes: Establishing information hierarchy**

I started by sketching out initial ideas for the home page layout. These rough sketches helped me quickly iterate on different approaches to organizing the content.

(image of paper wireframes)

After sketching, I created digital wireframes in Figma. I focused on mobile-first design to ensure the site would work well on all devices.

(image of mobile wireframes)
(image of desktop wireframe)

**Styling: Implementing the new brand**

Newport in Bloom had recently worked with a graphic designer to create a new logo and brand identity. My task was to take this new branding and apply it to the website design.

**BRAND ELEMENTS**

Colors:
(color swatches)

Typography:
Primary: Montserrat
Secondary: Open Sans

(image of high-fidelity home page)
(image of mobile/tablet mockups)

### Test

Before finalizing the design, I conducted usability testing to identify any issues and ensure the site met user needs. I tested with both gardeners and non-gardeners to get a comprehensive understanding of the user experience.

**Usability testing: Finding pain points**

I conducted moderated usability tests with 5 participants (3 gardeners, 2 non-gardeners). Each participant was given a series of tasks to complete while thinking aloud. I observed their behavior and noted any points of confusion or frustration.

**TEST TASKS:**
1. Find information about the Daffodil Days Festival
2. Learn how to get involved with Newport in Bloom
3. View photos from past events
4. Find contact information
5. Navigate to the about page

(image of usability testing)

**KEY FINDINGS:**
- **Navigation confusion:** 2 participants struggled to find the Daffodil Days information, expecting it to be more prominent.
- **Gallery location:** Participants expected the gallery to be in the main navigation rather than a subpage.
- **Mobile menu:** The hamburger menu icon was too small on mobile devices.
- **Call to action visibility:** Users wanted more prominent buttons for "Get Involved" and "Donate".

**Priority fixes: Addressing usability issues**

Based on the usability testing results, I prioritized the issues and made the following changes:

**Fix 1: Improved navigation hierarchy**
Made "Daffodil Days Festival" a top-level navigation item instead of hiding it under "Events".
(image of before/after)

**Fix 2: Larger mobile menu icon**
Increased the hamburger menu icon size from 24px to 40px for better tap targets on mobile.
(image of before/after)

**Fix 3: More prominent CTAs**
Added larger, more colorful buttons for key actions like "Get Involved" and "Donate" on the homepage.
(image of before/after)

### Final UI

After incorporating feedback from usability testing, I finalized the design and developed the site using WordPress and Elementor Pro. The final product is a fully responsive, accessible website that successfully combines Newport in Bloom and Daffodil Days.

(image of final home page)
(image of mobile screens)
(image of desktop pages)

**REFLECTION:**
This project taught me the importance of balancing stakeholder desires with user needs. While the Newport in Bloom committee had strong opinions about what they wanted, user research revealed some different priorities. By combining insights from both groups, I was able to create a solution that satisfied everyone.

The mobile-first approach was crucial to the project's success. By starting with the most constrained layout, I ensured that the content hierarchy was clear and that the site would work well on any device. This also made the development process much smoother, as I could progressively enhance the experience for larger screens rather than trying to retrofit responsive behavior later.

---

## BEELINE

### Summary

**TEAM**
Me (researcher, designer)

**TIMELINE**
February - March 2022

**TASK**
Design an end-to-end mobile app to make grocery shopping easier and more efficient.

**TOOLS & LANGUAGES**
Figma, Adobe Illustrator, Lucidchart

### Background

**A hypothesis about grocery shopping**

**Grocery shopping can be a bit of a hassle**, but have you ever wondered **why** that is? I set out to find the **root of the problem** and see if I could make the experience a little more pleasant.

My **hypothesis** was that the **difficulty of finding items in the store** was a big part of the problem. So, I set out to **validate this hypothesis** and **create a solution** that would make that aspect of grocery shopping a breeze.

### Final product and results

**Frictionless food finding**

Figma prototype (link)

(image of Beeline app)

In this example, I have to do my **Thanksgiving shopping at Stop and Shop**. I've already made a list, and I'm in the store, but **I'm having trouble finding the flour.** I use the app to look at the store map to **find that item's location.**

**RESULTS:**
- **Real-time item information.** See and mark whether an item is in stock and access a complete nutrition label.
- **Store map.** Can't find an item? Just look at the map. It'll tell you exactly where it is.
- **Your list, mapped out.** See where all the items on your list are on an accurate store map.
- **The most efficient path.** The app will show you the most efficient path to gather all the items on your list, so you can get in and out of the store quickly.

### Research

This was a **generative research process** - I didn't quite know if people hated grocery shopping or, if they did, why people hated it. So, I came up with a **set of questions** to generate some answers.

- Is finding items in stores difficult? (**problem validation**)
- How do people **find things in stores they've never been in**?
- (How) Do **other apps/stores** solve the problem?
- Do people use **shopping lists**? If so, how?
- What, in stores, **helps shoppers find items**?

**User interviews: Gleaning insights through interviews**

First, I needed to **validate the problem**. I did this by **interviewing potential users**: those who go grocery shopping.

It turns out **people generally dislike grocery shopping**, and their most significant pain point is **when they can't find something**. They'll **usually use brute force** to find the item, which is often slow. They want to be guided in the right way and save time.

**User perspectives:**

"When I can't find an item, I walk up and down aisles where it might be. Customer service is far away, so it takes less time to go up and down all the aisles. And I feel really, really frustrated." — Sandy, age 59

"I get wicked frustrated if it takes longer than normal to find something. If I can't find it in 5 minutes, I'll get pissed and ask someone near me or find a worker." — Conner, age 23

"If I can't find something, I give up. I don't think I've ever asked someone for help--it feels embarrassing. I'm very determined to find things by myself and feel stupid if I can't." — Juliana, 22

**TAKEAWAYS: USER INTERVIEWS**
- **People dislike grocery shopping.** Common complaints included that items are sometimes hard to find, it feels like a chore, and it takes a lot of time.
- **People feel frustrated when items are hard to find.** Whether the item isn't where it's expected or out of stock, every participant said the word "frustrated" when asked to think about the last time an item was hard to find. One even said she usually wants to scream.
- **Typically, brute force is the algorithm for a hard-to-find item.** People will look for an aisle they think matches what they're looking for and then will look at every item on the aisle until they recognize a color, logo, or packaging.

**Competitor analysis: Understanding the market landscape**

**I couldn't find anyone who alleviated the exact pain point** I was trying to target. Still, **I found some awesome apps** (some of which I will undoubtedly use in the future) that gave me insight into what's already out there.

**TAKEAWAYS: COMPETITOR ANALYSIS**
- **Inventory and location information is often readily available.** This information is necessary for employees to restock shelves, and tons of stores' shopping apps share this information with customers.
- **Item information is essentially standardized.** There is specific information required to be disclosed about food items, especially on the nutrition label. Most also include aisle number, price, and unit price.
- **Most apps focus on either sales or lists.** The closest I could get to solving users' primary pain point was with the Target app, but most of the apps I found focused on saving money or just keeping lists.

### Define

After conducting research, I **defined the key features and functionalities of the app**. I created a **user flow** to ensure the most efficient and streamlined experience for users. I also **outlined the specific requirements** for the app to meet the needs of the target market.

**User flow: Mapping out the shopper's journey**

I defined two cases where the user may use the app:
1. **As a list-keeping app.** This includes assigning a store to a list, adding items to that list, and checking off those items as you go along.
2. **As an item locator.** You just want to find a hard-to-locate item-- you don't want to make a list.

**USER FLOW**
The flow allows users to either **shop with a pre-made list** or **search for a specific item** and ends when all items on the list have been located or when the user has found the item they were searching for.
(image of user flow)

**Product requirements: Clarifying the product vision**

I came up with **six high-level sections** to wireframe and test based on feature brainstorming and flows from the persona's tasks.

| Area | High-level requirements |
|------|------------------------|
| Log in / sign up | Allows user to create or access an account |
| All lists | Allows user to see all lists they have and create new lists |
| Single list | Allows user to view a single list and its associated information |
| Shopping mode | Allows user to indicate that they're shopping from a specific list and to be guided through the store |
| Search | Allows user to enter keywords to search for items at a specific store |
| Account | Shows information about a user's account, including sharing capacities and list history |

With the product and its requirements defined, I began to design.

### Design

Designing a product is a delicate balance of form and function. I began my design process by creating **wireframes using Figma** to map out the user interface and ensure an efficient user flow. With the foundation of the user interface in place, I then set about **creating a unique brand**, including the development of a logo, brand colors, and typography. I used these branding elements **to style the wireframes and bring the app to life** visually, ensuring a cohesive and consistent look and feel throughout the user experience.

**Wireframes: Creating the blueprint**

View wireframes in Figma (link)

My wireframes served as a **blueprint for the final product** and as a **tool to test and iterate** on the user flow and interface design.

(image of wireframes)

**Styling: Creating the brand**

Because I was making this app, **I decided to name it Beeline**, as the idea is that **you can use it to go directly to the items you need**.

**LOGO DESIGN**
The three hexagons represent a beehive, and the colors are meant to be warm but also clean.
(image of logo)

I made a **general UI kit** following the logo creation based on common elements from my wireframes.

**COLORS AND TYPOGRAPHY**
**I considered using yellow as the primary color** to match the "bee" theme, but I realized that **it could be challenging** to use consistently and may not always look great. Instead, **I decided to use a dark blue instead** and use yellow as an accent color for a more cohesive and visually pleasing design. I also chose a **clean, sans-serif font** to look good on mobile devices.
(image of colors/typography)

**I applied the UI kit to the wireframes** to come up with a first-round version of how the app may look.

(image of styled mockups)

Below is a mockup of **a single list** and its **associated map view**. Annotated are a few design decisions I made in the process.

**DESIGN DECISIONS**
(image of annotated mockup)
- The primary blue was used for buttons and the bottom navigation. Because it was a dark color, it generally stood out from the rest of the design.
- I chose to use a variation of a ghost button for the secondary button style to keep some contrast but to not overtake the primary actions.
- I found it difficult to incorporate the accent color into the design; one place I did was to represent the active tab.
- One change I made from the wireframes was to include a swipe-to-view (similar to Photos in iOS) of the grocery items on their list.

### Test

Bringing a product to market is a iterative process that requires constant testing and refining. I conducted usability testing to gather feedback on the app's user interface, navigation flow, and overall user experience. Based on the feedback, I identified and prioritized the key usability issues that needed to be addressed. Using the results of the testing, I was able to iterate on the design and make improvements to the user experience, ensuring that Beeline was as user-friendly and efficient as possible.

**Usability testing: Putting it to the test**

I conducted usability tests with six participants over two days. To do this, I came up with seven core tasks and had participants click through the Figma prototype.

(table of usability test results)

Generally, the app was easy to navigate, and there was 100% direct success on every task besides one: find the flour at Stop & Shop. The expected behavior involved swiping to the left on the preview list at the bottom of the screen. I hypothesized two reasons why this could have happened:

- The prototype was on a computer. This was primarily because the testing took place over Zoom, and swiping isn't natural on computers.
- The prototype was finicky. Some users tried to drag and got "halfway" through the swipe before releasing, resetting the preview bar to its original position. Sometimes, I dragged, and the list didn't move at all.

I tested these hypotheses by recruiting a few in-person volunteers to perform that specific task on a mobile device. They passed with flying colors, so I determined that it was not a priority fix.

(image of testing)

**TAKEAWAYS: USABILITY TESTING**
- Generally, the app was easy to navigate, and there was 100% direct success on every task besides one: find the flour at Stop & Shop.
- Map view required some further exploration. A few issues and questions on that page led me to review that screen for clarity and consistent functionality.

**Priority fixes: Areas of opportunity**

The core tasks of the usability testing didn't uncover any major problems, but after watching the Zoom recordings and going over my notes, I saw two areas of opportunity. So, I focused on those to improve the overall experience for users.

**Fix 1: Show auto-sort more visibly**

PREVIOUS STATE: Users believed that the items were listed in the order in which they were added to the list, like a queue.
(image of previous state)

PROBLEMS: Users were not aware that the list was already sorted in an efficient shopping order. They saw a collection of location icons but didn't understand that the order had been optimized for them.

REVISED STATE: I included a "path" toggle in the map view, which would highlight the path to take to find the items in their list, from the store entrance.
(image of revised state)

- Added "path" toggle that turns on or off the highlighted path
- Highlighted path with directional arrows

HOW IT ADDRESSES THE PROBLEM: The path guides users through the store as they would see on a map, using arrows to show them the most efficient route and making it clear which item they should pick up next.

**Fix 2: Item checkoff in each view**

PREVIOUS STATE: Users can only view - not check off - items once they expand the map.
(image of previous state)

PROBLEM: General inconsistency caused confusion. Users expected to be able to check off items in this view.

REVISED STATE:
(image of revised state)

- Added checkbox in expanded map view to facilitate item check-off

HOW IT ADDRESSES THE PROBLEM: Increases consistency. This better aligned with user expectations and didn't unnecessarily restrict functionality.

### Final UI

Figma prototype (link)

Here's a preview of the final UI after integrating the priority fixes. Because this is a concept, there are no next steps. But I do believe that this is a significant pain point and would love to have this solved. It would be interesting to see it become part of some existing grocery store shopping initiatives, such as Amazon Go. Although, I think if I showed a developer this, they may cry once they see the map view, and I'd love to ideate alternatives to my first priority fix. I share some more concrete takeaways below.

(image of final UI screens)

**TAKEAWAYS: FINAL UI**
- **I like constraints.** This was a fun project, but I felt a bit lost when it came to thinking about what was feasible and what wasn't. There is some intrinsic allure to being able to do anything you want, but if it's not realistic, it's not as fun. I want to create tangible things with real impact.
- **In-depth documentation makes everything so much easier.** I've always enjoyed being thorough, but being clear about my requirements made the design process more manageable because I was never scared of missing anything. I felt on top of the project at all times.
