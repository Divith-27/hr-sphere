import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const SUGGESTIONS = [
  { label: '🏖️ Leave Policy', query: 'What is the leave policy for casual and sick leaves in HRSphere?' },
  { label: '🕘 Hours & WFH', query: 'What are the official working hours and Work From Home (WFH) guidelines?' },
  { label: '💰 Payroll & PF', query: 'When is salary credited and what deductions like PF and TDS apply?' },
  { label: '📋 Onboarding Steps', query: 'Explain the new employee 90-day onboarding and probation process.' },
  { label: '🏥 Benefits & Wellness', query: 'What health insurance, gym, and wellness benefits are provided?' },
  { label: '✉️ Draft Leave Request', query: 'Draft a professional email requesting 2 days of casual leave for personal reasons.' },
];

export default function AIPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [sourceInfo, setSourceInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [insights, setInsights] = useState([]);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'insights'
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/ai/insights`);
      if (res.data && res.data.insights) {
        setInsights(res.data.insights);
      }
    } catch {
      // ignore
    }
  };

  const handleAskAI = async (customQuery) => {
    const q = (customQuery || question).trim();
    if (!q) {
      setError('Please enter a question or select a prompt.');
      return;
    }

    setLoading(true);
    setError('');
    setAnswer('');
    setSourceInfo(null);
    setCopied(false);

    try {
      // Build previous history for multi-turn context
      const historyPayload = conversationHistory.slice(-4).map((h) => [
        { role: 'user', content: h.question },
        { role: 'assistant', content: h.answer }
      ]).flat();

      const response = await axios.post(`${API_BASE_URL}/ai/ask`, {
        question: q,
        history: historyPayload,
      });

      const aiAnswer = response.data.answer || 'No answer returned.';
      setAnswer(aiAnswer);
      setSourceInfo({
        source: response.data.source || 'HRSphere AI',
        model: response.data.model || 'Groq OSS-120B',
      });

      setConversationHistory((prev) => [
        ...prev,
        {
          id: Date.now(),
          question: q,
          answer: aiAnswer,
          model: response.data.model || 'AI',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      setQuestion('');
    } catch (err) {
      setError(err.response?.data?.detail || err.response?.data?.answer || err.message || 'Failed to get AI response. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (answer) {
      navigator.clipboard.writeText(answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClearHistory = () => {
    setConversationHistory([]);
    setQuestion('');
    setAnswer('');
    setError('');
    setSourceInfo(null);
  };

  // Render markdown-like simple formatting (bold, headers, bullets)
  const renderFormattedText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h4 key={idx} style={{ color: '#90caf9', margin: '14px 0 6px 0' }}>{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={idx} style={{ color: '#64b5f6', margin: '16px 0 8px 0' }}>{line.replace('## ', '')}</h3>;
      }
      if (line.startsWith('# ')) {
        return <h2 key={idx} style={{ color: '#42a5f5', margin: '18px 0 10px 0' }}>{line.replace('# ', '')}</h2>;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <div key={idx} style={{ display: 'flex', gap: '8px', margin: '4px 0', paddingLeft: '8px' }}>
            <span style={{ color: '#64b5f6' }}>•</span>
            <span>{parseBold(line.substring(2))}</span>
          </div>
        );
      }
      if (!line.trim()) {
        return <div key={idx} style={{ height: '8px' }} />;
      }
      return <p key={idx} style={{ margin: '4px 0', lineHeight: '1.6' }}>{parseBold(line)}</p>;
    });
  };

  const parseBold = (str) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: '#fff' }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>HRSphere AI Assistant</h1>
          <span style={{ fontSize: '14px', color: '#aaa' }}>Intelligent HR Guidance, Policies, and Workflow Assistant</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            background: 'rgba(46, 125, 50, 0.2)',
            color: '#81c784',
            padding: '4px 10px',
            borderRadius: '16px',
            fontSize: '12px',
            border: '1px solid rgba(76, 175, 80, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4caf50' }}></span>
            Groq LLaMA/OSS Live
          </span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setActiveTab('chat')}
              style={{
                background: activeTab === 'chat' ? '#1976d2' : '#2d3748',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              💬 AI Chat
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              style={{
                background: activeTab === 'insights' ? '#1976d2' : '#2d3748',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              📊 Workforce Insights
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      {activeTab === 'chat' && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', color: '#90caf9', marginBottom: '8px', fontWeight: '500' }}>
            💡 Quick Prompts:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {SUGGESTIONS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuestion(item.query);
                  handleAskAI(item.query);
                }}
                disabled={loading}
                style={{
                  background: '#232936',
                  color: '#e0e0e0',
                  border: '1px solid #3d485e',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'chat' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '16px', marginBottom: '16px' }}>
            {/* Input card */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ margin: '0 0 10px 0' }}>Ask HR Question or Request a Draft</h3>
                <textarea
                  rows="7"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                      handleAskAI();
                    }
                  }}
                  placeholder="Ask anything about company leave policies, work hours, attendance, benefits, payroll, onboarding, or ask to draft an email..."
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #444',
                    borderRadius: '6px',
                    background: '#1a1a1a',
                    color: '#fff',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
                <div style={{ fontSize: '11px', color: '#777', marginTop: '4px' }}>
                  Press <kbd style={{ background: '#333', padding: '2px 4px', borderRadius: '3px' }}>Ctrl + Enter</kbd> to send
                </div>
              </div>

              <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleAskAI()}
                  disabled={loading || !question.trim()}
                  style={{
                    flex: 2,
                    background: '#1976d2',
                    color: '#fff',
                    padding: '10px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    fontWeight: 'bold',
                    opacity: loading || !question.trim() ? 0.6 : 1,
                    cursor: loading || !question.trim() ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading ? '⏳ Generating Answer...' : '🚀 Ask AI'}
                </button>
                <button
                  onClick={handleClearHistory}
                  style={{
                    background: '#424242',
                    color: '#fff',
                    padding: '10px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    flex: 1,
                  }}
                  disabled={loading}
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Output card */}
            <div className="card" style={{ background: '#131b26', border: '1px solid #20334d', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🤖</span> AI Response
                </h3>
                {answer && (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {sourceInfo && (
                      <span style={{ fontSize: '11px', color: '#90caf9', background: 'rgba(25, 118, 210, 0.2)', padding: '2px 8px', borderRadius: '4px' }}>
                        {sourceInfo.source} • {sourceInfo.model}
                      </span>
                    )}
                    <button
                      onClick={handleCopy}
                      style={{
                        background: copied ? '#2e7d32' : '#1e293b',
                        color: '#fff',
                        border: '1px solid #334155',
                        borderRadius: '4px',
                        padding: '3px 8px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      {copied ? '✓ Copied' : '📋 Copy'}
                    </button>
                  </div>
                )}
              </div>

              <div style={{ flex: 1, overflowY: 'auto', maxHeight: '420px', paddingRight: '4px' }}>
                {loading && (
                  <div style={{ padding: '30px', textAlign: 'center', color: '#64b5f6' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
                    <strong>HRSphere AI is processing your question...</strong>
                    <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>Querying HR handbook & policy engine</div>
                  </div>
                )}

                {error && (
                  <div style={{ padding: '14px', background: '#451212', borderRadius: '6px', color: '#ff8a80', border: '1px solid #b71c1c' }}>
                    <strong>⚠️ Error:</strong> {error}
                  </div>
                )}

                {answer && !loading && (
                  <div style={{ color: '#e2e8f0', fontSize: '14px' }}>
                    {renderFormattedText(answer)}
                  </div>
                )}

                {!loading && !answer && !error && (
                  <div style={{ padding: '40px 20px', textAlign: 'center', color: '#718096' }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>💬</div>
                    <p style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#cbd5e1' }}>Ready to answer your HR queries</p>
                    <p style={{ margin: 0, fontSize: '13px' }}>Ask questions about company guidelines, leave policies, benefits, attendance, or generate professional HR drafts.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Conversation History */}
          {conversationHistory.length > 0 && (
            <div className="card" style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ margin: 0 }}>Conversation History ({conversationHistory.length})</h3>
                <button
                  onClick={handleClearHistory}
                  style={{ background: 'transparent', color: '#ef5350', border: 'none', cursor: 'pointer', fontSize: '12px' }}
                >
                  Clear All
                </button>
              </div>
              <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                {conversationHistory.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      marginBottom: '12px',
                      padding: '12px',
                      borderRadius: '6px',
                      background: '#1a202c',
                      borderLeft: '4px solid #1976d2',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <strong style={{ color: '#64b5f6', fontSize: '14px' }}>Q: {item.question}</strong>
                      <span style={{ fontSize: '11px', color: '#718096' }}>{item.timestamp}</span>
                    </div>
                    <div style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.5', whiteSpace: 'pre-line' }}>
                      {item.answer.length > 250 ? item.answer.substring(0, 250) + '...' : item.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Workforce Insights Tab */}
      {activeTab === 'insights' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            {insights.map((insight) => (
              <div key={insight.id} className="card" style={{ borderLeft: `4px solid ${insight.trend === 'positive' ? '#4caf50' : insight.trend === 'attention' ? '#ff9800' : '#2196f3'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '16px' }}>{insight.title}</h3>
                  <span style={{
                    fontWeight: 'bold',
                    color: insight.trend === 'positive' ? '#81c784' : insight.trend === 'attention' ? '#ffb74d' : '#64b5f6',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}>
                    {insight.score}
                  </span>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '13px', margin: 0, lineHeight: '1.5' }}>
                  {insight.summary}
                </p>
              </div>
            ))}
          </div>

          <div className="card" style={{ background: '#1e3a8a', padding: '16px' }}>
            <h3 style={{ color: '#90caf9', margin: '0 0 6px 0' }}>💡 Strategic HR Recommendation</h3>
            <p style={{ color: '#e0e7ff', margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
              Maintain balanced cross-functional staffing coverage on Fridays and ensure timely completion of Q3 performance appraisals. The AI Assistant can help draft personalized appraisal summaries and feedback letters.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

