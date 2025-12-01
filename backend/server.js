import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const PORT = process.env.PORT || 5000;


server.get('/', (req, res) => {
  res.send('inventory management system')
})

server.listen(PORT, ()=>{
    console.log(`server is up and running on port http://localhost:${PORT}`);
}) 


export {server};