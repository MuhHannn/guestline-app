import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [dataDetail, setDetail] = useState(null);
  const [showAllData, setShowAllData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { idDetail } = router.query;

  useEffect(() => {
    fetch(`/api/get-all`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          setShowAllData(data.data);
        } else {
          setShowAllData([]);
        }
      })
      .catch((err) => {
        alert("Hubungi saya nek error");
        console.log("Gada Data jadinya error", err.message);
      });
  }, []);

  useEffect(() => {
    if (!idDetail) return;

    fetch(`/api/get-detail?id=${idDetail}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.data) {
          setDetail(null);
          alert("Data tidak ditemukan");
          router.push(`/`);
        } else {
          setDetail(data.data);
        }
      });
  }, [idDetail]);

  const handleShowDetail = (id) => {
    fetch(`/api/get-detail?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setDetail(data.data);
          setShowModal(true);
        } else {
          alert("Data tidak ditemukan");
        }
      })
      .catch((err) => {
        alert("Terjadi kesalahan");
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen p-5">
      <div className="flex justify-end gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-5"
          onClick={() => {
            router.push("/");
          }}
        >
          Buat Antrian
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-5"
          onClick={() => {
            router.push("/daftar-antrian");
          }}
        >
          Daftar Antrian
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-5"
          onClick={() => {
            router.push("/print-all");
          }}
        >
          Cetak Semua
        </button>
      </div>
      {showAllData.length === 0 && <p className="text-red-500">Data Kosong</p>}
      {showAllData.length > 0 && (
        <div className="w-full">
          <div className="flex gap-3 mb-5">
            <a
              href="print-all.js"
              download="print-all.js"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Download CSV
            </a>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                window.print();
              }}
            >
              Cetak Semua Data
            </button>
          </div>
          <table className="w-full bg-white">
            <thead className="bg-slate-200">
              <tr>
                <th className="py-2 px-4 border border-slate-300">ID</th>
                <th className="py-2 px-4 border border-slate-300">Nama</th>
                <th className="py-2 px-4 border border-slate-300">Email</th>
                <th className="py-2 px-4 border border-slate-300">
                  No Whatsapp
                </th>
                <th className="py-2 px-4 border border-slate-300">Keperluan</th>
                <th className="py-2 px-4 border border-slate-300">
                  Nomor Antrian
                </th>
                <th className="py-2 px-4 border border-slate-300">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {showAllData.map((data, index) => (
                <tr key={index} className="border border-slate-300 text-center">
                  <td className="py-2 px-4 border border-slate-300">
                    {data.id}
                  </td>
                  <td className="py-2 px-4 border border-slate-300">
                    {data.nama}
                  </td>
                  <td className="py-2 px-4 border border-slate-300">
                    {data.email}
                  </td>
                  <td className="py-2 px-4 border border-slate-300">
                    {data.no_wa}
                  </td>
                  <td className="py-2 px-4 border border-slate-300">
                    {data.keperluan}
                  </td>
                  <td className="py-2 px-4 text-center border border-slate-300">
                    {data.nomor_antrian}
                  </td>
                  <td className="py-2 px-4 text-center border border-slate-300">
                    {data.tanggal}/{data.bulan}/{data.tahun}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
