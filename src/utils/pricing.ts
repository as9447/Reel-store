/**
 * Utility functions for pricing calculations, platform fees, and payment validation in Reel Store.
 */

export interface PricingOptions {
  durationSeconds: number; // e.g. 15, 30, 60, 90
  rushDelivery?: boolean; // 24-hour turnaround
  scriptWriting?: boolean;
  subtitles?: boolean;
  rawFootage?: boolean;
  actorVoiceover?: boolean;
}

export interface PricingResult {
  basePrice: number;
  durationMultiplier: number;
  durationSurcharge: number;
  addonsTotal: number;
  subtotal: number;
  platformFee: number;
  total: number;
  currency: string;
}

/**
 * Calculates video production price based on creator base tier and chosen options.
 */
export function calculateVideoPrice(basePrice: number, options: PricingOptions): PricingResult {
  const safeBase = Math.max(0, basePrice);
  
  // Duration calculation: Base is 30s. 15s is 0.85x, 60s is 1.5x, 90s is 2.1x
  let durationMultiplier = 1;
  if (options.durationSeconds <= 15) {
    durationMultiplier = 0.85;
  } else if (options.durationSeconds <= 30) {
    durationMultiplier = 1;
  } else if (options.durationSeconds <= 60) {
    durationMultiplier = 1.5;
  } else {
    durationMultiplier = 2.1;
  }

  const durationAdjustedBase = Math.round(safeBase * durationMultiplier);
  const durationSurcharge = Math.max(0, durationAdjustedBase - safeBase);

  // Addon costs (in EGP)
  let addonsTotal = 0;
  if (options.rushDelivery) addonsTotal += 350; // fast 24h delivery
  if (options.scriptWriting) addonsTotal += 250; // persuasive ad hook & script
  if (options.subtitles) addonsTotal += 150; // dynamic captions / subtitles
  if (options.rawFootage) addonsTotal += 400; // raw B-roll & 4K unedited files
  if (options.actorVoiceover) addonsTotal += 300; // professional studio voiceover

  const subtotal = durationAdjustedBase + addonsTotal;
  
  // Platform escrow & protection fee (5%)
  const platformFee = Math.round(subtotal * 0.05);
  const total = subtotal + platformFee;

  return {
    basePrice: safeBase,
    durationMultiplier,
    durationSurcharge,
    addonsTotal,
    subtotal,
    platformFee,
    total,
    currency: 'ج.م'
  };
}

/**
 * Validates Egyptian InstaPay handle or Egyptian mobile phone linked to InstaPay.
 */
export function validateInstaPayHandle(handle: string): { isValid: boolean; error?: string } {
  const trimmed = handle.trim();
  if (!trimmed) {
    return { isValid: false, error: 'يرجى إدخال عنوان انستا باي (IPA) أو رقم الهاتف المسجل' };
  }

  const isIpaPattern = /^[a-zA-Z0-9._-]+@(instapay|cib|nbe|bdc|qnb)$/i.test(trimmed);
  const isPureMobile = /^(010|011|012|015)[0-9]{8}$/.test(trimmed);
  const isIpaWithoutDomain = /^[a-zA-Z0-9._-]{3,30}$/.test(trimmed);

  if (isIpaPattern || isPureMobile || isIpaWithoutDomain) {
    return { isValid: true };
  }

  return { 
    isValid: false, 
    error: 'صيغة انستا باي غير صالحة. مثال: username@instapay أو رقم موبايل 010xxxxxxxx' 
  };
}

/**
 * Validates Egyptian Vodafone Cash / Mobile Wallet number (11 digits starting with 010, 011, 012, or 015).
 */
export function validateWalletNumber(phone: string): { isValid: boolean; error?: string } {
  const cleaned = phone.replace(/\s+/g, '').replace(/-/g, '');
  if (!cleaned) {
    return { isValid: false, error: 'يرجى إدخال رقم المحفظة الإلكترونية' };
  }

  const walletRegex = /^(010|011|012|015)\d{8}$/;
  if (!walletRegex.test(cleaned)) {
    return { 
      isValid: false, 
      error: 'رقم المحفظة يجب أن يتكون من 11 رقماً ويبدأ بـ 010 أو 011 أو 012 أو 015' 
    };
  }

  return { isValid: true };
}

/**
 * Validates Bank Transfer transaction reference / IBAN.
 */
export function validateBankTransfer(reference: string): { isValid: boolean; error?: string } {
  const trimmed = reference.trim();
  if (!trimmed) {
    return { isValid: false, error: 'يرجى إدخال رقم العملية البنكية أو رقم الإيصال' };
  }

  if (trimmed.length < 5) {
    return { isValid: false, error: 'رقم العملية البنكية يجب ألا يقل عن 5 خانات' };
  }

  return { isValid: true };
}

/**
 * Formats currency in Egyptian Pounds cleanly for display: e.g. "1,500 ج.م"
 */
export function formatCurrencyEGP(amount: number): string {
  const formattedNumber = new Intl.NumberFormat('en-US').format(Math.round(amount));
  return `${formattedNumber} ج.م`;
}
