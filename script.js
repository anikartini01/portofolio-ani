document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Logic
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. Copy Email Logic
  const copyBtn = document.querySelector(".copy-button");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.dataset.copy;
      if (!email) return;
      try {
        await navigator.clipboard.writeText(email);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Email tersalin ✓";
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      } catch (err) {
        window.location.href = `mailto:${email}`;
      }
    });
  }

  // 3. Lightbox Logic (Pop-up Gambar)
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox?.querySelector("img");
  const lightboxCaption = lightbox?.querySelector("p");
  const lightboxClose = lightbox?.querySelector(".lightbox-close");

  if (lightbox) {
    lightbox.hidden = true;
    lightbox.style.display = "none";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    lightbox.style.display = "none";
    document.body.style.overflow = "";
  }

  if (lightbox && lightboxImg && lightboxCaption) {
    document.querySelectorAll(".shot img").forEach((img) => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        const captionText =
          img.closest("figure")?.querySelector("figcaption b")?.textContent ||
          img.alt;
        lightboxCaption.textContent = captionText;
        lightbox.hidden = false;
        lightbox.style.display = "flex";
        document.body.style.overflow = "hidden";
      });
    });

    lightboxClose?.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeLightbox();
    });
  }
});
