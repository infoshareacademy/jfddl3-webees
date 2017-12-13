function cookies(){
    if(localStorage.getItem('cookies') !== 'set') {
        localStorage.setItem('cookies', 'set');
        var cookiesBox = document.createElement("div");
        cookiesBox.setAttribute('id', 'cookiesBox');
        document.body.appendChild(cookiesBox);
        cookiesBox.innerHTML = "<div><h4>Strona wykorzystuje pliki cookies.</h4><h4 id='closeCookies'>Zamknij</h4></div><p>W ramach naszej witryny stosujemy pliki cookies w celu świadczenia Państwu usług na najwyższym poziomie, w tym w sposób dostosowany do indywidualnych potrzeb. Korzystanie z witryny bez zmiany ustawień dotyczących cookies oznacza, że będą one zamieszczane w Państwa urządzeniu końcowym. Możecie Państwo dokonać w każdym czasie zmiany ustawień dotyczących cookies.</p>"

        closeCookies.addEventListener('click',function(){cookiesBox.remove()})
    }
}