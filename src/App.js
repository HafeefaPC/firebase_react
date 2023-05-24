import { useEffect, useState } from 'react';
import './App.css';
import {Auth} from "./components/auth";
import { db} from "./config/firebase";
import { getDocs, collection} from "firebase/firestore";



function App() {
     const [datalist, setDatalist] = useState([])

     const dataCollectionRef = collection(db, "personal data")
    
 useEffect(() =>  {  
    const getDatalist = async () => {
   try{
   const data = await  getDocs(dataCollectionRef);
   const filteredData = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,  
  }));

  setDatalist(filteredData);
    } catch (err) {
      console.error(err);
    }
    };
    getDatalist();
    }, []);
  return ( 
  <div className="App">
    <Auth />

  <div>
  {datalist.map((personaldata) => (
    <div>
      <h1>{personaldata.name}</h1>
     <p>phoneno:{personaldata.phonenumber}</p>
  </div>
  ))}
  </div>
  </div>
  );
}

export default App;
