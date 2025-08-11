import { Header } from '@/components/header';
import { api } from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useEffect, useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/api/get-profile';

export function AppLayout() {
  const navigate = useNavigate();

  // Check auth cookie on the client first (browser-only)
  const hasAuthCookie = useMemo(() => {
    if (typeof document === 'undefined') return false;
    return /(?:^|;\s*)auth=/.test(document.cookie);
  }, []);

  // Fetch profile only if we detect the auth cookie
  const { isLoading, isError } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    retry: false,
    enabled: hasAuthCookie,
  });

  useEffect(() => {
    if (!hasAuthCookie) {
      navigate('/auth/signin', { replace: true });
      return;
    }

    if (isError) {
      navigate('/auth/signin', { replace: true });
    }
  }, [hasAuthCookie, isError, navigate]);

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          const code = error.response?.data.code;

          if (status === 401 && code === 'UNAUTHORIZED') {
            navigate('/auth/signin', { replace: true });
          } else {
            throw error;
          }
        }
      },
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
