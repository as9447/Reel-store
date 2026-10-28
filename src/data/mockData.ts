import { CreatorProfile, PaymentMethodConfig, VideoOrder, UserSession } from '../types';

export const PAYMENT_METHODS: PaymentMethodConfig[] = [
  {
    id: 'instapay',
    title: 'InstaPay',
    arabicTitle: 'انستا باي مصر',
    subtitle: 'تحويل لحظي مباشر 24/7 بدون أي رسوم إضافية',
    badge: 'الأسرع والأكثر استخداماً ⚡',
    iconName: 'Zap',
    brandColor: 'from-purple-600 via-indigo-600 to-blue-600',
    accountIdentifier: 'reelstore@instapay',
    accountName: 'Reel Store Egypt Ltd - ريل ستور',
    instructions: [
      'افتح تطبيق InstaPay على هاتفك المحمول.',
      'اختر "إرسال نقود" (Send Money) ثم اختر "عنوان الدفع اللحظي" (IPA).',
      'أدخل عنوان المنصة: reelstore@instapay',
      'اكتب القيمة الإجمالية المطلوبة ثم اضغط تأكيد الدفع برقمك السري IPN PIN.',
      'اكتب اسم حسابك أو رقم هاتفك في الخانة بالأسفل لتأكيد حجز الصانع فوراً.'
    ]
  },
  {
    id: 'vodafone_cash',
    title: 'Vodafone Cash / Wallets',
    arabicTitle: 'فودافون كاش والمحافظ الذكية',
    subtitle: 'إيداع وتحويل عبر أي محفظة إلكترونية في مصر (010, 011, 012, 015)',
    badge: 'سهل ومتاح للجميع 📱',
    iconName: 'Smartphone',
    brandColor: 'from-rose-600 via-red-600 to-amber-600',
    accountIdentifier: '01099238174',
    accountName: 'محفظة ريل ستور الرسمية المعتمدة',
    instructions: [
      'اطلب كود التحويل #7*9* من خط فودافون كاش أو استخدم تطبيق أنا فودافون / محفظتك البنكية.',
      'حول المبلغ الإجمالي إلى رقم المحفظة: 01099238174',
      'أدخل الرقم السري لتأكيد التحويل واستلم رسالة التأكيد.',
      'أدخل رقم الهاتف الذي قمت بالتحويل منه ورقم العملية في النموذج أدناه.'
    ]
  },
  {
    id: 'bank_transfer',
    title: 'Bank Transfer (CIB / NBE)',
    arabicTitle: 'حساب بنكي / تحويل مصرفي',
    subtitle: 'تحويل بنكي رسمي من أي بنك مصري أو دولي مع إيصال رسمي',
    badge: 'للشركات والمؤسسات 🏦',
    iconName: 'Building2',
    brandColor: 'from-cyan-600 via-blue-700 to-indigo-800',
    accountIdentifier: 'EG480010000000000192837465',
    accountName: 'Reel Store for Media & Advertising (CIB Bank)',
    instructions: [
      'قم بتسجيل الدخول إلى تطبيق البنك الخاص بك (Online Banking) أو تفضل بزيارة أقرب فرع.',
      'قم بعمل تحويل لحساب شركة ريل ستور بالبنك التجاري الدولي (CIB):',
      'رقم الحساب: 100049283746 | الآيبان (IBAN): EG480010000000000192837465',
      'اكتب اسم شركتك في خانة الغرض من التحويل، ثم أدخل رقم التحويل المرجعي بالأسفل.'
    ]
  }
];

export const MOCK_CREATORS: CreatorProfile[] = [
  {
    id: 'creator-1',
    name: 'كريم المنشاوي',
    handle: '@karim_visuals',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    verified: true,
    featured: true,
    topRated: true,
    roleTitle: 'صانع إعلانات UGC وريلز احترافية',
    location: 'القاهرة - المعادي',
    rating: 4.98,
    reviewCount: 168,
    completedProjects: 245,
    startingPrice: 850,
    category: 'ugc',
    categoryLabel: 'إعلانات UGC وريلز تيك توك',
    bio: 'متخصص في صناعة فيديوهات UGC الإعلانية التي ترفع مبيعات المتاجر والبراندات بنسبة تصل لـ 300%. خبرة 4 سنوات وأكثر من 200 إعلان ناجح لمنتجات العناية، الملابس، والمطاعم.',
    gear: ['Sony A7 IV', 'DJI Mic 2', 'Aputure Amaran 100d', 'عدسة 24-70mm GM'],
    skills: ['Hook إعلاني قوي', 'تمثيل أمام الكاميرا', 'مونتاج سريع لتيك توك', 'تعديل ألوان سينمائي'],
    turnaroundHours: 24,
    sampleVideos: [
      {
        id: 'vid-101',
        title: 'إعلان UGC لمنتج قهوة سريعة التحضير',
        duration: 32,
        aspectRatio: '9:16',
        videoUrl: '/assets/videos/ugc_product_ad.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
        category: 'ugc',
        views: '450K',
        likes: '34K',
        tags: ['UGC', 'TikTok Ads', 'قهوة', 'مبيعات'],
        description: 'فيديو ريلز جذاب اعتمد على هوك أول 3 ثواني مع إبراز طريقة التحضير وسرعة الطلب.'
      },
      {
        id: 'vid-102',
        title: 'ريفيو ساعة ذكية وسماعات بلوتوث',
        duration: 28,
        aspectRatio: '9:16',
        videoUrl: '/assets/videos/ecommerce_ad.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
        category: 'ecommerce',
        views: '820K',
        likes: '62K',
        tags: ['إلكترونيات', 'Reels', 'منتجات'],
        description: 'إعلان موجه لإنستغرام وتيك توك استعرض مقاومة الماء وجودة الصوت بأسلوب عصري جذاب.'
      }
    ],
    packages: {
      basic: {
        title: 'باقة ريلز أساسية',
        duration: '15-30 ثانية',
        price: 850,
        revisions: 2,
        deliveryDays: 2,
        features: ['فيديو عمودي 9:16 عالي الدقة 4K', 'كتابة هوك إعلاني جذاب', 'مونتاج وموسيقى مرخصة', 'تسليم خلال 48 ساعة']
      },
      standard: {
        title: 'باقة الإعلانات الاحترافية (الأكثر طلباً)',
        duration: '30-45 ثانية',
        price: 1450,
        revisions: 3,
        deliveryDays: 2,
        features: ['3 هوكات أولى مختلفة لاختبار الإعلانات A/B', 'تضمين كابتشنز متحركة جذابة', 'تعديل صوتي محترف ومايك لاسلكي', 'حقوق استخدام تجاري كاملة']
      },
      premium: {
        title: 'حملة إعلانية متكاملة VIP',
        duration: 'حتى 60 ثانية',
        price: 2400,
        revisions: 5,
        deliveryDays: 1,
        features: ['فيديو رئيسي + نسختين إضافيتين للمنصات', 'تسليم فوري مستعجل خلال 24 ساعة', 'تسليم المواد الخام B-Roll', 'استشارة لزيادة تحويل الحملة الإعلانية']
      }
    },
    payoutMethods: {
      instapay: 'karim.visuals@instapay',
      vodafoneCash: '01012345678'
    }
  },
  {
    id: 'creator-2',
    name: 'نور الهدى سليم',
    handle: '@nour_motion',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    verified: true,
    featured: true,
    topRated: true,
    roleTitle: 'خبيرة موشن جرافيك وأنيميشن 2D/3D',
    location: 'الإسكندرية - سموحة',
    rating: 4.95,
    reviewCount: 142,
    completedProjects: 198,
    startingPrice: 1200,
    category: 'motion',
    categoryLabel: 'موشن جرافيك وإعلانات توضيحية',
    bio: 'أحول أفكار الشركات والتطبيقات إلى فيديوهات موشن جرافيك مبهرة تخطف الأنظار وتشرح مميزات خدمتك في ثوانٍ. اشتغلت مع كبرى الشركات الناشئة في مصر والخليج.',
    gear: ['After Effects 2026', 'Cinema 4D', 'Wacom Cintiq Pro', 'Custom RTX 4090 Rig'],
    skills: ['تصميم شخصيات كرتونية', 'أنيميشن واجهات تطبيقات UI', 'مؤثرات بصرية سينمائية', 'ميكساج صوتي احترافي'],
    turnaroundHours: 48,
    sampleVideos: [
      {
        id: 'vid-201',
        title: 'إعلان موشن جرافيك لتطبيق توصيل ذكي',
        duration: 35,
        aspectRatio: '9:16',
        videoUrl: '/assets/videos/motion_graphics_ad.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
        category: 'motion',
        views: '610K',
        likes: '48K',
        tags: ['موشن', 'تطبيقات', 'أنيميشن'],
        description: 'شرح فكرة التطبيق وحلول الدفع الإلكتروني بأسلوب موشن جرافيك انسيابي ممتع.'
      }
    ],
    packages: {
      basic: {
        title: 'موشن جرافيك خفيف',
        duration: '15 ثانية',
        price: 1200,
        revisions: 2,
        deliveryDays: 3,
        features: ['رسومات متجهة عالية الدقة', 'تعليق صوتي آلي احترافي', 'موسيقى ومؤثرات صوتية SFX']
      },
      standard: {
        title: 'فيديو شرح متكامل 30 ثانية',
        duration: '30 ثانية',
        price: 2100,
        revisions: 3,
        deliveryDays: 3,
        features: ['رسم ستوري بورد مخصص للبراند', 'تعليق صوتي بشري استوديو', 'أنيميشن سلس ومؤثرات حركية فاخرة']
      },
      premium: {
        title: 'حملة موشن جرافيك 3D وسينمائي',
        duration: '60 ثانية',
        price: 3800,
        revisions: 5,
        deliveryDays: 2,
        features: ['دمج عناصر ثلاثية الأبعاد 3D', 'تسليم بالمقاسات العمودية والأفقية', 'ملفات المشروع المصدرية كاملة']
      }
    },
    payoutMethods: {
      instapay: 'nour.motion@instapay',
      bankAccount: 'EG120002000000000987654321'
    }
  },
  {
    id: 'creator-3',
    name: 'أحمد سامح (Spokesperson)',
    handle: '@ahmed_actor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    verified: true,
    featured: false,
    topRated: true,
    roleTitle: 'مقدم إعلانات وممثل أمام الكاميرا',
    location: 'الجيزة - الشيخ زايد',
    rating: 4.92,
    reviewCount: 95,
    completedProjects: 130,
    startingPrice: 950,
    category: 'spokesperson',
    categoryLabel: 'مقدم إعلانات وممثل كاميرا',
    bio: 'مذيع وممثل إعلانات بخبرة في إلقاء النصوص بطريقة طبيعية مقنعة بعيدة عن التصنع. أقدم إعلانات لمتاجر العقارات، الخدمات الطبية، والسيارات والعيادات.',
    gear: ['Blackmagic Pocket 6K', 'Rode Wireless PRO', 'Teleprompter برو', 'استوديو عازل للصوت'],
    skills: ['حضور قوي أمام الكاميرا', 'لهجات متعددة (مصري، خليجي، فصحى)', 'إتقان نبرات البيع المقنع'],
    turnaroundHours: 24,
    sampleVideos: [
      {
        id: 'vid-301',
        title: 'إعلان ترويجي لعيادة أسنان وتجميل',
        duration: 30,
        aspectRatio: '9:16',
        videoUrl: '/assets/videos/spokesperson_ad.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80',
        category: 'spokesperson',
        views: '320K',
        likes: '19K',
        tags: ['مقدم', 'عيادات', 'إعلانات ممول'],
        description: 'تقديم احترافي بنبرة واثقة ومقنعة تشرح العرض الحصري وتدعو لاتخاذ القرار فوراً.'
      }
    ],
    packages: {
      basic: {
        title: 'إعلان سريع 20 ثانية',
        duration: '20 ثانية',
        price: 950,
        revisions: 2,
        deliveryDays: 2,
        features: ['تسجيل استوديو 4K عالي الوضوح', 'نص إعلاني يصل إلى 50 كلمة', 'خلفية احترافية ملائمة']
      },
      standard: {
        title: 'إعلان رئيسي 40 ثانية',
        duration: '40 ثانية',
        price: 1600,
        revisions: 3,
        deliveryDays: 2,
        features: ['تضمين لوجو واسم شركتك على الشاشة', 'إمكانية التصوير بملابس رسمية أو كاجوال', 'تسليم نسختين بنهايتين مختلفتين']
      },
      premium: {
        title: 'إعلان براند VIP كامل',
        duration: '60 ثانية',
        price: 2700,
        revisions: 4,
        deliveryDays: 1,
        features: ['تسليم سريع خلال 24 ساعة فقط', 'صوت نقي بمايك Rode برو', 'تضمين مشاهد توضيحية لمنتجك']
      }
    },
    payoutMethods: {
      vodafoneCash: '01098765432',
      instapay: 'ahmed.sameh@instapay'
    }
  },
  {
    id: 'creator-4',
    name: 'سارة طارق',
    handle: '@sara_ugc_lifestyle',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    verified: true,
    featured: true,
    topRated: false,
    roleTitle: 'صانعة محتوى لايف ستايل وعناية وتجميل',
    location: 'القاهرة - التجمع الخامس',
    rating: 4.89,
    reviewCount: 114,
    completedProjects: 175,
    startingPrice: 750,
    category: 'ecommerce',
    categoryLabel: 'إعلانات منتجات وعناية وتجميل',
    bio: 'صانعة محتوى UGC تركز على الجمال والموضة ومنتجات المنزل الذكي. أصور تجربة حقيقية للمنتج (Unboxing و Before/After) ترفع معدلات الثقة والشراء المباشر.',
    gear: ['iPhone 16 Pro Max', 'DJI Osmo Mobile 6', 'Ring Light 18 inch', 'استوديو منزلي مينيمال'],
    skills: ['Unboxing جذاب', 'تصوير Before & After', 'عفوية ومصداقية عالية', 'تنسيق ألوان وزوايا تصوير'],
    turnaroundHours: 36,
    sampleVideos: [
      {
        id: 'vid-401',
        title: 'أنبوكسينج وتجربة كريم ترطيب طبيعي',
        duration: 25,
        aspectRatio: '9:16',
        videoUrl: '/assets/videos/default_reel.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
        category: 'ecommerce',
        views: '930K',
        likes: '74K',
        tags: ['تجميل', 'UGC', 'أنبوكسينج'],
        description: 'فيديو عفوي مع تجربة المنتج أمام المرآة واستعراض النتائج الفورية.'
      }
    ],
    packages: {
      basic: {
        title: 'تجربة منتج سريعة',
        duration: '15-20 ثانية',
        price: 750,
        revisions: 2,
        deliveryDays: 2,
        features: ['تصوير بجودة 4K 60fps', 'إظهار تفاصيل المنتج عن قرب', 'موسيقى تريند ملائمة للمنصة']
      },
      standard: {
        title: 'فيديو ريفيو متكامل',
        duration: '35 ثانية',
        price: 1300,
        revisions: 3,
        deliveryDays: 2,
        features: ['توضيح طريقة الاستخدام والفوائد', 'كتابة نص الإعلان بطريقة عفوية', 'صورة مصغرة Thumbnail احترافية']
      },
      premium: {
        title: 'حزمة إعلانية للمتجر (3 فيديوهات)',
        duration: '3 فيديوهات x 20 ثانية',
        price: 2900,
        revisions: 4,
        deliveryDays: 3,
        features: ['3 فيديوهات مختلفة للمنتج نفسه', 'تنوع في الإضاءات والملابس والزوايا', 'تسليم خلال 72 ساعة']
      }
    },
    payoutMethods: {
      instapay: 'sara.ugc@instapay',
      vodafoneCash: '01234567890'
    }
  },
  {
    id: 'creator-5',
    name: 'يوسف العطار (3D & Visuals)',
    handle: '@youssef_3d_craft',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    verified: true,
    featured: false,
    topRated: true,
    roleTitle: 'فنان ومصمم إعلانات ثلاثية الأبعاد 3D CGI',
    location: 'المنصورة',
    rating: 4.97,
    reviewCount: 78,
    completedProjects: 110,
    startingPrice: 1800,
    category: 'animation_3d',
    categoryLabel: 'إعلانات ثلاثية الأبعاد 3D وCGI',
    bio: 'أصمم إعلانات CGI سينمائية تكسر الواقع (FOOH) وإعلانات ثلاثية الأبعاد للمنتجات الفاخرة، العطور، والأجهزة، تمنح علامتك التجارية هيبة وفخامة لا مثيل لها.',
    gear: ['Blender 4.3', 'Octane Render', 'Dual RTX 4080', 'Houdini FX'],
    skills: ['نمذجة ثلاثية الأبعاد واقعية', 'محاكاة السوائل والدخان', 'إعلانات CGI في شوارع حقيقية', 'إضاءة واستوديو افتراضي'],
    turnaroundHours: 72,
    sampleVideos: [
      {
        id: 'vid-501',
        title: 'إعلان سينمائي 3D فاخر لعطور أروماتك (Aromatic Moon & Opal)',
        duration: 33,
        aspectRatio: '9:16',
        videoUrl: '/assets/aistudio/_____________________________________________________2a7706a7.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop&q=80',
        category: 'animation_3d',
        views: '1.4M',
        likes: '142K',
        tags: ['عطور فاخرة', '3D CGI', 'أروماتك', 'إعلان سينمائي'],
        description: 'إعلان سينمائي احترافي ثلاثي الأبعاد مع محاكاة الماء والضباب وانعكاسات ضوئية مذهلة لعطور Aromatic الفاخرة.'
      }
    ],
    packages: {
      basic: {
        title: 'ريندر 3D للمنتج 15 ثانية',
        duration: '15 ثانية',
        price: 1800,
        revisions: 2,
        deliveryDays: 3,
        features: ['دوران وزوايا تصوير افتراضية 360', 'إضاءة استوديو فاخرة للمنتج', 'تسليم بدقة 4K فائقة']
      },
      standard: {
        title: 'فيديو إعلاني 3D مع تفكيك المكونات',
        duration: '30 ثانية',
        price: 3200,
        revisions: 3,
        deliveryDays: 4,
        features: ['انفجار جزيئي وتجميع المكونات Exploded View', 'مؤثرات صوتية محيطية سينمائية', 'موسيقى حصرية']
      },
      premium: {
        title: 'إعلان CGI شوارع واقعي (FOOH Viral)',
        duration: '25 ثانية',
        price: 5500,
        revisions: 4,
        deliveryDays: 5,
        features: ['دمج المنتج ثلاثي الأبعاد في موقع شهير بالقاهرة/دبي', 'فيديو معد لانتشار فيروسي ضخم', 'حقوق كاملة مدى الحياة']
      }
    },
    payoutMethods: {
      instapay: 'youssef.3d@instapay',
      bankAccount: 'EG330015000000000765432109'
    }
  }
];

export const INITIAL_ORDERS: VideoOrder[] = [
  {
    id: 'ord-9921',
    orderNumber: 'RS-9921',
    clientId: 'demo-client-1',
    clientName: 'شركة أروماتك للعطور الفاخرة (Aromatic)',
    clientEmail: 'brand@aromatic.com',
    clientPhone: '01019283746',
    creatorId: 'creator-5',
    creatorName: 'يوسف العطار (3D & Visuals)',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    serviceTitle: 'إعلان 3D سينمائي فاخر لمنتج عطر MOON & OPAL',
    packageType: 'standard',
    durationSeconds: 33,
    aspectRatio: '9:16',
    projectGoal: 'إطلاق حملة إعلانات ممولة فيروسية لعطور أروماتك على تيك توك وإنستجرام ريلز',
    productName: 'عطر Aromatic Moon & Opal',
    productUrl: 'https://aromatic.store',
    scriptNotes: 'تصميم ثلاثي الأبعاد سينمائي في كهف أسطوري مع حركة الماء والضباب وانعكاسات ضوئية تخطف الأنظار.',
    targetAudience: 'عشاق العطور الفاخرة والفخامة في الخليج ومصر',
    addOns: {
      rushDelivery: true,
      scriptWriting: true,
      subtitles: false,
      rawFootage: true,
      actorVoiceover: false
    },
    pricing: {
      basePrice: 3200,
      addonsTotal: 1000,
      platformFee: 210,
      total: 4410
    },
    paymentMethod: 'instapay',
    paymentDetails: {
      senderIdentifier: 'aromatic.pay@instapay',
      referenceCode: 'IPN-77391024',
      paidAt: '2026-10-28 09:15',
      verified: true
    },
    status: 'draft_ready',
    createdAt: '2026-10-28',
    deliveryDueDate: '2026-10-29',
    draftVideoUrl: '/assets/aistudio/_____________________________________________________2a7706a7.mp4',
    revisionsLeft: 3,
    feedbackNotes: 'تم تسليم المسودة الأولى للإعلان السينمائي ثلاثي الأبعاد بالكامل! يرجى المعاينة واعتماده للتحميل بدقة 4K.'
  },
  {
    id: 'ord-8492',
    orderNumber: 'RS-8492',
    clientId: 'demo-client-1',
    clientName: 'شركة النور للأجهزة الذكية',
    clientEmail: 'info@alnoortech.eg',
    clientPhone: '01019283746',
    creatorId: 'creator-1',
    creatorName: 'كريم المنشاوي',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    serviceTitle: 'إعلان UGC لمنتج ساعة ذكية مقاومة للماء',
    packageType: 'standard',
    durationSeconds: 30,
    aspectRatio: '9:16',
    projectGoal: 'زيادة المبيعات المباشرة عبر حملة إعلانية ممولة على تيك توك وإنستغرام ريلز',
    productName: 'ساعة Smart Pro X2',
    productUrl: 'https://alnoor-store.com/watch-x2',
    scriptNotes: 'التركيز على ميزة بطارية تدوم 14 يوم وخاصية الرد على المكالمات باللغة العربية.',
    targetAudience: 'الشباب والرياضيين من سن 18 إلى 35 في مصر والخليج',
    addOns: {
      rushDelivery: false,
      scriptWriting: true,
      subtitles: true,
      rawFootage: false,
      actorVoiceover: false
    },
    pricing: {
      basePrice: 1450,
      addonsTotal: 400,
      platformFee: 93,
      total: 1943
    },
    paymentMethod: 'instapay',
    paymentDetails: {
      senderIdentifier: 'alnoor.tech@instapay',
      referenceCode: 'IPN-98472918',
      paidAt: '2026-10-27 14:32',
      verified: true
    },
    status: 'draft_ready',
    createdAt: '2026-10-27',
    deliveryDueDate: '2026-10-29',
    draftVideoUrl: '/assets/videos/ecommerce_ad.mp4',
    revisionsLeft: 3,
    feedbackNotes: 'تم تسليم المسودة الأولى بنجاح! يمكنك الآن مشاهدة الفيديو وطلب أي تعديلات أو اعتماده للتحميل.'
  },
  {
    id: 'ord-5510',
    orderNumber: 'RS-5510',
    clientId: 'demo-client-1',
    clientName: 'شركة النور للأجهزة الذكية',
    clientEmail: 'info@alnoortech.eg',
    clientPhone: '01019283746',
    creatorId: 'creator-2',
    creatorName: 'نور الهدى سليم',
    creatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    serviceTitle: 'فيديو موشن جرافيك توضيحي لطريقة الطلب والضمان',
    packageType: 'basic',
    durationSeconds: 15,
    aspectRatio: '9:16',
    projectGoal: 'تسهيل تجربة العميل وشرح خطوات الدفع عند الاستلام والاستبدال خلال 14 يوم',
    productName: 'خدمة ضمان النور الذهبي',
    scriptNotes: 'أسلوب سريع بالعامية المصرية المحببة مع ظهور أيقونات الضمان والتوصيل السريع.',
    targetAudience: 'عملاء المتجر الجدد',
    addOns: {
      rushDelivery: true,
      scriptWriting: false,
      subtitles: true,
      rawFootage: false,
      actorVoiceover: false
    },
    pricing: {
      basePrice: 1200,
      addonsTotal: 500,
      platformFee: 85,
      total: 1785
    },
    paymentMethod: 'vodafone_cash',
    paymentDetails: {
      senderIdentifier: '01019283746',
      referenceCode: 'VF-3829104',
      paidAt: '2026-10-26 18:10',
      verified: true
    },
    status: 'completed',
    createdAt: '2026-10-26',
    deliveryDueDate: '2026-10-27',
    draftVideoUrl: '/assets/videos/motion_graphics_ad.mp4',
    finalVideoUrl: '/assets/videos/motion_graphics_ad.mp4',
    revisionsLeft: 2,
    feedbackNotes: 'تم اعتماد الفيديو بنجاح وجاهز للتحميل بجودة Full HD 60fps.'
  }
];

export const DEMO_CLIENT: UserSession = {
  id: 'demo-client-1',
  name: 'محمد عبد الرحمن',
  email: 'client@reelstore.io',
  phone: '01019283746',
  role: 'client',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
  companyName: 'براند أورا للأزياء والإلكترونيات'
};

export const DEMO_CREATOR: UserSession = {
  id: 'creator-1',
  name: 'كريم المنشاوي',
  email: 'creator@reelstore.io',
  phone: '01012345678',
  role: 'creator',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  balance: 6850,
  pendingBalance: 1943,
  completedJobsCount: 245,
  payoutMethodPreferred: 'instapay',
  payoutIdentifier: 'karim.visuals@instapay'
};
