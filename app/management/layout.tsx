import AdminSidebar from '@/components/management/AdminSidebar'
import AdminTopbar from '@/components/management/AdminTopbar'

export default function ManagementLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-cream-100">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminTopbar />
        <main id="main-content" aria-label="Admin content" className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
