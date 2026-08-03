// Database SOP Mitigasi Perairan Indonesia
export const MITIGATION_SOPS = [
  {
    id: 'sop-oil-spill',
    title: 'Penanganan Tumpahan Minyak & Oli (Oil Spill)',
    category: 'Pencemaran Kimia',
    severity: 'HIGH',
    badgeClass: 'badge-warning',
    icon: '🛢️',
    summary: 'Langkah taktis lokalisasi tumpahan bahan bakar dan isolasi zona nelayan.',
    steps: [
      { step: 1, title: 'Lokalisasi & Pemasangan Oil Boom', desc: 'Bentangkan pembatas terapung (Oil Boom) di sekeliling tumpahan untuk mencegah penyebaran ke zona tambak.' },
      { step: 2, title: 'Penyemprotan Dispersan / Absorben', desc: 'Gunakan bahan penyerap organik atau bio-dispersan yang ramah lingkungan pada lapisan permukaan minyak.' },
      { step: 3, title: 'Penutupan Sementara Inflow Air Tambak', desc: 'Tutup seluruh pintu air tambak udang/ikan di radius 2 km dari pusat tumpahan.' },
      { step: 4, title: 'Pelaporan Posko & Pengambilan Sampel', desc: 'Ambil sampel air 500ml untuk uji laboratorium dan koordinasikan dengan Dinas Kelautan setempat.' }
    ],
    emergencyContact: 'Posko Satpolairud: (021) 555-0192'
  },
  {
    id: 'sop-anoxia-fish',
    title: 'Penanganan Anoksia & Kematian Ikan Massal',
    category: 'Ekosistem Perairan',
    severity: 'CRITICAL',
    badgeClass: 'badge-danger',
    icon: '🐟',
    summary: 'Tindakan darurat mengatasi anjloknya kadar oksigen terlarut (DO < 3.0 mg/L).',
    steps: [
      { step: 1, title: 'Aktivasi Aerator Darurat & Kincir Air', desc: 'Nyalakan seluruh kincir air dan pompa suplai oksigen murni untuk meningkatkan kadar DO permukaan.' },
      { step: 2, title: 'Evakuasi Bangkai & Bangkai Organik', desc: 'Angkat bangkai ikan mati secara cepat agar tidak memicu pembusukan dan lonjakan amonia fatal.' },
      { step: 3, title: 'Penghentian Pemberian Pakan', desc: 'Hentikan pakan ikan/udang sementara (1-2 hari) untuk mengurangi sisa bahan organik dasar air.' },
      { step: 4, title: 'Pengapuran Sederhana (Sirkulasi pH)', desc: 'Tebarkan kapur pertanian (CaCO3) secukupnya untuk menstabilkan fluktuasi derajat keasaman.' }
    ],
    emergencyContact: 'Tim Respon Cepat Perikanan: 0811-2345-6789'
  },
  {
    id: 'sop-algae-bloom',
    title: 'Mitigasi Blooming Algae / Fenomena Red Tide',
    category: 'Biologi Laut',
    severity: 'HIGH',
    badgeClass: 'badge-warning',
    icon: '🦠',
    summary: 'Tindakan pencegahan keracunan biota laut akibat ledakan populasi mikroalga.',
    steps: [
      { step: 1, title: 'Pemindahan Keramba & Evakuasi Benih', desc: 'Geser keramba jaring apung ke area perairan terbuka yang memiliki sirkulasi arus deras.' },
      { step: 2, title: 'Penyaringan Fisik & Skimming', desc: 'Lakukan penyaringan busa merah di permukaan air menggunakan jaring halus mesh 200.' },
      { step: 3, title: 'Pencegahan Panen Dini Biota Terdampak', desc: 'Tunda pemanenan kerang atau ikan yang berada di area terinfeksi toxin mikroalga.' },
      { step: 4, title: 'Monitoring Kadar Phospat & Nitrat', desc: 'Uji parameter unsur hara berkala hingga konsentrasi populasi alga kembali normal.' }
    ],
    emergencyContact: 'Laboratorium Lingkungan Pesisir: (021) 777-4321'
  },
  {
    id: 'sop-turbidity-sediment',
    title: 'Penanganan Sedimentasi & Keruhan Tinggi',
    category: 'Fisik Air',
    severity: 'LOW',
    badgeClass: 'badge-safe',
    icon: '🌊',
    summary: 'Stabilisasi air dari ancaman lumpur pekat pasca banjir muara.',
    steps: [
      { step: 1, title: 'Pengendapan di Kolam Filter (Settling Pond)', desc: 'Dialirkan ke kolam pengendapan awal sebelum disalurkan ke area budidaya.' },
      { step: 2, title: 'Penggunaan Koagulan Alami (Tawas/Zeolit)', desc: 'Tebarkan zeolit atau tawas halus dosis rendah untuk mengikat padatan tersuspensi.' },
      { step: 3, title: 'Pembersihan Filter Fisik Inflow', desc: 'Bersihkan saringan jala pada saluran masuk air dari tumpukan lumpur pekat.' }
    ],
    emergencyContact: 'Posko Balai Wilayah Sungai: (021) 888-9900'
  }
];

// Generasi Rekomendasi Tindakan Otomatis Berdasarkan Parameter Air
export function evaluateWaterRecommendations(waterData) {
  const recommendations = [];

  if (waterData.do < 5.0) {
    recommendations.push({
      priority: 'HIGH',
      badgeClass: 'badge-danger',
      title: 'Darurat Oksigen (DO Rendah)',
      action: 'Nyalakan aerator tambahan dan kincir air segera. Terdeteksi bahaya anoksia bagi biota tambak.',
      targetParam: `DO Saat Ini: ${waterData.do} mg/L (Baku Mutu Min: 5.0)`
    });
  }

  if (waterData.ph < 6.5 || waterData.ph > 8.5) {
    recommendations.push({
      priority: 'MEDIUM',
      badgeClass: 'badge-warning',
      title: 'Anomali Derajat Keasaman (pH)',
      action: 'Lakukan penambahan kapur dolomit jika pH asam, atau pengenceran air jika terlalu basa.',
      targetParam: `pH Saat Ini: ${waterData.ph} (Baku Mutu: 6.5 - 8.5)`
    });
  }

  if (waterData.turbidity > 5.0) {
    recommendations.push({
      priority: 'MEDIUM',
      badgeClass: 'badge-warning',
      title: 'Keruhan Air Di Atas Batas Normal',
      action: 'Aktifkan kolam pengendapan (Settling Pond) dan kurangi pasokan pakan buatan.',
      targetParam: `Keruhan: ${waterData.turbidity} NTU (Baku Mutu Max: 5.0)`
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      priority: 'LOW',
      badgeClass: 'badge-safe',
      title: 'Kondisi Air Optimal & Stabil',
      action: 'Lanjutkan pemantauan rutin 24 jam. Tidak diperlukan tindakan mitigasi darurat saat ini.',
      targetParam: 'Seluruh 6 parameter berada dalam Baku Mutu Aman'
    });
  }

  return recommendations;
}