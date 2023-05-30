import { useEffect, useState } from 'react';
import './App.css';
import {Auth} from "./components/auth";
import { db} from "./config/firebase";
import { getDocs, collection,addDoc,deleteDoc,doc} from "firebase/firestore";



function App() {
     const [datalist, setDatalist] = useState([])


     const[newPersonName, setPersonName] = useState("");
     const[newPhonenumber, setPhonenumber] = useState("");
     const[newAddress, setAddress] = useState("");
     const[newAge, setAge] = useState("");

     const dataCollectionRef = collection(db, 'personal data')
     

    
 

    const onSubmitPersonaldata = async () => {
      try{
    await addDoc(dataCollectionRef,{name: newPersonName,
       phonenumber: newPhonenumber,
       Address:newAddress,
       Age:newAge,
    } )

  
  } catch(err){
    console.error(err); 
  }
    }

    const deletepersonaldata = async (id) =>{
      const personaldataDoc = doc(db,"personal data",id)
      await deleteDoc(personaldataDoc);

    }

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
    <input placeholder= "person name..."onChange={(e) =>setPersonName(e.target.value)}/>
    <input placeholder= "phonenumber..."type="number"onChange={(e) =>setPhonenumber(e.target.value)}/>
    <input placeholder= "address..."onChange={(e) =>setAddress(e.target.value)}/>
    <input placeholder="age..."type="number"onChange={(e) =>setAge(e.target.value)}/>/>
    <button onClick={onSubmitPersonaldata}>Submit personaldata</button>
   </div>


  <div>
  {datalist.map((personaldata) => (
    <div key={personaldata.id}>
      <h1>{personaldata.name}</h1>
     <p>phoneno:{personaldata.phonenumber}</p>
     <button onClick={() =>deletepersonaldata(personaldata.id)}>Delete Personal Data</button>
  </div>
  ))}
  </div>
  </div>
  );
}

export default App;
