// Parameter baku mutu air laut/pesisir Indonesia (KepMen LH No. 51 Tahun 2004)
export const PARAMETER_THRESHOLD = {
  ph: { min: 6.5, max: 8.5, unit: 'pH', name: 'Derajat Keasaman (pH)' },
  temperature: { min: 28, max: 32, unit: '°C', name: 'Suhu Air' },
  do: { min: 5.0, max: 10.0, unit: 'mg/L', name: 'Oksigen Terlarut (DO)' },
  turbidity: { min: 0, max: 5, unit: 'NTU', name: 'Kecerahan / Keruhan' },
  salinity: { min: 30, max: 34, unit: 'psu', name: 'Salinitas' },
  conductivity: { min: 45, max: 55, unit: 'mS/cm', name: 'Konduktivitas Listrik' },
};

// Hitung Skor WQI (Water Quality Index) 0 - 100
export function calculateWQI(data) {
  let score = 100;

  // Evaluasi pH (bobot 20)
  if (data.ph < 6.5 || data.ph > 8.5) score -= 20;
  else if (data.ph < 7.0 || data.ph > 8.2) score -= 8;

  // Evaluasi DO / Dissolved Oxygen (bobot 30 - Paling Kritis)
  if (data.do < 3.0) score -= 30; // Critical Anoxia
  else if (data.do < 5.0) score -= 15;

  // Evaluasi Keruhan / Turbidity (bobot 20)
  if (data.turbidity > 10) score -= 20;
  else if (data.turbidity > 5) score -= 10;

  // Evaluasi Suhu (bobot 10)
  if (data.temperature > 34 || data.temperature < 25) score -= 10;

  // Evaluasi Salinitas & Konduktivitas (bobot 20)
  if (data.salinity < 25 || data.salinity > 38) score -= 10;
  if (data.conductivity < 40 || data.conductivity > 60) score -= 10;

  const finalScore = Math.max(0, Math.min(100, score));

  let category = 'Sangat Baik';
  let badgeClass = 'badge-safe';
  let riskLevel = 'SAFE';

  if (finalScore < 50) {
    category = 'Bahaya / Tercemar';
    badgeClass = 'badge-danger';
    riskLevel = 'DANGER';
  } else if (finalScore < 75) {
    category = 'Waspada / Tereduksi';
    badgeClass = 'badge-warning';
    riskLevel = 'WARNING';
  }

  return { score: finalScore, category, badgeClass, riskLevel };
}

// Menghitung Kategori Risiko Matriks 5x5
export function getRiskMatrixCategory(probability, impact) {
  const riskScore = probability * impact; // 1 - 25

  if (riskScore <= 4) {
    return { level: 'Rendah (Low)', color: 'emerald', riskKey: 'SAFE', bg: 'bg-emerald-500' };
  } else if (riskScore <= 9) {
    return { level: 'Sedang (Medium)', color: 'amber', riskKey: 'WARNING', bg: 'bg-amber-500' };
  } else if (riskScore <= 16) {
    return { level: 'Tinggi (High)', color: 'orange', riskKey: 'WARNING', bg: 'bg-orange-500' };
  } else {
    return { level: 'Kritis (Critical)', color: 'rose', riskKey: 'DANGER', bg: 'bg-rose-600' };
  }
}