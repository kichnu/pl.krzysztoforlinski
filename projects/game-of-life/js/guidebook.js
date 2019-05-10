const showGuideBook = document.querySelector('.show-guidebook');


document.querySelector('.guidebook-close').addEventListener('click', function(e){
    e.stopPropagation();
    this.parentNode.style.setProperty("top", "-300px");
    showGuideBook.style.setProperty("top", "5px")

})



showGuideBook.addEventListener('click', function(e){
    e.stopPropagation();
    this.nextElementSibling.style.setProperty("top", "100px");
    this.style.setProperty("top", "100px")
    
})