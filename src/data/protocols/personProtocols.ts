import type { PersonProtocol } from './types'

export const PERSON_PROTOCOLS: PersonProtocol[] = [
  {
    id: 'dad',
    name: 'Dad — Mahmood',
    nameAr: 'الأب — محمود',
    role: 'Clinical advocate and home anchor',
    roleAr: 'المدافع السريري وركيزة المنزل',
    color: '#1D9E75',
    emoji: '👨‍🏫',
    tagline:
      'You understand the neuroscience. Your role is the bridge between the clinical record and every person on this team.',
    taglineAr:
      'أنت تفهم علم الأعصاب. دورك هو الجسر بين السجل الإكلينيكي وكل شخص في هذا الفريق.',
    keyPrinciple:
      'Intellectual partnership is your therapeutic mode. When Jwan feels like your intellectual equal, her nervous system is most regulated.',
    keyPrincipleAr:
      'الشراكة الفكرية هي أسلوبك العلاجي. عندما تشعر جوان أنها شريكك الفكري، يكون جهازها العصبي في أهدأ حالاته.',
    steps: [
      {
        title: 'Drive the May 2025 Dr. Faniran appointment',
        titleAr: 'قيادة موعد د. فانيران مايو 2025',
        detail:
          'Bring the PDA hypothesis explicitly. Ask: is the medication recommendation for mood dysregulation or ADHD-inattentive? Request guanfacine/Intuniv discussion as alternative to atypical antipsychotic. Request PDA formal assessment referral. Bring the BRIEF-2 T=90 trend data.',
        detailAr:
          'أحضر فرضية PDA بشكل صريح. اسأل: هل توصية الدواء لتنظيم المزاج أم لـADHD غير الانتباهي؟ اطلب مناقشة guanfacine/Intuniv. اطلب إحالة للتقييم الرسمي لـPDA.',
      },
      {
        title: 'Refer for developmental optometrist — urgent',
        titleAr: 'إحالة لطبيب عيون تطوري — عاجل',
        detail:
          'Eye-teaming (convergence) difficulty noted November 2024, never followed up. Jwan reads at 13y6m level — visual fatigue directly impacts afternoon dysregulation.',
        detailAr:
          'صعوبة تنسيق العينين لوحظت نوفمبر 2024 ولم يُتابع. جوان تقرأ بمستوى 13 سنة — التعب البصري يؤثر مباشرة على التنظيم في فترة ما بعد الظهر.',
      },
      {
        title: 'Be the team coordinator',
        titleAr: 'كن منسق الفريق',
        detail:
          'Share this platform with every person in care. Ensure LSA receives PDA-specific training. Request IEP explicitly referencing PDA profile. Send Giulia Maccarini the February 2025 Dr. Faniran report.',
        detailAr:
          'شارك هذه المنصة مع كل شخص في الرعاية. تأكد من حصول مساعدة التعلم على تدريب خاص بـPDA. اطلب خطة التعليم الفردي التي تشير صراحةً لملف PDA.',
      },
      {
        title: 'Intellectual partnership at home',
        titleAr: 'الشراكة الفكرية في المنزل',
        detail:
          'Read with her. Discuss her comics as a creative collaborator. When you treat her as a thinking partner, her nervous system is most regulated. This is not indulgence — it is the most powerful therapeutic intervention you personally have access to.',
        detailAr:
          'اقرأ معها. ناقش قصصها المصورة كمتعاون إبداعي. عندما تعاملها كشريك فكري، يكون جهازها العصبي في أهدأ حالاته.',
      },
      {
        title: 'Bedtime debrief ritual — 5 minutes daily',
        titleAr: 'طقس الإحاطة قبل النوم — 5 دقائق يومياً',
        detail:
          '2 things that went well today + 1 thing that was hard + what we try tomorrow. Keep it light. This builds positive hippocampal encoding during calm states — 5 minutes that rewires how her brain stores the day.',
        detailAr:
          'شيئان نجحا اليوم + شيء كان صعباً + ما سنحاول غداً. ابقها خفيفة. هذا يبني ذاكرة عاطفية إيجابية في الحُصين أثناء الحالات الهادئة.',
      },
    ],
    avoid:
      'Consequence escalation when she refuses. Reasoning during meltdowns. Comparing her to her sister or peers. Making her feel observed or clinically assessed.',
    avoidAr:
      'تصعيد العواقب عند رفضها. المنطق خلال نوبات الانهيار. مقارنتها بأختها أو أقرانها.',
    uniqueStrength:
      'You are a molecular medicine scientist and her father. No one else on this team can hold both her clinical record and her heart simultaneously.',
    uniqueStrengthAr:
      'أنت عالم في الطب الجزيئي وأبوها. لا أحد آخر في هذا الفريق يستطيع الاحتفاظ بسجلها الإكلينيكي وقلبها في آنٍ واحد.',
  },
  {
    id: 'mom',
    name: 'Mom — Rukia',
    nameAr: 'الأم — ركية',
    role: 'Primary home regulator',
    roleAr: 'المنظِّمة الرئيسية في المنزل',
    color: '#D4537E',
    emoji: '👩‍💼',
    tagline:
      'You are the person Jwan is most regulated by and most dysregulated by — simultaneously. This is the PDA pattern, not a failure.',
    taglineAr:
      'أنتِ الشخص الذي تنظّم جوان معه أكثر ما تنظّم وتتفكك معه أكثر ما تتفكك — في آنٍ واحد. هذا نمط PDA، وليس فشلاً.',
    keyPrinciple:
      'Your own regulation state is her treatment. When you are calm, her nervous system has something to co-regulate with.',
    keyPrincipleAr:
      'حالة تنظيمك الخاصة هي علاجها. عندما تكوني هادئة، يجد جهازها العصبي شيئاً يتنظّم معه.',
    steps: [
      {
        title: 'Morning preview — every single day',
        titleAr: 'المعاينة الصباحية — كل يوم بدون استثناء',
        detail:
          "Today we have school. After school you have free time, then dinner at 6:30, then bath, then reading. 60 seconds that prevent two meltdowns. Her amygdala processes the day as predictable rather than uncertain.",
        detailAr:
          '"اليوم لدينا مدرسة. بعد المدرسة لديكِ وقت حر، ثم عشاء في 6:30، ثم حمام، ثم قراءة." 60 ثانية تمنع نوبتين. لوزة دماغها تعالج اليوم كمتوقع وليس كمجهول.',
      },
      {
        title: 'Decompression time after school — non-negotiable',
        titleAr: 'وقت التفريغ بعد المدرسة — غير قابل للتفاوض',
        detail:
          '20–30 minutes where nothing is asked of Jwan. No questions, no tasks, no demands. Her nervous system has been managing the school demand environment all day. Do not use this time to discuss school or behaviour.',
        detailAr:
          '20-30 دقيقة لا يُطلب فيها شيء من جوان. لا أسئلة، لا مهام، لا مطالب. جهازها العصبي كان يدير بيئة المطالب المدرسية طوال اليوم.',
      },
      {
        title: 'Reframe requests as invitations with choice',
        titleAr: 'إعادة صياغة الطلبات كدعوات مع خيار',
        detail:
          "Instead of \"wash your hands before dinner\" → \"dinner's almost ready, would you like to wash hands now or in two minutes?\" The task is identical. The perceived control is completely different.",
        detailAr:
          'بدلاً من "اغسلي يديكِ قبل العشاء" → "العشاء تقريباً جاهز، هل تريدين غسل يديكِ الآن أم بعد دقيقتين؟" المهمة متطابقة. الإحساس بالتحكم مختلف تماماً.',
      },
      {
        title: 'When she escalates toward you — your script',
        titleAr: 'عندما تتصعّد تجاهك — نصك',
        detail:
          "Speak more quietly, not louder. Sit or crouch — reduce physical authority signal. Say: \"I can see this is really hard. I'm not going anywhere.\" Then wait. No demands, no reasons, no consequences. Her nervous system needs to know you are safe.",
        detailAr:
          'تكلمي بهدوء أكثر، ليس بصوت أعلى. اجلسي أو انحني — قللي إشارة السلطة الجسدية. قولي: "أرى أن هذا صعب جداً. أنا لن أذهب." ثم انتظري.',
      },
      {
        title: 'Repair after every significant episode',
        titleAr: 'الإصلاح بعد كل نوبة مهمة',
        detail:
          'Once she is fully calm: "That was hard for both of us. I love you. Tomorrow we try again." No analysis. No lecture. The repair builds attachment security that reduces amygdala baseline reactivity over time. This is the most neurologically meaningful thing you can do after an episode.',
        detailAr:
          'بمجرد هدوئها الكامل: "كان هذا صعباً على كلينا. أحبكِ. غداً نحاول مرة أخرى." لا تحليل. لا محاضرة. الإصلاح يبني أمان الارتباط الذي يقلل التفاعلية الأساسية للوزة الدماغية مع مرور الوقت.',
      },
    ],
    avoid:
      'Matching her emotional temperature during escalation. Explaining consequences while she is dysregulated. Taking her rejections personally — they are her nervous system, not her heart.',
    avoidAr:
      'مطابقة حرارتها العاطفية أثناء التصعيد. شرح العواقب بينما هي في حالة تفكك. أخذ رفضها بشكل شخصي — إنه جهازها العصبي، وليس قلبها.',
    uniqueStrength:
      'You are her primary attachment figure. The repair moments after episodes, done consistently, are the most powerful neurological intervention available to her.',
    uniqueStrengthAr:
      'أنتِ شخصية ارتباطها الأساسية. لحظات الإصلاح بعد النوبات، عند ممارستها باستمرار، هي التدخل العصبي الأقوى المتاح لها.',
  },
  {
    id: 'nanny',
    name: 'Nanny',
    nameAr: 'الحاضنة',
    role: 'Daily routine holder',
    roleAr: 'حامل الروتين اليومي',
    color: '#534AB7',
    emoji: '🏠',
    tagline:
      'You have less emotional loading than parents — used well, this is a therapeutic advantage. Jwan can often cooperate with you when she cannot with Mum or Dad.',
    taglineAr:
      'لديكِ حِمل عاطفي أقل من الوالدين — إذا استُخدم بشكل صحيح، هذه ميزة علاجية.',
    keyPrinciple:
      'Consistency is your superpower. Her nervous system runs on predictability. The more consistent your words, sequence, and timing, the safer she feels.',
    keyPrincipleAr:
      'الاتساق هو قوتك الخارقة. جهازها العصبي يعمل على القدرة على التنبؤ. كلما كانت كلماتك وتسلسلك وتوقيتك أكثر اتساقاً، كلما شعرت بالأمان.',
    steps: [
      {
        title: 'Always give 5-minute warnings before transitions',
        titleAr: 'دائماً أعطِ تحذيرات 5 دقائق قبل الانتقالات',
        detail:
          '"In five minutes we are going to tidy up and have lunch." Set a visible timer. When time comes: "Time to tidy — the food is ready." Never just say "stop what you\'re doing." Always give the reason.',
        detailAr:
          '"بعد خمس دقائق سنرتب ونتناول الغداء." ضعي مؤقتاً مرئياً. عند حلول الوقت: "حان وقت الترتيب — الطعام جاهز." لا تقولي أبداً فقط "توقفي عما تفعلين."',
      },
      {
        title: 'Deliver the sensory diet daily — it is medical',
        titleAr: 'تقديم النظام الحسي يومياً — إنه علاجي',
        detail:
          'Morning: animal walks, wall pushes, carrying things. Midday: movement break, breathing reset. Before homework: jumping, heavy work. These regulate her nervous system so she can cooperate. Do them consistently whether or not she seems to need them visibly.',
        detailAr:
          'صباحاً: المشي كالحيوانات، دفع الجدار، حمل الأشياء. ظهراً: استراحة حركة، إعادة ضبط التنفس. قبل الواجبات: القفز، العمل الثقيل.',
      },
      {
        title: 'Use calming scents — documented to work for Jwan',
        titleAr: 'استخدام الروائح المهدئة — موثّق أنها تعمل مع جوان',
        detail:
          'Jasmine, lavender, lemongrass. Diffuser during quiet time. Lavender on pillow before sleep. Diluted bracelet for stressful days. Neuropedia documented these specific scents as regulatory tools for Jwan.',
        detailAr:
          'الياسمين والخزامى وعشب الليمون. ناشر خلال وقت الهدوء. خزامى على الوسادة قبل النوم. سوار مخفف في الأيام المجهدة.',
      },
      {
        title: 'When she escalates — your script',
        titleAr: 'عندما تتصعّد — نصك',
        detail:
          'Speak quietly. Sit down. Say: "I can see you\'re finding this hard. I\'m here." Do not repeat the triggering request. Say: "Let\'s take a walk" or "do you want a few minutes in your room?" Give her a way out that feels like her choice.',
        detailAr:
          'تكلمي بهدوء. اجلسي. قولي: "أرى أن هذا صعب عليكِ. أنا هنا." لا تكرري الطلب المحفِّز. قولي: "هيا نتمشى" أو "هل تريدين بضع دقائق في غرفتكِ؟"',
      },
      {
        title: 'Report to parents daily — you are a clinical observer',
        titleAr: 'أبلغي الوالدين يومياً — أنتِ مراقبة إكلينيكية',
        detail:
          'Report: any new pattern (positive or challenging), any transition unusually difficult, any sensory tool that worked particularly well, any phrase that got unexpectedly positive response. Your observations are as clinically valuable as any assessment.',
        detailAr:
          'أبلغي عن: أي نمط جديد (إيجابي أو تحدٍّ)، أي انتقال صعب بشكل غير عادي، أي أداة حسية نجحت بشكل خاص، أي عبارة أعطت استجابة إيجابية غير متوقعة.',
      },
    ],
    avoid:
      'Making spontaneous changes to the routine without telling her. Asking multiple questions at once. Raising your voice during escalation.',
    avoidAr:
      'إجراء تغييرات عفوية على الروتين دون إخبارها. طرح أسئلة متعددة في آنٍ واحد. رفع صوتك أثناء التصعيد.',
    uniqueStrength:
      'Your lower emotional loading means she can cooperate with you when she cannot with parents. You are the stability between school and home.',
    uniqueStrengthAr:
      'حِملك العاطفي الأقل يعني أنها قادرة على التعاون معكِ حين لا تستطيع مع الوالدين. أنتِ الاستقرار بين المدرسة والمنزل.',
  },
  {
    id: 'lsa',
    name: 'LSA',
    nameAr: 'مساعدة التعلم',
    role: 'School co-regulator',
    roleAr: 'المنظِّمة المشتركة في المدرسة',
    color: '#378ADD',
    emoji: '🏫',
    tagline:
      "Your role is not ensuring compliance. It is maintaining Jwan's nervous system in a state where learning is possible.",
    taglineAr:
      'دورك ليس ضمان الامتثال. بل الحفاظ على جهاز جوان العصبي في حالة يكون فيها التعلم ممكناً.',
    keyPrinciple:
      'You are a co-regulator, not an authority enforcer. When you are calm, she has something to co-regulate with.',
    keyPrincipleAr:
      'أنتِ منظِّمة مشتركة، وليست مطبِّقة سلطة. عندما تكوني هادئة، لديها شيء تتنظّم معه.',
    steps: [
      {
        title: 'Morning zones check-in — first 5 minutes',
        titleAr: 'تسجيل مناطق الصباح — أول 5 دقائق',
        detail:
          'Warm, low-key greeting. Preview the morning: "Today we have literacy, then maths, then outdoor time." Then: "What zone are you in?" If yellow or red on arrival, activate sensory protocol BEFORE any academic demands.',
        detailAr:
          'تحية دافئة وهادئة. معاينة الصباح. ثم: "في أي منطقة أنتِ؟" إذا كانت في الأصفر أو الأحمر عند الوصول، فعّلي البروتوكول الحسي قبل أي مطالب أكاديمية.',
      },
      {
        title: 'Collaborative framing of every academic task',
        titleAr: 'الإطار التعاوني لكل مهمة أكاديمية',
        detail:
          'Use indirect, curiosity-based language. "I\'ve been thinking about this — I wonder if there\'s a clever way to figure it out?" rather than "open your book." Her VCI is 140 — engage her intellect, not her compliance.',
        detailAr:
          'استخدمي لغة غير مباشرة قائمة على الفضول. "كنت أفكر في هذا — أتساءل هل هناك طريقة ذكية لاكتشافه؟" بدلاً من "افتحي كتابك."',
      },
      {
        title: 'Sensory tools — proactive, not reactive',
        titleAr: 'الأدوات الحسية — استباقية وليست ردّ فعل',
        detail:
          'TheraBand on chair leg. Fidgets/putty available on desk. Movement break before long writing tasks. Deploy BEFORE she shows signs of dysregulation. Yellow zone is the intervention window — do not wait for red.',
        detailAr:
          'TheraBand على ساق الكرسي. أدوات fidget/putty متاحة على المكتب. استراحة حركة قبل مهام الكتابة الطويلة. انشريها قبل ظهور علامات تفكك التنظيم.',
      },
      {
        title: '5-minute warnings before every transition',
        titleAr: 'تحذيرات 5 دقائق قبل كل انتقال',
        detail:
          '"In five minutes we finish this and go to PE." When time arrives: "It\'s PE time — your work is saved, it will be here when you get back." Give her work safety and time safety simultaneously.',
        detailAr:
          '"بعد خمس دقائق ننهي هذا وننتقل للتربية البدنية." عند حلول الوقت: "حان وقت التربية البدنية — عملكِ محفوظ، سيكون هنا عند عودتكِ."',
      },
      {
        title: 'During escalation — the exact sequence',
        titleAr: 'أثناء التصعيد — التسلسل الدقيق',
        detail:
          '1. Stop all demands immediately. 2. Reduce verbal input — minimal words only. 3. Sit or crouch — reduce authority. 4. Say: "I can see your body is feeling big. You\'re safe. I\'m here." 5. Wait 10–30 seconds of calm. 6. Offer movement: "Do you want to do wall pushes?" 7. Never return to the triggering demand as the first re-engagement.',
        detailAr:
          '1. أوقفي جميع المطالب فوراً. 2. قللي المدخلات اللفظية. 3. اجلسي أو انحني. 4. قولي: "أرى أن جسمك يشعر بشيء كبير. أنتِ بأمان. أنا هنا." 5. انتظري 10-30 ثانية من الهدوء. 6. قدّمي حركة.',
      },
      {
        title: 'Separate room for all tests and assessments',
        titleAr: 'غرفة منفصلة لجميع الاختبارات والتقييمات',
        detail:
          'Dr. Faniran explicitly recommends this. Tests trigger performance anxiety which activates PDA threat response. Separate room removes peer-observation demand. Implement immediately — do not wait for formal IEP.',
        detailAr:
          'د. فانيران توصي بهذا صراحةً. الاختبارات تثير قلق الأداء الذي ينشّط استجابة التهديد PDA. الغرفة المنفصلة تزيل مطلب المراقبة أمام الأقران.',
      },
    ],
    avoid:
      'Repeating the triggering demand during meltdown. Adding verbal explanations during escalation. Treating behaviour as deliberate defiance. Public correction in front of peers.',
    avoidAr:
      'تكرار الطلب المحفِّز أثناء الانهيار. إضافة تفسيرات لفظية أثناء التصعيد. معاملة السلوك كعصيان متعمد. التصحيح العلني أمام الأقران.',
    uniqueStrength:
      'You are the only adult present for both school transitions and quiet learning moments. Your consistency across both determines her regulatory baseline at school.',
    uniqueStrengthAr:
      'أنتِ الشخص البالغ الوحيد الحاضر خلال الانتقالات المدرسية ولحظات التعلم الهادئة معاً.',
  },
  {
    id: 'teacher',
    name: 'Teachers',
    nameAr: 'المعلمون',
    role: 'Classroom architects',
    roleAr: 'مهندسو الفصل الدراسي',
    color: '#5F5E5A',
    emoji: '✏️',
    tagline:
      "Jwan's teacher confirmed she is academically excellent. The gap between her capability and her classroom behaviour is the PDA gap — not motivation, not skill.",
    taglineAr:
      'أكد معلم جوان أنها ممتازة أكاديمياً. الفجوة بين قدرتها وسلوكها في الفصل هي فجوة PDA — وليست دافعاً أو مهارة.',
    keyPrinciple:
      'The classroom architecture itself either creates or prevents most of her difficulties. Same expectations, different delivery.',
    keyPrincipleAr:
      'هندسة الفصل نفسها إما تخلق معظم صعوباتها أو تمنعها. نفس التوقعات، أسلوب تقديم مختلف.',
    steps: [
      {
        title: 'Preferential seating — front, near teacher, minimal distractions',
        titleAr: 'الجلوس المفضّل — الأمام، قرب المعلم، حد أدنى من التشتيت',
        detail:
          'Dr. Faniran explicitly recommends. Front seating reduces visual complexity. Proximity allows quiet individual redirections without public correction — public correction is a major PDA trigger.',
        detailAr:
          'د. فانيران توصي بهذا صراحةً. الجلوس في الأمام يقلل التعقيد البصري. القرب يسمح بإعادة التوجيه الفردي الهادئ دون تصحيح علني — التصحيح العلني محفّز PDA رئيسي.',
      },
      {
        title: 'Collaborative inquiry language for all instructions',
        titleAr: 'لغة الاستفسار التعاوني لجميع التعليمات',
        detail:
          '"I\'m going to put this challenge on the board — I wonder who can find a pattern in it" vs "Everyone do questions 1–10." Same task. Completely different neural registration. Her VCI=140 brain will engage with genuine intellectual challenge far more reliably than directives.',
        detailAr:
          '"سأضع هذا التحدي على اللوح — أتساءل من يستطيع إيجاد نمط فيه" مقابل "الجميع يحل أسئلة 1-10." نفس المهمة. تسجيل عصبي مختلف تماماً.',
      },
      {
        title: 'Avoid public correction — always private and quiet',
        titleAr: 'تجنب التصحيح العلني — دائماً خاص وهادئ',
        detail:
          'Any correction: crouch to her level, one quiet sentence, then move away. Give her space to comply without an audience. Public correction = loss of control in front of peers = high-threat PDA trigger.',
        detailAr:
          'أي تصحيح: انحنِ لمستوى طولها، جملة هادئة واحدة، ثم ابتعد. أعطها مساحة للامتثال دون جمهور.',
      },
      {
        title: 'Allow typing / alternative formats for written work',
        titleAr: 'السماح بالكتابة بالحاسوب / صيغ بديلة للعمل المكتوب',
        detail:
          'DCDQ confirms motor coordination challenges. Dr. Faniran recommends accommodations. For longer written pieces, keyboard removes motor demand from cognitive task. Her written language composite is 130 (98th pct) — the ideas are extraordinary. Remove the motor barrier.',
        detailAr:
          'DCDQ يؤكد تحديات التنسيق الحركي. لقطع مكتوبة أطول، الكيبورد يزيل المطلب الحركي من المهمة المعرفية.',
      },
      {
        title: 'IEP and IBP meeting — schedule now',
        titleAr: 'اجتماع IEP و IBP — جدول الآن',
        detail:
          'Dr. Faniran requires IEP + IBP reviewed regularly. The IEP must reference: PDA profile, academic enrichment for literacy (reading at 13y6m level), separate room for assessments, sensory/movement accommodations, and collaborative framing protocols.',
        detailAr:
          'د. فانيران تطلب مراجعة IEP + IBP بانتظام. يجب أن يشير IEP إلى: ملف PDA، إثراء أكاديمي للقراءة، غرفة منفصلة للتقييمات، ترتيبات حسية وحركية.',
      },
      {
        title: 'Speciality classes — brief preview before entering',
        titleAr: 'الفصول التخصصية — معاينة قصيرة قبل الدخول',
        detail:
          "Jwan's first Year 3 difficulties appeared in speciality classes (different teachers, different rules, unpredictable). LSA should give a 60-second preview before each: \"Today in art you'll be doing X, the teacher will say Y at the start.\"",
        detailAr:
          'ظهرت صعوبات جوان الأولى في السنة الثالثة في الفصول التخصصية. يجب أن تعطي مساعدة التعلم معاينة 60 ثانية قبل كل فصل.',
      },
    ],
    avoid:
      'Treating academic tasks as routine for her — she is reading at 13y6m, she will disengage. Consequence escalation during meltdowns. Assuming behaviour reflects attitude or effort.',
    avoidAr:
      'معاملة المهام الأكاديمية كروتينية لها — هي تقرأ بمستوى 13 سنة، ستفقد الاهتمام. تصعيد العواقب أثناء الانهيارات.',
    uniqueStrength:
      'You see her academic brilliance daily. That observation, communicated consistently to her parents and in the IEP, is what keeps the enrichment pressure appropriate.',
    uniqueStrengthAr:
      'ترى تألقها الأكاديمي يومياً. هذه الملاحظة، حين تُبلَّغ باستمرار للوالدين وفي IEP، هي ما يبقي ضغط الإثراء مناسباً.',
  },
]
