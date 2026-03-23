const API_BASE_URL = "http://localhost:3000/api/v1/notes";

const noteForm = document.getElementById("note-form");
const noteIdInput = document.getElementById("note-id");
const judulInput = document.getElementById("judul");
const isiInput = document.getElementById("isi");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const reloadBtn = document.getElementById("reload-btn");
const notesList = document.getElementById("notes-list");
const messageEl = document.getElementById("message");

function setMessage(message, isError = false) {
  messageEl.textContent = message;
  messageEl.style.color = isError ? "#b91c1c" : "#64748b";
}

function resetForm() {
  noteIdInput.value = "";
  judulInput.value = "";
  isiInput.value = "";
  formTitle.textContent = "Tambah Catatan";
  submitBtn.textContent = "Simpan";
  cancelBtn.classList.add("hidden");
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("id-ID");
}

async function fetchNotes() {
  try {
    const response = await fetch(API_BASE_URL);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Gagal mengambil data");
    }

    renderNotes(result.data || []);
  } catch (error) {
    setMessage(error.message, true);
  }
}

function renderNotes(notes) {
  if (!notes.length) {
    notesList.innerHTML = '<div class="empty">Belum ada catatan.</div>';
    return;
  }

  notesList.innerHTML = notes
    .map(
      (note) => `
      <article class="note-item">
        <h3>${escapeHtml(note.judul)}</h3>
        <p>${escapeHtml(note.isi)}</p>
        <div class="note-meta">Dibuat: ${formatDate(note.tanggal_dibuat)}</div>
        <div class="note-actions">
          <button data-action="edit" data-id="${note.id}">Edit</button>
          <button data-action="delete" data-id="${note.id}" class="delete-btn">Hapus</button>
        </div>
      </article>
    `
    )
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function createNote(payload) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Gagal menambah catatan");
  }

  return result;
}

async function updateNote(id, payload) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Gagal mengubah catatan");
  }

  return result;
}

async function deleteNote(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Gagal menghapus catatan");
  }

  return result;
}

noteForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const payload = {
    judul: judulInput.value.trim(),
    isi: isiInput.value.trim(),
  };

  if (!payload.judul || !payload.isi) {
    setMessage("Judul dan isi harus diisi.", true);
    return;
  }

  try {
    if (noteIdInput.value) {
      await updateNote(noteIdInput.value, payload);
      setMessage("Catatan berhasil diubah.");
    } else {
      await createNote(payload);
      setMessage("Catatan berhasil ditambahkan.");
    }

    resetForm();
    await fetchNotes();
  } catch (error) {
    setMessage(error.message, true);
  }
});

cancelBtn.addEventListener("click", () => {
  resetForm();
  setMessage("Mode edit dibatalkan.");
});

reloadBtn.addEventListener("click", async () => {
  await fetchNotes();
  setMessage("Data diperbarui.");
});

notesList.addEventListener("click", async (event) => {
  const target = event.target;
  const action = target.dataset.action;
  const id = target.dataset.id;

  if (!action || !id) return;

  if (action === "edit") {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal memuat catatan");
      }

      noteIdInput.value = result.data.id;
      judulInput.value = result.data.judul;
      isiInput.value = result.data.isi;
      formTitle.textContent = "Edit Catatan";
      submitBtn.textContent = "Update";
      cancelBtn.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMessage("Mode edit aktif.");
    } catch (error) {
      setMessage(error.message, true);
    }
  }

  if (action === "delete") {
    const confirmed = window.confirm("Yakin ingin menghapus catatan ini?");
    if (!confirmed) return;

    try {
      await deleteNote(id);
      setMessage("Catatan berhasil dihapus.");
      await fetchNotes();
    } catch (error) {
      setMessage(error.message, true);
    }
  }
});

fetchNotes();
