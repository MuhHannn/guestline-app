require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute() {
  // Drop the table if it exists
  await sql`DROP TABLE IF EXISTS guestline`;

  // Create a custom function to generate a 10-character ID
  await sql`
    CREATE OR REPLACE FUNCTION generate_short_uuid() RETURNS TEXT AS $$
    BEGIN
      RETURN substring(uuid_generate_v4()::text, 1, 8);
    END;
    $$ LANGUAGE plpgsql;
  `;

  // Create the table with a custom 10-character ID
  const createTable = await sql`
    CREATE TABLE guestline (
        id VARCHAR(10) PRIMARY KEY DEFAULT generate_short_uuid(),
        nama VARCHAR(30) NOT NULL,
        email VARCHAR(50) NOT NULL,
        no_wa VARCHAR(20) NOT NULL,
        keperluan VARCHAR(250) NOT NULL,
        nomor_antrian SERIAL,
        tanggal INT,
        bulan INT,
        tahun INT
    )`;

  console.log(createTable);
}

execute();
