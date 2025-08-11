import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Helmet } from 'react-helmet-async';
import { z } from 'zod';
import { toast } from 'sonner';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '@/api/sign-in';
import { env } from '@/env';

const signInForm = z.object({
  email: z.string().email(),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showDemoLink, setShowDemoLink] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: { email: searchParams.get('email') ?? '' },
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  async function handleSignIn(data: SignInForm) {
    try {
      console.log(data);

      await authenticate({ email: data.email });

      const demoEmail = env.VITE_DEMO_EMAIL ?? 'johndoe@example.com';
      if (data.email === demoEmail) {
        setShowDemoLink(true);
      } else {
        setShowDemoLink(false);
      }

      toast.success('An email has been sent to you with the access link', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSignIn(data),
        },
      });
    } catch (error) {
      toast.error('An error occured, please try again later');
    }
  }

  return (
    <>
      <Helmet title="Sign in" />
      <div className="p-8">
        <Button variant={'ghost'} asChild className="absolute right-8 top-8">
          <Link to="/auth/signup">Create New Account</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Access Panel
            </h1>
            <p className="text-sm text-muted-foreground">
              Follow up your orders using partner panel
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Your email</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                const demoEmail = env.VITE_DEMO_EMAIL ?? 'johndoe@example.com';
                setValue('email', demoEmail, {
                  shouldDirty: true,
                  shouldTouch: true,
                });
              }}
            >
              Use demo credentials
            </Button>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Access panel
            </Button>
            {showDemoLink && (
              <div className="flex items-center justify-between gap-3 rounded-md border border-foreground/10 bg-muted px-4 py-3 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Demo:</span>{' '}
                  click the quick access link to open your session.
                </p>
                <Button
                  type="button"
                  variant="success"
                  size="sm"
                  className="shrink-0"
                  onClick={() => navigate('/')}
                >
                  Open access link
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
