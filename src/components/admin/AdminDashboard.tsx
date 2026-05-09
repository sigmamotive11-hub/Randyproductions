"use client";

import { useState, useEffect, useRef } from "react";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

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
