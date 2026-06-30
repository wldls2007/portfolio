const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const filterButtons = document.querySelectorAll("[data-filter]");
const activityCards = document.querySelectorAll("[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    activityCards.forEach((card) => {
      const shouldShow = selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

const contactForm = document.getElementById("contactForm");
const responseMessage = document.getElementById("responseMessage");

const showResponseMessage = (type, message) => {
  if (!responseMessage) {
    return;
  }

  responseMessage.className = `response-message ${type}`;
  responseMessage.textContent = message;
};

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("visitorName").value;
    const email = document.getElementById("visitorEmail").value;
    const message = document.getElementById("visitorMessage").value;

    showResponseMessage("info", "AI 에이전트가 질문을 분석 중입니다. 잠시만 기다려주세요.");

    const makeWebhookUrl = "https://hook.us1.make.com/your_unique_webhook_id";

    try {
      const response = await fetch(makeWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          visitor_name: name,
          visitor_email: email,
          visitor_message: message,
        }),
      });

      if (!response.ok) {
        throw new Error("서버 응답 실패");
      }

      showResponseMessage(
        "success",
        "질문이 성공적으로 접수되었습니다. 입력하신 메일로 AI의 답변이 곧 발송됩니다."
      );
      contactForm.reset();
    } catch (error) {
      showResponseMessage("error", "접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  });
}
