export type UserRole = 'client' | 'creator' | null;

export interface SampleVideo {
  id: string;
  title: string;
  duration: number; // in seconds
  aspectRatio: '9:16' | '16:9';
  videoUrl: string;
  thumbnail: string;
  category: string;
  views: string;
  likes: string;
  tags: string[];
  description: string;
}

export interface CreatorPackage {
  title: string;
  duration: string;
  price: number;
  revisions: number;
  deliveryDays: number;
  features: string[];
}

export interface CreatorProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
  featured: boolean;
  topRated: boolean;
  roleTitle: string;
  location: string;
  rating: number;
  reviewCount: number;
  completedProjects: number;
  startingPrice: number;
  category: 'ugc' | 'motion' | 'ecommerce' | 'spokesperson' | 'animation_3d';
  categoryLabel: string;
  bio: string;
  gear: string[];
  skills: string[];
  turnaroundHours: number;
  sampleVideos: SampleVideo[];
  packages: {
    basic: CreatorPackage;
    standard: CreatorPackage;
    premium: CreatorPackage;
  };
  payoutMethods: {
    instapay?: string;
    vodafoneCash?: string;
    bankAccount?: string;
  };
}

export type PaymentMethodType = 'instapay' | 'bank_transfer' | 'vodafone_cash';

export interface PaymentMethodConfig {
  id: PaymentMethodType;
  title: string;
  arabicTitle: string;
  subtitle: string;
  badge: string;
  iconName: string;
  brandColor: string;
  accountIdentifier: string;
  accountName: string;
  instructions: string[];
}

export interface VideoOrder {
  id: string;
  orderNumber: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  serviceTitle: string;
  packageType: 'basic' | 'standard' | 'premium';
  durationSeconds: number;
  aspectRatio: '9:16' | '16:9' | '1:1';
  projectGoal: string;
  productName: string;
  productUrl?: string;
  scriptNotes: string;
  targetAudience: string;
  addOns: {
    rushDelivery: boolean;
    scriptWriting: boolean;
    subtitles: boolean;
    rawFootage: boolean;
    actorVoiceover: boolean;
  };
  pricing: {
    basePrice: number;
    addonsTotal: number;
    platformFee: number;
    total: number;
  };
  paymentMethod: PaymentMethodType;
  paymentDetails: {
    senderIdentifier: string; // e.g. InstaPay IPA or Vodafone cash phone or bank transfer ref
    referenceCode: string;
    transferProofNote?: string;
    paidAt: string;
    verified: boolean;
  };
  status: 'pending_payment' | 'confirmed' | 'in_production' | 'draft_ready' | 'revision_requested' | 'completed';
  createdAt: string;
  deliveryDueDate: string;
  draftVideoUrl?: string;
  finalVideoUrl?: string;
  revisionsLeft: number;
  revisionsRequested?: string[];
  feedbackNotes?: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'client' | 'creator';
  avatar: string;
  companyName?: string;
  // Creator specific
  balance?: number;
  pendingBalance?: number;
  completedJobsCount?: number;
  payoutMethodPreferred?: PaymentMethodType;
  payoutIdentifier?: string;
}
