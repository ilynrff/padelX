"use client";

import { useState } from "react";
import { AdminBooking, AdminBookingStatus, MOCK_ADMIN_BOOKINGS, MOCK_USERS } from "@/lib/adminData";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";

function AdminBadge({ status }: { status: AdminBookingStatus }) {
  if (status === "pending") return <span className="bg-orange-100 text-orange-700 font-bold px-2 py-1 rounded text-xs uppercase">Pending</span>;
  if (status === "pending_verification") return <span className="bg-amber-100 text-amber-700 font-bold px-2 py-1 rounded text-xs uppercase animate-pulse">Perlu Verifikasi</span>;
  if (status === "paid") return <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-1 rounded text-xs uppercase">Paid</span>;
  if (status === "expired" || status === "rejected" || status === "cancelled") return <span className="bg-red-100 text-red-700 font-bold px-2 py-1 rounded text-xs uppercase">{status}</span>;
  return null;
}

export function BookingManager() {
  const [bookings, setBookings] = useState<AdminBooking[]>(MOCK_ADMIN_BOOKINGS);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"desc" | "asc">("desc");
  
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean, type: 'Approve' | 'Reject', bookingId: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastQueue, setToastQueue] = useState<{msg: string, type: 'success'|'error'}[]>([]);

  const showToast = (msg: string, type: 'success'|'error') => {
    setToastQueue(prev => [...prev, {msg, type}]);
    setTimeout(() => setToastQueue(prev => prev.slice(1)), 3000);
  };

  const handleAction = async () => {
    if (!confirmModal) return;
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 1000));
    
    setBookings(prev => prev.map(b => {
      if (b.id === confirmModal.bookingId) {
        return { ...b, status: confirmModal.type === 'Approve' ? 'paid' : 'rejected' };
      }
      return b;
    }));
    
    setIsProcessing(false);
    showToast(`Booking ${confirmModal.bookingId} berhasil di-${confirmModal.type.toLowerCase()}`, "success");
    setConfirmModal(null);
    setSelectedBooking(null);
  };

  const getUserName = (userId: string) => {
    const user = MOCK_USERS.find(u => u.id === userId);
    return user ? user.name : "User tidak ditemukan";
  };

  let filtered = bookings.filter(b => {
    if (filter !== "all" && b.status !== filter) return false;
    const userName = getUserName(b.userId).toLowerCase();
    if (search && !b.id.toLowerCase().includes(search.toLowerCase()) && !userName.includes(search.toLowerCase())) return false;
    return true;
  });

  filtered = filtered.sort((a, b) => sort === "desc" ? b.createdAt.getTime() - a.createdAt.getTime() : a.createdAt.getTime() - b.createdAt.getTime());

  return (
    <div className="space-y-6">
      
      <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
        {toastQueue.map((t, idx) => (
          <Toast key={idx} isOpen={true} message={t.msg} type={t.type} onClose={() => {}} />
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <input 
           type="text" 
           placeholder="Cari ID atau Nama..." 
           className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
           value={search} onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
           <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold" value={filter} onChange={(e) => setFilter(e.target.value)}>
             <option value="all">Semua Status</option>
             <option value="pending_verification">Perlu Verifikasi</option>
             <option value="pending">Pending (Belum Bayar)</option>
             <option value="paid">Paid</option>
             <option value="expired">Expired</option>
           </select>
           <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold" value={sort} onChange={(e) => setSort(e.target.value as "asc" | "desc")}>
             <option value="desc">Terbaru</option>
             <option value="asc">Terlama</option>
           </select>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-4 px-6 text-xs font-bold text-slate-400 uppercase">ID Booking</th>
                <th className="p-4 px-6 text-xs font-bold text-slate-400 uppercase">Nama User</th>
                <th className="p-4 px-6 text-xs font-bold text-slate-400 uppercase">Tanggal</th>
                <th className="p-4 px-6 text-xs font-bold text-slate-400 uppercase">Status</th>
                <th className="p-4 px-6 text-xs font-bold text-slate-400 uppercase text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(b => {
                const uName = getUserName(b.userId);
                return (
                  <tr key={b.id} className={`hover:bg-slate-50 transition-colors cursor-pointer ${b.status === 'pending_verification' ? 'bg-amber-50/30' : ''}`} onClick={() => setSelectedBooking(b)}>
                    <td className="p-4 px-6 font-black text-sm">{b.id}</td>
                    <td className={`p-4 px-6 font-bold text-sm ${uName === "User tidak ditemukan" ? "text-red-500 italic" : "text-slate-700"}`}>{uName}</td>
                    <td className="p-4 px-6 font-medium text-sm text-slate-500">{b.date} • {b.time}</td>
                    <td className="p-4 px-6"><AdminBadge status={b.status} /></td>
                    <td className="p-4 px-6 text-right">
                      <button className="text-blue-600 font-bold text-sm hover:underline" onClick={(e) => { e.stopPropagation(); setSelectedBooking(b); }}>Detail</button>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                 <tr>
                   <td colSpan={5} className="text-center py-10 text-slate-400 font-bold">Tidak ada data booking.</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MDOAL */}
      {selectedBooking && (() => {
        const modalUName = getUserName(selectedBooking.userId);
        return (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedBooking(null)}>
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>
               {/* Info Section */}
               <div className="p-6 md:p-8 flex-1 bg-slate-50 border-r border-slate-100 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                     <div>
                       <h2 className="text-2xl font-black text-slate-900 mb-1">{selectedBooking.id}</h2>
                       <AdminBadge status={selectedBooking.status} />
                     </div>
                     <button onClick={() => setSelectedBooking(null)} className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 font-bold">X</button>
                  </div>
                  
                  <div className="space-y-4 mb-8 flex-1">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">User</p>
                      <p className={`font-bold ${modalUName === "User tidak ditemukan" ? "text-red-500 italic" : "text-slate-900"}`}>{modalUName}</p>
                    </div>
                    <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lapangan</p><p className="font-bold text-slate-900">{selectedBooking.court}</p></div>
                    <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Waktu Main</p><p className="font-bold text-slate-900">{selectedBooking.date} / {selectedBooking.time}</p></div>
                    <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Tagihan</p><p className="font-black text-blue-600 text-xl">Rp {selectedBooking.total.toLocaleString('id-ID')}</p></div>
                  </div>

                  {selectedBooking.status === "pending_verification" && (
                     <div className="flex gap-2">
                       <Button size="full" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setConfirmModal({isOpen: true, type: 'Approve', bookingId: selectedBooking.id})}>Approve</Button>
                       <Button size="full" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => setConfirmModal({isOpen: true, type: 'Reject', bookingId: selectedBooking.id})}>Reject</Button>
                     </div>
                  )}
               </div>

               {/* Bukti Transfer Section */}
               <div className="w-full md:w-80 bg-white p-6 flex flex-col items-center justify-center">
                  <p className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-widest w-full text-left">Bukti Pembayaran</p>
                  {selectedBooking.uploadedProofUrl ? (
                     <div 
                       className="w-full h-64 bg-slate-100 rounded-2xl overflow-hidden cursor-zoom-in border border-slate-200 relative group"
                       onClick={() => setZoomImage(selectedBooking.uploadedProofUrl!)}
                     >
                       <img src={selectedBooking.uploadedProofUrl} className="w-full h-full object-cover" alt="Proof" />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 text-white font-bold flex items-center justify-center transition-opacity">Zoom Image</div>
                     </div>
                  ) : (
                     <div className="w-full h-64 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center flex-col text-slate-400">
                       <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                       <p className="text-sm font-bold">Belum ada lampiran</p>
                     </div>
                  )}
               </div>
            </div>
          </div>
        )
      })()}

      {/* CONFIRM MODAL */}
      {confirmModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => !isProcessing && setConfirmModal(null)}>
           <div className="bg-white p-6 rounded-3xl max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
              <h3 className="text-xl font-black text-slate-900 mb-2">Konfirmasi {confirmModal.type}</h3>
              <p className="text-slate-500 text-sm font-medium mb-6">Apakah Anda yakin ingin melakukan {confirmModal.type.toLowerCase()} untuk booking ID: <span className="font-bold">{confirmModal.bookingId}</span>?</p>
              <div className="flex gap-2">
                 <Button variant="outline" className="w-full" disabled={isProcessing} onClick={() => setConfirmModal(null)}>Batal</Button>
                 <Button className={`w-full ${confirmModal.type === 'Reject' ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'}`} isLoading={isProcessing} onClick={handleAction}>
                    Ya, {confirmModal.type}
                 </Button>
              </div>
           </div>
        </div>
      )}

      {/* ZOOM IMAGE MODAL */}
      {zoomImage && (
         <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out" onClick={() => setZoomImage(null)}>
            <img src={zoomImage} alt="Zoom" className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" />
         </div>
      )}

    </div>
  );
}
