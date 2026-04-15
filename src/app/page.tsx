import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const COURTS_PREVIEW = [
  { id: 1, name: "Padel Court A (Premium)", location: "Kuningan, Jaksel", type: "Indoor", price: 150000, desc: "Lapangan panoramic glass dengan standar WPT, dilengkapi LED anti-silau.", image: "/images/court-premium.jpg" },
  { id: 2, name: "Indoor Panoramic Court", location: "Menteng, Jakpus", type: "Indoor", price: 200000, desc: "Full enclosed panoramic court, cocok untuk latihan intensif malam hari.", image: "/images/court-1.jpg" },
  { id: 3, name: "Outdoor Classic Court", location: "Kemang, Jaksel", type: "Outdoor", price: 120000, desc: "Lapangan outdoor dengan rumput sintetis premium dan sirkulasi udara alami.", image: "/images/court-3.jpg" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ===================== */}
      {/* HERO — Video Background */}
      {/* ===================== */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        
        {/* VIDEO BACKGROUND */}
        {/* Taruh file video bermain padel di public/videos/hero.mp4 */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          poster="/images/hero-padel.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay gradasi gelap di atas video */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-900/75 via-slate-900/55 to-slate-900/85"></div>

        {/* HERO CONTENT */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center py-24">
          
          {/* Badge — zoom from front */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/30 bg-blue-500/20 backdrop-blur-md text-sm text-blue-200 font-bold mb-8">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-400"></span>
            </span>
            PadelX is Live in Jakarta
          </div>
          
          {/* Baris 1: "Book your court." — zoom from front */}
          <div className="hero-line1 text-5xl md:text-8xl font-black tracking-tighter leading-[1.1] text-white drop-shadow-lg">
            Book your court.
          </div>

          {/* Baris 2: "Play your game." — muncul tipis ke tebal */}
          <div className="hero-line2 text-5xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-8 gradient-text drop-shadow-lg pb-2">
            Play your game.
          </div>
          
          {/* Deskripsi — muncul tipis ke tebal */}
          <p className="hero-subtitle text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Platform booking lapangan padel paling simpel. Cek jadwal, pilih jam, langsung main. Tanpa ribet, tanpa telepon.
          </p>

          {/* CTA — single prominent button */}
          <div className="hero-cta flex items-center justify-center w-full sm:w-auto">
            <Link href="/booking" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto text-lg font-bold text-white bg-blue-600 px-10 py-4 rounded-2xl transition-all duration-300 hover:bg-blue-500 hover:scale-105 hover:shadow-[0_12px_40px_-4px_rgba(59,130,246,0.7)] active:scale-95 shadow-[0_8px_30px_-4px_rgba(59,130,246,0.5)]">
                Book Now →
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator — hanya dot tanpa teks */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hero-cta">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2.5 bg-white/50 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>


      {/* ===================== */}
      {/* COURTS LIST */}
      {/* ===================== */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Fasilitas Premium</h2>
            <p className="text-slate-500 font-medium">Nikmati pengalaman bermain di lapangan padel berstandar internasional.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {COURTS_PREVIEW.map((court) => (
              <div key={court.id} className="group flex flex-col bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                {/* Image dengan zoom on hover */}
                <div className="h-52 w-full relative overflow-hidden">
                  <Image
                    src={court.image}
                    alt={court.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-700">
                    {court.type}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white text-xs font-bold bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg">
                    {court.location}
                  </div>
                </div>
                {/* Info */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{court.name}</h3>
                  <p className="text-slate-500 font-medium text-sm mb-6 flex-1 leading-relaxed">{court.desc}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <span className="text-lg font-extrabold text-slate-900">Rp {(court.price / 1000)}k <span className="text-sm text-slate-400 font-medium">/ jam</span></span>
                    <Link href="/booking">
                      <Button size="sm" variant="secondary">Cek Jadwal</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* HOW IT WORKS */}
      {/* ===================== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Cara Booking</h2>
          <p className="text-slate-500 font-medium mb-16">3 langkah mudah, langsung main.</p>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { step: "1", title: "Pilih Lapangan", desc: "Lihat fasilitas dan harga masing-masing court." },
              { step: "2", title: "Pilih Jadwal", desc: "Tentukan tanggal dan jam sesuai ketersediaan." },
              { step: "3", title: "Konfirmasi & Bayar", desc: "Selesaikan pembayaran, jadwalmu otomatis terkunci." },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-black text-2xl mb-5 shadow-inner">
                  {item.step}
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-200 bg-white mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
           <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              Padel<span className="text-blue-600">X</span>
           </span>
           <p className="text-slate-400 font-medium text-sm">© 2026 PadelX Booking System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
