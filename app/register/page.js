import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import RegisterForm from '@/components/auth/RegisterForm';

export default async function RegisterPage() {
  const user = await getSessionUser();
  if (user) redirect('/dashboard');

  return <RegisterForm />;
}
