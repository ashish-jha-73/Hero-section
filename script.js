window.addEventListener('load', () => {
    // Animate logo outline on load
    const outlineText = document.getElementById('outline-text');
    outlineText.style.strokeDasharray = 1000;
    outlineText.style.strokeDashoffset = 1000;
    outlineText.style.fill = 'transparent';

    // Animate stroke drawing
    outlineText.animate([
        { strokeDashoffset: 1000 },
        { strokeDashoffset: 0 }
    ], {
        duration: 2000,
        easing: 'ease-out',
        fill: 'forwards'
    });

    // Animate fill from bottom to top using the mask
    const maskRect = document.getElementById('mask-rect');
    setTimeout(() => {
        maskRect.setAttribute("y", "200");
        maskRect.animate([
            { y: "200" },
            { y: "0" }
        ], {
            duration: 1000,
            easing: 'ease-in',
            fill: 'forwards'
        });
    }, 500);

    setTimeout(() => {
        document.getElementById('intro').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';

        const tl = gsap.timeline();

        // Animate each word in hero text
        tl.from(".hero h1 span", {
            y: 100,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power4.out"
        });

        // Animate images after text completes
        tl.to(".images img", {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)"
        });
        
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Animate each paragraph on scroll
        gsap.from(".something p", {
            scrollTrigger: {
                trigger: ".something",
                start: "top 80%",  // start animation when .something is near viewport
            },
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
        });

        // Navbar scroll behavior
        let lastScroll = window.pageYOffset || document.documentElement.scrollTop;
        const navbar = document.querySelector('.navbar');
        navbar.classList.add('show');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll <= 0) {
                navbar.classList.remove('hide');
                navbar.classList.add('show');
                return;
            }

            if (currentScroll > lastScroll) {
                navbar.classList.add('hide');
                navbar.classList.remove('show');
            } else {
                navbar.classList.add('show');
                navbar.classList.remove('hide');
            }

            lastScroll = currentScroll;
        });
    }, 2000);

});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.close-btn');
    const navLinks = document.querySelectorAll('.mobile-menu .nav-link');

    // Open menu
    menuToggle.addEventListener('click', () => {
        mobileMenu.style.display = 'flex';
        gsap.fromTo(navLinks,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
        );
    });

    // Close menu
    closeBtn.addEventListener('click', () => {
        gsap.to(navLinks, {
            y: 50,
            opacity: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.in",
            onComplete: () => {
                mobileMenu.style.display = 'none';
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const thumbnails = document.querySelectorAll(".thumbnail");
    const heroText = document.querySelector(".hero-text");

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("mouseenter", () => {
            thumbnails.forEach(other => {
                if (other !== thumbnail) {
                    other.classList.add("dimmed");
                } else {
                    other.classList.add("hovered");
                }
            });
            heroText.classList.add("dimmed");
        });

        thumbnail.addEventListener("mouseleave", () => {
            thumbnails.forEach(t => {
                t.classList.remove("dimmed", "hovered");
            });
            heroText.classList.remove("dimmed");
        });
    });
});

