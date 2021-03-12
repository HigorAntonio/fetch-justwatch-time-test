const fetch = require('node-fetch');
const fs = require('fs');

const getPageUrl = page => {
  return `https://apis.justwatch.com/content/titles/pt_BR/popular?body=%7B%22` + 
  `fields%22:[%22cinema_release_date%22,%22full_path%22,%22full_paths%22,%22id%22,%22localized_re` + 
  `lease_date%22,%22object_type%22,%22poster%22,%22scoring%22,%22title%22,%22tmdb_popularity%22,%2` + 
  `2offers%22],%22content_types%22:[%22movie%22],%22genres%22:[%22msc%22,%22act%22,%22ani%22,%22cm` + 
  `y%22,%22crm%22,%22fml%22,%22eur%22,%22hrr%22,%22hst%22,%22fnt%22,%22drm%22,%22doc%22,%22rly%22,` + 
  `%22wsn%22,%22war%22,%22scf%22,%22rma%22,%22trl%22,%22spt%22],%22providers%22:[%22prv%22,%22nfx%` + 
  `22],%22enable_provider_filter%22:false,%22monetization_types%22:[],%22page%22:${page},%22page_size%22` + 
  `:30,%22matching_offers_only%22:true%7D`;
}

const writeToFile = (fileName, content) => {
  fs.appendFile(fileName, JSON.stringify(content, null, 2), err => {
    if(err) throw new Error('something went wrong');

    console.log('well done!');
  });
}

(async () => {
  const response = await fetch(getPageUrl(1))
  const movies = await response.json();

  // console.log(movies)
  // console.log(movies.total_pages)
  writeToFile('justWatchMovies.json', movies);

  for (let i = 2; i <= movies.total_pages; i++) {
    const response = await fetch(getPageUrl(i));
    const movies = await response.json();

    writeToFile('justWatchMovies.json', movies);
  }
})();

//TEMPO DE EXECUÇÃO APROXIMADO DE 50 SEGUNDOS PARA PEGAR TODOS OS FILMES DISPONÍVEIS NO AMAZON PRIME 
// E NA NETFLIX E GRAVAR EM UM ARQUIVO