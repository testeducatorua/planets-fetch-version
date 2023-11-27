const global = {
    currentPage: window.location.pathname,
    jsonFile: "../data.json"
};

function createHoverForHeaderLink() {
    const items = [...document.querySelectorAll('.header-navigation-item a')];
    const hoverLine = document.createElement('div');
    let linkContent = [];

    for(const item of items) {
        item.addEventListener('mouseover', () => {
            linkContent = item.textContent;

            item.style.position = 'relative';
            hoverLine.style.position = 'absolute';
            const liItemWidth = item.parentElement.clientWidth;

            hoverLine.style.width = `${liItemWidth}px`;
            hoverLine.style.height = '4px';

            if(hoverLine.classList.length >= 1) {
                hoverLine.classList.remove(`button__active-${linkContent.toLowerCase()}`);
                hoverLine.classList.remove('hoverLine');
            } else {
                hoverLine.classList.add(`button__active-${linkContent.toLowerCase()}`);
                hoverLine.classList.add('hoverLine');
            };
            
            item.appendChild(hoverLine);
        });
        item.addEventListener('mouseleave', () => {
            hoverLine.classList.remove('hoverLine');
            hoverLine.classList.remove(`button__active-${linkContent.toLowerCase()}`);
            linkContent = '';
        });
    };

};
 
function buttonContent(planet) {
    if(document.body.clientWidth < 400) {
        document.querySelector('#overview').innerHTML = `Overview <span class="active " style="width:80px; height:4px; position:absolute; bottom: -20px;"></span>`;
        document.querySelector('#structure').innerHTML = `structure <span class="active " style="width:80px; height:4px; position:absolute; bottom: -20px;"></span>`;
        document.querySelector('#geology').innerHTML = `geology <span class="active " style="width:80px; height:4px; position:absolute; bottom: -20px;"></span>`;

        if(document.querySelector('#overview').classList.contains(`button__active-${planet.name.toLowerCase()}`)) {
            document.querySelector('#overview .active').classList.add(`button__active-${planet.name.toLowerCase()}`);
        } else if(document.querySelector('#structure').classList.contains(`button__active-${planet.name.toLowerCase()}`)) {
            document.querySelector('#structure .active').classList.add(`button__active-${planet.name.toLowerCase()}`);
        } else if(document.querySelector('#geology').classList.contains(`button__active-${planet.name.toLowerCase()}`)) {
            document.querySelector('#geology .active').classList.add(`button__active-${planet.name.toLowerCase()}`);
        };
    } else if(document.body.clientWidth > 400) {
        document.querySelector('#overview').innerHTML = `<span class="number">01</span> Overview`;
        document.querySelector('#structure').innerHTML = `<span class="number">02</span> Internal Structure`;
        document.querySelector('#geology').innerHTML = `<span class="number">03</span> Surface Geology`;
    };
};

function burgerMenyShowing() {
    const burgerButton = document.querySelector('button.burger');
    const navElement = document.querySelector('.header_navigation');
    const shadowDiv = document.createElement('div');

    burgerButton.addEventListener('click', () => {
        if(navElement.classList.contains('burger__menu-active')) {
            navElement.classList.remove('burger__menu-active');

            shadowDiv.remove();

            burgerButton.style.backgroundImage = 'url(../assets/icons/icon-hamburger.svg)';
        } else {
            navElement.classList.add('burger__menu-active');

            shadowDiv.classList.add('shadow');
            document.body.prepend(shadowDiv);

            burgerButton.style.backgroundImage = 'url(../assets/icons/hovered-burger.svg)';
        };
    });
    
    for(const element of [shadowDiv, navElement]) {
        element.addEventListener('click', () => {
            navElement.classList.remove('burger__menu-active');

            shadowDiv.remove();

            burgerButton.style.backgroundImage = 'url(../assets/icons/icon-hamburger.svg)';
        });
    };
};

function createHeader() {
    const headerElement = document.createElement('header');

    headerElement.innerHTML = `
    <section class="header__container">
        <a href="./index.html"><img src="./assets/icons/logo.svg" alt="logo" class="logo"></a>
        <nav class="header_navigation burger__menu">
          <ul class="header_navigation-container">
            <li class="header-navigation-item"><a href="./index.html"><div class="text__container"><span class="circle" style="background-color: #DEF4FC;"></span>mercury</div><img src="../assets/icons/icon-chevron.svg" class="chevron"></a></li>
            <li class="header-navigation-item"><a href="./venus.html"><div class="text__container"><span class="circle" style="background-color: #F7CC7F;"></span>venus</div><img src="../assets/icons/icon-chevron.svg" class="chevron"></a></li>
            <li class="header-navigation-item"><a href="./earth.html"><div class="text__container"><span class="circle" style="background-color: #545BFE;"></span>earth</div><img src="../assets/icons/icon-chevron.svg" class="chevron"></a></li>
            <li class="header-navigation-item"><a href="./mars.html"><div class="text__container"><span class="circle" style="background-color: #FF6A45;"></span>mars</div><img src="../assets/icons/icon-chevron.svg" class="chevron"></a></li>
            <li class="header-navigation-item"><a href="./jupiter.html"><div class="text__container"><span class="circle" style="background-color: #ECAD7A;"></span>jupiter</div><img src="../assets/icons/icon-chevron.svg" class="chevron"></a></li>
            <li class="header-navigation-item"><a href="./saturn.html"><div class="text__container"><span class="circle" style="background-color: #FCCB6B;"></span>saturn</div><img src="../assets/icons/icon-chevron.svg" class="chevron"></a></li>
            <li class="header-navigation-item"><a href="./uranus.html"><div class="text__container"><span class="circle" style="background-color: #65F0D5;"></span>uranus</div><img src="../assets/icons/icon-chevron.svg" class="chevron"></a></li>
            <li class="header-navigation-item"><a href="./neptune.html"><div class="text__container"><span class="circle" style="background-color: #497EFA;"></span>neptune</div><img src="../assets/icons/icon-chevron.svg" class="chevron"></a></li>
          </ul>
        </nav>
        <button class="burger"></button>
    </section>`;

    document.querySelector('body').prepend(headerElement);

    createHoverForHeaderLink();
    burgerMenyShowing();
};

async function createPlanetContent(planetName) {
    const API = await fetch(global.jsonFile);
    const planets = await API.json();
    let planetInfo;

    for(const planet of planets) {
        if(planet.name === planetName) {
            planetInfo = planet;
        };
    };

    const main = document.createElement('main');

    main.innerHTML = `<section class="main__container main__container-${planetInfo.name.toLowerCase()}">
    <div class="image"><img src="${planetInfo.images.planet}" alt="planet" class="planet_img"></div>
    <article class="main__content">
      <article>
          <h1>${planetInfo.name.toUpperCase()}</h1>
          <p class="main__content-text">${planetInfo.overview.content}</p>
          <p class="main__content-source">Source : <a href="${planetInfo.overview.source}" target="_blank">Wikipedia <img src="./assets/icons/icon-source.svg" alt=""></a></p>
    
      </article>
      <article class="main_content-buttons">
      <button id="overview"><span class="number">01</span> Overview</button>
      <button id="structure"><span class="number">02</span> Internal Structure</button>
      <button id="geology"><span class="number">03</span> Surface Geology</button>
    </article>
    </article>
    </section>
    <section class="main__info">
    <ul>
      <li>
        <h4>ROTATION TIME</h4>
        <h3>${planetInfo.rotation}</h3>
      </li>
      <li>
        <h4>REVOLUTION TIME</h4>
        <h3>${planetInfo.revolution}</h3>
      </li>
      <li>
        <h4>radius</h4>
        <h3>${planetInfo.radius}</h3>
      </li>
      <li>
        <h4>AVERAGE TEMP.</h4>
        <h3>${planetInfo.temperature}</h3>
      </li>
    </ul>
    </section>`;

    window.addEventListener('load', () => {
        buttonContent(planetInfo);
    });

    window.addEventListener('resize', () => {
        buttonContent(planetInfo);
    });

    document.querySelector('header').after(main);
    document.querySelector('#overview').classList.add(`button__active-${planetInfo.name.toLowerCase()}`);

    const imageContainer = document.querySelector('div.image');
    const planetImage = document.querySelector('img.planet_img');
    const planetText = document.querySelector('.main__content-text');
    const planetSourceLink = document.querySelector('.main__content-source a');
    const geologyImage = document.createElement('img');

    document.querySelector('#overview').addEventListener('click', () => {
        document.querySelector('#overview').classList.add(`button__active-${planetInfo.name.toLowerCase()}`);
        document.querySelector('#structure').classList.remove(`button__active-${planetInfo.name.toLowerCase()}`);
        document.querySelector('#geology').classList.remove(`button__active-${planetInfo.name.toLowerCase()}`);

        if(document.body.clientWidth <= 400) {
            document.querySelector('#overview .active').classList.add(`button__active-${planetInfo.name.toLowerCase()}`);
            document.querySelector('#structure .active').classList.remove(`button__active-${planetInfo.name.toLowerCase()}`);
            document.querySelector('#geology .active').classList.remove(`button__active-${planetInfo.name.toLowerCase()}`);
        }

        console.dir(imageContainer);

        if(imageContainer.children.length >= 1) {
            for (let i = 1; i < imageContainer.children.length; i++) {
                imageContainer.children[i].remove();
            };
        };

        planetImage.src = planetInfo.images.planet;
        planetText.textContent = `${planetInfo.overview.content}`;
        planetSourceLink.href = `${planetInfo.overview.source}`;
    });

    document.querySelector('#structure').addEventListener('click', () => {
        document.querySelector('#overview').classList.remove(`button__active-${planetInfo.name.toLowerCase()}`);
        document.querySelector('#structure').classList.add(`button__active-${planetInfo.name.toLowerCase()}`);
        document.querySelector('#geology').classList.remove(`button__active-${planetInfo.name.toLowerCase()}`);
        
        if(document.body.clientWidth <= 400) {
            document.querySelector('#overview .active').classList.remove(`button__active-${planetInfo.name.toLowerCase()}`);
            document.querySelector('#structure .active').classList.add(`button__active-${planetInfo.name.toLowerCase()}`);
            document.querySelector('#geology .active').classList.remove(`button__active-${planetInfo.name.toLowerCase()}`);
        }

        if(imageContainer.children.length >= 1) {
            for (let i = 1; i < imageContainer.children.length; i++) {
                imageContainer.children[i].remove();
            };
        };

        planetImage.src = planetInfo.images.internal;
        planetText.textContent = `${planetInfo.structure.content}`;
        planetSourceLink.href = `${planetInfo.structure.source}`;
    });

    document.querySelector('#geology').addEventListener('click', () => {
        document.querySelector('#overview').classList.remove(`button__active-${planetInfo.name.toLowerCase()}`);
        document.querySelector('#structure').classList.remove(`button__active-${planetInfo.name.toLowerCase()}`);
        document.querySelector('#geology').classList.add(`button__active-${planetInfo.name.toLowerCase()}`);
        
        if(document.body.clientWidth <= 400) {
            document.querySelector('#overview .active').classList.remove(`button__active-${planetInfo.name.toLowerCase()}`);
            document.querySelector('#structure .active').classList.remove(`button__active-${planetInfo.name.toLowerCase()}`);
            document.querySelector('#geology .active').classList.add(`button__active-${planetInfo.name.toLowerCase()}`);
        }

        planetImage.src = planetInfo.images.planet;
        planetText.textContent = `${planetInfo.geology.content}`;
        planetSourceLink.href = `${planetInfo.geology.source}`;

        if(imageContainer.children.length >= 1) {
            for (let i = 1; i < imageContainer.children.length; i++) {
                imageContainer.children[i].remove();
            };
        };

        geologyImage.src = planetInfo.images.geology;

        geologyImage.style.width = '163px';
        geologyImage.style.height = '199px';

        imageContainer.style.position = 'relative';
        geologyImage.style.position = 'absolute';

        geologyImage.style.bottom = '69px';
        geologyImage.classList.add('geology');

        imageContainer.appendChild(geologyImage);
    });
};

function init() {
    createHeader();

    switch (global.currentPage) {
      case "/":
        case "/index.html":
            createPlanetContent("Mercury");
            break;
        case "/venus.html":
            createPlanetContent("Venus");
            break;
        case "/earth.html":
            createPlanetContent("Earth");
            break;
        case "/mars.html":
            createPlanetContent("Mars");
            break;
        case "/jupiter.html":
            createPlanetContent("Jupiter");
            break;
        case "/saturn.html":
            createPlanetContent("Saturn");
            break;
        case "/uranus.html":
            createPlanetContent("Uranus");
            break;
        case "/neptune.html":
            createPlanetContent("Neptune");
            break;
    };
};

document.addEventListener('DOMContentLoaded', init);