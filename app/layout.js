import './globals.css';

export const metadata = {
  title: 'AquaVoice - Smart Water Quality Monitoring',
  description: 'Pantau kualitas air secara real-time dengan IoT, AI, dan pelaporan masyarakat.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
