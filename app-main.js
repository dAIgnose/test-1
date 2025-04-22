document.addEventListener("DOMContentLoaded", function () {
    const testimonials = document.querySelectorAll(".testimonial-card");
    const loadMoreBtn = document.getElementById("loadMoreBtn");

    let visibleCount = 3;
    const increment = 3;

    function showTestimonials() {
      testimonials.forEach((card, index) => {
        card.style.display = index < visibleCount ? "block" : "none";
      });

      if (visibleCount >= testimonials.length) {
        loadMoreBtn.style.display = "none";
      }
    }

    showTestimonials();

    loadMoreBtn.addEventListener("click", () => {
      visibleCount += increment;
      showTestimonials();
    });
  });
  

  document.querySelectorAll('.faq-ques').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const answer = item.querySelector('.faq-ans');

        // Toggle the active class
        item.classList.toggle('active');

        // Adjust the max-height for smooth toggle
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = '0';
        }
    });
});

  