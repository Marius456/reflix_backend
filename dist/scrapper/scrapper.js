"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const movie_model_1 = require("./../src/models/movie.model");
const puppeteer_1 = __importDefault(require("puppeteer"));
require('../src/mongoose');
(async () => {
    const browser = await puppeteer_1.default.launch({
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
        const moviePageLink = await pageMovieList.evaluate(el => { var _a; return (_a = el.querySelector('.ipc-title > a')) === null || _a === void 0 ? void 0 : _a.getAttribute('href'); }, movieHandle);
        await pageMovieInfo.goto('https://www.imdb.com' + moviePageLink);
        const movieTitleInfo = await pageMovieInfo.$('.sc-dffc6c81-0.iwmAVw');
        let movieTitle = await pageMovieInfo.evaluate(el => { var _a; return (_a = el === null || el === void 0 ? void 0 : el.querySelector('.sc-afe43def-1.fDTGTb')) === null || _a === void 0 ? void 0 : _a.textContent; }, movieTitleInfo);
        const movieRatingInfo = await pageMovieInfo.$('.sc-bde20123-2.gYgHoj');
        const movieRating = parseFloat((await pageMovieInfo.evaluate(el => { var _a; return (_a = el === null || el === void 0 ? void 0 : el.querySelector('.sc-bde20123-1')) === null || _a === void 0 ? void 0 : _a.textContent; }, movieRatingInfo)) || "");
        let movieYear = parseInt((await pageMovieInfo.evaluate(el => { var _a; return (_a = el === null || el === void 0 ? void 0 : el.querySelector('.ipc-link--inherit-color')) === null || _a === void 0 ? void 0 : _a.textContent; }, movieTitleInfo)) || "");
        const movieLinks = await pageMovieInfo.$('.sc-e226b0e3-4');
        const moviePoster = await pageMovieInfo.evaluate(el => { var _a; return (_a = el === null || el === void 0 ? void 0 : el.querySelector('img.ipc-image')) === null || _a === void 0 ? void 0 : _a.getAttribute('src'); }, movieLinks);
        const movieTrailerLink = await pageMovieInfo.evaluate(el => { var _a; return (_a = el === null || el === void 0 ? void 0 : el.querySelector('[data-testid="video-player-slate-overlay"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('href'); }, movieLinks) || "";
        const movieGenres = await pageMovieInfo.evaluate(() => Array.from(document.querySelectorAll('.ipc-chip-list__scroller > a'), element => element.textContent));
        let movieTrailer = "";
        if (movieTrailerLink != "") {
            await pageTrailer.bringToFront();
            await pageTrailer.goto("https://www.imdb.com" + movieTrailerLink);
            await pageTrailer.waitForSelector('.jw-video.jw-reset');
            const movieTrailerInfo = await pageTrailer.$('.jw-wrapper.jw-reset');
            await pageTrailer.click('div.jw-controls.jw-reset > div.jw-display.jw-reset > div > div > div.jw-display-icon-container.jw-display-icon-display.jw-reset > div');
            if (movieTrailerInfo) {
                movieTrailer += await pageTrailer.evaluate(el => { var _a; return (_a = el.querySelector('.jw-media.jw-reset > video')) === null || _a === void 0 ? void 0 : _a.getAttribute('src'); }, movieTrailerInfo);
            }
            await pageMovieInfo.bringToFront();
        }
        await autoScroll(pageMovieInfo);
        await pageMovieInfo.waitForSelector('[data-testid="storyline-plot-summary"]');
        const movieInfo = await pageMovieInfo.$('[data-testid="storyline-plot-summary"]');
        let movieSummary = "";
        if (movieInfo) {
            movieSummary += await pageMovieInfo.evaluate(el => { var _a; return (_a = el.querySelector('.ipc-html-content.ipc-html-content--base > .ipc-html-content-inner-div')) === null || _a === void 0 ? void 0 : _a.textContent; }, movieInfo);
        }
        const newMovie = new movie_model_1.Movie({
            title: movieTitle,
            year: movieYear,
            rating: movieRating,
            summary: movieSummary,
            genres: movieGenres,
            posterLink: moviePoster,
            trailerLink: movieTrailer,
        });
        newMovie.save();
        // console.log(newMovie)
        // break
    }
    await browser.close();
})();
async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
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
//# sourceMappingURL=scrapper.js.map