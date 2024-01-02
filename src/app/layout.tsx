import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import db from '@/lib/supabase/db'
import { ThemeProvider } from '@/lib/providers/next-theme-provider'
import { DM_Sans } from 'next/font/google'
import { twMerge } from 'tailwind-merge'

const dmsans = DM_Sans({ subsets: ['latin'] })
console.log(db)

export const metadata: Metadata = {
    title: 'Notter',
    description: 'Notter is a notion like platform providing collaborative workspaces and productivity tools.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={twMerge('bg-background', dmsans.className)}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
