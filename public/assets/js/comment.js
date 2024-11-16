document.addEventListener('DOMContentLoaded', () => {
  const replyLinks = document.querySelectorAll('.reply');

  replyLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const commentId = link.getAttribute('data-id');
      const replyContainer = document.getElementById(`reply-input-container-${commentId}`);

      // Cek apakah input balasan sudah ada
      if (!replyContainer.querySelector('input')) {
        // Tambahkan input balasan
        replyContainer.innerHTML = `
          <div class="input-reply-wrapper">
            <form action="/submit-comment" method="POST">
              <input type="text" class="input-reply" placeholder="Tulis balasan Anda di sini">
              <button class="btn-send-reply">
                <i class="far fa-paper-plane"></i>
              </button>
            </form>
          </div>
        `;
      }
    });
  });
});