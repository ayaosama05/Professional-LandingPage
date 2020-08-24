/* Start Golbal Variables */
const navContainer = document.querySelector('nav');
const scrollBtn = document.getElementById('scrollBtn');

// Setup isScrolling variable
let isScrolling;
/* End Global Variables */

/* Helper Functions */
function GetSiblings(elm){
    const siblings = elm.parentNode.childNodes;
    siblings.forEach(function(e){
        e.classList.remove("active");
    })
    elm.classList.add("active");
}
/* End Helper Functions */

/************ Build Menu *************/
/*var t1 = performance.now();*/
const navList = ['Home','About','Services','Contact'];
const myCustomUL = document.createElement('ul');
navList.forEach(createNavItems);
function createNavItems(elm , i ,array){
    const item = document.createElement('li');
    const link = document.createElement('a'); 
    item.appendChild(link); 
    link.setAttribute('data-section',elm); 
    link.setAttribute('class','menu__link');
    link.innerHTML = link.innerHTML + elm; 
    myCustomUL.appendChild(link);
    /*navContainer.appendChild(item);*/
}
myCustomUL.setAttribute('id','navbar__list');
myCustomUL.style.display = "flex";
navContainer.appendChild(myCustomUL);
/*var t2 = performance.now();
console.log(t2-t1);
Reduce TIME FROM 0.5550000350922346 TO 0.41500001680105925 As per using customDiv */

/*************   Scroll to section on link click ***************/
navContainer.addEventListener('click', e => {
    var Elm = e.target;
    GetSiblings(Elm);
    var ElmAttribute = Elm.getAttribute('data-section');
    const section = document.getElementById(ElmAttribute);
    console.log(section);
    section.scrollIntoView({behavior: 'smooth'});
    /*document.querySelector("[data-section='e.target.textContent']").scrollIntoView({behavior: 'smooth'})*/
});

/**************  Set sections as active **************/
document.addEventListener('scroll',function(){
    if(!!window.IntersectionObserver){
        let observer = new IntersectionObserver((entries, observer) => { 
            entries.forEach(entry => {
            if(entry.isIntersecting){
                /*console.log(entry);
                var sectionID = entry.target.id;*/
                var targetNav = entry.target.dataset.nav;
                const link = document.querySelector('[data-section="'+targetNav+'"]');
                GetSiblings(link);
                const sections = document.querySelectorAll('section');
                    sections.forEach(function(e){
                e.classList.remove('activeSection');
                })
                entry.target.classList.add("activeSection");
                console.log(entry);
                observer.unobserve(entry.target);
            }
            });
        }, {rootMargin: "0px 0px -200px 0px"});
        document.querySelectorAll('section').forEach(section => { observer.observe(section) });
    }
})


/**************  Scroll To Top Button ****************/

window.addEventListener('scroll',function(event){
    document.getElementsByTagName('nav')[0].style.display = "block";
    
    if(document.documentElement.scrollTop > 40){
        scrollBtn.style.display = "block";
    }else{
        scrollBtn.style.display = "none";
    }

    // Clear our timeout throughout the scroll
	window.clearTimeout( isScrolling );

	// Set a timeout to run after scrolling ends
	isScrolling = setTimeout(function() {
        navContainer.style.transition = 'all 1s ease-in-out';
        // Run the callback
        if(document.documentElement.scrollTop > 40){
            navContainer.style.display = "none";
        }
	}, 2000);
    /*let currentWindowOffset = window.pageYOffset;
    if(WindowOffset > currentWindowOffset){
        scrollBtn.style.display = "block";
        document.getElementsByTagName('nav')[0].style.display = "block";
    }else{
        scrollBtn.style.display = "none";
        document.getElementsByTagName('nav')[0].style.display = "none";
    }
    WindowOffset = currentWindowOffset;*/
})
scrollBtn.addEventListener('click',function(){
    document.documentElement.scrollTop = 0;
})


