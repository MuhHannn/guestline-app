require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute(id, nama, email, no_wa, keperluan) {
  const result = await sql`
        UPDATE guestline SET nama = ${nama}, email = ${email}, no_wa = ${no_wa}, keperluan = ${keperluan} WHERE id = ${id}`;
  console.log("Berhasil mengupdate data", result);
  return result;
}

execute(
  1,
  "Muhammad Hanan",
  "hanan123@gmail.com",
  "+6283333333333",
  "Ketemu hanan"
);
