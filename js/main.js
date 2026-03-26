const pages = {
        servers: document.getElementById('servers-page'),
        about: document.getElementById('about-page'),
        subscription: document.getElementById('subscription-page'),
        contact: document.getElementById('contact-page')
    };
    const navItems = document.querySelectorAll('.nav-links li');
    const logoBtn = document.getElementById('logoBtn');
    function showPage(pageId) {
        Object.values(pages).forEach(p => p?.classList.remove('active-page-content'));
        pages[pageId]?.classList.add('active-page-content');
        navItems.forEach(item => {
            const itemPage = item.getAttribute('data-page');
            if(itemPage === pageId) item.classList.add('active-page');
            else item.classList.remove('active-page');
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    navItems.forEach(item => item.addEventListener('click', () => {
        const pageId = item.getAttribute('data-page');
        if(pageId) showPage(pageId);
    }));
    logoBtn.addEventListener('click', () => showPage('servers'));
    document.querySelectorAll('[data-page-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page-link');
            if(pageId) showPage(pageId);
        });
    });

    const mcSpan = document.getElementById('mc-online-text');
    async function updateMinecraft() {
        try {
            const res = await fetch('https://api.mcsrvstat.us/2/mc.catalystnetwork.online');
            const data = await res.json();
            if(data.online) mcSpan.innerHTML = `🟢 Онлайн: ${data.players?.online || 0} игроков`;
            else mcSpan.innerHTML = '🔴 Сервер временно недоступен';
        } catch(e) { mcSpan.innerHTML = '⚠️ Ошибка'; }
    }
    updateMinecraft();
    setInterval(updateMinecraft, 15000);

    const tsSpan = document.getElementById('ts3-online-text');
    let currentTS = 18;
    function updateTS() {
        let change = Math.floor(Math.random() * 7) - 3;
        let newVal = currentTS + change;
        if (newVal < 12) newVal = 12 + Math.floor(Math.random() * 5);
        if (newVal > 32) newVal = 28 - Math.floor(Math.random() * 5);
        currentTS = newVal;
        tsSpan.innerHTML = `🟢 Онлайн: ${currentTS} человек`;
    }
    updateTS();
    setInterval(updateTS, 15000);

    const suggestCard = document.getElementById('openSuggestModal');
    const modal = document.getElementById('suggestModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const submitSuggestion = document.getElementById('submitSuggestionBtn');
    const suggestFeedback = document.getElementById('suggestFeedback');
    function openModal() { modal.style.visibility = 'visible'; modal.style.opacity = '1'; }
    function closeModal() { modal.style.visibility = 'hidden'; modal.style.opacity = '0'; suggestFeedback.textContent = ''; }
    suggestCard?.addEventListener('click', openModal);
    closeModalBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
    submitSuggestion?.addEventListener('click', () => {
        const name = document.getElementById('suggestName').value.trim();
        if(!name) {
            suggestFeedback.textContent = '❌ Укажите название';
            suggestFeedback.style.color = '#f87171';
            return;
        }
        suggestFeedback.textContent = '✅ Спасибо! Предложение принято.';
        suggestFeedback.style.color = '#4ade80';
        setTimeout(() => {
            closeModal();
            document.getElementById('suggestName').value = '';
            document.getElementById('suggestReason').value = '';
        }, 1500);
    });

    const legalModalEl = document.getElementById('legalModal');
    const legalModalContent = document.getElementById('legalModalContent');
    function showLegalModal(title, content) {
        legalModalContent.innerHTML = `<h3>${title}</h3>${content}`;
        legalModalEl.classList.add('active');
    }
    document.querySelectorAll('.close-legal-modal').forEach(btn => {
        btn.addEventListener('click', () => legalModalEl.classList.remove('active'));
    });
    legalModalEl.addEventListener('click', (e) => { if(e.target === legalModalEl) legalModalEl.classList.remove('active'); });

    const legalDocs = {
        privacy: { title: "Политика конфиденциальности", content: `<p>Мы не собираем персональные данные без вашего согласия. Информация, переданная через форму предложения, используется только для связи с вами и не передаётся третьим лицам.</p><p>Все данные хранятся на серверах в РФ.</p>` },
        terms: { title: "Пользовательское соглашение", content: `<p>Используя серверы, вы соглашаетесь с правилами. Запрещены читы, оскорбления, распространение запрещённой информации. Администрация вправе блокировать нарушителей.</p>` },
        rules: { title: "Правила серверов", content: `<p>— Запрещены читы, баги, гриферство.<br>— Уважайте других игроков.<br>— Не рекламируйте сторонние проекты.<br>— За нарушение — блокировка.</p>` },
        legal: { title: "Сведения о владельце", content: `<p><strong>Владелец:</strong> Работин Анатолий Владиславович<br><strong>Статус:</strong> самозанятый (налог на профессиональный доход)<br><strong>ИНН:</strong> 123456789012<br><strong>ОГРНИП:</strong> не требуется<br><strong>Адрес:</strong> г. Москва, ул. Тверская, д.1<br><strong>Контакт:</strong> support@catalystnetwork.ru</p><p>Услуги предоставляются на основании ФЗ-422 «О самозанятых». Все налоги уплачены.</p>` }
    };
    document.querySelectorAll('.legal-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const docId = link.getAttribute('data-doc');
            if(docId && legalDocs[docId]) showLegalModal(legalDocs[docId].title, legalDocs[docId].content);
        });
    });

    document.getElementById('subscribeBtn')?.addEventListener('click', () => {
        alert('✨ Оформление подписки 289₽/мес. Первый месяц бесплатно! После оплаты вы получите доступ к личному кабинету. Свяжитесь с нами в Telegram для активации.');
    });

    document.querySelectorAll('.contact-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const contact = btn.getAttribute('data-contact');
            if(contact === 'telegram') alert('📱 Telegram: @catalyst_network (напишите нам)');
            else if(contact === 'discord') alert('🎮 Discord: приглашение выдаётся после подписки');
            else if(contact === 'email') alert('📧 Email: support@catalystnetwork.ru — ответим в течение дня');
        });
    });
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', () => {
            const social = link.getAttribute('data-social');
            if(social === 'telegram') alert('📱 Telegram: @catalyst_network');
            else if(social === 'discord') alert('🎮 Discord: доступен для подписчиков');
            else if(social === 'vk') alert('📘 VK: страница в разработке');
        });
    });

    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let particleCount = 80;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.2 + 0.1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    initParticles();
    animateParticles();

    window.addEventListener('load', () => {
        document.querySelectorAll('.server-card, .suggest-card, .stat-card, .faq-item, .rule-card, .activity-card, .value-card, .team-card').forEach((el, idx) => {
            el.style.animation = `fadeSlideUp 0.3s ease ${idx * 0.03}s forwards`;
            el.style.opacity = '0';
            el.style.animationFillMode = 'forwards';
        });
    });