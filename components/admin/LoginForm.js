'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../lib/supabase/browser';

export default function LoginForm({ initialError }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [error, setError] = useState(initialError || '');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setMessage('');

    const { error: signInError } = await createClient().auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError('Sign-in failed. Check your email and password.');
      setIsSubmitting(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  async function handlePasswordReset(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setMessage('');

    const redirectTo = new URL('/admin/reset-password', window.location.origin).toString();
    const { error: resetError } = await createClient().auth.resetPasswordForEmail(email, { redirectTo });

    if (resetError) {
      setError('We could not send a reset email. Check the address and try again.');
      setIsSubmitting(false);
      return;
    }

    setMessage('If an admin account uses this email, a password reset link is on its way.');
    setIsSubmitting(false);
  }

  if (isResetting) {
    return (
      <form className="admin-form" onSubmit={handlePasswordReset}>
        {error ? <p className="form-error" role="alert">{error}</p> : null}
        {message ? <p className="form-success" role="status">{message}</p> : null}
        <label>
          Admin email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <button className="button button-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending reset email…' : 'Send reset email'}
        </button>
        <button className="button button-ghost" type="button" onClick={() => {
          setIsResetting(false);
          setError('');
          setMessage('');
        }}>
          Back to sign in
        </button>
      </form>
    );
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      {message ? <p className="form-success" role="status">{message}</p> : null}
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />
      </label>
      <button className="button button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in…' : 'Sign in'}
      </button>
      <button className="button button-ghost" type="button" onClick={() => {
        setIsResetting(true);
        setError('');
        setMessage('');
      }}>
        Forgot password?
      </button>
    </form>
  );
}