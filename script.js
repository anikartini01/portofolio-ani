document.addEventListener("DOMContentLoaded", () => {
  // Menu navigasi pada perangkat mobile
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  function closeMenu() {
    if (!menuToggle || !nav) return;

    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka navigasi");
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup navigasi" : "Buka navigasi",
      );
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 650) closeMenu();
    });
  }

  // Salin alamat email
  const copyButton = document.querySelector(".copy-button");

  if (copyButton) {
    const originalText = copyButton.textContent;

    copyButton.addEventListener("click", async () => {
      const email = copyButton.dataset.copy;
      if (!email) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const temporaryInput = document.createElement("textarea");
          temporaryInput.value = email;
          temporaryInput.setAttribute("readonly", "");
          temporaryInput.style.position = "fixed";
          temporaryInput.style.opacity = "0";

          document.body.appendChild(temporaryInput);
          temporaryInput.select();

          const copied = document.execCommand("copy");
          temporaryInput.remove();

          if (!copied) throw new Error("Penyalinan gagal");
        }

        copyButton.textContent = "Email berhasil disalin ✓";
      } catch (error) {
        copyButton.textContent = "Salin gagal, gunakan email di atas";
      }

      window.setTimeout(() => {
        copyButton.textContent = originalText;
      }, 2500);
    });
  }

  // Pratinjau gambar proyek (lightbox)
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = lightbox?.querySelector(".lightbox-content img");
  const lightboxCaption = lightbox?.querySelector(".lightbox-content p");
  const lightboxClose = lightbox?.querySelector(".lightbox-close");

  let previouslyFocusedElement = null;

  function openLightbox(image, caption) {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;

    previouslyFocusedElement = document.activeElement;

    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = caption || image.alt || "Pratinjau gambar";

    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose?.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;

    lightbox.hidden = true;
    lightboxImage?.removeAttribute("src");
    document.body.style.overflow = "";

    if (previouslyFocusedElement instanceof HTMLElement) {
      previouslyFocusedElement.focus();
    }
  }

  document.querySelectorAll(".shot-image").forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.querySelector("img");
      if (!image) return;

      const caption =
        button.closest(".shot")?.querySelector("figcaption b")?.textContent ||
        image.alt;

      openLightbox(image, caption);
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
});
