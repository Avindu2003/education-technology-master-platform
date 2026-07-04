import { useState, useRef } from 'react';
import { Eye, EyeOff, Mail, Lock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import logo from '../assets/logo.png';

function EduNexusMark({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="enx-mark-grad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F0CE8B" />
          <stop offset="1" stopColor="#C98F2E" />
        </linearGradient>
      </defs>
      <path d="M20 4L34 12V28L20 36L6 28V12L20 4Z" stroke="url(#enx-mark-grad)" strokeWidth="1.6" fill="none" />
      <circle cx="20" cy="13" r="3.4" fill="url(#enx-mark-grad)" />
      <circle cx="11" cy="27" r="3" fill="#1B2158" stroke="url(#enx-mark-grad)" strokeWidth="1.4" />
      <circle cx="29" cy="27" r="3" fill="#1B2158" stroke="url(#enx-mark-grad)" strokeWidth="1.4" />
      <path d="M20 16.4L12.4 24.6M20 16.4L27.6 24.6" stroke="url(#enx-mark-grad)" strokeWidth="1.4" />
    </svg>
  );
}

function NexusGraphic() {
  const nodes = [
    { id: 'hub', x: 210, y: 150, r: 9, hub: true },
    { id: 'a', x: 90, y: 70, r: 5 },
    { id: 'b', x: 320, y: 60, r: 4 },
    { id: 'c', x: 60, y: 190, r: 4.5 },
    { id: 'd', x: 340, y: 200, r: 5 },
    { id: 'e', x: 150, y: 250, r: 4 },
    { id: 'f', x: 270, y: 260, r: 5.5 },
    { id: 'g', x: 190, y: 40, r: 3.5 },
  ];
  const links = [
    ['hub', 'a'], ['hub', 'b'], ['hub', 'c'], ['hub', 'd'],
    ['hub', 'e'], ['hub', 'f'], ['a', 'g'], ['b', 'g'],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg className="enx-nexus-svg" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {links.map(([from, to], i) => {
        const a = byId[from], b = byId[to];
        return (
          <line
            key={i}
            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke="#5B6399" strokeWidth="1"
            className="enx-nexus-line"
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        );
      })}
      {nodes.map((n) => (
        <circle
          key={n.id}
          cx={n.x} cy={n.y} r={n.r}
          fill={n.hub ? 'url(#enx-node-grad)' : '#C9CEE8'}
          className={n.hub ? 'enx-node-hub' : 'enx-node'}
          opacity={n.hub ? 1 : 0.85}
        />
      ))}
      <defs>
        <radialGradient id="enx-node-grad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#F5D9A3" />
          <stop offset="1" stopColor="#C98F2E" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function EduNexusLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [signedIn, setSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const authTokenRef = useRef(null);

  const validateInput = (name, value) => {
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) return 'Enter your email address.';
      if (!emailRegex.test(value)) return 'Enter a valid email address.';
    }
    if (name === 'password') {
      if (!value) return 'Enter your password.';
      if (value.length < 6) return 'Password must be at least 6 characters.';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setServerError('');
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateInput(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateInput(name, value) }));
  };

  const isFormValid =
    !validateInput('email', formData.email) && !validateInput('password', formData.password);

  const handleLogin = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const emailError = validateInput('email', formData.email);
    const passwordError = validateInput('password', formData.password);
    setErrors({ email: emailError, password: passwordError });
    if (emailError || passwordError) return;

    setLoading(true);
    setServerError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        authTokenRef.current = data.token;
        setSignedIn(true);
      } else {
        setServerError(data.message || "That email or password doesn't match our records.");
      }
    } catch (error) {
      setServerError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enx-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .enx-root {
          --navy-950: #0D1330;
          --navy-800: #171E45;
          --navy-700: #232B5C;
          --gold-500: #D9A94D;
          --gold-300: #F0CE8B;
          --paper: #FBF9F4;
          --ink-900: #1B1E2E;
          --slate-500: #6B7089;
          --slate-300: #C7CAD9;
          --error: #B3422F;
          --error-bg: #FBE9E5;

          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          min-height: 100vh;
          width: 100%;
          display: flex;
          background: var(--paper);
          color: var(--ink-900);
        }

        .enx-brand {
          position: relative;
          background: radial-gradient(circle at 30% 20%, var(--navy-700), var(--navy-950) 70%);
          color: #EDEFF9;
          width: 44%;
          min-width: 380px;
          padding: 3rem 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }

        .enx-wordmark {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .enx-wordmark span {
          font-family: 'Fraunces', serif;
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .enx-brand-copy {
          position: relative;
          z-index: 1;
        }

        .enx-brand-copy h1 {
          font-family: 'Fraunces', serif;
          font-weight: 500;
          font-size: 2rem;
          line-height: 1.2;
          max-width: 20ch;
          margin: 0 0 0.75rem;
        }

        .enx-brand-copy p {
          color: var(--slate-300);
          font-size: 0.95rem;
          max-width: 32ch;
          margin: 0;
        }

        .enx-nexus-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.9;
        }

        .enx-nexus-svg {
          width: 100%;
          max-width: 460px;
        }

        .enx-nexus-line {
          stroke-dasharray: 260;
          stroke-dashoffset: 260;
          animation: enx-draw 1.4s ease-out forwards;
        }

        .enx-node-hub {
          transform-origin: center;
          animation: enx-pulse 3.2s ease-in-out infinite;
        }

        @keyframes enx-draw {
          to { stroke-dashoffset: 0; }
        }

        @keyframes enx-pulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(217, 169, 77, 0)); }
          50% { transform: scale(1.18); filter: drop-shadow(0 0 8px rgba(217, 169, 77, 0.55)); }
        }

        .enx-footer-note {
          position: relative;
          z-index: 1;
          font-size: 0.75rem;
          color: var(--slate-500);
        }

        .enx-form-side {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1.5rem;
        }

        .enx-card {
          width: 100%;
          max-width: 380px;
          animation: enx-rise 0.5s ease-out;
        }

        @keyframes enx-rise {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .enx-card h2 {
          font-family: 'Fraunces', serif;
          font-weight: 500;
          font-size: 1.75rem;
          margin: 0 0 0.35rem;
        }

        .enx-card > p.enx-sub {
          color: var(--slate-500);
          font-size: 0.9rem;
          margin: 0 0 1.75rem;
        }

        .enx-field {
          margin-bottom: 1.15rem;
        }

        .enx-field-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.4rem;
        }

        .enx-field label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--ink-900);
        }

        .enx-link {
          font-size: 0.78rem;
          color: var(--gold-500);
          text-decoration: none;
          font-weight: 600;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .enx-link:hover { text-decoration: underline; }

        .enx-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .enx-input-wrap svg.enx-icon-left {
          position: absolute;
          left: 0.85rem;
          color: var(--slate-500);
          pointer-events: none;
        }

        .enx-input-wrap input {
          width: 100%;
          padding: 0.75rem 0.9rem 0.75rem 2.5rem;
          border-radius: 8px;
          border: 1.5px solid #E1E0D6;
          background: #fff;
          font-size: 0.95rem;
          font-family: inherit;
          color: var(--ink-900);
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.15s, box-shadow 0.15s;
        }

        .enx-input-wrap input::placeholder { color: #B7B6AC; }

        .enx-input-wrap input:focus {
          border-color: var(--gold-500);
          box-shadow: 0 0 0 3px rgba(217, 169, 77, 0.22);
        }

        .enx-input-wrap input[aria-invalid="true"] {
          border-color: var(--error);
        }

        .enx-input-wrap input[aria-invalid="true"]:focus {
          box-shadow: 0 0 0 3px rgba(179, 66, 47, 0.16);
        }

        .enx-input-wrap input:disabled {
          background: #F5F4EE;
          cursor: not-allowed;
        }

        .enx-toggle-visibility {
          position: absolute;
          right: 0.75rem;
          background: none;
          border: none;
          color: var(--slate-500);
          cursor: pointer;
          display: flex;
          padding: 0.2rem;
        }

        .enx-toggle-visibility:hover { color: var(--ink-900); }

        .enx-hint {
          font-size: 0.75rem;
          color: var(--slate-500);
          margin-top: 0.35rem;
        }

        .enx-hint.enx-hint-error {
          color: var(--error);
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .enx-remember {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0.25rem 0 1.4rem;
          font-size: 0.85rem;
          color: var(--slate-500);
          user-select: none;
        }

        .enx-remember input {
          width: 15px;
          height: 15px;
          accent-color: var(--gold-500);
        }

        .enx-server-error {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          background: var(--error-bg);
          color: var(--error);
          padding: 0.7rem 0.85rem;
          border-radius: 8px;
          font-size: 0.85rem;
          margin-bottom: 1.1rem;
          font-weight: 500;
        }

        .enx-server-error svg { flex-shrink: 0; margin-top: 0.1rem; }

        .enx-submit {
          width: 100%;
          padding: 0.85rem;
          border: none;
          border-radius: 8px;
          background: var(--navy-950);
          color: #fff;
          font-family: inherit;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background 0.15s, transform 0.1s;
        }

        .enx-submit:hover:not(:disabled) { background: var(--navy-800); }
        .enx-submit:active:not(:disabled) { transform: scale(0.99); }

        .enx-submit:disabled {
          background: #D8D6C9;
          color: #93927F;
          cursor: not-allowed;
        }

        .enx-spin {
          animation: enx-spin 0.8s linear infinite;
        }

        @keyframes enx-spin {
          to { transform: rotate(360deg); }
        }

        .enx-signup {
          text-align: center;
          font-size: 0.85rem;
          color: var(--slate-500);
          margin-top: 1.5rem;
        }

        .enx-success {
          text-align: center;
          padding: 1.5rem 0;
        }

        .enx-success svg {
          color: #3F8F5F;
          margin-bottom: 0.75rem;
        }

        .enx-success h3 {
          font-family: 'Fraunces', serif;
          font-size: 1.4rem;
          margin: 0 0 0.4rem;
        }

        .enx-success p {
          color: var(--slate-500);
          font-size: 0.9rem;
          margin: 0;
        }

        @media (max-width: 880px) {
          .enx-root { flex-direction: column; }

          .enx-brand {
            width: 100%;
            min-width: 0;
            min-height: 168px;
            padding: 1.5rem 1.5rem 1.25rem;
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
          }

          .enx-brand-copy h1 { font-size: 1.3rem; max-width: 16ch; }
          .enx-brand-copy p { display: none; }
          .enx-nexus-wrap { opacity: 0.35; }
          .enx-footer-note { display: none; }

          .enx-form-side { padding: 2rem 1.25rem 3rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .enx-nexus-line, .enx-node-hub, .enx-card, .enx-spin {
            animation: none !important;
          }
          .enx-nexus-line { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Brand panel */}
      <aside className="enx-brand">
        <div className="enx-nexus-wrap"><NexusGraphic /></div>

        <div className="enx-wordmark">
          <EduNexusMark />
          <span>EduNexus</span>
        </div>

        <div className="enx-brand-copy">
          <h1>Every learner, one connected campus.</h1>
          <p>Courses, cohorts and mentors — all in a single account.</p>
        </div>

        <p className="enx-footer-note">© 2026 EduNexus · Privacy · Terms</p>
      </aside>

      {/* Form panel */}
      <main className="enx-form-side">
        <div className="enx-card">
          {signedIn ? (
            <div className="enx-success">
              <CheckCircle2 size={40} />
              <h3>You're signed in</h3>
              <p>Redirecting you to your dashboard…</p>
            </div>
          ) : (
            <>
              <h2>Sign in to EduNexus</h2>
              <p className="enx-sub">Pick up right where you left off.</p>

              {serverError && (
                <div className="enx-server-error" role="alert">
                  <AlertCircle size={16} />
                  <span>{serverError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} noValidate>
                <div className="enx-field">
                  <div className="enx-field-head">
                    <label htmlFor="enx-email">Email</label>
                  </div>
                  <div className="enx-input-wrap">
                    <Mail size={16} className="enx-icon-left" />
                    <input
                      id="enx-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="you@school.edu"
                      disabled={loading}
                      aria-invalid={Boolean(touched.email && errors.email)}
                      aria-describedby="enx-email-hint"
                    />
                  </div>
                  {touched.email && errors.email && (
                    <span id="enx-email-hint" className="enx-hint enx-hint-error">
                      <AlertCircle size={12} /> {errors.email}
                    </span>
                  )}
                </div>

                <div className="enx-field">
                  <div className="enx-field-head">
                    <label htmlFor="enx-password">Password</label>
                    <a className="enx-link" href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a>
                  </div>
                  <div className="enx-input-wrap">
                    <Lock size={16} className="enx-icon-left" />
                    <input
                      id="enx-password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="••••••••"
                      disabled={loading}
                      aria-invalid={Boolean(touched.password && errors.password)}
                      aria-describedby="enx-password-hint"
                      style={{ paddingRight: '2.4rem' }}
                    />
                    <button
                      type="button"
                      className="enx-toggle-visibility"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {touched.password && errors.password ? (
                    <span id="enx-password-hint" className="enx-hint enx-hint-error">
                      <AlertCircle size={12} /> {errors.password}
                    </span>
                  ) : (
                    <span id="enx-password-hint" className="enx-hint">At least 6 characters.</span>
                  )}
                </div>

                <label className="enx-remember">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me on this device
                </label>

                <button type="submit" className="enx-submit" disabled={!isFormValid || loading}>
                  {loading ? (
                    <>
                      <Loader2 size={16} className="enx-spin" /> Signing in…
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </form>

              <p className="enx-signup">
                New to EduNexus?{' '}
                <a className="enx-link" href="#" onClick={(e) => e.preventDefault()}>Create an account</a>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}