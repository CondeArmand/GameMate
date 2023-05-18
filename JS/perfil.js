const btnExpandir = document.querySelector('.btn-expandir');
         const menuLateral = document.querySelector('.menu-lateral');
            const menu = document.querySelector('.menu');

            btnExpandir.addEventListener('click', () => {
                menuLateral.classList.toggle('active');
                menu.classList.toggle('active');
            });


            document.addEventListener('click', (event) => {
    const isClickInside = menuLateral.contains(event.target) || btnExpandir.contains(event.target);

    if (!isClickInside) {
        menuLateral.classList.remove('active');
        menu.classList.remove('active');
        
    }
    
    
});

const copyToClipboard = (text) => {
    const input = document.createElement('textarea');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
  }
  
  const copyButton = document.querySelector('.fa-copy');
  const idElement = document.querySelector('.id');
  
  copyButton.addEventListener('click', () => {
    const idText = idElement.textContent;
    copyToClipboard(idText);
  });