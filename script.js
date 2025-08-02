// تأثيرات التحميل والتفاعل
document.addEventListener('DOMContentLoaded', function() {
    
    // العد التنازلي
    function startCountdown() {
        // تاريخ الإطلاق (30 يوم من الآن)
        const launchDate = new Date();
        launchDate.setDate(launchDate.getDate() + 30);
        
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = launchDate.getTime() - now;
            
            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                // تحديث العرض مع تأثير الانتقال
                animateNumber(daysElement, days);
                animateNumber(hoursElement, hours);
                animateNumber(minutesElement, minutes);
                animateNumber(secondsElement, seconds);
            } else {
                // انتهى العد التنازلي
                daysElement.textContent = '00';
                hoursElement.textContent = '00';
                minutesElement.textContent = '00';
                secondsElement.textContent = '00';
                
                // إظهار رسالة الإطلاق
                showLaunchMessage();
            }
        }
        
        function animateNumber(element, newValue) {
            const currentValue = parseInt(element.textContent);
            const formattedValue = newValue.toString().padStart(2, '0');
            
            if (currentValue !== newValue) {
                element.style.transform = 'scale(1.2)';
                element.style.color = '#EF5C66';
                
                setTimeout(() => {
                    element.textContent = formattedValue;
                    element.style.transform = 'scale(1)';
                    element.style.color = '#ffffff';
                }, 150);
            }
        }
        
        // تحديث كل ثانية
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    function showLaunchMessage() {
        const countdownContainer = document.querySelector('.countdown-container');
        countdownContainer.innerHTML = `
            <div class="launch-message">
                <h3>🎉 تم الإطلاق! 🎉</h3>
                <p>موقعنا الآن متاح للزيارة</p>
                <a href="#" class="launch-button">زيارة الموقع</a>
            </div>
        `;
    }
    
    // تأثير الماوس على الجزيئات
    const particles = document.querySelectorAll('.particle');
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.3;
            const x = mouseX * speed * 20;
            const y = mouseY * speed * 20;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // نموذج الاشتراك
    const newsletterForm = document.getElementById('newsletter-form');
    const successMessage = document.getElementById('success-message');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
            // تأثير التحميل
            const submitButton = this.querySelector('button');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'جاري الإرسال...';
            submitButton.disabled = true;
            
            // محاكاة إرسال البيانات
            setTimeout(() => {
                // إظهار رسالة النجاح
                successMessage.style.display = 'block';
                emailInput.value = '';
                
                // إعادة تعيين الزر
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // إخفاء الرسالة بعد 5 ثوان
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
                
                // تأثير الاحتفال
                createCelebrationEffect();
                
            }, 2000);
        }
    });
    
    function createCelebrationEffect() {
        // إنشاء جزيئات احتفالية
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.backgroundColor = Math.random() > 0.5 ? '#312ED3' : '#EF5C66';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            const startX = window.innerWidth / 2;
            const startY = window.innerHeight / 2;
            
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            document.body.appendChild(particle);
            
            // حركة عشوائية
            const angle = (Math.PI * 2 * i) / 20;
            const velocity = 100 + Math.random() * 100;
            const endX = startX + Math.cos(angle) * velocity;
            const endY = startY + Math.sin(angle) * velocity;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                particle.remove();
            };
        }
    }
    
    // تأثيرات التمرير المتوازي
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.02;
            particle.style.transform += ` translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // تأثيرات التفاعل للعناصر
    const interactiveElements = document.querySelectorAll('.countdown-item, .service-item, .contact-item, .social-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform += ' scale(1.05)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.05)', '');
        });
    });
    
    // تأثير الكتابة التدريجية للعنوان
    const comingSoonTitle = document.querySelector('.coming-soon-title');
    if (comingSoonTitle) {
        const text = comingSoonTitle.textContent;
        comingSoonTitle.textContent = '';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            comingSoonTitle.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(typeWriter);
            }
        }, 200);
    }
    
    // تأثير النبضة للشعار
    const logoCircle = document.querySelector('.logo-circle');
    setInterval(() => {
        logoCircle.style.transform = 'scale(1.1)';
        setTimeout(() => {
            logoCircle.style.transform = 'scale(1)';
        }, 200);
    }, 3000);
    
    // تأثير التوهج العشوائي للجزيئات
    function randomGlow() {
        particles.forEach(particle => {
            if (Math.random() > 0.7) {
                particle.style.boxShadow = '0 0 20px #EF5C66';
                particle.style.backgroundColor = '#EF5C66';
                
                setTimeout(() => {
                    particle.style.boxShadow = '0 0 10px #312ED3';
                    particle.style.backgroundColor = '#312ED3';
                }, 500);
            }
        });
    }
    
    setInterval(randomGlow, 2000);
    
    // تشغيل العد التنازلي
    startCountdown();
    
    // تأثير الظهور التدريجي للعناصر
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // مراقبة العناصر
    const animatedElements = document.querySelectorAll('.service-item, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // تحسين الأداء - تقليل معدل تحديث الأحداث
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    };
    
    // تطبيق throttling على حركة الماوس
    document.addEventListener('mousemove', throttle(function(e) {
        // منطق حركة الماوس هنا
    }, 16)); // 60 FPS
});

// إضافة أنماط CSS إضافية للتأثيرات
const additionalStyles = `
    .launch-message {
        text-align: center;
        padding: 2rem;
        background: linear-gradient(135deg, #2ecc71, #27ae60);
        border-radius: 20px;
        color: white;
        animation: celebration 1s ease-out;
    }
    
    .launch-message h3 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    
    .launch-button {
        display: inline-block;
        margin-top: 1rem;
        padding: 1rem 2rem;
        background: white;
        color: #27ae60;
        text-decoration: none;
        border-radius: 50px;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .launch-button:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
    
    @keyframes celebration {
        0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
        }
        50% {
            transform: scale(1.1) rotate(-90deg);
        }
        100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
    }
    
    /* تحسينات الأداء */
    .particle {
        will-change: transform;
    }
    
    .countdown-number {
        will-change: transform, color;
    }
    
    .logo-circle {
        will-change: transform;
    }
`;

// إضافة الأنماط إلى الصفحة
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

