
// JavaScript functionality can be added here
document.addEventListener('DOMContentLoaded', function () {
  // Example of adding event listeners to buttons
  const buttons = document.querySelectorAll('.button');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      console.log('Button clicked:', this.textContent);
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const uploadInput = document.getElementById('upload-input');
  const profilePic = document.getElementById('profile-pic');
  const changePicBtn = document.getElementById('change-pic-btn');

  // 1. Verifica se há foto salva no localStorage
  const savedPhoto = localStorage.getItem('profilePicture');
  if (savedPhoto) {
    profilePic.src = savedPhoto;
  }

  // 2. Configura o evento de clique no botão
  changePicBtn.addEventListener('click', function () {
    uploadInput.click(); // Aciona o input file
  });

  // 3. Configura o evento de change no input file
  uploadInput.addEventListener('change', function (e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = function (event) {
        // Cria uma imagem temporária para verificação
        const img = new Image();
        img.src = event.target.result;

        img.onload = function () {
          // Atualiza a foto de perfil
          profilePic.src = event.target.result;

          // Salva no localStorage
          localStorage.setItem('profilePicture', event.target.result);

          // Feedback visual
          profilePic.style.transform = 'scale(1.05)';
          setTimeout(() => {
            profilePic.style.transform = 'scale(1)';
          }, 300);
        };
      };

      reader.readAsDataURL(e.target.files[0]);
    }
    profilePic.onerror = function () {
      this.src = 'https://via.placeholder.com/200';
      localStorage.removeItem('profilePicture');
    };
  });
});

document.getElementById('change-pic-btn').addEventListener('click', function (e) {
  e.stopPropagation(); // Evita comportamentos indesejados
  document.getElementById('upload-input').click();
});

// Efeito visual ao passar o mouse (opcional)
document.querySelector('.profile-pic-container').addEventListener('mouseenter', function () {
  this.querySelector('#change-pic-btn').style.opacity = '1';
});

document.querySelector('.profile-pic-container').addEventListener('mouseleave', function () {
  this.querySelector('#change-pic-btn').style.opacity = '0';
});