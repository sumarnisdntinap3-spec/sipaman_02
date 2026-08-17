import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Printer } from 'lucide-react';

export const PrintDispositionModal: React.FC = () => {
  const { selectedReportForPrint, setSelectedReportForPrint, kabidConfig } = useApp();

  if (!selectedReportForPrint) return null;
  const r = selectedReportForPrint;
  const disp = r.disposisiDinas;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full p-6 animate-in fade-in zoom-in-95 my-6 print:m-0 print:p-0 print:shadow-none print:border-none">
        
        {/* Modal Top Bar (Hidden on Print) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 print:hidden">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Pratinjau Surat Disposisi Penanganan Laporan Resmi
            </h3>
            <p className="text-xs text-slate-500">
              Format KOP Resmi Dinas Dikpora Kabupaten Magetan
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={() => setSelectedReportForPrint(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Container */}
        <div className="mt-4 p-8 bg-white border border-slate-300 rounded-xl font-serif text-slate-900 space-y-6 print:border-none print:p-0">
          
          {/* Official Kop Surat Dinas */}
          <div className="text-center border-b-4 border-double border-black pb-4 space-y-1">
            <h2 className="text-base font-bold uppercase tracking-wide text-black">
              PEMERINTAH KABUPATEN MAGETAN
            </h2>
            <h1 className="text-lg font-black uppercase text-black tracking-wider">
              DINAS PENDIDIKAN, PEMUDA, DAN OLAHRAGA
            </h1>
            <p className="text-xs font-sans text-slate-800 font-medium">
              BIDANG PENDIDIKAN DASAR (DIKDAS)
            </p>
            <p className="text-[11px] font-sans text-slate-600 italic">
              Jl. Basuki Rahmat No. 1, Magetan, Jawa Timur 63314 | Telp: (0351) 895012 | Email: {kabidConfig.emailOfficial}
            </p>
          </div>

          {/* Title Document */}
          <div className="text-center space-y-1">
            <h3 className="text-sm font-bold uppercase underline tracking-wider font-sans">
              LEMBAR DISPOSISI PENANGANAN MASALAH ANAK (SI PAMAN)
            </h3>
            <p className="text-xs font-mono font-semibold text-slate-700">
              Nomor Disposisi: {disp?.nomorSuratDisposisi || '421/108/403.101/2026'}
            </p>
          </div>

          {/* Table Data Incident */}
          <div className="font-sans text-xs space-y-3">
            <table className="w-full border-collapse border border-slate-400 text-left">
              <tbody>
                <tr className="border-b border-slate-300 bg-slate-50">
                  <td className="p-2.5 font-bold w-1/3 border-r border-slate-300">
                    Nomor & Tgl Laporan
                  </td>
                  <td className="p-2.5 font-mono">{r.nomorLaporan} ({r.tglDilaporkan})</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2.5 font-bold border-r border-slate-300">Sekolah Pelapor</td>
                  <td className="p-2.5">{r.namaSekolah} (Kecamatan {r.kecamatan})</td>
                </tr>
                <tr className="border-b border-slate-300 bg-slate-50">
                  <td className="p-2.5 font-bold border-r border-slate-300">
                    Identitas Anak / Siswa
                  </td>
                  <td className="p-2.5 font-bold">
                    Inisial: {r.siswa.inisialNama} | Kelas: {r.siswa.kelas} | Usia: {r.siswa.usia} th ({r.siswa.jenisKelamin})
                  </td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2.5 font-bold border-r border-slate-300">Kategori Permasalahan</td>
                  <td className="p-2.5 font-bold text-slate-900">{r.kategori}</td>
                </tr>
                <tr className="border-b border-slate-300 bg-slate-50">
                  <td className="p-2.5 font-bold border-r border-slate-300">Tingkat Urgensi</td>
                  <td className="p-2.5 font-bold uppercase text-red-700">{r.urgensi}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold border-r border-slate-300">Uraian Ringkas Kejadian</td>
                  <td className="p-2.5 italic">"{r.deskripsiKronologi}"</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Disposisi Kabid Section */}
          <div className="border-2 border-slate-800 p-4 rounded-lg bg-slate-50 font-sans space-y-3">
            <h4 className="text-xs font-bold uppercase underline tracking-wider text-slate-900">
              PETUNJUK / ARAHAN KEPALA BIDANG PENDIDIKAN DASAR:
            </h4>
            <p className="text-xs text-slate-900 leading-relaxed font-semibold italic">
              "{disp?.arahanKabid || 'Segera lakukan verifikasi dan penanganan terpadu bersama tim lintas instansi. Laporkan perkembangan secara berkala.'}"
            </p>

            <div className="pt-2 border-t border-slate-300 text-xs">
              <span className="font-bold block">Tim Terpadu Ditugaskan:</span>
              <ul className="list-disc pl-5 mt-1 space-y-0.5">
                {disp?.timTerpaduAssigned.map((team, idx) => (
                  <li key={idx} className="font-semibold">{team}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Signature Block Kabid */}
          <div className="font-sans text-xs pt-6 flex justify-end">
            <div className="text-center w-64 space-y-12">
              <div>
                <p>Magetan, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p className="font-bold">{kabidConfig.jabatan}</p>
                <p className="font-bold">Dinas Dikpora Kabupaten Magetan</p>
              </div>

              <div className="space-y-0.5">
                <p className="font-bold underline text-sm">{kabidConfig.namaKabid}</p>
                <p className="font-mono text-slate-700">NIP. {kabidConfig.nipKabid}</p>
              </div>
            </div>
          </div>

          {/* Footer Archival Note */}
          <div className="pt-6 border-t border-slate-300 text-[10px] font-sans text-slate-500 text-center italic">
            Dokumen ini dicetak secara otomatis melalui Aplikasi Si Paman Dinas Dikpora Kab. Magetan sebagai bukti fisik arsip digital daerah.
          </div>

        </div>

        {/* Modal Footer (Hidden on Print) */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end print:hidden">
          <button
            onClick={() => setSelectedReportForPrint(null)}
            className="px-4 py-2 rounded-lg bg-slate-800 text-white text-xs font-semibold"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
