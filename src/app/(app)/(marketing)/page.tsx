import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center ">
      <Link
        className="hover:cursor-pointer hover:underline hover:text-blue-500 text-neutral-500"
        href="/dashboard"
      >
        Go to Dashboard
      </Link>
    </div>
  )
}
