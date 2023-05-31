import { useEffect, useState } from 'react';
import './App.css';
import {Auth} from "./components/auth";
import { db,auth,storage} from "./config/firebase";
import { getDocs, collection,addDoc,deleteDoc,updateDoc,doc} from "firebase/firestore";
import{ ref, uploadBytes} from "firebase/storage";


function App() {
     const [datalist, setDatalist] = useState([])


     const[newPersonName, setPersonName] = useState("");
     const[newPhonenumber, setPhonenumber] = useState("");
     const[newAddress, setAddress] = useState("");
     const[newAge, setAge] = useState("");

     const [updatedpersonaldata,setUpdatedpersonaldata] = useState("")

    const [fileUpload,setFileUpload] = useState(null)


     const dataCollectionRef = collection(db, 'personal data') 
 

    const onSubmitPersonaldata = async () => {
      try{
    await addDoc(dataCollectionRef,{name: newPersonName,
       phonenumber: newPhonenumber,
       Address:newAddress,
       Age:newAge,
       userId: auth?.currentUser.uid,
    } )

  
  } catch(err){
    console.error(err); 
  }
    }

    const deletepersonaldata = async (id) =>{
      const personaldataDoc = doc(db,"personal data",id)
      await deleteDoc(personaldataDoc);

    }
    const Updatepersonaldata = async (id) =>{
      const personaldataDoc = doc(db,"personal data",id)
      await updateDoc(personaldataDoc,{personaldata: updatedpersonaldata});

    }

     const uploadFile = async () => {
  if (!fileUpload) return;
  const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
  try {
    await uploadBytes(filesFolderRef, fileUpload);
  } catch (err) {
    console.error(err);
  }
};



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

     <input placeholder ="new title..." onChange={(e => setUpdatedpersonaldata(e.target.value))} />
     <button onClick={() => updatedpersonaldata(personaldata.id)}>Update Personal data</button>
  </div>
  ))}
  </div>
  <div>
    <input type='file' onChange={(e) => setFileUpload(e.target.files[0])}/>
    <button onClick={uploadFile} >Upload File</button>
  </div>
  </div>
  );
}

export default App;
