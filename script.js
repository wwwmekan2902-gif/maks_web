// Sahypa ýüklenende Netlify Function arkaly san al
fetch('/.netlify/functions/viewCount')
  .then(res => res.json())
  .then(data => {
    document.getElementById('view-count').textContent = data.count;
  })
  .catch(err => console.error(err));
