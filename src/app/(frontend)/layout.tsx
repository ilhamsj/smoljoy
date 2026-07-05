import React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './styles.css'

export const metadata = {
  description:
    'Smoljoy mempertemukan calon pemilik dengan breeder kucing & anjing tepercaya di seluruh Indonesia.',
  title: 'Smoljoy — Adopsi Pet dari Breeder Tepercaya',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="id">
      <body className="bg-white text-gray-900">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
