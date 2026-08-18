'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../lib/supabase/browser';

export default function ResetPasswordForm() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let isMounted = true;

    const showHashError = () => {
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
      const description = hash.get('error_description');
      if (description && isMounted) {
        setError(description.replace(/\+/g, ' '));
      }
    };

    showHashError();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) {
        return;
      }

      if (event === 'PASSWORD_RECOVERY' || session) {
        setIsReady(true);
        setError('');
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) {
        return;
      }

      if (session) {
        setIsReady(true);
      } else {
        setError((currentError) => currentError || 'This password reset link is invalid or has expired. Request a new one to continue.');
      }
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setMessage('');

    if (password.length < 6) {
      setError('Your new password must be at least 6 characters.');
      return;
    }

    if (password !== confirmation) {
      setError('The passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    const { error: updateError } = await createClient().auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message || 'Your password could not be updated. Request a new reset link and try again.');
      setIsSubmitting(false);
      return;
    }

    setMessage('Password updated. Redirecting to your admin workspace…');
    router.push('/admin');
    router.refresh();
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      {message ? <p className="form-success" role="status">{message}</p> : null}
      {isReady ? (
        <>
          <label>
            New password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              minLength={6}
              required
            />
          </label>
          <label>
            Confirm new password
            <input
              type="password"
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              autoComplete="new-password"
              minLength={6}
              required
            />
          </label>
          <button className="button button-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating password…' : 'Set new password'}
          </button>
        </>
      ) : (
        <p className="form-help">Checking your reset link…</p>
      )}
    </form>
  );
}