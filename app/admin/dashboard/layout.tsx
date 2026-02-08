import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Redirect to login if not authenticated or not admin
  if (!session || session.user?.role !== 'admin') {
    redirect('/admin/login');
  }

  return <>{children}</>;
}
