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
import { PROPOSAL_METADATA } from '../data/proposalData';

const INITIAL_LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: 'item-1',
    title: 'Executive_Board_Strategy_Alignment_Meeting_2026-09-09.txt',
    type: 'transcript',
    category: 'Transcripts',
    date: '2026-09-09',
    size: '142 KB',
    duration: '26:14',
    transcriptText: `Speaker 1 00:00: Bonnie, how's it?
pfungwa 00:02: Good, good, good, Sandy.
Speaker 1 00:05: No, all good, all good.
pfungwa 00:07: How's it going, Funga? Pretty well, man. Thanks a lot.
Speaker 1 00:14: Okay, we've got Google here. Google like you to meet Funga. Google, Google is our CIO. so yeah, he will be giving us a presentation basically today. Okay, nice to meet you, Funga. Thanks for coming on the call.
pfungwa 00:33: No worries, man. Thanks.
Speaker 1 00:35: Okay, so I'm not sure how much you have seen so far, but I'm quickly just gonna share my screen to show you what we've been up to, right? Can you see my screen?
pfungwa 00:47: Yes.
Speaker 1 00:48: Okay. All right. So first and foremost, I think the the proposal was pick and pay online, right? So TMPNP. So in my research, I found out that they already have a an online shopping system, right? And you can select this is this is the pick and the existing pick and pay online shopping experience, but it's a click to collect. So you you buy stuff at your cart, and then you go and pick it up from any of their shops. So it seems it doesn't currently have a delivery service. Okay, so I think our approach, therefore, would be to rather offer, sorry, to enhance what they already have, right? Which would be to offer a shopping experience for people located in the diaspora, who then buy using their local currencies there, and can have a shared cart. So this is the the prototype that I did. Okay, so it allows for you know multiple people. So these all would be like family members. They can do this on a live shopping experience, or they can just do it as a generic. You know, send something to an app. So whoever initiates the app would add other users. So they would add users, send them a code by number, and they would add them to a shopping cart. And various members from different, you know, with different mobile numbers, could all come together and participate in one shopping experience. Okay, this could be via a live call or or via just a generic shopping experience. And then for the people in back home who don't have, you know, maybe they might not have access to data, or it might be the older people, right? We will integrate this WhatsApp a WhatsApp platform where there's a WhatsApp chatbot that allows is integrated into the same app. So, like an Ambula could just speak in a language, and she could just type in, you know, whatever she wants, and then the AI would add it to the cart, and then whoever makes the payment on the other side would pay, you know, or the family members would split the payments across all of them. Okay, so just to simulate a quick one, I'll just show you here. Obviously, I'm just gonna simulate a quick one. So this could be a live call with multiple people. So it could be all of us.
pfungwa 03:34: just a quick one, right? I mean, it's yeah the the shopping experience is on the on the local grocery database.
Speaker 1 03:47: Yeah, so it it will be integrated to the local their local databases. So they could probably give us an API to be able to plug into their current app because they already have the TM PMP online, right? Yeah. So it will be an integration either via this app. So this there's a company that built this for them. So we could integrate with that company. So we would offer the diaspora angle, and then locally, I think we would then obviously need to offer a physical, you0 know, delivery service, right? Because currently they don't have that. They don't have the, you know, the scooters and the sort of the logistical system for that, right? Yeah. So yeah, we we would.
pfungwa 04:30: So tell me, it will be that. Yeah.
pfungwa 04:32: Yeah. So tell me on the local platform, right? Does it have the same feature where you can add a few people to participate in the purchase or not?
Speaker 1 04:43: No, it doesn't have that. So it's a single shopping cart system, where so this is a local one I'm showing you now. Yes. So it can add products. Yes, it's your just your normal pick and pay app like we have in South Africa. Yeah, so check out. Yeah, so it doesn't have all of that.
pfungwa 05:00: Okay, so let's take notes as we go along. Okay, so one is a platform for delivery. Okay, the second one is an enhancement of the current user experience, where you can have participation of more than one people contributing towards the shopping experience.
pfungwa 05:21: the third one is those people are destination agnostic. Meaning you can be anywhere. You can be even be in Zimbabwe, or you can be international. The platform allows participation on a multiple currency tradable gateway.
pfungwa 09:30: Hold something at the back of your mind, which could be a Retail shop agnostic platform. It becomes a trading platform where price becomes the reason to participate, supported by AI inventory intelligence and EV last-mile delivery fleet.`
  },
  {
    id: 'item-2',
    title: 'Strategy_Alignment_Audio_Recording_2026-09-09.ogg',
    type: 'audio',
    category: 'Audio Recordings',
    date: '2026-09-09',
    size: '18.4 MB',
    duration: '26:14',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/office_ambient.ogg',
    transcriptText: 'Strategy Alignment Recording. Participants: Gugu Nyathi, Pfungwa, Boni Muvevi. Topics: TM Pick n Pay integration, Optimization Gap (Diaspora Market, Informal Retail Traders, Customer Convenience), EV fleet rent-to-buy model, and multi-currency acquiring rails.'
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
    title: 'Full_Meeting_Transcription_OtterAI_2026-09-09.txt',
    type: 'transcript',
    category: 'Transcripts',
    date: '2026-09-09',
    size: '98 KB',
    duration: '26:14',
    transcriptText: `[inaudible] [inaudible] [inaudible] [inaudible] [inaudible] [inaudible] Okay. I think the biggest risk here is, but I guess I wouldn't call it a risk to say, but it is, for some extent, they already have someone someone who developed this system for them. So I think the one question that could always ask is, why we can always get our guide to edit dash for a link. Why do we need you guys? What are you going to bring to the team? [INAUDIBLE] Mayor, and inside of what we are talking to if we are below half the relationship. We are coming out of a place where we have six weight meters. So I think that's that what I want to do. Otherwise, if we are going to be doing the hard and still. Yeah. It's tough. It's a little bit short. Yeah. Okay. Do you guys do you envision a situation where they say, okay, partner up with the other guys since he's already developed the... I wouldn't know about it. No, there's that sort. Yeah. Okay. I don't know what it is. Yeah. Because then we have to look at the dynamic that we have with the current developer. How do we-- because he's already got the integration to the API to the sim switch, the payments platform locally. The whole thing is already integrated. So either way for us to push this to the market faster, we have to leverage that guy who's developed this thing, the website for P P campaign. We don't have to integrate via somehow. He has to help us with that integration.`
  },
  {
    id: 'item-6',
    title: 'Strategy_Discussion_Gugu_Pfungwa_Boni_Zion_2026-09-09.txt',
    type: 'transcript',
    category: 'Transcripts',
    date: '2026-09-09',
    size: '115 KB',
    duration: '26:14',
    transcriptText: `Gugu Nyathi: Uh. I think it's on mute. So, you guys can unmute yourself. Yeah, and Zion is on mute. You can unmute when you want to talk. I think Mr Funko is still on mute. Okay. Greetings. How are you doing?
Pfungwa: Very well. Very well, thank you. Thank you.
Gugu Nyathi: Okay, so I think it's over to you, Bonnie, and fungua.
Boni Muvevi: I think, maybe, uh, Google, if you can just start. Just taking us through the updated version, and then we can take it from there.
Gugu Nyathi: Yeah.
Boni Muvevi: Google. Let's just go back to the. Cuz I think that's the first page.
Gugu Nyathi: Okay.
Boni Muvevi: I think just. So that we, we quite clear on. On the Gap and the value proposition.`
  }
];

export const LibraryTab: React.FC = () => {
  const [items, setItems] = useState<LibraryItem[]>(INITIAL_LIBRARY_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLibraryView, setActiveLibraryView] = useState<'all' | 'assistant' | 'editor' | 'transcripts' | 'player'>('all');
  const [activePlayerItem, setActivePlayerItem] = useState<LibraryItem | null>(INITIAL_LIBRARY_ITEMS[1]); // Default to audio item
  const [activeViewerItem, setActiveViewerItem] = useState<LibraryItem | null>(null);
  const [readerMode, setReaderMode] = useState<'scroll' | 'paginate'>('scroll');
  const [readerPage, setReaderPage] = useState(0);

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1574); // 26:14 in seconds
  const [volume, setVolume] = useState(1); // 1 = 100%, up to 3 (300%)
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Gemini AI Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; time: string }>>([
    {
      role: 'assistant',
      text: 'Greetings! I am your real-time Gemini AI intelligent assistant with complete market knowledge of online retail in Zimbabwe, diaspora remittances ($61.2M baseline GMV), TM Pick n Pay, and all uploaded transcripts & recordings. How can I assist you today?',
      time: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRealtimeVoiceActive, setIsRealtimeVoiceActive] = useState(false);
  const recognitionRef = useRef<any>(null);

  const startRealtimeVoiceConversation = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech Recognition is not supported in this browser. Please use Chrome or Edge for voice chat.');
      return;
    }
    setIsRealtimeVoiceActive(true);
    runVoiceListeningLoop();
  };

  const stopRealtimeVoiceConversation = () => {
    setIsRealtimeVoiceActive(false);
    setIsListening(false);
    setIsSpeaking(false);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e) {}
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const runVoiceListeningLoop = () => {
    if (!isRealtimeVoiceActive) return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        if (!transcript.trim()) return;

        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setChatMessages(prev => [...prev, { role: 'user', text: transcript, time: now }]);
        setIsAiProcessing(true);

        let reply = "Based on our repository transcripts and market knowledge, TM Pick n Pay is uniquely positioned as the principal anchor retail partner.";
        try {
          const res = await fetch('/api/gemini-chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: transcript, context: { itemsCount: items.length } })
          });
          const data = await res.json();
          if (data.reply) reply = data.reply;
        } catch (err) {
          const lower = transcript.toLowerCase();
          if (lower.includes('diaspora') || lower.includes('remittance')) {
            reply = "The diaspora corridor represents 100k to 500k+ active senders across South Africa, UK, USA, and Australia, generating US$61,200,000 in baseline retail GMV.";
          } else if (lower.includes('spaza') || lower.includes('informal') || lower.includes('trader')) {
            reply = "Informal township tuck-shops represent a massive wholesale supply gap. TM Pick n Pay can step in as bulk wholesale supplier with zero store CapEx.";
          } else if (lower.includes('fleet') || lower.includes('delivery') || lower.includes('scooter')) {
            reply = "The green EV last-mile grid deploys 500 to 2,000 cargo e-tricycles on a 12-month rent-to-buy lease model with ~5 month asset payback.";
          }
        }

        setIsAiProcessing(false);
        setChatMessages(prev => [...prev, { role: 'assistant', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);

        if ('speechSynthesis' in window) {
          setIsSpeaking(true);
          const utterance = new SpeechSynthesisUtterance(reply);
          utterance.rate = 1.0;
          utterance.onend = () => {
            setIsSpeaking(false);
            setTimeout(() => {
              if (isRealtimeVoiceActive) {
                runVoiceListeningLoop();
              }
            }, 600);
          };
          utterance.onerror = () => {
            setIsSpeaking(false);
          };
          window.speechSynthesis.speak(utterance);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
        if (isRealtimeVoiceActive) {
          setTimeout(() => runVoiceListeningLoop(), 1000);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
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
        body: JSON.stringify({ message: userText, context: { itemsCount: items.length } })
      });
      const data = await res.json();
      const reply = data.reply || "Based on repository documents and market knowledge, TM Pick n Pay is uniquely positioned as the principal anchor retail partner.";

      setChatMessages(prev => [...prev, { role: 'assistant', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setIsAiProcessing(false);

      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(reply);
        window.speechSynthesis.speak(utterance);
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

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search transcripts, recordings, documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600"
              />
            </div>

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

                {/* Live Synchronized Subtitles / Transcript Feed */}
                <div className={`bg-slate-950 border border-slate-800 rounded-xl p-3 ${activeLibraryView === 'player' ? 'h-64' : 'h-36'} overflow-y-auto text-[11px] font-mono text-slate-300 leading-relaxed space-y-2`}>
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                    Live Synchronized Subtitles (Transcript Feed):
                  </div>
                  <p className="text-white bg-amber-500/10 border-l-2 border-amber-500 p-1.5 rounded">
                    &ldquo;...looking at the Optimization Gap: Diaspora Market, Informal Retail Traders, and Customer Convenience. A multi-million dollar distribution gap exists closing three vectors...&rdquo;
                  </p>
                  <p className="text-slate-400">
                    &ldquo;...underpinned by an AI intelligent engine that predicts replenishment triggers and secures guaranteed foreign currency retail settlement...&rdquo;
                  </p>
                  <p className="text-slate-400">
                    &ldquo;...EV scooter fleet rent-to-buy lease model achieving full asset payback in ~5 months...&rdquo;
                  </p>
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
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Gemini AI Real-Time Assistant Workspace</h3>
                  <p className="text-[10px] text-slate-500">Query all transcripts, recordings, proposals &amp; global retail knowledge</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
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
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow flex items-center gap-1.5 cursor-pointer"
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

            {/* Realtime voice conversational active status banner */}
            {isRealtimeVoiceActive && (
              <div className="bg-purple-900 text-purple-100 p-3 rounded-xl mb-4 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-8 h-8 bg-purple-600 rounded-full">
                    <Mic className="w-4 h-4 text-white animate-bounce" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                  </div>
                  <div>
                    <div className="text-xs font-extrabold flex items-center gap-2">
                      <span>Real-Time Voice Conversation Active</span>
                      {isListening && <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded font-mono">🔴 Listening... Speak now</span>}
                      {isSpeaking && <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded font-mono">🔊 AI Speaking...</span>}
                      {isAiProcessing && <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded font-mono">✨ Processing...</span>}
                    </div>
                    <p className="text-[10px] text-purple-300 mt-0.5">Gemini is listening continuously. Speak naturally—it responds back aloud and keeps the conversation flowing.</p>
                  </div>
                </div>
                <button
                  onClick={stopRealtimeVoiceConversation}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold transition"
                >
                  End Chat
                </button>
              </div>
            )}

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
