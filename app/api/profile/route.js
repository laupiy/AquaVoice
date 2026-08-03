import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { profileSchema } from '@/lib/validations';

export async function PUT(request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = profileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || 'Data tidak valid' },
        { status: 400 }
      );
    }

    const emailTaken = await prisma.user.findFirst({
      where: {
        email: parsed.data.email,
        id: { not: user.id },
      },
    });

    if (emailTaken) {
      return NextResponse.json({ error: 'Email sudah digunakan' }, { status: 409 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: parsed.data,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
