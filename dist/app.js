"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const service_1 = require("./service");
const app = express();
const port = 3000;
app.use(express.json());
app.use(body_parser_1.default.json());
//Assigndemo
app.post('/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        console.log(data);
        yield (0, service_1.filterAndStoreData)(data);
        res.send('Orders fltered and stored successfully');
    }
    catch (error) {
        res.send(' server error');
    }
}));
app.post('/arraydemo', (req, res) => {
    try {
        const arrayNums = req.body.array;
        console.log(arrayNums);
        const result = (0, service_1.ArrayMethods)(arrayNums);
        console.log(result);
        res.json(result);
    }
    catch (error) {
        res.send("Error for array api");
    }
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=app.js.map