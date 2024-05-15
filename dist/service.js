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
exports.ArrayMethods = exports.filterAndStoreData = void 0;
const pgConfig_1 = __importDefault(require("./pgConfig"));
//Assignment -1
function createTableIfNotExists() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield pgConfig_1.default.connect();
            const res = yield client.query(`
            CREATE TABLE IF NOT EXISTS Orders (id SERIAL PRIMARY KEY,orderID VARCHAR(20) NOT NULL)
        `);
            console.log('Table created successfully.');
            client.release();
        }
        catch (error) {
            console.error('Error creating table:', error);
            throw error;
        }
    });
}
function filterAndStoreData(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield createTableIfNotExists();
            const filteredOrders = payload.items.filter((item) => {
                return item.OrderBlocks.some((block) => {
                    if (Array.isArray(block.lineNo)) {
                        return block.lineNo.some((lineNo) => lineNo % 3 === 0);
                    }
                    else {
                        return block.lineNo % 3 === 0;
                    }
                });
            });
            const orderIDs = filteredOrders.map((order) => order.orderID);
            yield Promise.all(orderIDs.map((orderID) => __awaiter(this, void 0, void 0, function* () {
                const client = yield pgConfig_1.default.connect();
                try {
                    yield client.query('INSERT INTO Orders (orderID) VALUES ($1)', [orderID]);
                }
                finally {
                    client.release();
                }
            })));
        }
        catch (error) {
            console.error('Error filtering and storing orders:', error);
            throw error;
        }
    });
}
exports.filterAndStoreData = filterAndStoreData;
//Array methods
function ArrayMethods(array) {
    if (!Array.isArray(array)) {
        throw new Error('Invalid array');
    }
    const result = {};
    // Concat
    result.concatedArray = array.concat([10, 11, 12]);
    // Pop 
    const popEle = array.pop();
    result.poppedElement = popEle;
    // Map 
    result.mappedArray = array.map((item) => item + 2);
    // Filter 
    result.filteredArray = array.filter((item) => item % 2 === 0);
    // forEach
    array.forEach((item, index) => {
        result[`3 * ${index + 1}`] = item * 3;
    });
    // find 
    result.findElement = array.find((item) => item === 5);
    // some
    result.someCondition = array.some((item) => item > 5);
    // Push 
    array.push(13);
    result.pushedElement = array;
    // every
    result.everyCondition = array.every((item) => item < 10);
    // includes 
    result.includesElement = array.includes(8);
    // indexof
    result.indexOfElement = array.indexOf(3);
    //lastindexof
    result.lastIndexOfElement = array.lastIndexOf(3);
    // Splice 
    const splicedArray = array.slice();
    const removedElements = splicedArray.splice(1, 2);
    result.splicedArray = splicedArray;
    result.removedElements = removedElements;
    // Slice array
    result.slicedArray = array.slice(1, 4);
    // Shift 
    result.shiftedElement = array.shift();
    // Unshift
    const unshiftedArray = array.slice(); // Clone array to prevent mutation
    unshiftedArray.unshift(0);
    result.unshiftedArray = unshiftedArray;
    // Join 
    result.joinedArray = array.join('-');
    // tostring
    result.arrayToString = array.toString();
    //split
    const nameString = 'Dnyaneshwar,Gaurav,Moeen';
    result.splitStringArray = nameString.split(',');
    // Replace 
    const replacedArray = array.slice(); // Clone array to prevent mutation
    replacedArray[1] = 12;
    result.replacedArray = replacedArray;
    return result;
}
exports.ArrayMethods = ArrayMethods;
//# sourceMappingURL=service.js.map