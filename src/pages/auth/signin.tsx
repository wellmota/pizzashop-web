import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Helmet } from 'react-helmet-async';
import { z } from 'zod';
import { toast } from 'sonner';
import { Link, useSearchParams } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '@/api/sign-in';

const signInForm = z.object({
  email: z.string().email(),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
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
          <Link to="/signup">Create New Account</Link>
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
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Access panel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
