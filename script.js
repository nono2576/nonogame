
        // スムーススクロール
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // スクロール時のヘッダー透明度調整
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            const scrolled = window.pageYOffset;
            
            if (scrolled > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 30px rgba(52, 152, 219, 0.12)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(52, 152, 219, 0.08)';
            }
        });

        // カードのhover効果
        document.querySelectorAll('.blog-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.01)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

       


        // 日本時間を表示する関数
        function updateJapanTime() {
            const now = new Date();
            const japanTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Tokyo"}));
            
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'Asia/Tokyo'
            };
            
            const timeString = japanTime.toLocaleString('ja-JP', options);
            const timeElement = document.getElementById('japan-time');
            if (timeElement) {
                timeElement.textContent = `日本時間: ${timeString}`;
            }
        }

        // ページ読み込み時に時間を表示し、1秒ごとに更新
        document.addEventListener('DOMContentLoaded', () => {
            updateJapanTime();
            setInterval(updateJapanTime, 1000);
        });

        // フェードインアニメーション
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // 要素を監視
        document.querySelectorAll('.blog-card, .section-title').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });