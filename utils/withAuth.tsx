// utils/withAuth.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export function withAuth(WrappedComponent: React.ComponentType<any>) {
  const ProtectedRoute = (props: any) => {
    const router = useRouter();
    const [authorized, setAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/login');
      } else {
        setAuthorized(true);
      }
    }, []);

    if (authorized === null) {
      return <div className="text-center mt-10 text-gray-500">Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedRoute;
}
