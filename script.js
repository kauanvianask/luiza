
const presentes = [
  {
    nome: "Blusa",
    detalhe: "Tamanho P ou PP",
    emoji: "👚",
    link: ""
  },
  {
    nome: "Calça",
    detalhe: "Tamanho 34 ou 36",
    emoji: "👖",
    link: ""
  },
  {
    nome: "Perfume",
    detalhe: "Perfumes de sua preferência",
    emoji: "🌸",
    link: ""
  },
  {
    nome: "Hidratante",
    detalhe: "Hidratantes e produtos de cuidados pessoais",
    emoji: "🧴",
    link: ""
  },
  {
    nome: "Sapato",
    detalhe: "Tamanho 35 ou 36",
    emoji: "👠",
    link: ""
  }
];

const giftList = document.getElementById("giftList");

function renderPresentes() {
  if (!giftList) return;

  if (presentes.length === 0) {
    giftList.innerHTML = `
      <div class="empty-gifts">
        <strong>Minha lista está sendo preparada! 🎁</strong><br>
        Em breve vou adicionar aqui minhas sugestões de presentes.
        Volte para conferir!
      </div>`;
    return;
  }

  giftList.innerHTML = presentes.map((presente) => `
    <article class="gift-item">
      <div class="gift-thumb">${presente.emoji || "🎁"}</div>
      <div class="gift-info">
        <strong>${escapeHTML(presente.nome)}</strong>
        <small>${escapeHTML(presente.detalhe || "Uma sugestão especial")}</small>
      </div>
      ${presente.link
        ? `<a class="gift-link" href="${safeURL(presente.link)}" target="_blank" rel="noopener noreferrer">VER ↗</a>`
        : ""}
    </article>
  `).join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function safeURL(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "#";
  } catch {
    return "#";
  }
}

function showPage() {
  const pageId = (window.location.hash || "#inicio").replace("#", "");
  const validPages = ["inicio", "presentes", "local"];
  const target = validPages.includes(pageId) ? pageId : "inicio";

  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("active", page.id === target);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("hashchange", showPage);
showPage();
renderPresentes();

function updateCountdown() {
  const eventDate = new Date(2026, 10, 21, 16, 0, 0);
  const now = new Date();
  const difference = eventDate.getTime() - now.getTime();

  const ids = ["days", "hours", "minutes", "seconds"];

  if (difference <= 0) {
    const countdown = document.getElementById("countdown");
    if (countdown) {
      countdown.innerHTML =
        "<div class='countdown-finished'>CHEGOU O GRANDE DIA! ♡</div>";
    }
    return;
  }

  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference % 86400000) / 3600000);
  const minutes = Math.floor((difference % 3600000) / 60000);
  const seconds = Math.floor((difference % 60000) / 1000);

  [days, hours, minutes, seconds].forEach((value, index) => {
    const element = document.getElementById(ids[index]);
    if (element) {
      element.textContent = String(value).padStart(2, "0");
    }
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
let musicEnabled = false;

if (musicToggle && musicLabel) {
  musicToggle.addEventListener("click", () => {
    musicEnabled = !musicEnabled;
    musicLabel.textContent = musicEnabled ? "SEM MÚSICA" : "MÚSICA";

    const toast = document.getElementById("toast");

    if (toast) {
      toast.textContent = musicEnabled
        ? "Adicione sua música favorita ao projeto para ativar o áudio."
        : "Som desativado.";

      toast.classList.add("show");
      window.setTimeout(() => toast.classList.remove("show"), 2600);
    }
  });
}
