function displayCookies(){
    if(localStorage.getItem('cookies') !== 'set') {
        var cookiesBox = document.createElement("div");
        cookiesBox.setAttribute('id', 'cookiesBox');
        document.body.appendChild(cookiesBox);
        cookiesBox.innerHTML = "<div><h4>Strona wykorzystuje pliki cookies.</h4><h4 id='acceptCookies'>Akceptuję</h4></div><p>W ramach naszej witryny stosujemy pliki cookies w celu świadczenia Państwu usług na najwyższym poziomie, w tym w sposób dostosowany do indywidualnych potrzeb. Korzystanie z witryny bez zmiany ustawień dotyczących cookies oznacza, że będą one zamieszczane w Państwa urządzeniu końcowym. Możecie Państwo dokonać w każdym czasie zmiany ustawień dotyczących cookies.</p>"

        acceptCookies.addEventListener('click',function(){
            localStorage.setItem('cookies', 'set');
            cookiesBox.remove()
        })
    }
}

function moveToTopButtonDisplay(){
    if(window.pageYOffset !== 0)
        moveToTopButton.style.display = ""
    else
        moveToTopButton.style.display = "none"
}

function scrollToTop(){
    setTimeout(function(){
        window.scrollTo(0, window.pageYOffset-20)
        if(window.pageYOffset>0)
            scrollToTop()
    }, 1)
}


// event window on scroll
// staly czas przeskoku. rozna predkosc przesuwu