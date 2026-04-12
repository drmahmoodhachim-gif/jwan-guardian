export function LoadingSpinner({ label }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-jwan-gray">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-jwan-teal border-t-transparent"
        aria-hidden
      />
      {label ? <p className="text-sm">{label}</p> : null}
    </div>
  )
}
