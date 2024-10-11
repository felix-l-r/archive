document.addEventListener('DOMContentLoaded', function () {
    //const correctPassword = '1234'; // Задайте свой пароль здесь
    //const password = prompt('Введите пароль:');

    //if (password !== correctPassword) {
    //    document.body.innerHTML = '<h1>Доступ запрещён</h1>';
    //    return;
    //}

    const fileInput = document.getElementById('fileInput');
    const gallery = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const lightboxCaption = document.getElementById('lightbox-caption');

    const themeToggleButton = document.getElementById('themeToggle'); // Добавляем правильную привязку к кнопке

    fileInput.addEventListener('change', handleFileChange);
    document.getElementById('close').addEventListener('click', () => lightbox.classList.add('hidden'));

    themeToggleButton.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    function createMediaContainer(file) {
        const container = document.createElement('div');
        container.className = 'media-container';

        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.alt = file.name;
            img.title = file.name;
            img.addEventListener('click', () => openLightbox(img.src, file.name, 'image'));
            img.onload = () => URL.revokeObjectURL(img.src); // Освобождаем URL после загрузки
            container.appendChild(img);
        } else if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.src = URL.createObjectURL(file);
            video.alt = file.name;
            video.title = file.name;
            video.controls = true;
            container.appendChild(video);
        } else if (file.type.startsWith('audio/')) {
            const audio = document.createElement('audio');
            audio.src = URL.createObjectURL(file);
            audio.alt = file.name;
            audio.title = file.name;
            audio.controls = true;
            container.appendChild(audio);
        } else {
            const icon = document.createElement('div');
            icon.className = 'file-icon';
            icon.innerHTML = '📄'; // Иконка для неподдерживаемых файлов
            container.appendChild(icon);
        }

        const caption = document.createElement('div');
        caption.className = 'caption';
        caption.textContent = file.name;
        container.appendChild(caption);

        return container;
    }

    function openLightbox(src, caption, type) {
        lightboxContent.innerHTML = ''; // Очищаем содержимое лайтбокса

        if (type === 'image') {
            const img = document.createElement('img');
            img.src = src;
            img.alt = caption;
            lightboxContent.appendChild(img);
        } else if (type === 'video') {
            const video = document.createElement('video');
            video.src = src;
            video.alt = caption;
            video.controls = true;
            lightboxContent.appendChild(video);
        } else if (type === 'audio') {
            const audio = document.createElement('audio');
            audio.src = src;
            audio.alt = caption;
            audio.controls = true;
            lightboxContent.appendChild(audio);
        }

        lightboxCaption.textContent = caption;
        lightbox.classList.remove('hidden');
    }
});
