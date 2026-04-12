import type { ReactNode } from 'react'

export function Card({
  children,
  className = '',
  title,
  id,
}: {
  children: ReactNode
  className?: string
  title?: string
  id?: string
}) {
  return (
    <section
      id={id}
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6 ${className}`}
    >
      {title ? <h2 className="mb-4 text-lg font-semibold text-jwan-ink">{title}</h2> : null}
      {children}
    </section>
  )
}
