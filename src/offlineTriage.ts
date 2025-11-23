export function checkRedFlags(symptoms: string) {
  const s = symptoms.toLowerCase();
  const redFlags = [
    "breathless", "difficulty breathing", "chest pain",
    "blood", "vomit blood", "stool blood",
    "seizure", "faint", "unconscious",
    "severe pain", "severe abdominal pain",
    "stiff neck", "cannot drink", "extreme weakness"
  ];

  return redFlags.some(flag => s.includes(flag));
}

export function offlineCategorize(symptoms: string) {
  const s = symptoms.toLowerCase();

  if (s.includes("fever") && s.includes("body")) {
    return "General Viral Illness";
  }
  if (s.includes("loose motion") || s.includes("diarrhea")) {
    return "Dehydration Risk";
  }
  if (s.includes("headache")) {
    return "Minor Pain / Headache";
  }

  return "Common Minor Illness";
}

// multilingual map
export const offlineTranslations: any = {
  hi: {
    "General Viral Illness": "सामान्य वायरल बीमारी",
    "Dehydration Risk": "निर्जलीकरण का खतरा",
    "Minor Pain / Headache": "हल्का दर्द / सिरदर्द",
    "Common Minor Illness": "सामान्य हल्की बीमारी",
    referral: "⚠️ गंभीर लक्षण पाए गए। मरीज को तुरंत अस्पताल ले जाएं।",
    safeAdvice: [
      "ORS दें",
      "मरीज को आराम करवाएं",
      "पानी पर्याप्त मात्रा में दें",
      "अगर लक्षण बढ़ें तो अस्पताल ले जाएं"
    ]
  },
  bn: {
    "General Viral Illness": "সাধারণ ভাইরাল অসুখ",
    "Dehydration Risk": "ডিহাইড্রেশনের ঝুঁকি",
    "Minor Pain / Headache": "হালকা মাথাব্যথা",
    "Common Minor Illness": "সাধারণ অসুখ",
    referral: "⚠️ বিপদজনক লক্ষণ! রোগীকে হাসপাতালে নিন।",
    safeAdvice: [
      "ORS দিন",
      "বিশ্রাম করান",
      "পর্যাপ্ত পানি পান করান",
      "লক্ষণ খারাপ হলে হাসপাতালে যান"
    ]
  }
};

// fallback English response
export const offlineEnglish = {
  referral: "⚠️ Danger signs detected. Please take the patient to hospital immediately.",
  safeAdvice: [
    "Give ORS",
    "Ensure hydration",
    "Provide rest",
    "If condition worsens, visit the nearest healthcare center"
  ]
};

export function generateOfflineResponse(symptoms: string, lang: string) {
  const hasRedFlags = checkRedFlags(symptoms);

  if (hasRedFlags) {
    return {
      diseases: [],
      immediateRecommendations: [],
      dosageRecommendations: [],
      referralWarning:
        offlineTranslations[lang]?.referral || offlineEnglish.referral,
      patientExplanation:
        offlineTranslations[lang]?.referral || offlineEnglish.referral,
    };
  }

  const category = offlineCategorize(symptoms);
  const translatedCategory =
    offlineTranslations[lang]?.[category] || category;

  return {
    diseases: [{ name: translatedCategory, confidence: 50 }],
    immediateRecommendations:
      offlineTranslations[lang]?.safeAdvice || offlineEnglish.safeAdvice,
    dosageRecommendations: ["ORS only", "Avoid strong medicines"],
    referralWarning:
      offlineTranslations[lang]?.safeAdvice[3] ||
      offlineEnglish.safeAdvice[3],
    patientExplanation:
      "Offline Safe Mode: Basic triage only. Connect to internet for accurate diagnosis."
  };
}
