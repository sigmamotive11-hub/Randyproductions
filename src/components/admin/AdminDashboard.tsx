"use client";

import { useState, useEffect } from "react";

interface Beat {
  id: number;
  title: string;
  artist: string;
  bpm: string;
  key: string;
  genre: string;
  tags: string;
  price: string;
  cover_art: string;
  audio: string;
}

export default function AdminDashboard() {
  const [beats, setBeats] = useState<Beat[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    artist: "",
    bpm: "",
    key: "",
    genre: "",
    tags: "",
    price: "",
    cover_art: "",
    audio: "",
  });

  useEffect(() => {
    fetchBeats();
  }, []);

  async function fetchBeats() {
    try {
      const res = await fetch("/api/admin/beats", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch beats");
      const data = await res.json();
      setBeats(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setMessage("Error fetching beats: " + msg);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/beats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          artist: form.artist,
          bpm: form.bpm,
          key: form.key,
          genre: form.genre,
          tags: form.tags,
          price: form.price,
          cover_art: form.cover_art,
          audio: form.audio,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Upload failed");
      }

      setMessage("Beat uploaded successfully!");
      setForm({
        title: "",
        artist: "",
        bpm: "",
        key: "",
        genre: "",
        tags: "",
        price: "",
        cover_art: "",
        audio: "",
      });
      fetchBeats();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setMessage("Upload failed: " + msg);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this beat?")) return;

    try {
      const res = await fetch("/api/admin/beats", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Delete failed");

      setBeats(beats.filter((b) => b.id !== id));
      setMessage("Beat deleted successfully.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setMessage("Delete failed: " + msg);
    }
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading beats...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Dashboard</h1>

      {message && (
        <div
          style={{
            ...styles.message,
            backgroundColor: message.includes("failed") ? "#7f1d1d" : "#14532d",
          }}
        >
          {message}
        </div>
      )}

      <div style={styles.card}>
        <h2 style={styles.subheading}>Upload New Beat</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Title *</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Beat title"
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Artist *</label>
              <input
                name="artist"
                value={form.artist}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Artist name"
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>BPM</label>
              <input
                name="bpm"
                value={form.bpm}
                onChange={handleChange}
                style={styles.input}
                placeholder="e.g. 140"
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Key</label>
              <select
                name="key"
                value={form.key}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select key</option>
                <option value="C Major">C Major</option>
                <option value="C Minor">C Minor</option>
                <option value="C# Major">C# Major</option>
                <option value="C# Minor">C# Minor</option>
                <option value="D Major">D Major</option>
                <option value="D Minor">D Minor</option>
                <option value="D# Major">D# Major</option>
                <option value="D# Minor">D# Minor</option>
                <option value="E Major">E Major</option>
                <option value="E Minor">E Minor</option>
                <option value="F Major">F Major</option>
                <option value="F Minor">F Minor</option>
                <option value="F# Major">F# Major</option>
                <option value="F# Minor">F# Minor</option>
                <option value="G Major">G Major</option>
                <option value="G Minor">G Minor</option>
                <option value="G# Major">G# Major</option>
                <option value="G# Minor">G# Minor</option>
                <option value="A Major">A Major</option>
                <option value="A Minor">A Minor</option>
                <option value="A# Major">A# Major</option>
                <option value="A# Minor">A# Minor</option>
                <option value="B Major">B Major</option>
                <option value="B Minor">B Minor</option>
              </select>
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Genre</label>
              <input
                name="genre"
                value={form.genre}
                onChange={handleChange}
                style={styles.input}
                placeholder="e.g. Trap, Drill"
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Price ($) *</label>
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="29.99"
                type="number"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div style={styles.fieldFull}>
            <label style={styles.label}>Tags</label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              style={styles.input}
              placeholder="Comma separated, e.g. hard, dark, 808"
            />
          </div>

          <div style={styles.fieldFull}>
            <label style={styles.label}>Cover Art URL *</label>
            <input
              name="cover_art"
              value={form.cover_art}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Paste cover art image URL"
            />
          </div>

          <div style={styles.fieldFull}>
            <label style={styles.label}>Audio URL *</label>
            <input
              name="audio"
              value={form.audio}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Paste audio URL"
            />
          </div>

          <button type="submit" disabled={uploading} style={styles.button}>
            {uploading ? "Uploading..." : "Upload Beat"}
          </button>
        </form>
      </div>

      <div style={styles.card}>
        <h2 style={styles.subheading}>
          {"Your Beats (" + beats.length + ")"}
        </h2>
        {beats.length === 0 ? (
          <p style={styles.empty}>No beats uploaded yet.</p>
        ) : (
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Cover</th>
                  <th style={styles.th}>Title</th>
                  <th style={styles.th}>Artist</th>
                  <th style={styles.th}>BPM</th>
                  <th style={styles.th}>Key</th>
                  <th style={styles.th}>Genre</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {beats.map((beat) => (
                  <tr key={beat.id} style={styles.tr}>
                    <td style={styles.td}>
                      {beat.cover_art ? (
                        <img
                          src={beat.cover_art}
                          alt={beat.title}
                          style={styles.coverImg}
                        />
                      ) : (
                        <span>No image</span>
                      )}
                    </td>
                    <td style={styles.td}>{beat.title}</td>
                    <td style={styles.td}>{beat.artist}</td>
                    <td style={styles.td}>{beat.bpm || "-"}</td>
                    <td style={styles.td}>{beat.key || "-"}</td>
                    <td style={styles.td}>{beat.genre || "-"}</td>
                    <td style={styles.td}>{"$" + beat.price}</td>
                    <td style={styles.td}>
                      <button
                        onClick={() => handleDelete(beat.id)}
                        style={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "32px",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#1a1a2e",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "24px",
    border: "1px solid #2a2a4a",
  },
  subheading: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#e0e0ff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  fieldFull: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#b0b0d0",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #3a3a5a",
    backgroundColor: "#12122a",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#6c5ce7",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "8px",
  },
  message: {
    padding: "12px 16px",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "14px",
    marginBottom: "20px",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#b0b0d0",
    paddingTop: "80px",
  },
  tableWrap: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "10px 12px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#8888aa",
    borderBottom: "1px solid #2a2a4a",
    whiteSpace: "nowrap",
  },
  tr: {
    borderBottom: "1px solid #1f1f3a",
  },
  td: {
    padding: "12px",
    fontSize: "14px",
    whiteSpace: "nowrap",
  },
  coverImg: {
    width: "48px",
    height: "48px",
    borderRadius: "6px",
    objectFit: "cover",
  },
  deleteBtn: {
    padding: "6px 14px",
    borderRadius: "6px",
    border: "1px solid #ff4444",
    backgroundColor: "transparent",
    color: "#ff4444",
    fontSize: "13px",
    cursor: "pointer",
  },
  empty: {
    color: "#666688",
    textAlign: "center",
    padding: "24px",
  },
};
