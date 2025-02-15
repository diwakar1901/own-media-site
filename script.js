document.addEventListener('DOMContentLoaded', function() {
    loadHomePage();
});

function loadHomePage() {
    fetch('/api/news')
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById('content');
            content.innerHTML = '';
            data.forEach(news => {
                const article = document.createElement('article');
                article.innerHTML = `
                    <h2>${news.title}</h2>
                    <p>${news.content}</p>
                    ${news.image ? `<img src="${news.image}" alt="${news.title}">` : ''}
                    ${news.audio ? `<audio controls src="${news.audio}"></audio>` : ''}
                    ${news.video ? `<video controls src="${news.video}"></video>` : ''}
                `;
                content.appendChild(article);
            });
        });
}
