/**
 * Dummy AI Engine untuk menganalisis transkrip ucapan warga/nelayan
 * @param {string} transcript - Teks hasil transkrip rekaman suara
 */
export function generateAiSummary(transcript) {
  if (!transcript || transcript.trim().length === 0) {
    return null;
  }

  const text = transcript.toLowerCase();

  // Keyword Detection Logic
  let possibleIssue = 'Anomali Perairan Umum';
  let severity = 'MEDIUM'; // LOW, MEDIUM, HIGH, CRITICAL
  let category = 'Kualitas Air';
  let confidenceScore = 88;

  if (text.includes('minyak') || text.includes('oli') || text.includes('hitam berbau')) {
    possibleIssue = 'Dugaan Tumpahan Minyak / Limbah B3';
    severity = 'HIGH';
    category = 'Pencemaran Kimia';
    confidenceScore = 94;
  } else if (text.includes('ikan mati') || text.includes('bangkai') || text.includes('mengapung')) {
    possibleIssue = 'Indikasi Anoksia / Kematian Ikan Massal';
    severity = 'CRITICAL';
    category = 'Ekosistem Laut';
    confidenceScore = 96;
  } else if (text.includes('keruh') || text.includes('cokelat') || text.includes('lumpur')) {
    possibleIssue = 'Peningkatan Sedimentasi & Keruhan Tinggi';
    severity = 'MEDIUM';
    category = 'Fisik Air';
    confidenceScore = 85;
  } else if (text.includes('merah') || text.includes('alga') || text.includes('berbusa')) {
    possibleIssue = 'Potensi Red Tide / Blooming Algae';
    severity = 'HIGH';
    category = 'Biologi Laut';
    confidenceScore = 91;
  } else if (text.includes('sampah') || text.includes('plastik')) {
    possibleIssue = 'Penumpukan Sampah Anorganik Pesisir';
    severity = 'LOW';
    category = 'Pencemaran Padat';
    confidenceScore = 90;
  }

  const severityBadges = {
    LOW: { label: 'Rendah (Low)', class: 'badge-safe' },
    MEDIUM: { label: 'Sedang (Medium)', class: 'badge-warning' },
    HIGH: { label: 'Tinggi (High)', class: 'badge-warning' },
    CRITICAL: { label: 'Kritis (Critical)', class: 'badge-danger' },
  };

  return {
    possibleIssue,
    severity,
    severityInfo: severityBadges[severity],
    category,
    confidenceScore,
    suggestedAction:
      severity === 'CRITICAL' || severity === 'HIGH'
        ? 'Dibutuhkan verifikasi lapangan & isolasi area segera oleh tim tanggap darurat.'
        : 'Laporan dicatat untuk inspeksi rutin tim dinas lingkungan.',
  };
}