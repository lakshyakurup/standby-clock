import './globals.css'

export const metadata = {
  title: 'StandBy Clock',
  description: 'iOS StandBy Mode inspired clock web app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="oled-bg min-h-screen w-screen overflow-hidden">
        {children}
      </body>
    </html>
  )
}
