import express = require('express');
import bodyParser from 'body-parser';
import { Application, Request, Response } from 'express';

import { filterAndStoreData,ArrayMethods } from './service';


const app = express();
const port=3000;
app.use(express.json());
app.use(bodyParser.json());



//Assigndemo

app.post('/orders', async (req: Request, res: Response) => {
  try {
       const data=req.body;
       console.log(data);
       await filterAndStoreData(data); 
       res.send('Orders fltered and stored successfully');
  } 
  catch (error) {
       res.send(' server error');
  }
});

app.post('/arraydemo', (req: Request, res: Response) => {
    try {        
        const arrayNums: number[] = req.body.array;
        console.log(arrayNums);
       
        const result = ArrayMethods(arrayNums);
        console.log(result);
        res.json(result);
    } 
    catch (error) {
        res.send("Error for array api" );
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

    
