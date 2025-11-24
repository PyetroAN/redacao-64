export type StatType = 'money' | 'censor' | 'public';
export type AlignmentType = 'PRO_PEOPLE' | 'PRO_GOVERNMENT' | 'NEUTRAL'; 

export type Impact = {
  money?: number;
  censor?: number;
  public?: number;
};

// --- DEFINIÇÃO DA CARTA ---
export type Letter = {
  id: string;
  sender: string;
  subject: string; // Assunto (aparece no topo da carta)
  body: string;
  
  // Recompensa: Uma notícia que será inserida IMEDIATAMENTE no deck se aceitar
  newsReward?: NewsItem; 
  
  // Impactos imediatos ao aceitar/recusar
  acceptImpact?: Impact;
  refuseImpact?: Impact;
};

export type NewsItem = {
  id: string;
  type: 'HEADLINE' | 'FILLER' | 'EXTRA_EDITION'; // EXTRA_EDITION = Notícia vinda de carta
  editionTitle?: string;
  tag: string;
  title: string;
  body: string;
  context: string;
  sourceUrl?: string;
  images?: string[]; 
  alignment?: AlignmentType; 
  publishImpact: Impact;
  censorImpact: Impact;
  canAlter: boolean;
  alterOptions?: any[];
  isAltered?: boolean;
  currentBody?: string;
  currentTitle?: string;
  currentImpact?: Impact;
};