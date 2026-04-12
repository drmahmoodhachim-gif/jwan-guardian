export const PHRASES = {
  transitions: [
    {
      avoid: "Stop what you're doing. It's time for maths.",
      use: "In five minutes we move to maths. I'll let you know when it's time.",
    },
    {
      avoid: 'Put that away now.',
      use: 'Your drawing will be right here when you get back — can you put a bookmark in it?',
    },
    {
      avoid: "We're leaving in one minute.",
      use: "In five minutes we're heading out. Finish what you're doing — it'll wait for you.",
    },
  ],
  requests: [
    {
      avoid: 'You need to do your homework now.',
      use: 'Your brain is good at this — want to see how quickly you can do it?',
    },
    {
      avoid: 'Sit down and stop moving.',
      use: 'Can I ask you something? Come sit with me for a minute.',
    },
    {
      avoid: 'Because I said so.',
      use: 'Because [actual reason] — does that make sense?',
    },
    {
      avoid: 'Do this right now.',
      use: "I wonder if you could help me with something — when you're ready.",
    },
  ],
  whenSheRefuses: [
    {
      avoid: "You don't have a choice.",
      use: 'Okay. Would it help if you had five more minutes first?',
    },
    {
      avoid: "You're being very difficult today.",
      use: "Something feels hard today. What's going on?",
    },
    {
      avoid: 'Everyone else is doing it.',
      use: "I'm not worried about everyone else. I'm interested in what works for you.",
    },
  ],
  duringEscalation: [
    {
      avoid: 'Calm down right now.',
      use: "I can see your body is feeling very big. You're safe. I'm here.",
    },
    {
      avoid: "Stop crying / You're being ridiculous.",
      use: '[Silence. Calm physical presence. Wait.]',
    },
    {
      avoid: "If you don't stop, you'll lose your privilege.",
      use: '[No words. Reduce physical presence. Give space.]',
    },
    {
      avoid: 'You need to explain your behaviour.',
      use: "Take your time. I'll be here.",
    },
  ],
  positiveAcknowledgement: [
    'You waited really well when that was hard — I noticed.',
    'The way you explained that story was brilliant. Your brain is extraordinary.',
    'You were in yellow zone and you used your tool. That was your own choice and it worked.',
    'You disagreed with me really well just now. That took courage.',
    'You got yourself from red back to green today. That is huge.',
  ],
  zones: {
    morningCheckin: 'What zone are you in today?',
    yellowResponse: "You're in yellow — what's your tool?",
    redResponse: "Your body is in red. I can see that. I'm staying right here.",
    afterRegulation: 'You moved yourself from red back to green. That is huge.',
    repair: 'That was hard for both of us. I love you. Tomorrow we try again.',
  },
} as const

export const LAYAN_PROTOCOL = {
  explanationForLayan: {
    en: `Layan, you have the most amazing sister in the world. Jwan's brain is extra-special — like a supercomputer that works really, really fast. That makes her brilliant at reading and drawing and making up stories.

But sometimes a supercomputer gets too hot and too busy, and it needs to slow down. When that happens, Jwan might seem angry or sad or just want to be alone. That is not your fault. Her brain is just working too hard.

Here are three things you can do that actually help Jwan's brain when it gets too busy:`,
    ar: `ليان، لديكِ أكثر أخت رائعة في العالم. دماغ جوان مميز بشكل خاص — مثل حاسوب خارق يعمل بسرعة كبيرة. هذا يجعلها رائعة في القراءة والرسم وابتكار القصص.

لكن أحياناً يصبح الحاسوب الخارق ساخناً جداً ومشغولاً جداً، ويحتاج للتباطؤ. عندما يحدث ذلك، قد تبدو جوان غاضبة أو حزينة أو تريد فقط أن تكون وحدها. هذا ليس خطأكِ. دماغها يعمل بجهد شديد.

إليكِ ثلاثة أشياء تستطيعين فعلها تساعد دماغ جوان فعلاً عندما يصبح مشغولاً جداً:`,
  },
  threeThings: [
    {
      title: 'Stay calm near her',
      titleAr: 'ابقَي هادئة بالقرب منها',
      detail:
        "When you are calm, your calm feeling actually goes into Jwan's brain and helps it slow down. It's like magic — but it's real science. Your calm superpower helps her.",
      detailAr:
        'عندما تكوني هادئة، شعورك الهادئ ينتقل فعلاً إلى دماغ جوان ويساعده على التباطؤ. هذا مثل السحر — لكنه علم حقيقي.',
    },
    {
      title: 'Ask before you take',
      titleAr: 'اسأل قبل أن تأخذي',
      detail:
        "Jwan's brain finds surprises very hard. If you want to use her things or sit in her spot, asking first means no surprises — and that makes everything much easier.",
      detailAr:
        'دماغ جوان يجد المفاجآت صعبة جداً. إذا أردتِ استخدام أشيائها أو الجلوس في مكانها، السؤال أولاً يعني لا مفاجآت — وهذا يجعل كل شيء أسهل بكثير.',
    },
    {
      title: 'Get a grown-up if you feel scared',
      titleAr: 'أحضري شخصاً بالغاً إذا شعرتِ بالخوف',
      detail:
        "If Jwan is very upset and you feel worried, it is always right to find Mum, Dad, or the nanny. That is the bravest thing you can do. You don't need to fix it yourself.",
      detailAr:
        'إذا كانت جوان منزعجة جداً وشعرتِ بالقلق، فمن الصواب دائماً إيجاد أمي أو أبي أو الحاضنة. هذا أشجع شيء تستطيعين فعله.',
    },
  ],
  forLayanAlso: {
    en: "Jwan loves you so much. When she says no to playing, or uses a loud voice, that is her brain being too full — not her heart. Her heart always has room for you. And Layan — you are special too.",
    ar: 'جوان تحبكِ كثيراً جداً. عندما تقول لا للعب، أو تستخدم صوتاً عالياً، ذلك هو دماغها وليس قلبها. قلبها دائماً فيه مكان لكِ. وليان — أنتِ مميزة أيضاً.',
  },
  parentGuidanceForLayan: [
    {
      title: '15 minutes of Layan-only time daily',
      detail:
        'Not shared with Jwan. Not interrupted. Just Layan. Her attention-seeking behaviours are a direct signal of this need. Consistent daily one-on-one time is more effective than any consequence system.',
    },
    {
      title: 'Acknowledge when she handles things well',
      detail:
        '"You were so calm when Jwan got upset. That was really hard and you did beautifully." Specific praise for a specific skill — she is being asked to do something genuinely difficult.',
    },
    {
      title: 'Never parentify Layan',
      detail:
        "Do not ask Layan to manage Jwan's emotions, report on her behaviour, or resolve sibling conflict. She is 6. The adults manage the sibling dynamic.",
    },
  ],
} as const
