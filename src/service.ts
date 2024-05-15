
import pool from './pgConfig';

//Assignment -2-Tasks
async function createTableIfNotExists(): Promise<void> {
    try {
        const client = await pool.connect();
        const res = await client.query(`
            CREATE TABLE IF NOT EXISTS Orders (id SERIAL PRIMARY KEY,orderID VARCHAR(20) NOT NULL)
        `);
        console.log('Table created successfully.');
        client.release();
    } catch (error) {
        console.error('Error creating table:', error);
        throw error;
    }
}

async function filterAndStoreData(payload: any): Promise<void> {
    try {
        await createTableIfNotExists();

        const filteredOrders = payload.items.filter((item: any) => {
            return item.OrderBlocks.some((block: any) => {
                if (Array.isArray(block.lineNo)) {
                    return block.lineNo.some((lineNo: number) => lineNo % 3 === 0);
                } else {
                    return block.lineNo % 3 === 0;
                }
            });
        });

        const orderIDs = filteredOrders.map((order: any) => order.orderID);

        await Promise.all(orderIDs.map(async (orderID: string) => {
            const client = await pool.connect();
            try {
                await client.query('INSERT INTO Orders (orderID) VALUES ($1)', [orderID]);
            } finally {
                client.release();
            }
        }));
    }
    catch (error) {
        console.error('Error filtering and storing orders:', error);
        throw error;
    }
}

//Array methods

function ArrayMethods(array: any[]): any {
    if (!Array.isArray(array)) {
        throw new Error('Invalid array');
    }

    const result: any = {};

    // Concat
    result.concatedArray = array.concat([10, 11, 12]);

    // Pop 
    const popEle = array.pop();
    result.poppedElement = popEle;

    // Map 
    result.mappedArray = array.map((item: any) => item + 2);

    // Filter 
    result.filteredArray = array.filter((item: any) => item % 2 === 0);

    // forEach
    array.forEach((item: any, index: number) => {

        result[`3 * ${index + 1}`] = item * 3;
    });

    // find 
    result.findElement = array.find((item: any) => item === 5);

    // some
    result.someCondition = array.some((item: any) => item > 5);

     // Push 
     array.push(13);
     result.pushedElement = array;

    // every
    result.everyCondition = array.every((item: any) => item < 10);

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



export { filterAndStoreData, ArrayMethods };
