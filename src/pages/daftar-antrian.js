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
          <table className="w-full bg-white border-2-b">
            <thead>
              <tr>
                <th className="py-2 px-4 border border-slate-600">
                  Nama Lengkap
                </th>
                <th className="py-2 px-4 border border-slate-600">Keperluan</th>
                <th className="py-2 px-4 border border-slate-600">
                  Nomor Antrian
                </th>
                <th className="py-2 px-4 border border-slate-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {showAllData.map((data, index) => (
                <tr key={index} className="border border-slate-600">
                  <td className="py-2 px-4 border border-slate-600">
                    {data.nama}
                  </td>
                  <td className="py-2 px-4 border border-slate-600">
                    {data.keperluan}
                  </td>
                  <td className="py-2 px-4 text-center border border-slate-600">
                    {data.nomor_antrian}
                  </td>
                  <td className="py-2 px-4 text-center border border-slate-600">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded "
                      onClick={() => handleShowDetail(data.id)}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && dataDetail && (
        <div
          id="myModal"
          className="fixed z-10 py-28 px-72 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-40"
        >
          <div className="bg-white m-auto py-5 px-14 border border-gray-400 w-4/5">
            <h1 className="text-center font-bold text-2xl mb-5">
              Detail Antrian
            </h1>
            <div className="flex justify-between items-center gap-3 my-2">
              <p className="w-full">ID Tamu</p>
              <p className="text-center">:</p>
              <p className="w-full">{dataDetail.id}</p>
            </div>
            <div className="flex justify-between items-center gap-3 my-2">
              <p className="w-full">Nama</p>
              <p className="text-center">:</p>
              <p className="w-full">{dataDetail.nama}</p>
            </div>
            <div className="flex justify-between items-center gap-3 my-2">
              <p className="w-full">Email</p>
              <p className="text-center">:</p>
              <p className="w-full">{dataDetail.email}</p>
            </div>
            <div className="flex justify-between items-center gap-3 my-2">
              <p className="w-full">No Whatsapp</p>
              <p className="text-center">:</p>
              <p className="w-full">{dataDetail.no_wa}</p>
            </div>
            <div className="flex justify-between items-center gap-3 my-2">
              <p className="w-full">Keperluan</p>
              <p className="text-center">:</p>
              <p className="w-full">{dataDetail.keperluan}</p>
            </div>
            <div className="flex justify-between items-center gap-3 my-2">
              <p className="w-full">Nomor Antrian</p>
              <p className="text-center">:</p>
              <p className="w-full">{dataDetail.nomor_antrian}</p>
            </div>
            <div className="flex justify-between items-center gap-3 my-2">
              <p className="w-full">Tanggal</p>
              <p className="text-center">:</p>
              <p className="w-full">
                {dataDetail.tanggal}/{dataDetail.bulan}/{dataDetail.tahun}
              </p>
            </div>
            <div className="flex justify-center items-center gap-3 mt-5">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => {
                  window.print();
                }}
              >
                Cetak
              </button>
              <button
                className="bg-slate-200 px-3 py-1 rounded"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
