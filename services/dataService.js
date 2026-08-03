import prisma from '@/lib/prisma';
import { parseTrendData } from '@/utils/helpers';

export async function getStations() {
  const stations = await prisma.monitoringStation.findMany({
    orderBy: { name: 'asc' },
  });
  return stations.map((s) => ({
    ...s,
    trend: parseTrendData(s.trendData),
  }));
}

export async function getStationById(id) {
  const station = await prisma.monitoringStation.findUnique({ where: { id } });
  if (!station) return null;
  return { ...station, trend: parseTrendData(station.trendData) };
}

export async function getAlerts(filter) {
  const where = filter && filter !== 'all' ? { level: filter } : {};
  return prisma.alert.findMany({
    where,
    orderBy: { timestamp: 'desc' },
  });
}

export async function getActiveAlertsCount() {
  return prisma.alert.count({
    where: { status: { not: 'selesai' } },
  });
}

export async function getUserReports(userId) {
  return prisma.report.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getReportById(id, userId) {
  return prisma.report.findFirst({
    where: { id, userId },
  });
}

export async function getRecentReports(limit = 5) {
  return prisma.report.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: { user: { select: { name: true } } },
  });
}

export async function getAppStats() {
  return prisma.appStat.findUnique({ where: { id: 1 } });
}

export async function getUserReportStats(userId) {
  const [total, verified, completed] = await Promise.all([
    prisma.report.count({ where: { userId } }),
    prisma.report.count({
      where: { userId, status: { in: ['diverifikasi', 'sedang_ditangani', 'selesai'] } },
    }),
    prisma.report.count({ where: { userId, status: 'selesai' } }),
  ]);
  return { total, verified, completed };
}

export async function getDashboardData(userId) {
  const [stations, alerts, recentReports, stats, userReports] = await Promise.all([
    getStations(),
    getAlerts(),
    getRecentReports(4),
    getAppStats(),
    getUserReports(userId),
  ]);

  const activeAlerts = alerts.filter((a) => a.status !== 'selesai');

  return {
    stations,
    alerts,
    activeAlerts,
    recentReports,
    stats,
    userReports,
  };
}
