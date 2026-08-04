import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { passwordSchema } from '@/lib/validations';
import { apiError } from '@/lib/apiError';

export async function PUT(request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = passwordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || 'Data tidak valid' },
        { status: 400 }
      );
    }

    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    const valid = await bcrypt.compare(parsed.data.currentPassword, dbUser.password);

    if (!valid) {
      return NextResponse.json({ error: 'Password saat ini salah' }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(parsed.data.newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError('profile/password', error);
  }
}
