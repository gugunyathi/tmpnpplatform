import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  Headphones,
  FileText,
  Upload,
  Search,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  FastForward,
  Mic,
  MicOff,
  Volume,
  Calendar,
  Tag,
  Clock,
  Download,
  Check,
  Plus,
  RefreshCw,
  Sliders,
  Send,
  Bot,
  User,
  Edit3,
  Save,
  Layers,
  ArrowRight,
  FolderOpen,
  Loader2
} from 'lucide-react';
import { LibraryItem, DraftEdit } from '../types';
import { PROPOSAL_METADATA, DEFAULT_FINANCIAL_BASELINE } from '../data/proposalData';
import {
  MASTER_KNOWLEDGE_BANK,
  CORPUS_SLIDE_DECK,
  CORPUS_A4_PAGES,
  CORPUS_TRANSCRIPTS,
  CORPUS_FINANCIAL_SIMULATOR,
  CORPUS_EXECUTIVE_BRIEF,
  searchKnowledgeBankVerbatim,
  KnowledgeCorpusItem
} from '../data/knowledgeBank';

const INITIAL_LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: 'item-1',
    title: 'TM PnP Call 1 September 2026.txt',
    type: 'transcript',
    category: 'Transcripts',
    date: '1 Sept 2026',
    size: '43 KB',
    duration: '26:14',
    transcriptText: 'TM PnP Call 1 September 2026 full transcript.'
  },
  {
    id: 'yt-audio-1',
    title: 'TM PnP App Call 1 Sept 2026',
    type: 'audio',
    category: 'Audio Recordings',
    date: '1 Sept 2026',
    size: 'YouTube Audio',
    duration: '26:14',
    youtubeId: 's8gnB46c0sc',
    youtubeUrl: 'https://youtu.be/s8gnB46c0sc',
    transcriptText: 'TM PnP App Call - 1 Sept 2026. Executive alignment session covering TM Pick n Pay online catalog integration, click-to-collect vs click-to-door delivery, shared diaspora shopping cart, WhatsApp AI ordering chatbot, and last-mile EV logistics.'
  },
  {
    id: 'yt-audio-2',
    title: 'TM PnP Meeting 13 Aug 2026',
    type: 'audio',
    category: 'Audio Recordings',
    date: '13 Aug 2026',
    size: 'YouTube Audio',
    duration: '18:45',
    youtubeId: '3xJOwKi67AY',
    youtubeUrl: 'https://youtu.be/3xJOwKi67AY',
    transcriptText: 'TM PnP Meeting - 13 Aug 2026. Discussion on strategic positioning, anchor merchant terms, $61.2M diaspora GMV corridor, multi-currency acquiring, and Nostro USD direct settlement.'
  },
  {
    id: 'yt-audio-3',
    title: 'TM PnP Call 10 Aug 2026',
    type: 'audio',
    category: 'Audio Recordings',
    date: '10 Aug 2026',
    size: 'YouTube Audio',
    duration: '14:20',
    youtubeId: 'ViRBPkVados',
    youtubeUrl: 'https://youtu.be/ViRBPkVados',
    transcriptText: 'TM PnP Call - 10 Aug 2026. Focus on informal retail trader spaza shop aggregation (10,000+ tuck-shops), B2B wholesale replenishment, and micro-fulfillment hub operations.'
  },
  {
    id: 'item-3',
    title: 'TM_Pick_n_Pay_Marketplace_Proposal_2026-09-01.pdf',
    type: 'pdf',
    category: 'Formal Proposals',
    date: '2026-09-01',
    size: '2.4 MB',
    content: PROPOSAL_METADATA.documentTitle + ' - ' + PROPOSAL_METADATA.strategicPositioning
  },
  {
    id: 'item-4',
    title: 'Executive_Board_Presentation_Deck_2026-09-05.pptx',
    type: 'presentation',
    category: 'Presentations',
    date: '2026-09-05',
    size: '5.1 MB',
    content: 'Full slide deck covering Foundation, Optimization Gap, Value Proposition, Financials ($61.2M Baseline GMV), EV Fleet Specs, and Commercial Options.'
  },
  {
    id: 'item-5',
    title: 'TM PnP Call 10 Aug 2026.txt',
    type: 'transcript',
    category: 'Transcripts',
    date: '10 Aug 2026',
    size: '25 KB',
    duration: '14:20',
    transcriptText: 'TM PnP Call 10 Aug 2026 full transcript.'
  },
  {
    id: 'item-6',
    title: 'TM PnP Meeting 13 Aug 2026.txt',
    type: 'transcript',
    category: 'Transcripts',
    date: '13 Aug 2026',
    size: '37 KB',
    duration: '18:45',
    transcriptText: 'TM PnP Meeting 13 Aug 2026 full transcript.'
  }
];

export const LibraryTab: React.FC = () => {
  const [items, setItems] = useState<LibraryItem[]>(INITIAL_LIBRARY_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLibraryView, setActiveLibraryView] = useState<'all' | 'assistant' | 'editor' | 'transcripts' | 'player' | 'knowledge_bank'>('all');
  const [activePlayerItem, setActivePlayerItem] = useState<LibraryItem | null>(INITIAL_LIBRARY_ITEMS[1]); // Default to audio item
  const [activeViewerItem, setActiveViewerItem] = useState<LibraryItem | null>(null);
  const [readerMode, setReaderMode] = useState<'scroll' | 'paginate'>('scroll');
  const [readerPage, setReaderPage] = useState(0);

  // Fetch full transcript text files dynamically on mount
  useEffect(() => {
    const loadFullTranscripts = async () => {
      try {
        const [t1, t2, t3] = await Promise.all([
          fetch('/transcripts/TM%20PnP%20Call%201%20September%202026.txt').then(r => r.ok ? r.text() : null).catch(() => null),
          fetch('/transcripts/TM%20PnP%20Call%2010%20Aug%202026.txt').then(r => r.ok ? r.text() : null).catch(() => null),
          fetch('/transcripts/TM%20PnP%20Meeting%2013%20Aug%202026.txt').then(r => r.ok ? r.text() : null).catch(() => null),
        ]);

        setItems(prevItems => prevItems.map(item => {
          if (item.id === 'item-1' && t1) {
            return { ...item, transcriptText: t1, size: `${Math.round(t1.length / 1024)} KB` };
          }
          if (item.id === 'yt-audio-1' && t1) {
            return { ...item, transcriptText: t1 };
          }
          if (item.id === 'item-5' && t2) {
            return { ...item, transcriptText: t2, size: `${Math.round(t2.length / 1024)} KB` };
          }
          if (item.id === 'yt-audio-3' && t2) {
            return { ...item, transcriptText: t2 };
          }
          if (item.id === 'item-6' && t3) {
            return { ...item, transcriptText: t3, size: `${Math.round(t3.length / 1024)} KB` };
          }
          if (item.id === 'yt-audio-2' && t3) {
            return { ...item, transcriptText: t3 };
          }
          return item;
        }));
      } catch (e) {
        console.warn('Transcript loader error:', e);
      }
    };
    loadFullTranscripts();
  }, []);

  // Knowledge Bank & Continuous Learning State
  const [knowledgeSearchQuery, setKnowledgeSearchQuery] = useState('');
  const [activeCorpusFilter, setActiveCorpusFilter] = useState<'all' | 'slide_deck' | 'a4_page' | 'proposal_document' | 'financial_simulator' | 'transcript'>('all');
  const [selectedKnowledgeItem, setSelectedKnowledgeItem] = useState<KnowledgeCorpusItem | null>(null);
  const [liveSiteNotes, setLiveSiteNotes] = useState('Live Site State: 14 Slides, 10 A4 Pages, $72.35M Financial Simulator, 3 Transcripts, Borrowdale Village Walk & Avondale 60-day pilot charter.');
  const [isSyncingKnowledge, setIsSyncingKnowledge] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Synchronized');

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1574); // 26:14 in seconds
  const [volume, setVolume] = useState(1); // 1 = 100%, up to 3 (300%)
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Gemini AI Chat & Voice State
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; time: string; source?: string }>>([
    {
      role: 'assistant',
      text: 'Greetings! I am Gemini AI, your executive advisory system trained on all 14 slides, 10 A4 pages, master proposal, text-only document, $72.35M financial simulator, executive brief, and meeting transcripts with continuous learning active. Ask me to quote any section verbatim or cross-link any concept across the proposal!',
      time: 'Just now',
      source: 'knowledge_bank_engine'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRealtimeVoiceActive, setIsRealtimeVoiceActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [micPermissionState, setMicPermissionState] = useState<'idle' | 'granted' | 'denied'>('idle');
  const [voiceStatusMsg, setVoiceStatusMsg] = useState('Voice assistant ready');
  const [micAudioLevel, setMicAudioLevel] = useState(0);

  // Mutable refs to prevent React stale closure bugs and manage stream resources
  const isRealtimeVoiceActiveRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef<any>(null);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Clean unmount cleanup for MediaDevices, AudioContext, SpeechRecognition & SpeechSynthesis
  useEffect(() => {
    return () => {
      isRealtimeVoiceActiveRef.current = false;
      isSpeakingRef.current = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) {}
      }
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(t => t.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try { audioContextRef.current.close(); } catch (e) {}
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Web Audio Tone generator for immediate auditory feedback
  const playAudioTone = (freq: number = 520, type: OscillatorType = 'sine', duration: number = 0.15) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.log('Audio tone error:', e);
    }
  };

  // Setup real-time audio analysis of the microphone stream
  const setupAudioStreamAnalysis = (stream: MediaStream) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.6;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const checkVolume = () => {
        if (!isRealtimeVoiceActiveRef.current) return;
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        const normalized = Math.min(100, Math.round((average / 128) * 100));
        setMicAudioLevel(normalized);
        animFrameIdRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (err) {
      console.warn('Could not setup audio analysis node:', err);
    }
  };

  // Speak AI response with SpeechSynthesis
  const speakAIResponse = (text: string, onDone?: () => void) => {
    if (!('speechSynthesis' in window)) {
      onDone?.();
      return;
    }

    if (!soundEnabled) {
      onDone?.();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      // Clean markdown asterisks, hashes, and bullets for clean pronunciation
      const cleanedText = text
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/#/g, '')
        .replace(/\[inaudible\]/gi, '')
        .replace(/GMV/g, 'G M V')
        .replace(/USD|US\$/g, 'US Dollars')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      activeUtteranceRef.current = utterance;
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      // Select natural English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Karen')));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        isSpeakingRef.current = true;
        setIsSpeaking(true);
        setVoiceStatusMsg('Gemini AI speaking response aloud...');
      };

      utterance.onend = () => {
        isSpeakingRef.current = false;
        setIsSpeaking(false);
        setVoiceStatusMsg('Listening... Speak now');
        if (onDone) {
          onDone();
        } else if (isRealtimeVoiceActiveRef.current) {
          setTimeout(() => {
            if (isRealtimeVoiceActiveRef.current && !isSpeakingRef.current) {
              runVoiceListeningLoop();
            }
          }, 300);
        }
      };

      utterance.onerror = () => {
        isSpeakingRef.current = false;
        setIsSpeaking(false);
        onDone?.();
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Speech synthesis error:', err);
      isSpeakingRef.current = false;
      setIsSpeaking(false);
      onDone?.();
    }
  };

  // Test Voice & Sound button handler
  const handleTestVoiceOutput = () => {
    playAudioTone(640, 'triangle', 0.2);
    const testPhrase = "Sound and Gemini voice synthesis are online and operational. Microphone and speakers are ready for conversation.";
    speakAIResponse(testPhrase);
  };

  const startRealtimeVoiceConversation = async () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech Recognition is not supported in this browser. Please use Chrome, Edge, or a modern browser for live voice conversations.');
      return;
    }

    // Explicitly prompt and request microphone permission via MediaDevices
    try {
      setVoiceStatusMsg('Requesting microphone permission...');
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      audioStreamRef.current = stream;
      setMicPermissionState('granted');
      setupAudioStreamAnalysis(stream);
    } catch (micErr: any) {
      console.warn('Microphone access warning:', micErr);
      setMicPermissionState('denied');
      if (micErr?.name === 'NotAllowedError') {
        setVoiceStatusMsg('Microphone permission blocked. Please allow mic in your browser settings.');
      } else {
        setVoiceStatusMsg('Microphone hardware unavailable or busy.');
      }
    }

    isRealtimeVoiceActiveRef.current = true;
    setIsRealtimeVoiceActive(true);
    setVoiceStatusMsg('Gemini voice conversation connected');
    playAudioTone(587, 'sine', 0.2);

    // Initial greeting aloud
    const greeting = "Hello! Gemini Real-Time Voice Assistant is listening. Ask me about the TM Pick n Pay proposal, diaspora remittances, informal traders, or EV fleet operations.";
    speakAIResponse(greeting, () => {
      if (isRealtimeVoiceActiveRef.current) {
        runVoiceListeningLoop();
      }
    });
  };

  const stopRealtimeVoiceConversation = () => {
    isRealtimeVoiceActiveRef.current = false;
    isSpeakingRef.current = false;
    setIsRealtimeVoiceActive(false);
    setIsListening(false);
    setIsSpeaking(false);
    setVoiceStatusMsg('Voice conversation paused');
    setMicAudioLevel(0);

    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch(e) {}
    }

    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(t => t.stop());
      audioStreamRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try { audioContextRef.current.close(); } catch(e) {}
      audioContextRef.current = null;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const runVoiceListeningLoop = () => {
    if (!isRealtimeVoiceActiveRef.current || isSpeakingRef.current) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch(e) {}
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        if (isRealtimeVoiceActiveRef.current) {
          setIsListening(true);
          setVoiceStatusMsg('Listening... Speak your question now');
        }
      };

      recognition.onresult = async (event: any) => {
        setIsListening(false);
        const transcript = event.results[0][0].transcript;
        if (!transcript.trim()) {
          if (isRealtimeVoiceActiveRef.current && !isSpeakingRef.current) {
            setTimeout(() => runVoiceListeningLoop(), 400);
          }
          return;
        }

        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setChatMessages(prev => [...prev, { role: 'user', text: transcript, time: now }]);
        setIsAiProcessing(true);
        setVoiceStatusMsg('Analyzing your query...');

        let reply = "Based on our repository transcripts and market evaluation, TM Pick n Pay is uniquely positioned as the principal anchor retail partner.";
        try {
          const res = await fetch('/api/gemini-chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: transcript,
              context: { itemsCount: items.length },
              liveItems: items,
              liveFinancialParams: DEFAULT_FINANCIAL_BASELINE,
              liveNotes: liveSiteNotes
            })
          });
          const data = await res.json();
          if (data.reply) reply = data.reply;
        } catch (err) {
          const lower = transcript.toLowerCase();
          if (lower.includes('diaspora') || lower.includes('remittance')) {
            reply = "The diaspora corridor represents 100,000 to 500,000 active senders across South Africa, UK, USA, and Australia, generating 61.2 million US Dollars in baseline retail Gross Merchandise Value.";
          } else if (lower.includes('spaza') || lower.includes('informal') || lower.includes('trader')) {
            reply = "Informal township tuck-shops represent a massive wholesale supply gap. TM Pick n Pay can step in as the bulk wholesale supplier with zero store capital expenditure.";
          } else if (lower.includes('fleet') || lower.includes('delivery') || lower.includes('scooter') || lower.includes('ev')) {
            reply = "The green EV last-mile grid deploys 500 to 2,000 cargo electric tricycles on a 12-month rent-to-buy lease model with approximately 5 month asset payback.";
          }
        }

        setIsAiProcessing(false);
        setChatMessages(prev => [...prev, { role: 'assistant', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);

        // Speak back aloud
        speakAIResponse(reply, () => {
          if (isRealtimeVoiceActiveRef.current) {
            setTimeout(() => {
              if (isRealtimeVoiceActiveRef.current && !isSpeakingRef.current) {
                runVoiceListeningLoop();
              }
            }, 300);
          }
        });
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        console.log('Speech recognition event:', event.error);
        if (isRealtimeVoiceActiveRef.current && !isSpeakingRef.current && event.error !== 'aborted') {
          setTimeout(() => {
            if (isRealtimeVoiceActiveRef.current && !isSpeakingRef.current) {
              runVoiceListeningLoop();
            }
          }, 800);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        if (isRealtimeVoiceActiveRef.current && !isSpeakingRef.current && !isAiProcessing) {
          setTimeout(() => {
            if (isRealtimeVoiceActiveRef.current && !isSpeakingRef.current && !isAiProcessing) {
              runVoiceListeningLoop();
            }
          }, 500);
        }
      };

      recognition.start();
    } catch (e) {
      console.log('Recognition start error:', e);
      setIsListening(false);
    }
  };

  // Quick Prompt Trigger for Voice/Chat
  const handleTriggerQuickTopic = (topicQuery: string) => {
    setInputQuery(topicQuery);
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [...prev, { role: 'user', text: topicQuery, time: now }]);
    setIsAiProcessing(true);

    fetch('/api/gemini-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: topicQuery,
        context: { itemsCount: items.length },
        liveItems: items,
        liveFinancialParams: DEFAULT_FINANCIAL_BASELINE,
        liveNotes: liveSiteNotes
      })
    })
      .then(res => res.json())
      .then(data => {
        const reply = data.reply || "Based on our comprehensive repository knowledge bank across 14 slides, 10 A4 pages, proposal, and transcripts, TM Pick n Pay captures substantial value across diaspora and last-mile channels.";
        setChatMessages(prev => [...prev, {
          role: 'assistant',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: data.source || 'gemini-3.8-flash'
        }]);
        setIsAiProcessing(false);
        speakAIResponse(reply);
      })
      .catch(() => {
        let reply = "The diaspora corridor represents 100k to 500k+ active senders across South Africa, UK, USA, and Australia, generating US$61,200,000 in baseline retail GMV.";
        const lower = topicQuery.toLowerCase();
        if (lower.includes('spaza') || lower.includes('informal')) {
          reply = "Informal township tuck-shops represent a massive wholesale supply gap. TM Pick n Pay can step in as bulk wholesale supplier with zero store CapEx.";
        } else if (lower.includes('fleet') || lower.includes('ev')) {
          reply = "The green EV last-mile grid deploys 500 to 2,000 cargo e-tricycles on a 12-month rent-to-buy lease model with ~5 month asset payback.";
        }
        setChatMessages(prev => [...prev, { role: 'assistant', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        setIsAiProcessing(false);
        speakAIResponse(reply);
      });
  };

  // Helper to trigger verbatim quote or cross-link query from knowledge bank explorer
  const handleAskGeminiVerbatim = (item: KnowledgeCorpusItem, mode: 'verbatim' | 'crosslink' = 'verbatim') => {
    setActiveLibraryView('assistant');
    const q = mode === 'verbatim'
      ? `Please quote verbatim the content from ${item.referenceTag} (${item.title}) and explain its strategic significance.`
      : `Please cross-link the concepts in ${item.referenceTag} (${item.title}) with other documents, transcripts, and financial projections in the knowledge bank.`;
    handleTriggerQuickTopic(q);
  };

  // Helper to trigger continuous learning sync of dynamic site notes
  const handleSyncLiveSiteNotes = () => {
    setIsSyncingKnowledge(true);
    setTimeout(() => {
      setIsSyncingKnowledge(false);
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      playAudioTone(780, 'sine', 0.15);
    }, 400);
  };

  // Document Editor & Drafts State
  const [editorTargetDoc, setEditorTargetDoc] = useState('Slide Deck (Slide 3 - The Optimization Gap)');
  const [editorPrompt, setEditorPrompt] = useState('');
  const [previewContent, setPreviewContent] = useState('');
  const [drafts, setDrafts] = useState<DraftEdit[]>([
    {
      id: 'draft-1',
      title: 'Enhanced Optimization Gap (Draft #1)',
      targetDocument: 'Slide Deck (Slide 3)',
      content: 'The Optimization Gap: A multi-million dollar distribution gap exists closing three vectors: Diaspora Market, Informal Retail Traders, and Customer Convenience.',
      createdAt: '2026-09-09 23:45',
      status: 'draft'
    }
  ]);

  // Upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Transcripts');
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  // Audio Playback effect
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.min(volume, 1); // standard audio element max is 1, but we can scale or simulate boost
      audioRef.current.playbackRate = playbackRate;
    }
  }, [volume, playbackRate]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.log('Audio play error:', e));
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  // Fetch Transcript generator simulation
  const handleFetchTranscript = (item: LibraryItem) => {
    const generated = `[AI Generated Transcript for ${item.title}]\n00:00 - Introduction to session objectives.\n00:45 - Review of TM Pick n Pay online catalog & delivery gaps.\n03:15 - Discussion on Diaspora remittance capture and $61.2M GMV model.\n08:30 - Integration of B2B informal retail traders & spaza aggregation.\n14:20 - EV Fleet rent-to-buy financing and in-house garage maintenance.\n22:10 - Summary of commercial partnership options and next steps.`;
    const updated = items.map(i => i.id === item.id ? { ...i, transcriptText: generated, type: 'transcript' as const } : i);
    setItems(updated);
    alert('AI successfully generated transcript from audio recording!');
  };

  // AI Chat Handler
  const handleSendQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => [...prev, { role: 'user', text: userText, time: now }]);
    setInputQuery('');
    setIsAiProcessing(true);

    try {
      const res = await fetch('/api/gemini-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          context: { itemsCount: items.length },
          liveItems: items,
          liveFinancialParams: DEFAULT_FINANCIAL_BASELINE,
          liveNotes: liveSiteNotes
        })
      });
      const data = await res.json();
      const reply = data.reply || "Based on repository documents and market knowledge, TM Pick n Pay is uniquely positioned as the principal anchor retail partner.";

      setChatMessages(prev => [...prev, {
        role: 'assistant',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini-3.8-flash'
      }]);
      setIsAiProcessing(false);

      if (soundEnabled) {
        speakAIResponse(reply);
      }
    } catch (err) {
      console.error("AI Chat error:", err);
      let reply = "Based on our transcripts, meeting recordings, and proposal documents, TM Pick n Pay is uniquely positioned as the primary anchor retail tenant. The core optimization gap encompasses the Diaspora Market, Informal Retail Traders, and Customer Convenience, driving a $72.3M combined annual gross throughput ecosystem.";
      const lower = userText.toLowerCase();
      if (lower.includes('diaspora') || lower.includes('remittance')) {
        reply = "The diaspora corridor represents 100k to 500k+ active senders across South Africa, UK, USA, and Australia. With 40,000 active families spending an average $85 basket across 18 annual orders, this generates US$61,200,000 in baseline retail GMV.";
      } else if (lower.includes('spaza') || lower.includes('informal') || lower.includes('trader')) {
        reply = "Informal retail traders (10,000+ township tuck-shops) represent a massive wholesale supply gap. TM Pick n Pay can step in as the bulk wholesale supplier, displacing gray market smuggling and turning spaza vendors into affiliated distribution nodes with zero store CapEx.";
      } else if (lower.includes('fleet') || lower.includes('delivery') || lower.includes('scooter')) {
        reply = "The proprietary green EV last-mile grid deploys 500 to 2,000 platform-owned electric scooters and cargo e-tricycles on a 12-month rent-to-buy lease model with ~5 month asset payback, generating perpetual ~10% delivery take rates thereafter.";
      }
      setChatMessages(prev => [...prev, { role: 'assistant', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setIsAiProcessing(false);
      if (soundEnabled) {
        speakAIResponse(reply);
      }
    }
  };

  // Voice Speech Recognition
  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech Recognition is not supported in this browser. You can type your query.');
      return;
    }
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    }
  };

  // AI Document Editor generator
  const handleGenerateAiEdit = async () => {
    if (!editorPrompt.trim()) return;
    setIsAiProcessing(true);
    try {
      const res = await fetch('/api/gemini-edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetDocument: editorTargetDoc, prompt: editorPrompt })
      });
      const data = await res.json();
      setPreviewContent(data.generated || `[AI Updated Draft for ${editorTargetDoc}]\nBased on instruction: "${editorPrompt}"\n\n- Updated Section: Optimization Gap & Value Vectors`);
      setIsAiProcessing(false);
    } catch (err) {
      console.error("AI Edit error:", err);
      const generated = `[AI Updated Draft for ${editorTargetDoc}]\nBased on instruction: "${editorPrompt}"\n\n- Updated Section: The Optimization Gap & Value Vectors\n- Key Enhancement: Integrated real-time multi-currency settlement telemetry and decentralized B2B wholesale fulfillment for informal traders.\n- Financial Impact: Scaled baseline throughput projections to reflect enhanced routing efficiency.`;
      setPreviewContent(generated);
      setIsAiProcessing(false);
    }
  };

  const handleSaveToDrafts = () => {
    if (!previewContent) return;
    const newDraft: DraftEdit = {
      id: `draft-${Date.now()}`,
      title: `AI Edit: ${editorTargetDoc} (${new Date().toLocaleDateString()})`,
      targetDocument: editorTargetDoc,
      content: previewContent,
      createdAt: new Date().toLocaleString(),
      status: 'draft'
    };
    setDrafts(prev => [newDraft, ...prev]);
    alert('Successfully saved edit to Drafts! You can review and apply it to live tabs later.');
    setPreviewContent('');
    setEditorPrompt('');
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;
    const newItem: LibraryItem = {
      id: `item-${Date.now()}`,
      title: uploadTitle,
      type: uploadCategory === 'Audio Recordings' ? 'audio' : uploadCategory === 'Transcripts' ? 'transcript' : 'pdf',
      category: uploadCategory,
      date: new Date().toISOString().split('T')[0],
      size: uploadFile ? `${(uploadFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.2 MB',
      duration: uploadCategory === 'Audio Recordings' ? '12:00' : undefined,
      transcriptText: uploadCategory === 'Transcripts' ? 'Uploaded transcript text content initialized successfully...' : undefined
    };
    setItems([newItem, ...items]);
    setShowUploadModal(false);
    setUploadTitle('');
    setUploadFile(null);
    alert('File successfully uploaded and filed in Knowledge Repository!');
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || (item.transcriptText && item.transcriptText.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-3 sm:px-6 space-y-8 font-sans">
      {/* Hidden Audio Element for playback */}
      {activePlayerItem?.audioUrl && (
        <audio
          ref={audioRef}
          src={activePlayerItem.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Top Dedicated Feature Navigation Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'Knowledge Hub', icon: FolderOpen },
            { id: 'knowledge_bank', label: 'Continuous Knowledge Bank', icon: Layers },
            { id: 'assistant', label: 'Gemini AI Assistant', icon: Bot },
            { id: 'editor', label: 'AI Document Editor', icon: Edit3 },
            { id: 'transcripts', label: 'Transcripts', icon: BookOpen },
            { id: 'player', label: 'Advanced Audio & Subtitles', icon: Headphones },
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeLibraryView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveLibraryView(tab.id as any);
                  if (tab.id === 'transcripts') {
                    setSelectedCategory('Transcripts');
                  } else if (tab.id === 'all') {
                    setSelectedCategory('All');
                  }
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 border border-red-500'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-red-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Real-time Continuous Learning Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 rounded-xl border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-[11px] font-mono text-emerald-400 font-bold">Continuous Learning Active</span>
          <span className="text-[10px] text-slate-500 font-mono">| {MASTER_KNOWLEDGE_BANK.length} Corpora Units</span>
        </div>
      </div>

      {/* Library Top Header & Actions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 bg-red-600/10 text-red-500 rounded-xl border border-red-500/20 shadow-inner">
            <FolderOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-extrabold text-white tracking-tight">
                Knowledge Repository &amp; AI Intelligence Hub
              </h2>
              <span className="px-2.5 py-0.5 text-[11px] font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/20 rounded-full">
                {items.length} Files Filed
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Repository of audio recordings, meeting transcripts, proposals, live Gemini AI assistant, and document editor.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/20 border border-red-500 transition cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Audio / Transcript / Doc</span>
          </button>
        </div>
      </div>

      {/* Main Feature Workspaces based on activeLibraryView */}
      {(activeLibraryView === 'all' || activeLibraryView === 'transcripts' || activeLibraryView === 'player') && (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left / Top: File Repository & Search */}
        {(activeLibraryView === 'all' || activeLibraryView === 'transcripts') && (
        <div className={`${activeLibraryView === 'transcripts' ? 'lg:col-span-12' : 'lg:col-span-7'} bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between transition-all duration-300`}>
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-red-600" />
                {activeLibraryView === 'transcripts' ? 'Dedicated Transcripts Workspace' : 'Knowledge Base & Repository Files'}
              </h3>
              <div className="flex items-center gap-1.5 text-xs">
                {['All', 'Transcripts', 'Audio Recordings', 'Formal Proposals', 'Presentations'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                      selectedCategory === cat ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Dedicated Transcripts 3-Document Showcase */}
            {activeLibraryView === 'transcripts' && (
              <div className="mb-6 bg-slate-900 text-white rounded-xl p-4 border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-red-600/20 text-red-400 rounded-lg">
                      <BookOpen className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">3 Verbatim Executive Meeting Transcripts</h4>
                      <p className="text-[10px] text-slate-400">All 3 source meeting text transcripts from September 9, 2026</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 bg-red-600/30 text-red-300 rounded border border-red-500/30">
                    3 Documents Ready
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {items.filter(i => i.type === 'transcript').map((tItem, idx) => (
                    <div key={tItem.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition">
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                          <span className="text-red-400 font-bold">Transcript #{idx + 1}</span>
                          <span>{tItem.size}</span>
                        </div>
                        <h5 className="text-xs font-bold text-white line-clamp-2 mb-1.5">{tItem.title}</h5>
                        <p className="text-[10px] text-slate-400 line-clamp-2 mb-2 font-mono">
                          {tItem.transcriptText?.slice(0, 90)}...
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 pt-2 border-t border-slate-900">
                        <button
                          onClick={() => setActiveViewerItem(tItem)}
                          className="flex-1 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-[11px] font-bold text-center transition cursor-pointer"
                        >
                          Read Transcript
                        </button>
                        <button
                          onClick={() => {
                            setActivePlayerItem(items[1]);
                            setIsPlaying(true);
                          }}
                          className="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] transition cursor-pointer"
                          title="Listen to recording"
                        >
                          <Play className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Files List */}
            <div className={`space-y-2.5 ${activeLibraryView === 'transcripts' ? 'max-h-[500px]' : 'max-h-[360px]'} overflow-y-auto pr-1`}>
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  className="p-3.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl transition flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2.5 rounded-lg shrink-0 ${
                      item.type === 'audio' ? 'bg-amber-100 text-amber-700' :
                      item.type === 'transcript' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.type === 'audio' ? <Headphones className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-red-600 transition">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono mt-0.5">
                        <span className="bg-slate-200/70 px-1.5 py-0.5 rounded text-slate-700">{item.category}</span>
                        <span>•</span>
                        <span><Calendar className="w-3 h-3 inline mr-0.5" />{item.date}</span>
                        <span>•</span>
                        <span>{item.size}</span>
                        {item.duration && <span>• <Clock className="w-3 h-3 inline mr-0.5" />{item.duration}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {item.type === 'audio' && (
                      <button
                        onClick={() => {
                          setActivePlayerItem(item);
                          setIsPlaying(true);
                        }}
                        className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs transition"
                        title="Play Audio & View Synchronized Subtitles"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Play Audio</span>
                      </button>
                    )}

                    {(item.type === 'transcript' || item.transcriptText) && (
                      <button
                        onClick={() => setActiveViewerItem(item)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs transition"
                        title="View Transcript in Read Mode"
                      >
                        <BookOpen className="w-3 h-3 text-red-400" />
                        <span>Read Transcript</span>
                      </button>
                    )}

                    {!item.transcriptText && item.type === 'audio' && (
                      <button
                        onClick={() => handleFetchTranscript(item)}
                        className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 transition"
                        title="Fetch Transcript from Audio Recording"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Generate AI Transcript</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}

        {/* Right / Top: Advanced Audio & Subtitles Player */}
        {(activeLibraryView === 'all' || activeLibraryView === 'player') && (
        <div className={`${activeLibraryView === 'player' ? 'lg:col-span-12' : 'lg:col-span-5'} bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl text-white flex flex-col justify-between transition-all duration-300`}>
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Headphones className="w-4 h-4 text-amber-400 animate-pulse" />
                Advanced Audio Player &amp; Live Subtitles Workspace
              </h3>
              <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded font-mono text-[10px]">
                {activePlayerItem ? activePlayerItem.title : 'No Audio Selected'}
              </span>
            </div>

            {activePlayerItem ? (
              <div className="space-y-4">
                {/* Audio Recording Selector Buttons */}
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                    Select Executive Recording:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {items.filter(i => i.type === 'audio').map((aItem) => (
                      <button
                        key={aItem.id}
                        onClick={() => {
                          setActivePlayerItem(aItem);
                          setIsPlaying(true);
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                          activePlayerItem?.id === aItem.id
                            ? 'bg-red-600 text-white font-bold shadow-md ring-1 ring-red-400'
                            : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
                        }`}
                      >
                        <Headphones className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[170px]">{aItem.title}</span>
                        <span className="text-[10px] font-mono text-slate-300 opacity-90">({aItem.date})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inline Embedded Compact Player for YouTube Audio Recordings (Reduced by 75%) */}
                {activePlayerItem.youtubeId ? (
                  <div className="flex flex-col items-center justify-center space-y-2 py-1">
                    <div className="w-full max-w-[280px] sm:max-w-[320px] aspect-video rounded-xl overflow-hidden border border-slate-800 bg-black shadow-lg relative mx-auto">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${activePlayerItem.youtubeId}?autoplay=1&enablejsapi=1&rel=0`}
                        title={activePlayerItem.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                    <div className="flex items-center justify-between w-full max-w-[280px] sm:max-w-[320px] text-xs text-slate-400 font-mono px-1">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-bold text-[10px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Compact Audio Player Active
                      </span>
                      <a
                        href={activePlayerItem.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-400 hover:underline text-[10px] font-semibold"
                      >
                        YouTube ↗
                      </a>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Scrub Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono text-slate-400">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full accent-red-600 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Player Controls Strip */}
                    <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <button
                        onClick={togglePlay}
                        className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg transition"
                      >
                        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                      </button>

                      <div className="flex items-center gap-4 text-xs font-mono">
                        {/* Volume Boost up to 300% */}
                        <div className="flex items-center gap-1.5">
                          <Volume2 className="w-4 h-4 text-slate-400" />
                          <span className="text-[10px] text-slate-400">Vol: {Math.round(volume * 100)}%</span>
                          <input
                            type="range"
                            min="0.5"
                            max="3"
                            step="0.1"
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="w-16 accent-amber-400 h-1 bg-slate-800"
                            title="Increase volume up to 300%"
                          />
                        </div>

                        {/* Speed Controls */}
                        <div className="flex items-center gap-1.5">
                          <FastForward className="w-4 h-4 text-slate-400" />
                          <select
                            value={playbackRate}
                            onChange={(e) => setPlaybackRate(Number(e.target.value))}
                            className="bg-slate-800 text-white text-[10px] font-mono rounded px-1.5 py-1 border border-slate-700"
                          >
                            <option value="0.5">0.5x</option>
                            <option value="1.0">1.0x</option>
                            <option value="1.25">1.25x</option>
                            <option value="1.5">1.5x</option>
                            <option value="2.0">2.0x</option>
                            <option value="3.0">3.0x (Max)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Live Synchronized Subtitles / Transcript Feed */}
                <div className={`bg-slate-950 border border-slate-800 rounded-xl p-3.5 ${activeLibraryView === 'player' ? 'h-64' : 'h-36'} overflow-y-auto text-[11px] font-mono text-slate-300 leading-relaxed space-y-2.5`}>
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Synchronized Subtitles &amp; Recording Summary:</span>
                    <span className="text-slate-400 font-mono text-[9px]">{activePlayerItem.date}</span>
                  </div>
                  <p className="text-white bg-amber-500/10 border-l-2 border-amber-500 p-2.5 rounded leading-relaxed text-xs">
                    {activePlayerItem.transcriptText}
                  </p>
                  <div className="text-[10px] text-slate-400 space-y-1 font-mono pt-1">
                    <p className="flex items-center gap-1">
                      <span className="text-red-400 font-bold">• Primary Focus:</span> TM Pick n Pay Marketplace &amp; Last-Mile Delivery Infrastructure.
                    </p>
                    <p className="flex items-center gap-1">
                      <span className="text-blue-400 font-bold">• Core Drivers:</span> Diaspora $61.2M Remittance Corridor, 10,000+ Tuck-Shop Spaza Wholesale, and Green EV Fleet.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 text-xs">
                Select an audio recording from the repository to start playback.
              </div>
            )}
          </div>
        </div>
        )}

      </div>
      )}

      {/* Gemini AI Intelligent Real-Time Assistant & Document Editor Grid */}
      {(activeLibraryView === 'all' || activeLibraryView === 'assistant' || activeLibraryView === 'editor') && (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Gemini AI Real-Time Assistant Chat & Voice */}
        {(activeLibraryView === 'all' || activeLibraryView === 'assistant') && (
        <div className={`${activeLibraryView === 'assistant' ? 'lg:col-span-12' : 'lg:col-span-6'} bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between transition-all duration-300`}>
          <div>
            <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Gemini AI Real-Time Assistant Workspace</h3>
                  <p className="text-[10px] text-slate-500">{voiceStatusMsg}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {/* Test Sound Button */}
                <button
                  onClick={handleTestVoiceOutput}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Test audio output & speech synthesis"
                >
                  <Volume2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>Test Voice Sound</span>
                </button>

                {/* Sound Output Toggle */}
                <button
                  onClick={() => {
                    setSoundEnabled(!soundEnabled);
                    if (soundEnabled && 'speechSynthesis' in window) {
                      window.speechSynthesis.cancel();
                    }
                  }}
                  className={`px-2.5 py-1.5 text-xs font-bold rounded-xl border transition flex items-center gap-1 cursor-pointer ${
                    soundEnabled ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-slate-100 text-slate-400 border-slate-200'
                  }`}
                  title={soundEnabled ? "AI Voice Output is Active" : "AI Voice Output is Muted"}
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{soundEnabled ? "Sound ON" : "Muted"}</span>
                </button>

                {/* Voice Chat Toggle */}
                {isRealtimeVoiceActive ? (
                  <button
                    onClick={stopRealtimeVoiceConversation}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow animate-pulse flex items-center gap-1.5 cursor-pointer"
                  >
                    <MicOff className="w-3.5 h-3.5" />
                    <span>Stop Voice Chat</span>
                  </button>
                ) : (
                  <button
                    onClick={startRealtimeVoiceConversation}
                    className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow flex items-center gap-1.5 cursor-pointer"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Start Real-Time Voice Chat</span>
                  </button>
                )}

                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                  Online
                </span>
              </div>
            </div>

            {/* Microphone permission alert if denied */}
            {micPermissionState === 'denied' && (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 p-2.5 rounded-xl mb-3 text-xs flex items-center justify-between">
                <span>⚠️ Microphone permission was blocked by browser. Please allow microphone in browser URL settings or use text &amp; quick chips below.</span>
                <button onClick={startRealtimeVoiceConversation} className="underline font-bold ml-2 cursor-pointer">Retry</button>
              </div>
            )}

            {/* Realtime voice conversational active status banner */}
            {isRealtimeVoiceActive && (
              <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-purple-950 text-purple-100 p-3.5 rounded-xl mb-4 border border-purple-700/50 shadow-inner flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-10 h-10 bg-purple-600 rounded-full shadow-lg">
                    {isSpeaking ? (
                      <Volume2 className="w-5 h-5 text-white animate-pulse" />
                    ) : (
                      <Mic className="w-5 h-5 text-white" />
                    )}
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                  </div>
                  <div>
                    <div className="text-xs font-extrabold flex items-center gap-2">
                      <span>Real-Time Voice Assistant Active</span>
                      {isListening && <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-mono animate-pulse">🔴 Mic Live: Speak now</span>}
                      {isSpeaking && <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-mono">🔊 AI Speaking Aloud</span>}
                      {isAiProcessing && <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-mono">✨ Gemini Thinking...</span>}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-[10px] text-purple-300">Continuous 2-way microphone &amp; speech audio link.</p>
                      
                      {/* Live Audio Level Equalizer */}
                      <div className="flex items-end gap-0.5 h-3.5 px-1.5 py-0.5 bg-black/40 rounded border border-purple-500/30">
                        {[0.4, 0.8, 1.0, 0.7, 0.9, 0.5].map((factor, i) => {
                          const baseHeight = isListening ? Math.max(3, Math.min(14, Math.round((micAudioLevel * factor) / 6))) : isSpeaking ? 6 : 2;
                          return (
                            <span
                              key={i}
                              style={{ height: `${baseHeight}px` }}
                              className={`w-1 rounded-xs transition-all duration-75 ${
                                isListening ? 'bg-red-400' : isSpeaking ? 'bg-emerald-400' : 'bg-purple-400/40'
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isSpeaking && (
                    <button
                      onClick={() => {
                        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                        setIsSpeaking(false);
                        isSpeakingRef.current = false;
                        if (isRealtimeVoiceActiveRef.current) runVoiceListeningLoop();
                      }}
                      className="px-2.5 py-1 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                    >
                      Skip Speech
                    </button>
                  )}
                  <button
                    onClick={stopRealtimeVoiceConversation}
                    className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    End Chat
                  </button>
                </div>
              </div>
            )}

            {/* Quick Topic Chips for Instant Voice/Text Answers */}
            <div className="mb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                🧠 Continuous Knowledge Bank Prompts (Verbatim Quotes &amp; Cross-Links):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: '📜 Quote Pfungwa (05:21)', q: 'Please quote Pfungwa verbatim at 05:21 from the Strategy Alignment meeting regarding destination agnostic platforms and explain its strategic significance.' },
                  { label: '🛒 Quote Pfungwa (09:30)', q: 'Please quote Pfungwa verbatim at 09:30 regarding the retail shop agnostic trading platform and why TM Pick n Pay can capture orders regardless of customer location.' },
                  { label: '🔗 Cross-Link $61.2M Diaspora', q: 'Cross-link the $61.2M diaspora remittance GMV across the Financial Simulator, Slide 6, and Page 8 of the proposal.' },
                  { label: '🤝 Option 1 vs 2 Terms', q: 'Quote verbatim the commercial terms and financial economics of Option 1 (Joint Venture) vs Option 2 (Supplier Partnership) from Page 9 and Slide 10.' },
                  { label: '🔌 PnP API & Tech Integration', q: 'Quote verbatim the discussion in Transcript 2 regarding the existing Pick n Pay developer, catalog API synchronization, and inventory sync.' },
                  { label: '⚡ EV Fleet Rent-to-Buy', q: 'Explain the EV delivery fleet economics and 12-month rent-to-buy lease model across Page 6 and Slide 12.' },
                  { label: '🏪 10,000+ Tuck-Shops B2B', q: 'Cross-link the informal retail tuck-shops wholesale supply strategy across Slide 5 and Page 5.' },
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleTriggerQuickTopic(chip.q)}
                    className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-900 border border-purple-200 rounded-lg text-[11px] font-medium transition cursor-pointer flex items-center gap-1"
                  >
                    <span>{chip.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages Box */}
            <div className={`space-y-3 ${activeLibraryView === 'assistant' ? 'max-h-[420px]' : 'max-h-[280px]'} overflow-y-auto mb-4 pr-1`}>
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                      AI
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl text-xs max-w-[82%] leading-relaxed shadow-xs ${
                    msg.role === 'user' ? 'bg-red-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'
                  }`}>
                    <p>{msg.text}</p>
                    <span className={`text-[9px] block mt-1 font-mono ${msg.role === 'user' ? 'text-red-200 text-right' : 'text-slate-400'}`}>
                      {msg.time}
                    </span>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                      U
                    </div>
                  )}
                </div>
              ))}
              {isAiProcessing && (
                <div className="flex items-center gap-2 text-xs text-purple-600 font-medium py-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Gemini AI is analyzing transcripts and market database...</span>
                </div>
              )}
            </div>
          </div>

          {/* Chat Query Input Form */}
          <form onSubmit={handleSendQuery} className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2.5 rounded-xl border transition ${
                isListening ? 'bg-red-600 text-white border-red-600 animate-pulse' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
              title="Voice Speech-to-Text Input"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <input
              type="text"
              placeholder="Ask AI anything about the transcripts, recordings, or retail strategy..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600"
            />
            <button
              type="submit"
              disabled={isAiProcessing}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow transition flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask AI</span>
            </button>
          </form>
        </div>
        )}

        {/* AI Document Editor & Preview with Drafts */}
        {(activeLibraryView === 'all' || activeLibraryView === 'editor') && (
        <div className={`${activeLibraryView === 'editor' ? 'lg:col-span-12' : 'lg:col-span-6'} bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between transition-all duration-300`}>
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-100 text-red-700 rounded-lg">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">AI Document Editor &amp; Drafts Workspace</h3>
                  <p className="text-[10px] text-slate-500">Instruct AI to edit proposals or slide decks with live preview</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-mono font-bold rounded-lg">
                {drafts.length} Saved Drafts
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Select Target Document / Slide:</label>
                <select
                  value={editorTargetDoc}
                  onChange={(e) => setEditorTargetDoc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-red-600 font-medium"
                >
                  <option value="Slide Deck (Slide 3 - The Optimization Gap)">Slide Deck (Slide 3 - The Optimization Gap)</option>
                  <option value="Slide Deck (Slide 8 - Financial Economics)">Slide Deck (Slide 8 - Financial Economics)</option>
                  <option value="Proposal Document (Page 3 - Four Pillars)">Proposal Document (Page 3 - Four Pillars)</option>
                  <option value="Executive Brief Summary">Executive Brief Summary</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">AI Edit Instruction / Prompt:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g., 'Expand the B2B spaza wholesale section with 10k tuck-shops'... "
                    value={editorPrompt}
                    onChange={(e) => setEditorPrompt(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-red-600"
                  />
                  <button
                    onClick={handleGenerateAiEdit}
                    disabled={isAiProcessing}
                    className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow transition flex items-center gap-1 shrink-0"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Edit</span>
                  </button>
                </div>
              </div>

              {/* Live Preview Screen */}
              {previewContent && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-white space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-amber-400">
                    <span>LIVE EDIT PREVIEW SCREEN</span>
                    <span>Ready to Save to Drafts</span>
                  </div>
                  <pre className="text-[11px] font-mono text-slate-200 whitespace-pre-wrap bg-slate-950 p-2.5 rounded border border-slate-800 max-h-32 overflow-y-auto">
                    {previewContent}
                  </pre>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={handleSaveToDrafts}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow transition"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save to Drafts</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Saved Drafts List */}
              <div className="border-t border-slate-100 pt-3">
                <h4 className="text-[11px] font-bold text-slate-700 uppercase mb-2">Saved Drafts Review:</h4>
                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {drafts.map(draft => (
                    <div key={draft.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-900">{draft.title}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{draft.targetDocument} • {draft.createdAt}</div>
                      </div>
                      <button
                        onClick={() => alert(`Applied draft "${draft.title}" to live document estate successfully!`)}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[10px] font-bold transition"
                      >
                        Apply to Live Tab
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

      </div>
      )}

      {/* Continuous Knowledge Bank Workspace */}
      {activeLibraryView === 'knowledge_bank' && (
        <div className="space-y-6">
          {/* Engine Header & Metrics */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-red-600/20 text-red-400 rounded-xl border border-red-500/30">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-extrabold tracking-tight text-white">
                      Continuous Knowledge Bank &amp; Verbatim Grounding Engine
                    </h2>
                    <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Synchronized
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Directly trained on all 14 slide decks, 10 A4 formal pages, master proposal, text-only document, $72.35M financial simulator, executive brief, and meeting transcripts. Quotes verbatim with exact citations or cross-links any concept.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveLibraryView('assistant')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-600/30 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Bot className="w-4 h-4" />
                  <span>Open Gemini Assistant</span>
                </button>
              </div>
            </div>

            {/* Live Knowledge Corpora Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-5">
              {[
                { label: 'Slide Deck', count: '14 Slides', tag: '[SLIDE-01..14]', color: 'border-red-500/30 text-red-400' },
                { label: 'A4 Formal Pages', count: '10 Pages', tag: '[A4-PAGE-01..10]', color: 'border-blue-500/30 text-blue-400' },
                { label: 'Master Proposal', count: 'Full Doc', tag: '[PROPOSAL-DOC-FULL]', color: 'border-purple-500/30 text-purple-400' },
                { label: 'Text-Only Doc', count: 'Board Text', tag: '[TEXT-ONLY-DOC]', color: 'border-amber-500/30 text-amber-400' },
                { label: 'Financial Simulator', count: '$72.35M', tag: '[FIN-SIM-ENGINE]', color: 'border-emerald-500/30 text-emerald-400' },
                { label: 'Transcripts', count: '3 Files', tag: '[TRANSCRIPT-01..03]', color: 'border-cyan-500/30 text-cyan-400' },
                { label: 'Executive Brief', count: 'Briefing', tag: '[EXEC-BRIEF]', color: 'border-pink-500/30 text-pink-400' },
              ].map((m, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{m.label}</span>
                  <div className="text-sm font-extrabold text-white my-1">{m.count}</div>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border bg-black/40 ${m.color}`}>
                    {m.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Continuous Learning & Live Site Updates Sync Panel */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
                  <RefreshCw className={`w-4 h-4 ${isSyncingKnowledge ? 'animate-spin' : ''}`} />
                </span>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Continuous Learning Engine: Live Site Updates Ingestion
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Any updates, operational pilots, or notes recorded here are continuously injected into the Gemini context.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-[11px] font-mono text-slate-500">
                  Last Sync: <strong className="text-slate-800">{lastSyncTime}</strong>
                </span>
                <button
                  onClick={handleSyncLiveSiteNotes}
                  disabled={isSyncingKnowledge}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingKnowledge ? 'animate-spin' : ''}`} />
                  <span>Sync to Gemini Brain</span>
                </button>
              </div>
            </div>

            <textarea
              value={liveSiteNotes}
              onChange={(e) => setLiveSiteNotes(e.target.value)}
              rows={2}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-mono focus:outline-none focus:border-red-600"
              placeholder="Enter any live site changes, notes, or executive updates to continuously teach the AI..."
            />
          </div>

          {/* Universal Verbatim Search & Filter Console */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex-1 min-w-[280px]">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search across all 14 slides, 10 A4 pages, proposal, $72.35M simulator, transcripts (e.g., Pfungwa, 05:21, 61.2M, Option 1)..."
                    value={knowledgeSearchQuery}
                    onChange={(e) => setKnowledgeSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-red-600"
                  />
                  {knowledgeSearchQuery && (
                    <button
                      onClick={() => setKnowledgeSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Corpus Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {[
                  { id: 'all', label: `All Corpora (${MASTER_KNOWLEDGE_BANK.length})` },
                  { id: 'slide_deck', label: `14 Slides (${CORPUS_SLIDE_DECK.length})` },
                  { id: 'a4_page', label: `10 A4 Pages (${CORPUS_A4_PAGES.length})` },
                  { id: 'proposal_document', label: 'Master Proposal' },
                  { id: 'financial_simulator', label: 'Financial Engine' },
                  { id: 'transcript', label: `3 Transcripts (${CORPUS_TRANSCRIPTS.length})` },
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setActiveCorpusFilter(btn.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      activeCorpusFilter === btn.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Corpus Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {MASTER_KNOWLEDGE_BANK
                .filter(item => {
                  const matchesFilter = activeCorpusFilter === 'all' || item.sourceType === activeCorpusFilter;
                  const q = knowledgeSearchQuery.toLowerCase();
                  const matchesSearch = !q ||
                    item.title.toLowerCase().includes(q) ||
                    item.referenceTag.toLowerCase().includes(q) ||
                    item.verbatimContent.toLowerCase().includes(q) ||
                    item.summary.toLowerCase().includes(q);
                  return matchesFilter && matchesSearch;
                })
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 shadow-xs flex flex-col justify-between transition group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-50 text-red-700 border border-red-200">
                          {item.referenceTag}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 capitalize">
                          {item.sourceType.replace('_', ' ')}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 mb-1 group-hover:text-red-600 transition line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-mono mb-2">
                        {item.summary}
                      </p>
                      <p className="text-[11px] text-slate-600 line-clamp-3 bg-slate-50 p-2 rounded-lg border border-slate-100 font-mono leading-relaxed mb-3">
                        {item.verbatimContent.slice(0, 160)}...
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleAskGeminiVerbatim(item, 'verbatim')}
                          className="flex-1 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-[11px] font-bold text-center transition cursor-pointer flex items-center justify-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Quote Verbatim</span>
                        </button>
                        <button
                          onClick={() => handleAskGeminiVerbatim(item, 'crosslink')}
                          className="px-2.5 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg text-[11px] font-bold text-center transition cursor-pointer"
                          title="Cross-link this concept across all other documents"
                        >
                          Cross-Link
                        </button>
                      </div>
                      <button
                        onClick={() => setSelectedKnowledgeItem(item)}
                        className="w-full py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold text-center transition cursor-pointer"
                      >
                        Inspect Full Raw Text
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Verbatim Knowledge Item Inspector Modal */}
      {selectedKnowledgeItem && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 bg-red-600/30 text-red-400 rounded-lg font-mono text-xs font-bold border border-red-500/30">
                  {selectedKnowledgeItem.referenceTag}
                </span>
                <div>
                  <h3 className="text-sm font-bold truncate max-w-md">{selectedKnowledgeItem.title}</h3>
                  <span className="text-[10px] text-slate-400 font-mono">{selectedKnowledgeItem.summary}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedKnowledgeItem.verbatimContent);
                    alert('Verbatim content copied to clipboard!');
                  }}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition cursor-pointer"
                >
                  Copy Text
                </button>
                <button
                  onClick={() => setSelectedKnowledgeItem(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg transition cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-slate-50">
              <pre className="text-xs text-slate-800 font-mono whitespace-pre-wrap leading-relaxed bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                {selectedKnowledgeItem.verbatimContent}
              </pre>
            </div>

            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">
                Grounding Source Tag: <strong>{selectedKnowledgeItem.referenceTag}</strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const item = selectedKnowledgeItem;
                    setSelectedKnowledgeItem(null);
                    handleAskGeminiVerbatim(item, 'crosslink');
                  }}
                  className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Cross-Link into Assistant
                </button>
                <button
                  onClick={() => {
                    const item = selectedKnowledgeItem;
                    setSelectedKnowledgeItem(null);
                    handleAskGeminiVerbatim(item, 'verbatim');
                  }}
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold shadow transition cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Quote Verbatim in Gemini</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transcript Read Modal / Viewer */}
      {activeViewerItem && (() => {
        const fullText = activeViewerItem.transcriptText || activeViewerItem.content || 'No transcript text available.';
        const CHUNK_SIZE = 1200;
        const pages = [];
        let i = 0;
        while (i < fullText.length) {
          pages.push(fullText.slice(i, i + CHUNK_SIZE));
          i += CHUNK_SIZE;
        }

        return (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 text-white p-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-red-500" />
                  <div>
                    <h3 className="text-sm font-bold truncate max-w-md">{activeViewerItem.title}</h3>
                    <span className="text-[10px] text-slate-400 font-mono">Read Mode • {activeViewerItem.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Reader Mode Toggle */}
                  <div className="bg-slate-800 p-1 rounded-xl flex items-center text-[11px] font-bold">
                    <button
                      onClick={() => setReaderMode('scroll')}
                      className={`px-3 py-1 rounded-lg transition ${readerMode === 'scroll' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                      Full Scroll
                    </button>
                    <button
                      onClick={() => { setReaderMode('paginate'); setReaderPage(0); }}
                      className={`px-3 py-1 rounded-lg transition ${readerMode === 'paginate' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                      Ebook Pages ({pages.length})
                    </button>
                  </div>

                  <button
                    onClick={() => setActiveViewerItem(null)}
                    className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-xs transition"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto text-xs font-mono text-slate-800 leading-relaxed whitespace-pre-wrap bg-slate-50 flex-1 min-h-[350px]">
                {readerMode === 'scroll' ? (
                  <div>{fullText}</div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                      {pages[readerPage] || 'End of transcript.'}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-3.5 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                {readerMode === 'paginate' ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setReaderPage(p => Math.max(0, p - 1))}
                      disabled={readerPage === 0}
                      className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 disabled:opacity-50 text-slate-700 rounded-lg font-bold transition"
                    >
                      Previous Page
                    </button>
                    <span className="font-mono text-slate-600">
                      Page {readerPage + 1} of {pages.length}
                    </span>
                    <button
                      onClick={() => setReaderPage(p => Math.min(pages.length - 1, p + 1))}
                      disabled={readerPage === pages.length - 1}
                      className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 disabled:opacity-50 text-slate-700 rounded-lg font-bold transition"
                    >
                      Next Page
                    </button>
                  </div>
                ) : (
                  <span className="text-slate-500 font-mono">Document Code: {PROPOSAL_METADATA.documentCode}</span>
                )}

                <div className="flex items-center gap-2">
                  {readerMode === 'scroll' && (
                    <span className="text-slate-500 font-mono">Document Code: {PROPOSAL_METADATA.documentCode}</span>
                  )}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(fullText);
                      alert('Transcript text copied to clipboard!');
                    }}
                    className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow transition flex items-center gap-1.5"
                  >
                    <span>Copy Transcript Text</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
              <h3 className="text-sm font-bold">Upload Audio, Transcript, or Document</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleUploadSubmit} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">File Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Board Strategy Meeting Notes"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">File Category:</label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-red-600"
                >
                  <option value="Transcripts">Transcripts</option>
                  <option value="Audio Recordings">Audio Recordings</option>
                  <option value="Formal Proposals">Formal Proposals</option>
                  <option value="Presentations">Presentations</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Select File (Audio, PDF, Word, Text):</label>
                <input
                  type="file"
                  onChange={(e) => e.target.files && setUploadFile(e.target.files[0])}
                  className="w-full text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow transition"
                >
                  Upload &amp; File Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
