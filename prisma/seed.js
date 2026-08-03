const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const stations = [
  {
    id: 'STN-01',
    name: 'Sungai Cikapundung - Dago',
    river: 'Cikapundung',
    lat: -6.8619,
    lng: 107.6136,
    status: 'safe',
    wqi: 92,
    lastUpdated: new Date('2026-08-03T07:45:00+07:00'),
    ph: 7.1,
    temperature: 24.8,
    dissolvedOxygen: 6.8,
    turbidity: 12.4,
    trendData: JSON.stringify([
      { time: '06:00', ph: 7.0, temperature: 24.2, dissolvedOxygen: 6.9, turbidity: 10.1 },
      { time: '09:00', ph: 7.1, temperature: 24.5, dissolvedOxygen: 6.8, turbidity: 11.6 },
      { time: '12:00', ph: 7.2, temperature: 24.9, dissolvedOxygen: 6.7, turbidity: 13.0 },
      { time: '15:00', ph: 7.1, temperature: 25.2, dissolvedOxygen: 6.8, turbidity: 12.9 },
      { time: '18:00', ph: 7.0, temperature: 25.0, dissolvedOxygen: 6.9, turbidity: 12.4 },
      { time: '21:00', ph: 7.1, temperature: 24.7, dissolvedOxygen: 6.8, turbidity: 12.4 },
    ]),
  },
  {
    id: 'STN-02',
    name: 'Sungai Citarum - Batujajar',
    river: 'Citarum',
    lat: -6.8419,
    lng: 107.5215,
    status: 'critical',
    wqi: 28,
    lastUpdated: new Date('2026-08-03T07:40:00+07:00'),
    ph: 5.4,
    temperature: 27.9,
    dissolvedOxygen: 2.9,
    turbidity: 88.7,
    trendData: JSON.stringify([
      { time: '06:00', ph: 5.9, temperature: 27.3, dissolvedOxygen: 3.6, turbidity: 70.2 },
      { time: '09:00', ph: 5.7, temperature: 27.6, dissolvedOxygen: 3.3, turbidity: 76.5 },
      { time: '12:00', ph: 5.6, temperature: 28.0, dissolvedOxygen: 3.1, turbidity: 82.1 },
      { time: '15:00', ph: 5.5, temperature: 28.3, dissolvedOxygen: 3.0, turbidity: 85.4 },
      { time: '18:00', ph: 5.4, temperature: 28.1, dissolvedOxygen: 2.9, turbidity: 88.7 },
      { time: '21:00', ph: 5.4, temperature: 27.8, dissolvedOxygen: 2.8, turbidity: 89.0 },
    ]),
  },
  {
    id: 'STN-03',
    name: 'Waduk Saguling',
    river: 'Citarum (waduk)',
    lat: -6.8871,
    lng: 107.4092,
    status: 'warning',
    wqi: 58,
    lastUpdated: new Date('2026-08-03T07:38:00+07:00'),
    ph: 6.4,
    temperature: 26.5,
    dissolvedOxygen: 4.5,
    turbidity: 42.3,
    trendData: JSON.stringify([
      { time: '06:00', ph: 6.6, temperature: 25.9, dissolvedOxygen: 4.9, turbidity: 35.0 },
      { time: '09:00', ph: 6.5, temperature: 26.2, dissolvedOxygen: 4.8, turbidity: 38.4 },
      { time: '12:00', ph: 6.5, temperature: 26.6, dissolvedOxygen: 4.6, turbidity: 40.1 },
      { time: '15:00', ph: 6.4, temperature: 26.9, dissolvedOxygen: 4.5, turbidity: 41.6 },
      { time: '18:00', ph: 6.4, temperature: 26.7, dissolvedOxygen: 4.5, turbidity: 42.3 },
      { time: '21:00', ph: 6.3, temperature: 26.4, dissolvedOxygen: 4.4, turbidity: 43.0 },
    ]),
  },
  {
    id: 'STN-04',
    name: 'Sungai Cikapundung - Bojongsoang',
    river: 'Cikapundung',
    lat: -6.9721,
    lng: 107.6389,
    status: 'safe',
    wqi: 95,
    lastUpdated: new Date('2026-08-03T07:42:00+07:00'),
    ph: 7.3,
    temperature: 25.1,
    dissolvedOxygen: 7.1,
    turbidity: 9.8,
    trendData: JSON.stringify([
      { time: '06:00', ph: 7.2, temperature: 24.5, dissolvedOxygen: 7.2, turbidity: 9.0 },
      { time: '09:00', ph: 7.3, temperature: 24.8, dissolvedOxygen: 7.1, turbidity: 9.4 },
      { time: '12:00', ph: 7.3, temperature: 25.2, dissolvedOxygen: 7.0, turbidity: 9.9 },
      { time: '15:00', ph: 7.3, temperature: 25.5, dissolvedOxygen: 7.1, turbidity: 9.9 },
      { time: '18:00', ph: 7.3, temperature: 25.3, dissolvedOxygen: 7.1, turbidity: 9.8 },
      { time: '21:00', ph: 7.2, temperature: 25.0, dissolvedOxygen: 7.2, turbidity: 9.7 },
    ]),
  },
  {
    id: 'STN-05',
    name: 'Situ Cileunca',
    river: 'Danau/Situ',
    lat: -7.1591,
    lng: 107.5342,
    status: 'warning',
    wqi: 62,
    lastUpdated: new Date('2026-08-03T07:36:00+07:00'),
    ph: 6.7,
    temperature: 22.4,
    dissolvedOxygen: 5.2,
    turbidity: 30.5,
    trendData: JSON.stringify([
      { time: '06:00', ph: 6.8, temperature: 21.8, dissolvedOxygen: 5.5, turbidity: 27.1 },
      { time: '09:00', ph: 6.8, temperature: 22.1, dissolvedOxygen: 5.4, turbidity: 28.4 },
      { time: '12:00', ph: 6.7, temperature: 22.5, dissolvedOxygen: 5.3, turbidity: 29.6 },
      { time: '15:00', ph: 6.7, temperature: 22.8, dissolvedOxygen: 5.2, turbidity: 30.2 },
      { time: '18:00', ph: 6.7, temperature: 22.6, dissolvedOxygen: 5.2, turbidity: 30.5 },
      { time: '21:00', ph: 6.6, temperature: 22.3, dissolvedOxygen: 5.1, turbidity: 31.0 },
    ]),
  },
];

const sensors = [
  { id: 'SNR-001', stationId: 'STN-01', type: 'pH Sensor', status: 'active' },
  { id: 'SNR-002', stationId: 'STN-01', type: 'DO Sensor', status: 'active' },
  { id: 'SNR-003', stationId: 'STN-02', type: 'pH Sensor', status: 'active' },
  { id: 'SNR-004', stationId: 'STN-02', type: 'Turbidity Sensor', status: 'active' },
  { id: 'SNR-005', stationId: 'STN-03', type: 'Temperature Sensor', status: 'active' },
  { id: 'SNR-006', stationId: 'STN-03', type: 'DO Sensor', status: 'active' },
  { id: 'SNR-007', stationId: 'STN-04', type: 'Multi-Parameter', status: 'active' },
  { id: 'SNR-008', stationId: 'STN-05', type: 'pH Sensor', status: 'active' },
];

const alerts = [
  {
    id: 'ALR-1042',
    stationId: 'STN-02',
    stationName: 'Sungai Citarum - Batujajar',
    level: 'critical',
    parameter: 'Oksigen Terlarut',
    message: 'Oksigen terlarut turun ke 2.9 mg/L, jauh di bawah ambang aman 5 mg/L. Indikasi kuat pencemaran organik berat.',
    timestamp: new Date('2026-08-03T07:40:00+07:00'),
    status: 'belum_ditangani',
  },
  {
    id: 'ALR-1041',
    stationId: 'STN-02',
    stationName: 'Sungai Citarum - Batujajar',
    level: 'critical',
    parameter: 'pH',
    message: 'pH air turun ke 5.4, terindikasi limbah asam dari kawasan industri di hulu.',
    timestamp: new Date('2026-08-03T06:15:00+07:00'),
    status: 'sedang_ditangani',
  },
  {
    id: 'ALR-1039',
    stationId: 'STN-03',
    stationName: 'Waduk Saguling',
    level: 'warning',
    parameter: 'Kekeruhan',
    message: 'Kekeruhan naik ke 42.3 NTU akibat sedimentasi pasca hujan deras semalam.',
    timestamp: new Date('2026-08-03T05:50:00+07:00'),
    status: 'belum_ditangani',
  },
  {
    id: 'ALR-1035',
    stationId: 'STN-05',
    stationName: 'Situ Cileunca',
    level: 'warning',
    parameter: 'Amonia',
    message: 'Kadar amonia mendekati ambang batas, kemungkinan dari limbah pertanian sekitar situ.',
    timestamp: new Date('2026-08-02T19:20:00+07:00'),
    status: 'terpantau',
  },
  {
    id: 'ALR-1028',
    stationId: 'STN-01',
    stationName: 'Sungai Cikapundung - Dago',
    level: 'safe',
    parameter: 'Suhu',
    message: 'Suhu air sedikit meningkat mengikuti cuaca cerah, masih dalam rentang aman.',
    timestamp: new Date('2026-08-02T13:05:00+07:00'),
    status: 'selesai',
  },
];

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: { email: 'user@aquavoice.id' },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await prisma.user.create({
      data: {
        name: 'Budi Santoso',
        email: 'user@aquavoice.id',
        phone: '081234567890',
        password: hashedPassword,
        avatar: null,
      },
    });

    const reports = [
      {
        reportNumber: 'AV-2026-00001',
        userId: user.id,
        title: 'Air Sungai Berwarna Hitam',
        category: 'Limbah Industri',
        description: 'Air sungai berwarna kehitaman dan berbau menyengat sejak pagi hari, diduga dari pabrik tekstil di hulu.',
        location: 'Sungai Citarum - Batujajar',
        latitude: -6.8419,
        longitude: 107.5215,
        status: 'diverifikasi',
        createdAt: new Date('2026-08-03T06:30:00+07:00'),
      },
      {
        reportNumber: 'AV-2026-00002',
        userId: user.id,
        title: 'Sampah Menyumbat Aliran Sungai',
        category: 'Sampah',
        description: 'Tumpukan sampah plastik menyumbat aliran di bawah jembatan dekat kampus.',
        location: 'Sungai Cikapundung - Dago',
        latitude: -6.8619,
        longitude: 107.6136,
        status: 'sedang_ditangani',
        createdAt: new Date('2026-08-02T16:10:00+07:00'),
      },
      {
        reportNumber: 'AV-2026-00003',
        userId: user.id,
        title: 'Air Waduk Lebih Keruh',
        category: 'Perubahan Warna Air',
        description: 'Air waduk terlihat lebih keruh dari biasanya setelah hujan deras dua hari terakhir.',
        location: 'Waduk Saguling',
        latitude: -6.8871,
        longitude: 107.4092,
        status: 'sedang_ditangani',
        createdAt: new Date('2026-08-02T09:45:00+07:00'),
      },
      {
        reportNumber: 'AV-2026-00004',
        userId: user.id,
        title: 'Bau Amis di Area Situ',
        category: 'Bau Tidak Sedap',
        description: 'Muncul bau amis yang cukup kuat di area dekat dermaga wisata.',
        location: 'Situ Cileunca',
        latitude: -7.1591,
        longitude: 107.5342,
        status: 'selesai',
        createdAt: new Date('2026-08-01T14:20:00+07:00'),
      },
    ];

    for (const report of reports) {
      await prisma.report.create({ data: report });
    }
  }

  for (const station of stations) {
    await prisma.monitoringStation.upsert({
      where: { id: station.id },
      update: station,
      create: station,
    });
  }

  for (const sensor of sensors) {
    await prisma.sensor.upsert({
      where: { id: sensor.id },
      update: sensor,
      create: sensor,
    });
  }

  for (const alert of alerts) {
    await prisma.alert.upsert({
      where: { id: alert.id },
      update: alert,
      create: alert,
    });
  }

  await prisma.appStat.upsert({
    where: { id: 1 },
    update: {
      monitoringStations: 5,
      activeSensors: 48,
      communityReports: 231,
      activeUsers: 1240,
    },
    create: {
      id: 1,
      monitoringStations: 5,
      activeSensors: 48,
      communityReports: 231,
      activeUsers: 1240,
    },
  });

  console.log('Seed completed successfully!');
  console.log('Demo user: user@aquavoice.id / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
