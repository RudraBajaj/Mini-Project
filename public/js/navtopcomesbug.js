document.querySelector('.home-button').addEventListener('click', function() {
    const target = document.getElementById('hero');
    window.scrollTo({
        top: target.offsetTop - 100,
        behavior: 'smooth'
    });
});