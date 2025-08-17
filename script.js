// Modal functionality
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const modalDesc = document.getElementById("modal-desc");
const closeModal = document.querySelector(".close");
const bookBtn = document.querySelector(".book-btn");

document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("click", () => {
        modalTitle.textContent = card.dataset.title;
        modalPrice.textContent = card.dataset.price;
        modalDesc.textContent = card.dataset.desc;
        modal.style.display = "block";
    });
});

closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

bookBtn.onclick = () => {
    alert(`Вы записались на услугу: ${modalTitle.textContent}`);
    modal.style.display = "none";
};

// Filter buttons
const allBtn = document.getElementById("all-btn");
const serviceCards = document.querySelectorAll(".service-card");

allBtn.addEventListener("click", () => {
    setActiveButton(allBtn);
    serviceCards.forEach(card => card.style.display = "flex");
});

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.textContent.toLowerCase();
        if(category === "все") return;
        setActiveButton(btn);
        serviceCards.forEach(card => {
            if(card.classList.contains(category)) card.style.display = "flex";
            else card.style.display = "none";
        });
    });
});

function setActiveButton(activeBtn) {
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    activeBtn.classList.add("active");
}
