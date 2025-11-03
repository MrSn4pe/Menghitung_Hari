import React, { useState } from "react";
import { CalendarClock, Clock, RefreshCcw, Calculator } from "lucide-react";
import "./App.css";

function App() {
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [unit, setUnit] = useState("hari");
  const [result, setResult] = useState("");

  const calculate = () => {
    if (!startDate || !endDate) {
      setResult("Silakan isi tanggal awal dan akhir terlebih dahulu.");
      return;
    }

    const start = new Date(`${startDate}T${startTime || "00:00"}`);
    const end = new Date(`${endDate}T${endTime || "00:00"}`);

    const diffMs = Math.abs(end - start);
    const diffSeconds = diffMs / 1000;
    const diffMinutes = diffSeconds / 60;
    const diffHours = diffMinutes / 60;
    const diffDays = diffHours / 24;

    let output = "";

    switch (unit) {
      case "detik":
        output = `${diffSeconds.toFixed(0)} detik`;
        break;
      case "menit":
        output = `${diffMinutes.toFixed(2)} menit`;
        break;
      case "jam":
        output = `${diffHours.toFixed(2)} jam`;
        break;
      case "hari":
        output = `${diffDays.toFixed(2)} hari`;
        break;
      case "minggu":
        output = `${(diffDays / 7).toFixed(2)} minggu`;
        break;
      case "bulan":
        output = `${(diffDays / 30.44).toFixed(2)} bulan`;
        break;
      case "tahun":
        output = `${(diffDays / 365.25).toFixed(2)} tahun`;
        break;
      default:
        output = `${diffDays.toFixed(2)} hari`;
    }

    setResult(
      `Selisih antara ${start.toLocaleDateString()} dan ${end.toLocaleDateString()} adalah ${output}.`
    );
  };

  const swapDates = () => {
    const tempDate = startDate;
    const tempTime = startTime;
    setStartDate(endDate);
    setStartTime(endTime);
    setEndDate(tempDate);
    setEndTime(tempTime);
  };

  return (
    <div className="container">
      <h1>🕒 Konverter Waktu & Tanggal</h1>

      <div className="input-section">
        <div className="input-group">
          <label>Tanggal Awal:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Tanggal Akhir:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>

        <button className="swap-btn" onClick={swapDates}>🔄 Tukar Tanggal</button>
        <p></p>
        <div className="input-group">
          <label>Konversi ke:</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="detik">Detik</option>
            <option value="menit">Menit</option>
            <option value="jam">Jam</option>
            <option value="hari">Hari</option>
            <option value="minggu">Minggu</option>
            <option value="bulan">Bulan</option>
            <option value="tahun">Tahun</option>
          </select>
        </div>

        <button onClick={calculate}>Hitung</button>
      </div>

      <p className="result">{result}</p>
    </div>
  );
}

export default App;
