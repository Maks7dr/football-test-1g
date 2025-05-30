import React, { useState, useEffect } from "react";
import PlayerForm from "./components/PlayerForm/PlayerForm";
import PlayerTable from "./components/PlayerTable/PlayerTable";
import ResultsTable from "./components/ResultsTable/ResultsTable";
import { Trash2, Pencil } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const getRanking = (players, key, ascending = true) => {
  return [...players]
    .sort((a, b) => (ascending ? a[key] - b[key] : b[key] - a[key]))
    .map((player, index) => ({ ...player, [`${key}Rank`]: index + 1 }));
};

const calculatePoints = (players) => {
  let updated = players;
  updated = getRanking(updated, "sprint", true);
  updated = getRanking(updated, "jump", false);
  updated = getRanking(updated, "juggling", false);
  updated = getRanking(updated, "run50x7", true);
  updated = getRanking(updated, "cooper", false);

  return updated
    .map((player) => {
      const totalPoints =
        player.sprintRank +
        player.jumpRank +
        player.jugglingRank +
        player.run50x7Rank +
        player.cooperRank;
      return { ...player, totalPoints };
    })
    .sort((a, b) => a.totalPoints - b.totalPoints);
};

export default function App() {
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    sprint: "",
    jump: "",
    juggling: "",
    run50x7: "",
    cooper: "",
  });
  const [results, setResults] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedPlayers = localStorage.getItem("players");
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddPlayer = () => {
    const newPlayer = {
      name: form.name,
      sprint: parseFloat(form.sprint),
      jump: parseFloat(form.jump),
      juggling: parseInt(form.juggling),
      run50x7: parseFloat(form.run50x7),
      cooper: parseInt(form.cooper),
    };

    if (editIndex !== null) {
      const updatedPlayers = [...players];
      updatedPlayers[editIndex] = newPlayer;
      setPlayers(updatedPlayers);
      setEditIndex(null);
    } else {
      setPlayers([...players, newPlayer]);
    }

    setForm({
      name: "",
      sprint: "",
      jump: "",
      juggling: "",
      run50x7: "",
      cooper: "",
    });
    setResults([]);
  };

  const handleEditPlayer = (index) => {
    const player = players[index];
    setForm({
      name: player.name,
      sprint: player.sprint,
      jump: player.jump,
      juggling: player.juggling,
      run50x7: player.run50x7,
      cooper: player.cooper,
    });
    setEditIndex(index);
  };

  const handleDeletePlayer = (index) => {
    const updatedPlayers = players.filter((_, i) => i !== index);
    setPlayers(updatedPlayers);
    setResults([]);
  };

  const handleSubmit = () => {
    const ranked = calculatePoints(players);
    setResults(ranked);
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("results-section");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("test-results.pdf");
    });
  };

  const handleBack = () => {
    setResults([]);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Анализ результатов игроков
      </h1>

      {!results.length && (
        <>
          <PlayerForm
            form={form}
            onChange={handleChange}
            onSubmit={handleAddPlayer}
            isEditing={editIndex !== null}
          />

          <div className="flex gap-4 mb-6 justify-center">
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow"
              onClick={handleSubmit}
            >
              Рассчитать места
            </button>
          </div>

          <PlayerTable
            players={players}
            onEdit={handleEditPlayer}
            onDelete={handleDeletePlayer}
          />
        </>
      )}

      {results.length > 0 && (
        <div id="results-section">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded shadow"
            >
              ← Назад
            </button>
            <h2 className="text-2xl font-bold text-center text-green-700">
              Тестирование 2013–2014 (26.05.2025)
            </h2>
            <div className="w-24"></div>
          </div>

          <ResultsTable results={results} />

          <div className="flex justify-center mt-4">
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded shadow"
            >
              Скачать в PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
