// components/Auth.js
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

function Auth({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push('/authentication/sign-in?message=login required');
    return null;
  }

  // Additional logic for authorization (e.g., adminOnly)

  return children;
}

export default Auth;
