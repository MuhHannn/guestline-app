import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

export default function Home() {
  const router = useRouter();
  const [showAllData, setShowAllData] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);

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
        console.error("Failed to fetch data:", err);
        alert("Failed to fetch data. Please try again.");
      });
  }, []);

  const handleShowDetail = (id) => {
    fetch(`/api/get-detail?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setSelectedDetail(data.data);
          setShowModal(true);
        } else {
          alert("Data not found");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch detail:", err);
        alert("Failed to fetch detail. Please try again.");
      });
  };

  const generateCSVData = () => {
    const csvData = [
      [
        "ID",
        "Nama",
        "Email",
        "No Whatsapp",
        "Keperluan",
        "Nomor Antrian",
        "Tanggal",
      ],
    ];

    showAllData.forEach((item) => {
      csvData.push([
        item.id,
        item.nama,
        item.email,
        item.no_wa,
        item.keperluan,
        item.nomor_antrian,
        `${item.tanggal}/${item.bulan}/${item.tahun}`,
      ]);
    });

    return csvData;
  };

  return (
    <div className="min-h-screen p-5">
      <div className="flex justify-end gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-5"
          onClick={() => router.push("/")}
        >
          Buat Antrian
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-5"
          onClick={() => router.push("/daftar-antrian")}
        >
          Daftar Antrian
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-5"
          onClick={() => router.push("/print-all")}
        >
          Cetak Semua
        </button>
      </div>

      {showAllData.length === 0 && <p className="text-red-500">Data Kosong</p>}

      {showAllData.length > 0 && (
        <div className="w-full">
          <div className="flex gap-3 mb-5">
            <CSVLink
              data={generateCSVData()}
              filename={"data.csv"}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Download CSV
            </CSVLink>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => window.print()}
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
                  <td className="py-2 px-4 text-center border border-slate-300">{`${data.tanggal}/${data.bulan}/${data.tahun}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
