export type Script = {
  id: string
  category: "first-contact" | "qualifying" | "booking" | "objection" | "follow-up" | "post-visit" | "bonus"
  channel: "WhatsApp" | "Instagram DM" | "Both"
  title: string
  body: string
  hinglish: string
}

export const scriptCategories = [
  { key: "first-contact" as const, label: "First contact" },
  { key: "qualifying" as const, label: "Qualifying" },
  { key: "booking" as const, label: "Booking & Scheduling" },
  { key: "objection" as const, label: "Objection handling" },
  { key: "follow-up" as const, label: "Follow-up" },
  { key: "post-visit" as const, label: "Post visit" },
  { key: "bonus" as const, label: "Bonus scripts" },
]

export const scripts: Script[] = [
  // ─── First contact ───────────────────────────────────────────
  {
    id: "fc-1",
    category: "first-contact",
    channel: "Instagram DM",
    title: "When someone DMs from a Reel",
    body: `Hey [name]! Thank you so much for reaching out 💜

I'd love to help you with [skin concern they mentioned]. To suggest the right treatment, could you share:

1. Your age range
2. Any current skincare routine
3. Anything you've tried before that didn't work

Once I have these, I'll share 2-3 options that could genuinely help.`,
    hinglish: `Hey [name]! Message karne ke liye bahut shukriya 💜

Aapki [skin concern] mein help karna chahenge. Sahi treatment suggest karne ke liye thoda batayein:

1. Aapki age range kya hai?
2. Koi skincare routine follow karte hain?
3. Pehle kuch try kiya jo kaam nahi aaya?

Yeh pata hone ke baad main 2-3 achhe options share karunga/karungi.`,
  },
  {
    id: "fc-2",
    category: "first-contact",
    channel: "WhatsApp",
    title: "First WhatsApp reply",
    body: `Hi [name], thanks for messaging us at [clinic name].

We'd love to understand your goals before recommending a treatment. Could you share:

1. Your main skin concern
2. Whether you'd prefer a one-time treatment or a longer plan
3. A photo of the area, if you're comfortable

Looking forward to helping you 🌸`,
    hinglish: `Hi [name], [clinic name] mein message karne ke liye dhanyavaad.

Treatment suggest karne se pehle thoda samajhna chahenge. Kya bata sakte hain:

1. Main skin concern kya hai?
2. Ek baar ka treatment chahiye ya thoda lamba plan?
3. Agar comfortable hain toh affected area ki photo share karein

Aapki help karne ka intezaar rahega 🌸`,
  },
  {
    id: "fc-3",
    category: "first-contact",
    channel: "Instagram DM",
    title: "Story reply — product question",
    body: `Hey [name]! Great question on our story.

For [concern], we'd actually recommend a treatment over a product — here's why: topicals address the surface, while our protocols work at the root.

Want me to share what that would look like for your skin type?`,
    hinglish: `Hey [name]! Story pe achha question poocha!

[Concern] ke liye hum product se zyada treatment recommend karenge — reason yeh hai: product sirf upar se kaam karta hai, hamare protocols root se theek karte hain.

Aapki skin type ke hisaab se main detail share karoon?`,
  },
  {
    id: "fc-4",
    category: "first-contact",
    channel: "WhatsApp",
    title: "After a walk-in inquiry",
    body: `Hi [name], lovely meeting you at the clinic today!

As promised, here's a quick summary of what we discussed:
• Concern: [concern]
• Suggested treatment: [treatment]
• Estimated sessions: [X]
• Starting price: ₹[X]

Whenever you're ready to take the next step, just reply here and we'll book you in.`,
    hinglish: `Hi [name], aaj clinic mein milke achha laga!

Jaisa promise kiya tha, yeh raha jo humne discuss kiya:
• Concern: [concern]
• Suggested treatment: [treatment]
• Kitne sessions: [X]
• Starting price: ₹[X]

Jab bhi ready ho jaayein, bas yahan reply karein aur hum booking kar denge.`,
  },

  // ─── Qualifying ──────────────────────────────────────────────
  {
    id: "qual-1",
    category: "qualifying",
    channel: "Both",
    title: "Budget qualifier",
    body: `That makes total sense, [name].

For [concern], we have:
• A starter plan (₹X) — single session, mild results
• A core plan (₹Y) — 4 sessions, visible transformation
• A premium plan (₹Z) — 8 sessions + homecare, full reset

Which one feels right for where you are right now?`,
    hinglish: `Bilkul samajh aata hai, [name].

[Concern] ke liye hamare paas yeh options hain:
• Starter plan (₹X) — ek session, halke results
• Core plan (₹Y) — 4 sessions, clearly visible results
• Premium plan (₹Z) — 8 sessions + homecare, complete transformation

Abhi ke hisaab se kaunsa sahi lagta hai?`,
  },
  {
    id: "qual-2",
    category: "qualifying",
    channel: "Both",
    title: "Timeline qualifier",
    body: `Quick question — when would you ideally like to see the result by?

If it's:
• Within 4 weeks: we'd start with [treatment A]
• Within 3 months: [treatment B] gives you longer-lasting results
• 6+ months: we'd build a custom protocol

Knowing this helps me suggest something realistic.`,
    hinglish: `Ek quick question — aap kitne time mein result dekhna chahte hain?

Agar:
• 4 weeks mein: [treatment A] se start karein
• 3 months mein: [treatment B] zyada lasting results deta hai
• 6+ months: ek custom protocol banayenge

Yeh pata hone se main realistic suggestion de sakta/sakti hoon.`,
  },
  {
    id: "qual-3",
    category: "qualifying",
    channel: "Both",
    title: "Previous treatment check",
    body: `Before I suggest anything, quick question — have you tried any treatments for [concern] before?

This helps me avoid recommending something that hasn't worked and find what will actually move the needle for your skin.`,
    hinglish: `Kuch suggest karne se pehle — kya aapne pehle [concern] ke liye koi treatment try kiya hai?

Isse main woh cheez suggest karne se bach sakta/sakti hoon jo kaam nahi aayi, aur jo actually aapki skin ke liye kaam karega woh dhundh sakta/sakti hoon.`,
  },
  {
    id: "qual-4",
    category: "qualifying",
    channel: "WhatsApp",
    title: "Skin type check",
    body: `To make sure we recommend the right treatment, could you tell me a bit about your skin?

• Is it oily, dry, combination, or sensitive?
• Any known allergies to skincare ingredients?
• Are you currently on any medication (especially for acne or hormones)?

Once I have these, I can tailor the suggestion properly.`,
    hinglish: `Sahi treatment suggest karne ke liye, thoda skin ke baare mein bataiye?

• Skin oily, dry, combination ya sensitive hai?
• Kisi skincare ingredient se allergy hai?
• Koi medication le rahe hain abhi (khaaskar acne ya hormones ke liye)?

Yeh pata hone ke baad suggestion properly tailor kar sakta/sakti hoon.`,
  },
  {
    id: "qual-5",
    category: "qualifying",
    channel: "Both",
    title: "In-person vs. virtual check",
    body: `We can help you in two ways:

1. Virtual consult (free, 15 min) — great if you're exploring options
2. In-clinic consult (₹[X], redeemable against your treatment) — better if you want a hands-on skin assessment

Which feels right for where you are right now?`,
    hinglish: `Hum aapki do taraf se help kar sakte hain:

1. Virtual consult (free, 15 min) — agar abhi sirf options explore karna chahte hain
2. In-clinic consult (₹[X], treatment mein adjust ho jaata hai) — agar properly skin assessment chahiye

Abhi ke hisaab se kaunsa theek lagta hai?`,
  },

  // ─── Booking & Scheduling ────────────────────────────────────
  {
    id: "book-1",
    category: "booking",
    channel: "Both",
    title: "Consultation booking",
    body: `Great! Based on what you've shared, I think a consultation would be the best next step.

We currently have:

Tuesday 4:00 PM
Wednesday 11:00 AM
Thursday 6:30 PM

Which works best for you?`,
    hinglish: `Perfect! Aapne jo share kiya usske hisaab se, ek consultation sabse best next step hoga.

Abhi yeh slots available hain:

Tuesday 4:00 PM
Wednesday 11:00 AM
Thursday 6:30 PM

Kaunsa aapke liye convenient rahega?`,
  },
  {
    id: "book-2",
    category: "booking",
    channel: "Both",
    title: "Appointment confirmation",
    body: `You're all set for [date/time].

Clinic Address: [address]

Please arrive 10 minutes early. If you need to reschedule, just reply here.`,
    hinglish: `[Date/time] ke liye sab set ho gaya hai!

Clinic Address: [address]

Kripaya 10 minute pehle aa jaayein. Reschedule karna ho toh bas yahan reply karein.`,
  },
  {
    id: "book-3",
    category: "booking",
    channel: "Both",
    title: "Consultation reminder",
    body: `Looking forward to seeing you tomorrow at [time].

If you have any questions before your appointment, feel free to message us.`,
    hinglish: `Kal [time] pe milne ka intezaar hai!

Appointment se pehle koi bhi sawaal ho toh message karein, bilkul free ho ke.`,
  },
  {
    id: "book-4",
    category: "booking",
    channel: "Both",
    title: "No-show recovery",
    body: `Hi [name], we missed you today. No worries — things come up.

Would you like me to help find another slot this week?`,
    hinglish: `Hi [name], aaj aap nahi aa paaye — koi baat nahi, sab hota hai.

Is hafte koi aur slot dhundha jayein?`,
  },

  // ─── Objection handling ──────────────────────────────────────
  {
    id: "obj-1",
    category: "objection",
    channel: "Both",
    title: "When price feels high",
    body: `Totally fair, [name] — it's a real investment.

A few things to consider:
• You'll save on temporary fixes that don't work long-term.
• Results typically last 6-12 months, so the per-month cost is lower than it looks.
• We can split the payment across 2-3 EMIs if that helps.

Want me to share a payment option that makes it easier?`,
    hinglish: `Bilkul sahi baat hai, [name] — yeh ek investment hai.

Kuch cheezein dhyan mein rakhein:
• Jo temporary cheezein try ki hain unse paise bachenge long-term mein.
• Results 6-12 months tak rehte hain, toh per month ka cost itna bhi zyada nahi.
• 2-3 EMIs mein bhi split kar sakte hain agar easy lage.

Koi payment option bataaoon jo convenient rahe?`,
  },
  {
    id: "obj-2",
    category: "objection",
    channel: "Both",
    title: "When they're nervous about the procedure",
    body: `That's completely normal — most first-timers feel the same way.

A few reassurances:
• The doctor walks you through every step beforehand.
• Numbing cream is applied 30 mins before — most clients feel barely anything.
• You can stop anytime, no questions asked.

Want to start with a free 15-minute consult — no obligation to book?`,
    hinglish: `Yeh bilkul normal hai — pehli baar aane wale zyaadatar aisa hi feel karte hain.

Thodi reassurance:
• Doctor pehle har step explain karte hain.
• 30 min pehle numbing cream lagayi jaati hai — zyaadatar clients ko bahut kam lagta hai.
• Kabhi bhi ruk sakte hain, koi sawaal nahi.

Pehle ek free 15-minute consult se start karein — booking ka koi pressure nahi?`,
  },
  {
    id: "obj-3",
    category: "objection",
    channel: "Both",
    title: "When they want to think about it",
    body: `Of course — take your time.

Two things that might help while you decide:
1. Our before/after gallery: [link]
2. A quick FAQ on [treatment]: [link]

I'll check back in a few days. No pressure at all.`,
    hinglish: `Bilkul — apna time lo.

Decide karte waqt yeh do cheezein helpful ho sakti hain:
1. Hamare before/after results: [link]
2. [Treatment] ke baare mein quick FAQ: [link]

Kuch dino mein follow up karoonga/karungi. Koi pressure nahi.`,
  },
  {
    id: "obj-4",
    category: "objection",
    channel: "Both",
    title: "When they found a cheaper option elsewhere",
    body: `That's completely fair to compare — I'd do the same.

A few things worth checking with any clinic:
• Is the doctor performing the treatment or a technician?
• What device/product brand do they use?
• Do they offer a patch test before the full session?

Happy to answer all of these for our clinic so you can compare properly.`,
    hinglish: `Compare karna bilkul sahi hai — main bhi karta/karti.

Kisi bhi clinic mein yeh zaroor check karein:
• Treatment doctor karte hain ya technician?
• Kaunsa device/product brand use hota hai?
• Full session se pehle patch test milta hai?

Hamare baare mein yeh sab answers dene ko taiyaar hoon taaki aap properly compare kar sakein.`,
  },
  {
    id: "obj-5",
    category: "objection",
    channel: "Both",
    title: "When they say they'll try products first",
    body: `That makes sense — products can genuinely help with mild concerns.

The honest truth: for [specific concern], products maintain results but treatments create them.

If you'd like, I can suggest a basic homecare routine to start with while you consider the treatment option?`,
    hinglish: `Samajh aata hai — products mild concerns mein genuinely help karte hain.

Honest baat yeh hai: [specific concern] ke liye, products results maintain karte hain par treatments results banate hain.

Agar chahein toh ek basic homecare routine suggest kar sakta/sakti hoon shuruaat ke liye, jab tak treatment ke baare mein soch rahe hain?`,
  },

  // ─── Follow-up ───────────────────────────────────────────────
  {
    id: "fu-1",
    category: "follow-up",
    channel: "Both",
    title: "Follow-up after 24h of no reply",
    body: `Hi [name], just circling back on your DM 🌸

If now isn't the right time, no worries at all — happy to help whenever you're ready.

If you have any questions or need a different option, just say the word.`,
    hinglish: `Hi [name], bas ek baar aapke DM ke baare mein follow up kar raha/rahi tha/thi 🌸

Agar abhi sahi time nahi hai, koi baat nahi — jab bhi ready hoon, help karne ko taiyaar hoon.

Koi sawaal ho ya koi aur option chahiye toh bas batayein.`,
  },
  {
    id: "fu-2",
    category: "follow-up",
    channel: "Both",
    title: "Follow-up after a week",
    body: `Hey [name], hope you're doing well!

Wanted to share — we have a few open slots for [treatment they were interested in] this week. If you'd like to grab one, I can hold it for you for 24h.

No pressure either way 💜`,
    hinglish: `Hey [name], umeed hai sab theek hai!

Share karna tha — is hafte [treatment] ke kuch slots available hain. Agar lena chahein toh 24 ghante ke liye hold kar sakta/sakti hoon.

Koi pressure nahi 💜`,
  },
  {
    id: "fu-3",
    category: "follow-up",
    channel: "WhatsApp",
    title: "Sharing a result post",
    body: `Hi [name]! Thought of you when we shared this result on our Instagram today.

This client had a very similar concern to yours — [brief description of result].

Here's the post: [link]

Whenever you're ready to chat, I'm here.`,
    hinglish: `Hi [name]! Aaj Instagram pe yeh result share kiya toh aapki yaad aayi.

Is client ka concern aapke jaisa hi tha — [brief description of result].

Yeh raha post: [link]

Jab bhi baat karni ho, main yahan hoon.`,
  },
  {
    id: "fu-5",
    category: "follow-up",
    channel: "Both",
    title: "Last-slot urgency",
    body: `Hi [name], quick heads-up — we have one slot left for [treatment] this [week/month] at a discounted rate (₹[X] instead of ₹[Y]).

I thought of you first.

Want me to hold it for 24 hours while you decide?`,
    hinglish: `Hi [name], jaldi se bata deta/deti hoon — is [week/month] [treatment] ke liye sirf ek slot bacha hai discounted rate pe (₹[X] instead of ₹[Y]).

Aapka pehle socha.

24 ghante ke liye hold karoon jab tak aap decide karein?`,
  },
  {
    id: "fu-6",
    category: "follow-up",
    channel: "Both",
    title: "Before/After gallery share",
    body: `Absolutely — here's a recent client with a similar concern: [gallery link]

Results vary from person to person, but this gives you a realistic idea of what may be possible.`,
    hinglish: `Bilkul — yeh dekho ek recent client jo aapke jaisi concern thi: [gallery link]

Har kisi ke results alag hote hain, par isse ek realistic idea milega ki kya possible hai.`,
  },

  // ─── Post-visit ──────────────────────────────────────────────
  {
    id: "post-1",
    category: "post-visit",
    channel: "Both",
    title: "Same-day thank you",
    body: `Thank you so much for trusting us today, [name] 🌸

Quick aftercare reminders:
• Avoid direct sun for 24h
• No harsh exfoliants for 3 days
• SPF 50 every morning, no excuses

If anything feels off, message us anytime — we're here.`,
    hinglish: `Aaj humpar trust karne ke liye bahut shukriya, [name] 🌸

Quick aftercare yaad rakhein:
• 24 ghante direct dhoop se bachein
• 3 din tak koi harsh exfoliant nahi
• Har subah SPF 50 — koi excuse nahi

Kuch bhi odd lage toh kabhi bhi message karein — hum yahan hain.`,
  },
  {
    id: "post-2",
    category: "post-visit",
    channel: "Both",
    title: "Day-7 check-in",
    body: `Hi [name], it's been a week since your treatment 💜

How is your skin feeling? Any redness, dryness, or anything you want to share?

Also — if you're loving the results, we'd be so grateful for a quick 1-line review. It genuinely helps us reach more people who could use the same care.`,
    hinglish: `Hi [name], treatment ko ek hapta ho gaya 💜

Skin kaisi feel ho rahi hai? Koi redness, dryness ya kuch aur share karna hai?

Aur — agar results achhe lag rahe hain, ek choti si 1-line review bahut help karegi. Isse aur logon tak pahunchne mein madad milti hai.`,
  },
  {
    id: "post-3",
    category: "post-visit",
    channel: "Both",
    title: "Homecare reminder",
    body: `Hi [name], quick homecare reminder for the next 72 hours:

• Keep the treated area clean and moisturised
• Avoid direct sun exposure — hat + SPF if you're going out
• No gym or steam room for 48h
• Don't pick or exfoliate the area

Feel free to send photos if you notice anything unusual. We're always here.`,
    hinglish: `Hi [name], agli 72 ghante ke liye quick homecare yaad dilana tha:

• Treated area clean aur moisturised rakhein
• Direct dhoop se bachein — bahar jaayein toh hat + SPF zaroor
• 48 ghante gym ya steam room nahi
• Area ko touch ya exfoliate mat karein

Kuch unusual lage toh photo bhej dein. Hum hamesha yahan hain.`,
  },
  {
    id: "post-4",
    category: "post-visit",
    channel: "Both",
    title: "Next session nudge",
    body: `Hi [name]! You're about halfway through your recommended [treatment] plan.

Based on how you're progressing, your next session should ideally be in [X] weeks to keep the results compounding.

Should I check available slots for you?`,
    hinglish: `Hi [name]! Aap apne recommended [treatment] plan ke aadhe tak pahunch gaye hain.

Aapki progress ke hisaab se, results maintain rakhne ke liye agli session [X] weeks mein honi chahiye.

Aapke liye available slots check karoon?`,
  },
  {
    id: "post-5",
    category: "post-visit",
    channel: "Both",
    title: "Rebooking after 3 months",
    body: `Hi [name], it's been about 3 months since your last visit 🌸

Just checking in — how has your skin been holding up?

If you'd like a top-up or a new treatment to build on your results, I'd love to help you plan the next step.`,
    hinglish: `Hi [name], last visit ko lagbhag 3 mahine ho gaye 🌸

Bas check karna tha — skin kaisi chal rahi hai?

Agar top-up chahiye ya results pe build karne ke liye koi naya treatment, next step plan karne mein khushi hogi.`,
  },
  {
    id: "post-6",
    category: "post-visit",
    channel: "Both",
    title: "Review request",
    body: `If you enjoyed your experience with us, we'd be so grateful for a quick Google review: [link]

It helps more people discover the clinic and means a lot to our team.`,
    hinglish: `Agar aapka experience achha raha, toh ek quick Google review bahut helpful hogi: [link]

Isse zyada log clinic tak pahunch paate hain aur hamare team ko bahut achha lagta hai.`,
  },

  // ─── Bonus scripts (lower priority) ─────────────────────────
  {
    id: "bonus-1",
    category: "bonus",
    channel: "Both",
    title: "Seasonal nudge",
    body: `Hey [name] — as the season changes, so do our skin's needs.

[Summer/Monsoon/Winter] is actually a great time to address [concern] because [brief reason].

Would you like me to share what a quick 2-session protocol would look like for you?`,
    hinglish: `Hey [name] — season badalne ke saath skin ki zarooratein bhi badal jaati hain.

[Summer/Monsoon/Winter] mein actually [concern] treat karna best hota hai kyunki [brief reason].

Aapke liye ek quick 2-session protocol share karoon?`,
  },
  {
    id: "bonus-2",
    category: "bonus",
    channel: "Both",
    title: "Referral intro",
    body: `Hi [name]! [referring client's name] mentioned you might be looking for help with [concern] — so glad you reached out.

We already know a bit about what you're looking for, so we can make your first consult very targeted.

Would [day] or [day] work for a quick 15-minute call?`,
    hinglish: `Hi [name]! [Referring client ka naam] ne bataya ki aap [concern] ke liye help dhundh rahe hain — bahut achha laga ki aapne reach out kiya.

Aap kya dhundh rahe hain yeh thoda pata hai, toh pehla consult bahut targeted ho sakta hai.

[Day] ya [day] mein ek quick 15-minute call ke liye kaam karega?`,
  },
]
