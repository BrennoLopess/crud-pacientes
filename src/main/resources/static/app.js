// =====================
// Endpoints
// =====================
const API_PSICOLOGOS = "/api/psicologos";
const API_PACIENTES = "/api/pacientes";

// =====================
// State
// =====================
let psicologos = [];
let pacientes = [];
let selectedPsicologoId = null;
let editPacienteId = null;

// =====================
// DOM Helpers
// =====================
const $ = (id) => document.getElementById(id);

const apiStatus = $("apiStatus");
const toast = $("toast");

// =====================
// Toast
// =====================
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2400);
}

// =====================
// Utils
// =====================
function normalizePhone(v) {
  return String(v || "").replace(/\D/g, "");
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function badgeGravidade(g) {
  const grav = (g || "").toUpperCase();
  if (!grav) return `<span class="badge sem"><i></i>SEM</span>`;
  if (grav === "BAIXO") return `<span class="badge baixo"><i></i>BAIXO</span>`;
  if (grav === "MODERADO") return `<span class="badge moderado"><i></i>MODERADO</span>`;
  if (grav === "CRITICO") return `<span class="badge critico"><i></i>CRITICO</span>`;
  return `<span class="badge"><i></i>${escapeHtml(grav)}</span>`;
}

function debounce(fn, delay = 200) {
  let t = null;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

// =====================
// UI State Helpers
// =====================
function setApiChip(status) {
  if (status === "ok") {
    apiStatus.textContent = "API: online";
    apiStatus.className = "chip ok";
  } else if (status === "bad") {
    apiStatus.textContent = "API: offline";
    apiStatus.className = "chip bad";
  } else {
    apiStatus.textContent = "API: checando...";
    apiStatus.className = "chip";
  }
}

function setLoadingList(el, text = "Carregando...") {
  if (!el) return;
  el.innerHTML = `<div class="muted" style="padding:10px;">${escapeHtml(text)}</div>`;
}

function setLoadingTable(tbody, text = "Carregando...") {
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="7" class="muted">${escapeHtml(text)}</td></tr>`;
}

function setSelectedLabel() {
  const el = $("selectedPsicologo");
  if (!selectedPsicologoId) {
    el.innerHTML = `Selecionado: <span class="muted">nenhum</span>`;
    return;
  }
  const p = psicologos.find((x) => Number(x.id) === Number(selectedPsicologoId));
  if (!p) {
    el.innerHTML = `Selecionado: <span class="muted">nenhum</span>`;
    return;
  }
  el.innerHTML = `Selecionado: <b>${escapeHtml(p.nome)}</b> <span class="muted">(${escapeHtml(
    p.crp
  )})</span>`;
}

// =====================
// Fetch Helper (safe + better errors)
// =====================
async function request(url, options = {}) {
  const res = await fetch(url, {
    cache: "no-store",
    ...options,
    headers: {
      ...(options.headers || {}),
    },
  });

  const contentType = res.headers.get("content-type") || "";
  let data = null;

  if (contentType.includes("application/json")) {
    try {
      data = await res.json();
    } catch {
      data = null;
    }
  } else {
    try {
      data = await res.text();
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    const msg =
      (typeof data === "string" && data.trim()) ||
      (data && data.message) ||
      `Erro HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

// =====================
// API Status
// =====================
async function checkApi() {
  setApiChip("checking");
  try {
    await request(API_PSICOLOGOS);
    setApiChip("ok");
    return true;
  } catch {
    setApiChip("bad");
    return false;
  }
}

// =====================
// Psicólogos
// =====================
function fillPsicologoSelect() {
  const sel = $("pPsicologo");
  const cur = sel.value;

  sel.innerHTML =
    `<option value="">(selecione)</option>` +
    psicologos
      .map(
        (p) =>
          `<option value="${p.id}">${escapeHtml(p.nome)} • ${escapeHtml(p.crp)}</option>`
      )
      .join("");

  // tenta manter seleção
  if (selectedPsicologoId) sel.value = String(selectedPsicologoId);
  else if (cur) sel.value = cur;
}

function renderPsicologosList() {
  const filtro = ($("psFiltro").value || "").trim().toLowerCase();
  const list = $("psicologosList");

  const data = psicologos.filter((p) => {
    if (!filtro) return true;
    const s = `${p.nome} ${p.crp} ${p.especializacao || ""}`.toLowerCase();
    return s.includes(filtro);
  });

  if (data.length === 0) {
    list.innerHTML = `<div class="muted" style="padding:10px;">Nenhum psicólogo encontrado.</div>`;
    return;
  }

  list.innerHTML = data
    .map((p) => {
      const selected = Number(selectedPsicologoId) === Number(p.id);

      return `
      <div class="ps-card">
        <div class="ps-main">
          <div class="ps-name">${escapeHtml(p.nome)}</div>
          <div class="ps-meta">
            <div><b>CRP:</b> ${escapeHtml(p.crp)}</div>
            <div><b>Especialização:</b> ${escapeHtml(p.especializacao || "-")}</div>
            <div><b>ID:</b> ${p.id}</div>
          </div>
        </div>
        <div class="ps-actions">
          <button class="btn ghost" type="button" data-action="select" data-id="${p.id}">
            ${selected ? "Selecionado ✓" : "Selecionar"}
          </button>
          <button class="btn" type="button" data-action="view" data-id="${p.id}">Ver pacientes</button>
          <button class="btn danger" type="button" data-action="delete" data-id="${p.id}">Deletar</button>
        </div>
      </div>`;
    })
    .join("");
}

async function loadPsicologos() {
  setLoadingList($("psicologosList"), "Carregando psicólogos...");
  psicologos = await request(API_PSICOLOGOS);
  fillPsicologoSelect();
  renderPsicologosList();
  setSelectedLabel();
}

async function criarPsicologo() {
  const nome = $("psNome").value.trim();
  const crp = $("psCrp").value.trim();
  const especializacao = $("psEsp").value.trim();

  if (!nome || !crp) {
    showToast("Preencha Nome e CRP.");
    return;
  }

  try {
    const payload = { nome, crp, especializacao };
    const created = await request(API_PSICOLOGOS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    showToast(`Psicólogo criado (id=${created.id})`);
    $("psNome").value = "";
    $("psCrp").value = "";
    $("psEsp").value = "";

    await loadPsicologos();
  } catch (e) {
    showToast(e.message || "Erro ao criar psicólogo.");
  }
}

async function deletarPsicologo(id) {
  const ok = confirm(`Deletar psicólogo ID ${id}?`);
  if (!ok) return;

  try {
    await request(`${API_PSICOLOGOS}/${id}`, { method: "DELETE" });

    if (Number(selectedPsicologoId) === Number(id)) {
      selectedPsicologoId = null;
      setSelectedLabel();
      fillPsicologoSelect();
    }

    showToast("Psicólogo deletado.");
    await loadPsicologos();
    await loadPacientes(); // tabela pode mudar (nome do psicólogo / vínculos)
  } catch (e) {
    showToast(e.message || "Erro ao deletar psicólogo.");
  }
}

async function selecionarPsicologo(id) {
  selectedPsicologoId = Number(id);
  $("pPsicologo").value = String(id);
  setSelectedLabel();
  renderPsicologosList();
  renderPacientesTable();
}

async function verPacientesDoPsicologo(id) {
  await selecionarPsicologo(id);
  showToast("Filtrando pacientes pelo psicólogo selecionado.");
}

// =====================
// Pacientes
// =====================
function resetPacienteForm() {
  editPacienteId = null;
  $("pNome").value = "";
  $("pEmail").value = "";
  $("pTel").value = "";
  $("pGrav").value = "";

  // mantém psicólogo selecionado
  if (selectedPsicologoId) $("pPsicologo").value = String(selectedPsicologoId);
  else $("pPsicologo").value = "";

  $("btnCancelarEdicao").style.display = "none";
  $("modoPaciente").textContent = "Modo: Criar";
}

function getPsicologoNomeById(id) {
  const p = psicologos.find((x) => Number(x.id) === Number(id));
  return p ? p.nome : "-";
}

function renderPacientesTable() {
  const tbody = $("pacientesTable");
  const filtroTexto = ($("pFiltro").value || "").trim().toLowerCase();
  const filtroGrav = ($("filtroGravidade").value || "").trim().toUpperCase();

  let data = Array.isArray(pacientes) ? [...pacientes] : [];

  // filtro por psicólogo selecionado
  if (selectedPsicologoId) {
    data = data.filter((p) => Number(p.psicologoId) === Number(selectedPsicologoId));
  }

  // filtro gravidade
  if (filtroGrav) {
    data = data.filter((p) => (p.gravidade || "").toUpperCase() === filtroGrav);
  }

  // filtro texto
  if (filtroTexto) {
    data = data.filter((p) => {
      const s = `${p.nome || ""} ${p.email || ""} ${p.telefone || ""} ${p.gravidade || ""}`.toLowerCase();
      return s.includes(filtroTexto);
    });
  }

  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="muted">Nenhum paciente encontrado.</td></tr>`;
    return;
  }

  tbody.innerHTML = data
    .map((p) => {
      const psicNome = getPsicologoNomeById(Number(p.psicologoId));
      return `
      <tr>
        <td>${p.id}</td>
        <td>${escapeHtml(p.nome)}</td>
        <td>${escapeHtml(p.email)}</td>
        <td>${escapeHtml(p.telefone || "")}</td>
        <td>${badgeGravidade(p.gravidade)}</td>
        <td>${escapeHtml(psicNome)}</td>
        <td>
          <div class="row-actions">
            <button class="btn" type="button" data-action="editPaciente" data-id="${p.id}">Editar</button>
            <button class="btn danger" type="button" data-action="deletePaciente" data-id="${p.id}">Deletar</button>
          </div>
        </td>
      </tr>`;
    })
    .join("");
}

async function loadPacientes() {
  setLoadingTable($("pacientesTable"), "Carregando pacientes...");
  pacientes = await request(API_PACIENTES);
  renderPacientesTable();
}

async function salvarPaciente() {
  const nome = $("pNome").value.trim();
  const email = $("pEmail").value.trim();
  const telefone = normalizePhone($("pTel").value.trim());
  const gravidade = ($("pGrav").value || "").trim();
  const psicologoIdStr = ($("pPsicologo").value || "").trim();

  if (!nome || !email) {
    showToast("Preencha Nome e Email.");
    return;
  }
  if (!psicologoIdStr) {
    showToast("Selecione um psicólogo.");
    return;
  }

  const payload = {
    nome,
    email,
    telefone,
    psicologoId: Number(psicologoIdStr),
    gravidade: gravidade || null,
  };

  const isEdit = editPacienteId !== null;
  const url = isEdit ? `${API_PACIENTES}/${editPacienteId}` : API_PACIENTES;

  try {
    const resp = await request(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    showToast(isEdit ? `Paciente atualizado (id=${resp.id})` : `Paciente criado (id=${resp.id})`);

    // mantém seleção do psicólogo do payload
    selectedPsicologoId = Number(payload.psicologoId);
    setSelectedLabel();

    resetPacienteForm();
    await loadPacientes();
    renderPsicologosList();
  } catch (e) {
    showToast(e.message || "Erro ao salvar paciente.");
  }
}

async function editarPaciente(id) {
  try {
    const p = await request(`${API_PACIENTES}/${id}`);

    editPacienteId = Number(id);
    $("pNome").value = p.nome || "";
    $("pEmail").value = p.email || "";
    $("pTel").value = p.telefone || "";
    $("pGrav").value = p.gravidade || "";
    $("pPsicologo").value = String(p.psicologoId || "");

    $("btnCancelarEdicao").style.display = "inline-block";
    $("modoPaciente").textContent = `Modo: Editar (ID ${id})`;

    if (p.psicologoId) {
      selectedPsicologoId = Number(p.psicologoId);
      setSelectedLabel();
      renderPsicologosList();
      renderPacientesTable();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (e) {
    showToast(e.message || "Não foi possível carregar o paciente.");
  }
}

async function deletarPaciente(id) {
  const ok = confirm(`Deletar paciente ID ${id}?`);
  if (!ok) return;

  try {
    await request(`${API_PACIENTES}/${id}`, { method: "DELETE" });

    showToast("Paciente deletado.");
    if (Number(editPacienteId) === Number(id)) resetPacienteForm();

    await loadPacientes();
  } catch (e) {
    showToast(e.message || "Erro ao deletar paciente.");
  }
}

// =====================
// Events
// =====================
$("btnRefreshPsicologos").addEventListener("click", async () => {
  await checkApi();
  try {
    await loadPsicologos();
  } catch (e) {
    showToast(e.message || "Falha ao carregar psicólogos.");
  }
});

$("btnRefreshPacientes").addEventListener("click", async () => {
  await checkApi();
  try {
    await loadPacientes();
  } catch (e) {
    showToast(e.message || "Falha ao carregar pacientes.");
  }
});

$("btnCriarPsicologo").addEventListener("click", criarPsicologo);

$("btnLimparPsicologo").addEventListener("click", () => {
  $("psNome").value = "";
  $("psCrp").value = "";
  $("psEsp").value = "";
  showToast("Form de psicólogo limpo.");
});

$("psFiltro").addEventListener("input", debounce(renderPsicologosList, 120));

$("btnSalvarPaciente").addEventListener("click", salvarPaciente);

$("btnCancelarEdicao").addEventListener("click", () => {
  resetPacienteForm();
  showToast("Edição cancelada.");
});

$("btnLimparSelecao").addEventListener("click", () => {
  selectedPsicologoId = null;
  setSelectedLabel();
  fillPsicologoSelect();
  renderPsicologosList();
  renderPacientesTable();
  showToast("Seleção limpa.");
});

$("pFiltro").addEventListener("input", debounce(renderPacientesTable, 120));
$("filtroGravidade").addEventListener("change", renderPacientesTable);

$("pPsicologo").addEventListener("change", (e) => {
  const v = e.target.value;
  selectedPsicologoId = v ? Number(v) : null;
  setSelectedLabel();
  renderPsicologosList();
  renderPacientesTable();
});

$("pacientesTable").addEventListener("click", async (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.getAttribute("data-action");
  const id = Number(btn.getAttribute("data-id"));
  if (!action || !id) return;

  if (action === "editPaciente") await editarPaciente(id);
  if (action === "deletePaciente") await deletarPaciente(id);
});

$("psicologosList").addEventListener("click", async (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.getAttribute("data-action");
  const id = Number(btn.getAttribute("data-id"));
  if (!action || !id) return;

  if (action === "select") await selecionarPsicologo(id);
  if (action === "view") await verPacientesDoPsicologo(id);
  if (action === "delete") await deletarPsicologo(id);
});

// =====================
// Init
// =====================
(async function init() {
  await checkApi();
  try {
    await loadPsicologos();
    await loadPacientes();
  } catch {
    showToast("Falha ao carregar dados. Verifique se a API está rodando.");
  }
})();
