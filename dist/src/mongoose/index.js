"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb+srv://root:6tZvkrHivlVPKdaA@moviedb.k5nwilw.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map