const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

// Menu navigasi, terutama untuk tampilan HP
menuToggle?.addEventListener("click", () => {
  if (!nav) return;

  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup navigasi" : "Buka navigasi",
  );
});

// Tutup menu setelah salah satu tautan dipilih
nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Buka navigasi");
  });
});

// Tahun footer otomatis
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Tombol salin email
document
  .querySelector(".copy-button")
  ?.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    const email = button.dataset.copy;

    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      button.textContent = "Email tersalin ✓";
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });

// Pratinjau gambar project
const lightbox = document.querySelector(".lightbox");
const lightboxImg = lightbox?.querySelector("img");
const lightboxCaption = lightbox?.querySelector("p");
const lightboxClose = lightbox?.querySelector(".lightbox-close");

function closeLightbox() {
  if (!lightbox) return;

  lightbox.hidden = true;
  document.body.style.overflow = "";
}

if (lightbox && lightboxImg && lightboxCaption) {
  document.querySelectorAll(".shot img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;

      lightboxCaption.textContent =
        img.closest("figure")?.querySelector("figcaption b")?.textContent ||
        img.alt;

      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
}
