import Link from 'next/link'

export default function MessengerButton() {
  return (
    <Link
      href="https://m.me/100064632913643"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on Messenger"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
      style={{ backgroundColor: '#0099FF' }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="28" height="28">
        <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.929 1.435 5.549 3.681 7.27V22l3.359-1.85c.897.25 1.847.385 2.96.385 5.523 0 10-4.144 10-9.242C22 6.145 17.523 2 12 2zm1.006 12.435l-2.547-2.72-4.97 2.72 5.467-5.802 2.61 2.72 4.908-2.72-5.468 5.802z"/>
      </svg>
    </Link>
  )
}
