import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { reportSchema } from '@/lib/validations';
import { generateReportNumber } from '@/utils/helpers';

export async function POST(request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = reportSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || 'Data tidak valid' },
        { status: 400 }
      );
    }

    const count = await prisma.report.count();
    const reportNumber = generateReportNumber(count);

    const report = await prisma.report.create({
      data: {
        reportNumber,
        userId: user.id,
        title: parsed.data.title,
        category: parsed.data.category,
        description: parsed.data.description,
        voiceNote: body.voiceNote || null,
        latitude: body.latitude || null,
        longitude: body.longitude || null,
        location: body.location || null,
        photoUrl: body.photoUrl || null,
        videoUrl: body.videoUrl || null,
        status: 'menunggu_verifikasi',
      },
    });

    return NextResponse.json({ reportNumber: report.reportNumber, id: report.id });
  } catch (error) {
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
