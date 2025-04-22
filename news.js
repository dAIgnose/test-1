const apiKey = '8166406351e4b9c6e9fac8127acab110460'; // Replace with your NewsData.io API key
const apiUrl = `https://newsdata.io/api/1/news?apikey=pub_8166406351e4b9c6e9fac8127acab110460db&q=health%20news&country=in&language=en&category=health `;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const newsContainer = document.getElementById('news-container');
    if (data.results && data.results.length > 0) {
      data.results.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const newsImage = article.image_url ? `<img src="${article.image_url}" alt="News Image">` : '';
        const newsTitle = article.title ? `<h3>${article.title}</h3>` : '';
        const newsDescription = article.description ? `<p>${article.description}</p>` : '';
        const newsLink = article.link ? `<a href="${article.link}" target="_blank">Read more</a>` : '';

        newsItem.innerHTML = `${newsImage}${newsTitle}${newsDescription}${newsLink}`;
        newsContainer.appendChild(newsItem);
      });
    } else {
      newsContainer.innerHTML = '<p>No health news available at the moment.</p>';
    }
  })
  .catch(error => {
    console.error('Error fetching health news:', error);
    document.getElementById('news-container').innerHTML = '<p>Failed to load health news. Please try again later.</p>';
  });