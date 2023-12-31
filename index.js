const express = require('express');
const bodyparser = require('body-parser')
const {writeToExcel} = require('./excel/excel')
const {lineNotify} = require('./Line notify/line')
const app = express();
const port = 8083;

const cors = require('cors');

app.use(cors())
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

// Define the route handler for /rut955
app.post('/rut955',async (req, res) => {
  try {
    console.log(req.body);
    const datetime = req.body[0].Timestamp;
    const rssi = req.body[0].RSSI;
    const temp = req.body[1].Temp;
    const data = {
        datetime: datetime,
        rssi: rssi,
        temp: temp,
    };
    console.log(data);

    // Call the writeToExcel function to append data to Excel file
    await writeToExcel(data);

    res.json({ status: 'complete' });
} catch (error) {
    console.error('Error processing /rut955:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

app.post('/test',(req,res)=>{
  console.log(req.body.object)
})

app.post('/line',async (req,res)=>{
  try{
    const a = req.body.a
    if (a<=10){
      const message = 'a less than 10'
      await lineNotify(message)
    }else{
      const message = 'a more than 10'
      await lineNotify(message)
    }
    res.json({status:"Complete"})
  }catch(error){
    console.error(error.message)
    res.json({status:error.message})
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
