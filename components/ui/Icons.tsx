// Server Component — no client APIs needed
import React from 'react'

interface IconProps {
  className?: string
  size?: number
  [key: string]: unknown
}

const Icon = ({ children, className = '', size = 24, ...props }: IconProps & { children: React.ReactNode }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="square"
    strokeLinejoin="miter"
    className={className}
    {...props}
  >
    {children}
  </svg>
)

export const Menu = (props: IconProps) => (<Icon {...props}><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="18" y2="18" /></Icon>)
export const X = (props: IconProps) => (<Icon {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Icon>)
export const ArrowRight = (props: IconProps) => (<Icon {...props}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></Icon>)
export const ArrowDown = (props: IconProps) => (<Icon {...props}><path d="M12 5v14" /><path d="m5 12 7 7 7-7" /></Icon>)
export const ArrowLeft = (props: IconProps) => (<Icon {...props}><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></Icon>)
export const Check = (props: IconProps) => (<Icon {...props}><polyline points="20 6 9 17 4 12" /></Icon>)
export const MapPin = (props: IconProps) => (<Icon {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Icon>)
export const Mail = (props: IconProps) => (<Icon {...props}><rect width="20" height="16" x="2" y="4" rx="0" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></Icon>)
export const ChevronDown = (props: IconProps) => (<Icon {...props}><path d="m6 9 6 6 6-6" /></Icon>)
export const Layout = (props: IconProps) => (<Icon {...props}><rect width="18" height="18" x="3" y="3" rx="0" ry="0" /><line x1="3" x2="21" y1="9" y2="9" /><line x1="9" x2="9" y1="21" y2="9" /></Icon>)
export const PenTool = (props: IconProps) => (<Icon {...props}><path d="m12 19 7-7 3 3-7 7-3-3z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="m2 2 7.586 7.586" /><circle cx="11" cy="11" r="2" /></Icon>)
export const FileText = (props: IconProps) => (<Icon {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></Icon>)
export const Hammer = (props: IconProps) => (<Icon {...props}><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9" /><path d="M17.64 15 22 10.64" /><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25V2.46V2a2 2 0 0 0-2-2H3v3.24c0 .85.33 1.66.93 2.26L5.18 6.76" /></Icon>)
export const Smile = (props: IconProps) => (<Icon {...props}><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" x2="9.01" y1="9" y2="9" /><line x1="15" x2="15.01" y1="9" y2="9" /></Icon>)
export const Instagram = (props: IconProps) => (<Icon {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></Icon>)
export const Home = (props: IconProps) => (<Icon {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></Icon>)
