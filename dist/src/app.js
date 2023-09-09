"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require('../src/mongoose');
var cors = require('cors');
exports.app = (0, express_1.default)();
const port = process.env.PORT || 3001;
exports.app.use(cors());
const movieRouter = require('./routes/movies');
exports.app.use('/movies', movieRouter);
exports.app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map