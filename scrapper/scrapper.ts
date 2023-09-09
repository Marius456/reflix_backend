import { Movie } from './../src/models/movie.model';
import puppeteer, { Page } from 'puppeteer';
require('../src/mongoose');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    userDataDir: '.scrapper/tmp'
  });
  const pageMovieList = await browser.newPage();
  const pageTrailer = await browser.newPage();
  const pageMovieInfo = await browser.newPage();

  await pageMovieList.goto('https://www.imdb.com/chart/top');
  const movieHandles = await pageMovieList.$$('.ipc-metadata-list--base > li');
  for (const movieHandle of movieHandles) {
    const moviePageLink = await pageMovieList.evaluate(el => el.querySelector('.ipc-title > a')?.getAttribute('href'), movieHandle);
    await pageMovieInfo.goto('https://www.imdb.com' + moviePageLink);

    const movieTitleInfo = await pageMovieInfo.$('.sc-dffc6c81-0.iwmAVw');
    let movieTitle =  await pageMovieInfo.evaluate(el => el?.querySelector('.sc-afe43def-1.fDTGTb')?.textContent, movieTitleInfo);
    const movieRatingInfo = await pageMovieInfo.$('.sc-bde20123-2.gYgHoj');
    const movieRating: number = parseFloat((await pageMovieInfo.evaluate(el => el?.querySelector('.sc-bde20123-1')?.textContent, movieRatingInfo)) || "");

    let movieYear: number = parseInt((await pageMovieInfo.evaluate(el => el?.querySelector('.ipc-link--inherit-color')?.textContent, movieTitleInfo)) || "");
    const movieLinks = await pageMovieInfo.$('.sc-e226b0e3-4');
    const moviePoster = await pageMovieInfo.evaluate(el => el?.querySelector('img.ipc-image')?.getAttribute('src'), movieLinks);
    const movieTrailerLink = await pageMovieInfo.evaluate(el => el?.querySelector('[data-testid="video-player-slate-overlay"]')?.getAttribute('href'), movieLinks) || "";
    const movieGenres = await pageMovieInfo.evaluate(() => Array.from(document.querySelectorAll('.ipc-chip-list__scroller > a'), element => element.textContent));
    let movieTrailer = ""
    if (movieTrailerLink != "") {
      await pageTrailer.bringToFront();

      await pageTrailer.goto("https://www.imdb.com" + movieTrailerLink);

      await pageTrailer.waitForSelector('.jw-video.jw-reset');

      const movieTrailerInfo = await pageTrailer.$('.jw-wrapper.jw-reset');
      await pageTrailer.click('div.jw-controls.jw-reset > div.jw-display.jw-reset > div > div > div.jw-display-icon-container.jw-display-icon-display.jw-reset > div');

      if (movieTrailerInfo) {
        movieTrailer += await pageTrailer.evaluate(el => el.querySelector('.jw-media.jw-reset > video')?.getAttribute('src'), movieTrailerInfo);
      }

      await pageMovieInfo.bringToFront();
    }

    await autoScroll(pageMovieInfo);
    await pageMovieInfo.waitForSelector('[data-testid="storyline-plot-summary"]');
    const movieInfo = await pageMovieInfo.$('[data-testid="storyline-plot-summary"]');
    let movieSummary = ""
    if (movieInfo) {
      movieSummary += await pageMovieInfo.evaluate(el => el.querySelector('.ipc-html-content.ipc-html-content--base > .ipc-html-content-inner-div')?.textContent, movieInfo);
    }

    const newMovie = new Movie({
      title: movieTitle,
      year: movieYear,
      rating: movieRating,
      summary: movieSummary,
      genres: movieGenres,
      posterLink: moviePoster,
      trailerLink: movieTrailer,
    })
      newMovie.save();
      // console.log(newMovie)
      // break
  }
  await browser.close();
})();

async function autoScroll(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}