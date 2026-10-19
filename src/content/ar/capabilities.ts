import type { CapabilityPageContent } from "../capabilities";

export const CAPABILITIES_CONTENT_AR: CapabilityPageContent = {
  status: "confirmed",
  kicker: "مصفوفة القدرات الفنية والهندسية",
  heroHeading: "ما هي المعدات والمنظومات التي تعمل عليها ME GROUP؟",
  heroSubheading:
    "تغطية فنية متكاملة لآلات ومحركات السفن، لوحات التوزيع الكهربائي، وحدات التحكم الآلي، الأنظمة الهوائية، وأجهزة الملاحة والراديو البحرية.",
  leadStatement:
    "نادراً ما تعمل معدات السفينة بمعزل عن باقي المنظومات. فأي اضطراب تشغيلي في مولد كهربائي، أو محطة راديو، أو مضخة، أو ضاغط هواء غالباً ما يمتد تأثيره بين الحالة الميكانيكية، التغذية الكهربائية، إشارات التردد اللاسلكي، المشغلات الهوائية، والمنطق البرمجي للتحكم. تتعامل ME Group مع الأعطال البحرية من هذا المنظور المتكامل متعدد التخصصات.",
  categories: [
    {
      id: "power-propulsion",
      code: "01",
      title: "منظومات الدفع وتوليد الطاقة",
      summary:
        "المحركات الرئيسية ومحركات الديزل والمولدات البحرية التي تمد السفينة بالطاقة الحركية والكهربائية المستمرة.",
      equipmentList: [
        {
          name: "محركات الديزل الرئيسية للدفع (Main Engines)",
          primaryDiscipline: "ميكانيكا",
          serviceRoute: "/ar/services/mechanical",
          scopeSummary:
            "المعاينة الميكانيكية، صيانة وشوش السلندرات، قياس خلوصات التشغيل، فحص خطوط الوقود، وتشخيص دوائر التبريد.",
          relatedDisciplines: ["تحكم آلي", "أنظمة هوائية"],
        },
        {
          name: "محركات الديزل المساعدة (Auxiliary Engines)",
          primaryDiscipline: "ميكانيكا",
          serviceRoute: "/ar/services/mechanical",
          scopeSummary:
            "عمرة المحركات، قياس خلوصات كراسي المحاور، طلمبات حقن الوقود، وصلات الجافرنر، ودوائر زيت التزييت.",
          relatedDisciplines: ["كهرباء", "تحكم آلي"],
        },
        {
          name: "المولدات البحرية (Marine Generators)",
          primaryDiscipline: "كهرباء",
          serviceRoute: "/ar/services/electrical",
          scopeSummary:
            "اختبار مقاومة العزل للملفات (Stator/Rotor)، ضبط كروت الـ AVR، فحص دايودات الإثارة، وتقييم كراسي التحميل.",
          relatedDisciplines: ["ميكانيكا", "تحكم آلي"],
        },
        {
          name: "منظمات الجهد التلقائية (AVR)",
          primaryDiscipline: "كهرباء",
          serviceRoute: "/ar/services/electrical",
          scopeSummary:
            "ضبط استقرار الجهد، كشف وتتبع أعطال دوائر الإثارة، وحل مشكلات عدم بناء الجهد (Voltage Build-up).",
          relatedDisciplines: ["تحكم آلي"],
        },
      ],
    },
    {
      id: "distribution-control",
      code: "02",
      title: "التوزيع الكهربائي والقواطع (Switchgear)",
      summary:
        "لوحات التوزيع الرئيسية، القواطع الهوائية، مراقبة أعطال الأرضي، ولوحات بدء تشغيل المحركات الكهربائية.",
      equipmentList: [
        {
          name: "لوحات التوزيع الرئيسية (Main Switchboards & MSB)",
          primaryDiscipline: "كهرباء",
          serviceRoute: "/ar/services/electrical",
          scopeSummary:
            "فحص وربط البارات النحاسية (Busbars)، المسح الحراري بالأشعة تحت الحمل، عزل أعطال الأرضي، والتحقق من الإنترلوك.",
          relatedDisciplines: ["تحكم آلي", "سلامة"],
        },
        {
          name: "القواطع الهوائية الرئيسية (Air Circuit Breakers - ACB)",
          primaryDiscipline: "كهرباء",
          serviceRoute: "/ar/services/electrical",
          scopeSummary:
            "صيانة ميكانيزم الفصل والوصل، فحص غرف إطفاء الشرر، اختبارات الفصل بالحقن الأولي والثانوي، وتنعيم نقاط التلامس.",
          relatedDisciplines: ["تحكم آلي"],
        },
        {
          name: "المحركات الكهربائية الحثية والتيار المستمر (AC/DC Motors)",
          primaryDiscipline: "كهرباء",
          serviceRoute: "/ar/services/electrical",
          scopeSummary:
            "قياس مقاومة عزل الملفات بالميجر، تغيير البيل والرمان بلي، ضبط المحاذاة الميكانيكية، وتجديد علب التوصيل.",
          relatedDisciplines: ["ميكانيكا"],
        },
        {
          name: "لوحات تشغيل المحركات (Motor Starters - DOL / Star-Delta)",
          primaryDiscipline: "كهرباء",
          serviceRoute: "/ar/services/electrical",
          scopeSummary:
            "استبدال الكونتاكتورات المتهالكة، معايرة ريليهات الأوفرلود، اختبار محولات التحكم، والتحقق من لوجيك التشغيل والإيقاف.",
          relatedDisciplines: ["تحكم آلي"],
        },
      ],
    },
    {
      id: "automation-instrumentation",
      code: "03",
      title: "التحكم الآلي والـ PLC والحساسات",
      summary:
        "المتحكمات البرمجية البحرية، قنوات المراقبة والإنذار، دوائر المزامنة، ومنظومات الكشف والسلامة.",
      equipmentList: [
        {
          name: "المتحكمات البرمجية البحرية (Marine PLCs)",
          primaryDiscipline: "تحكم آلي",
          serviceRoute: "/ar/services/automation",
          scopeSummary:
            "استخراج وتحليل سجلات الأعطال، اختبار كروت الدخل والخرج I/O، معايرة دوائر 4-20mA، وفحص كفاءة كروت التغذية.",
          relatedDisciplines: ["كهرباء", "أنظمة هوائية"],
        },
        {
          name: "أنظمة الإنذار والمراقبة (Alarm & Monitoring - AMS)",
          primaryDiscipline: "تحكم آلي",
          serviceRoute: "/ar/services/automation",
          scopeSummary:
            "فحص قنوات الإنذار، تتبع أعطال الحساسات، مراجعة متوسط درجات حرارة العادم، ودوائر إنذارات البلوف والبيلج.",
          relatedDisciplines: ["ميكانيكا", "سلامة"],
        },
        {
          name: "أنظمة إدارة وتوزيع الأحمال (Power Management - PMS)",
          primaryDiscipline: "تحكم آلي",
          serviceRoute: "/ar/services/automation",
          scopeSummary:
            "تشخيص أعطال المزامنة التلقائية (Auto-Sync)، معايرة توزيع الأحمال (Load Sharing)، واختبار فصل الأحمال غير الحيوية.",
          relatedDisciplines: ["كهرباء"],
        },
        {
          name: "حساسات الضغط ودرجة الحرارة ومناسيب الخزانات",
          primaryDiscipline: "تحكم آلي",
          serviceRoute: "/ar/services/automation",
          scopeSummary:
            "فحص ومعايرة حساسات الحرارة PT100 RTD، ترانسميترات الضغط 4-20mA، ومجسات المناسيب الهيدروستاتيكية.",
          relatedDisciplines: ["ميكانيكا", "أنظمة هوائية"],
        },
      ],
    },
    {
      id: "pumps-fluid-systems",
      code: "04",
      title: "المضخات ومسارات السوائل والأنظمة الهوائية",
      summary:
        "نقل وتداول السوائل، خطوط تبريد المحركات، هواء بدء التشغيل عالي الضغط، والمشغلات الهوائية.",
      equipmentList: [
        {
          name: "المضخات الطاردة المركزية والحلزونية (Centrifugal & Screw Pumps)",
          primaryDiscipline: "ميكانيكا",
          serviceRoute: "/ar/services/mechanical",
          scopeSummary:
            "تجديد الميكانيكال سيل، قياس خلوصات حلقات التآكل للريشة (Impeller Wear Rings)، ومعايرة استقامة عمود الإدارة.",
          relatedDisciplines: ["كهرباء"],
        },
        {
          name: "خطوط الوقود وزيت التزييت ومياه التبريد",
          primaryDiscipline: "ميكانيكا",
          serviceRoute: "/ar/services/mechanical",
          scopeSummary:
            "صيانة الفلاتر المزدوجة (Duplex Filters)، عمرة بلوف الخلط الثرموستاتية، وفحص مواسير الوقود عالي الضغط.",
          relatedDisciplines: ["تحكم آلي"],
        },
        {
          name: "ضواغط هواء بدء التشغيل (Starting Air Compressors)",
          primaryDiscipline: "أنظمة هوائية",
          serviceRoute: "/ar/services/pneumatic",
          scopeSummary:
            "استبدال بلفات السحب والطرد، عمرة وشوش السلندرات، تنظيف مبردات المراحل (Intercoolers)، وفحص بلوف الأمان.",
          relatedDisciplines: ["ميكانيكا", "كهرباء"],
        },
        {
          name: "البساتم الهوائية وصمامات السولينويد (Cylinders & Solenoid Valves)",
          primaryDiscipline: "أنظمة هوائية",
          serviceRoute: "/ar/services/pneumatic",
          scopeSummary:
            "تجديد أطقم السيلات والحشو، اختبار مشغلات صمامات الإغلاق السريع (Quick-Closing)، وفحص تسريبات شبكات الهواء.",
          relatedDisciplines: ["تحكم آلي"],
        },
      ],
    },
    {
      id: "navigation-communication",
      code: "05",
      title: "أجهزة الملاحة والراديو والاتصالات البحرية",
      summary:
        "محطات الراديو البحرية GMDSS، أجهزة الاتصال بالأقمار الصناعية، بنوك بطاريات الطوارئ، وإلكترونيات كابينة القيادة.",
      equipmentList: [
        {
          name: "محطات الراديو الموحدة GMDSS وأجهزة الاتصال متعددة الترددات",
          primaryDiscipline: "راديو وملاحة",
          serviceRoute: "/ar/services/radio-equipment",
          scopeSummary:
            "أجهزة الإرسال والاستقبال MF/HF وVHF DSC، اختبار التحويل التلقائي لتغذية الطوارئ، وقياس قدرة الخرج اللاسلكي RF.",
          relatedDisciplines: ["كهرباء", "تحكم آلي"],
        },
        {
          name: "محطات الأقمار الصناعية البحرية Inmarsat-C",
          primaryDiscipline: "راديو وملاحة",
          serviceRoute: "/ar/services/radio-equipment",
          scopeSummary:
            "فحص فقد الإشارة في كابلات الهوائي، استقبال إحداثيات الـ GPS، اختبار أزرار الاستغاثة، وتنفيذ اختبارات الـ PV المعتمدة.",
          relatedDisciplines: ["كهرباء"],
        },
        {
          name: "بنوك بطاريات الطوارئ GMDSS والشواحن الذكية",
          primaryDiscipline: "راديو وملاحة",
          serviceRoute: "/ar/services/radio-equipment",
          scopeSummary:
            "اختبارات التفريغ تحت الحمل طبقاً لاشتراطات هيئات الإشراف، التحويل التلقائي عند انقطاع التيار، وقياس المقاومة الداخلية.",
          relatedDisciplines: ["كهرباء"],
        },
        {
          name: "أجهزة الاستغاثة والطوارئ الملاحية (EPIRB / SART / NAVTEX)",
          primaryDiscipline: "راديو وملاحة",
          serviceRoute: "/ar/services/radio-equipment",
          scopeSummary:
            "فحص صلاحية وحدة الإطلاق الهيدروستاتيكي، فك شفرة إرسال 406MHz، استجابة رادار الـ SART، والتحضير للتفتيش السنوي.",
          relatedDisciplines: ["سلامة", "تحكم آلي"],
        },
      ],
    },
  ],
  crossDisciplineScenarios: [
    {
      id: "generator-trip",
      title: "فصل المولد وفشل المزامنة الكهربائية (Synchronization Failure)",
      observedSymptom:
        "المولد المساعد يفشل في أخذ الحمل أثناء التوصيل على التوازي أو يفصل فجأة على هبوط جهد (Under-Voltage) أو قدرة عكسية (Reverse Power).",
      disciplinesInvolved: [
        {
          name: "ميكانيكا",
          code: "01",
          role: "فحص حركة مسطرة حقن الوقود، استجابة منظم السرعة (Governor)، واستقرار ضغط خط التغذية.",
          route: "/ar/services/mechanical",
        },
        {
          name: "كهرباء",
          code: "02",
          role: "اختبار إثارة كارت الـ AVR، دايودات التوحيد الدوارة، وملفات الفصل في القاطع الهوائي ACB.",
          route: "/ar/services/electrical",
        },
        {
          name: "تحكم آلي",
          code: "03",
          role: "التحقق من تطابق زاوية الطور في الـ PMS، إشارات ريليه فحص التزامن Synchro-check، وموازنة الأحمال.",
          route: "/ar/services/automation",
        },
      ],
      integratedResolution:
        "توفر ME Group مهندسين متعددي التخصصات قادرين على تقييم جافرنر المحرك، ودائرة إثارة المولد، ولوجيك المزامنة في الـ PMS بالتوازي في وقت واحد لعزل السبب الجذري الحقيقي.",
    },
    {
      id: "compressor-slow-charge",
      title: "بطء شحن ضاغط هواء بدء التشغيل وارتفاع حرارته",
      observedSymptom:
        "تضاعف زمن شحن تنك الهواء؛ أو فصل الضاغط على الأوفرلود الحراري للموتور أو تنفيس بلف الأمان.",
      disciplinesInvolved: [
        {
          name: "أنظمة هوائية",
          code: "04",
          role: "فحص بلفات السحب والطرد من ترسبات الكربون، مراجعة بلف تخفيف الحمل Unloader، ونقطة ندى مجفف الهواء.",
          route: "/ar/services/pneumatic",
        },
        {
          name: "ميكانيكا",
          code: "01",
          role: "قياس تآكل شميز السلندر، خلوصات فتحات شنابر البستم، وفحص وصلة الكبلنج مع الموتور.",
          route: "/ar/services/mechanical",
        },
        {
          name: "كهرباء",
          code: "02",
          role: "قياس سحب تيار المحرك لكل فازة، فحص نقاط تلامس كونتاكتورات بادئ الحركة، وقياس العزل بالميجر.",
          route: "/ar/services/electrical",
        },
      ],
      integratedResolution:
        "يتعامل فريقنا مع بلوف الهواء، وخلوصات الشنابر الميكانيكية، وتيار سحب الموتور الكهربائي في مهمة فنية موحدة تنهي المشكلة جذرياً.",
    },
    {
      id: "cooling-overheat",
      title: "إنذار ارتفاع درجة حرارة مياه تبريد المحرك (Jacket Water)",
      observedSymptom:
        "تباطؤ محرك الدفع تلقائياً نتيجة إنذار ارتفاع حرارة مياه التبريد مع تذبذب مستمر في قراءات العدادات.",
      disciplinesInvolved: [
        {
          name: "ميكانيكا",
          code: "01",
          role: "فحص حلقات تآكل طلمبة مياه البحر، ومراجعة صمام الخلط الثرموستاتي في خط التبريد.",
          route: "/ar/services/mechanical",
        },
        {
          name: "تحكم آلي",
          code: "03",
          role: "معايرة حساس الحرارة PT100، اختبار إشارة الترانسميتر 4-20mA، والتحقق من نقطة ضبط إنذار الـ AMS.",
          route: "/ar/services/automation",
        },
      ],
      integratedResolution:
        "بالتحقق من التدفق الفعلي للمياه واختبار دائرة الحساس والترانسميتر، نضمن التمييز الدقيق بين الإنذارات الكاذبة الناتجة عن الحساسات وانسدادات التبادل الحراري الحقيقية.",
    },
    {
      id: "gmdss-power-ams-fault",
      title: "فقد تغذية محطة الـ GMDSS وتداخل إنذار الـ AMS بكابينة القيادة",
      observedSymptom:
        "فقدان محطة راديو الـ GMDSS للتغذية الكهربائية الرئيسية دون تحويل تلقائي لبنك بطاريات الطوارئ، مع إطلاق إنذارات اتصالات متقطعة على نظام المراقبة والإنذار (AMS).",
      disciplinesInvolved: [
        {
          name: "راديو وملاحة",
          code: "08",
          role: "فحص دخل التغذية لوحدة الراديو، اختبار محولات DC-DC، وقياس قدرة خرج الإرسال اللاسلكي RF تحت تغذية البطاريات.",
          route: "/ar/services/radio-equipment",
        },
        {
          name: "كهرباء",
          code: "02",
          role: "تتبع قاطع التغذية بلوحة الطوارئ ESB، فحص مفتاح التحويل التلقائي ATS، والتأكد من جهود الشاحن الذكي.",
          route: "/ar/services/electrical",
        },
        {
          name: "تحكم آلي",
          code: "03",
          role: "فحص سجل أعطال نظام الـ AMS بكابينة القيادة، التحقق من دائرة إشارات الإنذار الرقمية، وإزالة الشوشرة الأرضية.",
          route: "/ar/services/automation",
        },
      ],
      integratedResolution:
        "توفر ME Group متخصصين يفهمون التفاعل الدقيق بين لوحات توزيع الطوارئ، ودوائر إنذارات الأتمتة، وأجهزة الاتصالات الحساسة في كابينة القيادة، لضمان الامتثال للوائح الدولية وسلامة الملاحة.",
    },
  ],
  seoTitle: "القدرات الهندسية ومصفوفة المعدات البحرية | ME Group",
  seoDescription:
    "استكشف مصفوفة القدرات الفنية لمجموعة ME Group: محركات الديزل، المولدات، لوحات التوزيع MSB، وحدات الـ PLC، المضخات، الضواغط، وأجهزة الراديو والملاحة البحرية GMDSS.",
};
