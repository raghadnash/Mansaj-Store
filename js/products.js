/* =========================================================================
   بيانات المنتجات — منسج
   =========================================================================
   هذا هو المكان الوحيد الذي تحتاج تعديله لإضافة/حذف/تعديل أي قطعة.
   لا داعي لمس ملف app.js إطلاقاً لإدارة المنتجات.

   لإضافة قطعة جديدة: انسخ أحد الكائنات بالأسفل (بين { و }) والصقه قبل
   القوس الأخير ]، ثم عدّل القيم.

   شرح الحقول:
   - id          : رقم فريد لكل قطعة (لا تكرره)
   - name        : اسم القطعة
   - category    : الفئة (تُستخدم تلقائياً في فلتر "الفئة" أعلى الصفحة)
   - price       : السعر (رقم فقط بدون رمز عملة)
   - description : وصف قصير يظهر داخل نافذة تفاصيل المنتج
   - images      : مصفوفة روابط الصور (أضف بقدر ما تريد من الصور للموديل)
                   لاستخدام صور حقيقية: ضع الصور داخل مجلد images/
                   واكتب المسار مثلاً: "images/shirt-01-1.jpg"
   - colors      : الألوان المتاحة { name: اسم اللون، hex: كود اللون }
   - sizes       : كل المقاسات التي قد تتوفر للقطعة (بالترتيب المطلوب عرضه)
   - outOfStock  : مقاسات هذه القطعة تحديداً غير متوفرة حالياً (اختياري)
   ========================================================================= */

const PRODUCTS = [
  {
    id: 1,
    name: "قميص كتان فضفاض",
    category: "قمصان",
    price: 38,
    description: "قميص من الكتان الطبيعي 100%، قصة مريحة وواسعة تناسب الأجواء الدافئة، بأزرار قرن طبيعية وجيب أمامي واحد.",
    images: [
      "https://placehold.co/600x800/e8dcc8/1c1a17?text=منسج+01",
      "https://placehold.co/600x800/ddd0b8/1c1a17?text=منسج+02",
      "https://placehold.co/600x800/cfc2a5/1c1a17?text=منسج+03"
    ],
    colors: [
      { name: "بيج", hex: "#d8c7a8" },
      { name: "أبيض عاجي", hex: "#f3ede0" },
      { name: "كحلي", hex: "#2c3550" }
    ],
    sizes: ["S", "M", "L", "XL"],
    outOfStock: ["XL"]
  },
  {
    id: 2,
    name: "بنطلون صوف كلاسيك",
    category: "بناطيل",
    price: 52,
    description: "بنطلون قصة مستقيمة من مزيج الصوف، خصر مرتفع قليلاً وتفصيل أنيق يناسب الإطلالات الرسمية وشبه الرسمية.",
    images: [
      "https://placehold.co/600x800/2c2a26/f1ebe0?text=منسج+01",
      "https://placehold.co/600x800/3a3733/f1ebe0?text=منسج+02"
    ],
    colors: [
      { name: "أسود", hex: "#1c1a17" },
      { name: "رمادي فحمي", hex: "#4a4640" }
    ],
    sizes: ["44", "46", "48", "50", "52"],
    outOfStock: []
  },
  {
    id: 3,
    name: "جاكيت جينز كلاسيك",
    category: "جاكيتات",
    price: 65,
    description: "جاكيت دنيم أزرق كلاسيكي بغسلة متوسطة، أزرار معدنية وجيوب متعددة، قطعة أساسية تناسب كل الفصول تقريباً.",
    images: [
      "https://placehold.co/600x800/5b7599/f1ebe0?text=منسج+01",
      "https://placehold.co/600x800/4a6480/f1ebe0?text=منسج+02",
      "https://placehold.co/600x800/3f5570/f1ebe0?text=منسج+03"
    ],
    colors: [
      { name: "أزرق كلاسيك", hex: "#5b7599" },
      { name: "أزرق داكن", hex: "#2f3f56" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    outOfStock: ["S"]
  },
  {
    id: 4,
    name: "فستان صيفي منقّط",
    category: "فساتين",
    price: 48,
    description: "فستان بقصة أنيقة وطول متوسط، قماش خفيف يناسب النهار، برباط خصر قابل للتعديل.",
    images: [
      "https://placehold.co/600x800/8a3b4a/f1ebe0?text=منسج+01",
      "https://placehold.co/600x800/732f3c/f1ebe0?text=منسج+02"
    ],
    colors: [
      { name: "نبيذي", hex: "#5c1a2b" },
      { name: "زيتوني", hex: "#6b7a5e" },
      { name: "أسود", hex: "#1c1a17" }
    ],
    sizes: ["XS", "S", "M", "L"],
    outOfStock: []
  },
  {
    id: 5,
    name: "سترة صوف رقبة عالية",
    category: "سترات",
    price: 44,
    description: "سترة دافئة بنسيج صوف ناعم ورقبة عالية، مثالية لطبقات الشتاء مع لمسة أنيقة بسيطة.",
    images: [
      "https://placehold.co/600x800/6b7a5e/f1ebe0?text=منسج+01",
      "https://placehold.co/600x800/57644c/f1ebe0?text=منسج+02"
    ],
    colors: [
      { name: "زيتوني", hex: "#6b7a5e" },
      { name: "كريمي", hex: "#e8dcc8" },
      { name: "بني تراب", hex: "#6b4a35" }
    ],
    sizes: ["S", "M", "L", "XL"],
    outOfStock: []
  },
  {
    id: 6,
    name: "تنورة بليّه متوسطة الطول",
    category: "تنانير",
    price: 41,
    description: "تنورة بثنيات ناعمة وطول متوسط، خامة تسقط بحركة أنيقة وتناسب الإطلالات اليومية والمناسبات الخفيفة.",
    images: [
      "https://placehold.co/600x800/c9a13b/1c1a17?text=منسج+01",
      "https://placehold.co/600x800/b58f30/1c1a17?text=منسج+02"
    ],
    colors: [
      { name: "خردلي", hex: "#c9a13b" },
      { name: "أسود", hex: "#1c1a17" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    outOfStock: ["XS", "XL"]
  },
  {
    id: 7,
    name: "قميص مخطط بأكمام طويلة",
    category: "قمصان",
    price: 35,
    description: "قميص قطني مخطط بقصة نصف مطابقة للجسم، مناسب للعمل والخروجات اليومية على حد سواء.",
    images: [
      "https://placehold.co/600x800/f3ede0/1c1a17?text=منسج+01",
      "https://placehold.co/600x800/e4ddce/1c1a17?text=منسج+02"
    ],
    colors: [
      { name: "أبيض مخطط", hex: "#f3ede0" },
      { name: "أزرق فاتح", hex: "#a9c0d6" }
    ],
    sizes: ["S", "M", "L", "XL"],
    outOfStock: []
  },
  {
    id: 8,
    name: "بنطلون كارغو واسع",
    category: "بناطيل",
    price: 47,
    description: "بنطلون كارغو بقصة واسعة مريحة وجيوب عملية جانبية، خامة قطنية متينة تتحمل الاستخدام اليومي.",
    images: [
      "https://placehold.co/600x800/706a5c/f1ebe0?text=منسج+01",
      "https://placehold.co/600x800/5c574b/f1ebe0?text=منسج+02"
    ],
    colors: [
      { name: "خاكي", hex: "#8a8073" },
      { name: "أسود", hex: "#1c1a17" }
    ],
    sizes: ["M", "L", "XL", "XXL"],
    outOfStock: []
  }
];