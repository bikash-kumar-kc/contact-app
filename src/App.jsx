import { useEffect, useState,useRef } from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import { SiAppwrite } from "react-icons/si";
import Userinfo from "../components/contactdiv/Userinfo";
import services from "./appwrite/databases";
import { ID } from "appwrite";
import { useId } from "react";
import { useSelector } from "react-redux";
import {store} from './app/store.js'
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import config from "../config/config.js";



function App() {

  const container = useRef(null)
  const image= useRef(null)
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [name,setname]=useState("")
  const [email,setEmail]=useState("")
  const [data,setdata]=useState([])
  const [copydata,setcopydata]=useState([])
  const [fetching,setfetching]=useState(true)
  const [error,setError]=useState()
  const [searchinput,setsearchinput]=useState("")
  const [isadd,setisadd]=useState(false)
  const [errorimage,seterrorimage]=useState(false);
  const storedata = useSelector((state)=> state.called);
  const [images,setimages]=useState()
  const [imagefetching,setimagefetching]=useState(false)
  const [showimage,setshowimage]=useState(false);


  const addcontact = ()=>{
   setIsModalOpen(true);
    
  }
const [loadingimage,setloadingimage]=useState(true)
  const getimages = async()=>{
   
 return await services.getallimages()
   
   


  }

  console.log(getimages())

  useEffect(()=>{

    const getcontacts = async()=>{
      try{
      await services.getallcontacts()
       .then((response)=>{
        setdata(response.documents)
        setfetching(false)
        setcopydata(response.documents)

       
  
       })
      }catch(error){
setError("error from fetching contacts"+error)
      }
       
    }

    getcontacts()


     const fetchImages = async () => {
      try {
        // Get all files from the bucket
        const res = await services.getallimages();

        // Map files to include direct URL
        const filesWithUrls = res.files.map(file => ({
          id: file.$id,
          name: file.name,
          // url: storage.getFilePreview(file.bucketId, file.$id).href
         // url: services.getfilepreview(file.$id),
        url: `https://cloud.appwrite.io/v1/storage/buckets/${file.bucketId}/files/${file.$id}/view?project=${config.appwriteProjectid}`

        }));

        setimages(filesWithUrls);
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setimagefetching(true);
      }
    };

    fetchImages();
    
  },[isadd,setisadd,storedata])


  const filtercontact=(value)=>{

    if (value.length > 0) {
      let tempData = data.filter((option) =>
        option.Name.toLowerCase().includes(value.toLowerCase())
      );
      console.log(tempData)
      if (Object.keys(tempData).length > 0) setdata(tempData);
    } else setdata(copydata);
  }
  
  
function isValidImage(file){
  const allowedtypes=['image/jpeg','image/png'];
  return allowedtypes.includes(file.type);
}
  const btnadd= async()=>{
   const regexName = /^[A-Za-z ]{3,50}$/
   const regexEmail = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/
   const duplicate = copydata.some((each)=>  each.Email===email)
   const file = image.current.files[0]

   if(!duplicate){

   

   if(regexName.test(name) && regexEmail.test(email) && isValidImage(file)){
    const id = ID.unique()
const appwritecreatecontact= await services.createContact({Name:name,Email:email,userid:id})
const appwritestoreimage = await services.uploadimage(file,id)
 setisadd((prevs)=>!prevs);
  setIsModalOpen(false)
  seterrorimage((prevs)=>!prevs)
   }else{
    alert("something wrong with name or email");
    seterrorimage(prevs=> !prevs)
   }
    
   }else{
    alert("already added in contact list...");
    setEmail("")
    setname("")
   }
  } 


  const imagelook=()=>{
    console.log("ready for image preview");
  }
  return (
    <>
      <Container ref={container}>
      
      {isModalOpen &&   <dialog >
        <div className="name">
           <label htmlFor="name">Name:</label>
          
         <input type="text" value={name} onChange={(e)=> setname(e.target.value)} placeholder="enter your name..." autoFocus autoComplete="off" id="name"/>
        </div>

        <div className="email">
          <label htmlFor="email">Email: </label>
       
          <input type="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} autoComplete="off" placeholder="enter your email..." />
        </div>

       <div className="image">
        <label htmlFor="chooseImage" id="labelimage">Upload Image</label>
        <input type="file" id="chooseImage" ref={image} style={{display:"none"}} accepts="image/png,image/jpeg" />
       {errorimage && <p style={{color:'red'}}>only image type of jpeg or png</p> }
       </div>
       <button onClick={btnadd}>Add Contact</button>
        </dialog>}
        <Defaultcontainer>
          <div className="contactapp">
            {/* <img src="/appwritelogo.png" alt="appwriteimage" /> */}
            <SiAppwrite size={`20px`}  color="red"  />
            <h3>Appwrite Contact App</h3>
          </div>
          <div className="searchadd">
            <div className="searchbutton">
             <label htmlFor="input">
               <IoIosSearch size={"25px"}/>
             </label>
              <input type="text" id="input" value={searchinput} onChange={(e)=>{
                setsearchinput(e.target.value)
                filtercontact(e.target.value)
              }} placeholder="search your contact" />
            </div>
            <Button onClick={addcontact}> <MdAdd size={"40px"}/> </Button>
          </div>
        </Defaultcontainer>
      
        <Contactcontainer>
         {fetching||error?(<h1>error or loading</h1>):
         data.map((each)=>(
          <Userinfo key={each.userid} contact={each} username={each.Name} useremail={each.Email} userid={each.userid} imageurl={images} />
         ))
         }
        </Contactcontainer>
        
      </Container>
{/* <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {imagefetching ? (
        images.map(img => (
          <div key={img.id}>
            <img
              src={img.url}
              alt={img.name}
              style={{
                width: "200px",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 0 5px rgba(0,0,0,0.2)"
              }}
            />
            <p style={{ textAlign: "center" }}>{img.name}</p>
          </div>
        ))
      ) : (
        <p>No images found.</p>
      )}
    </div> */}
     
    </>
  );
}

export default App;

const Container = styled.div`
width:500px;
height:600px;
background:#242426;
padding:10px;
border-radius:10px;
border:1px solid cyan;
gap:10px;
opacity:  1;}

 dialog{
        /* width: 300px;
        height: 200px; */
        border: none;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 0 40px rgba(0,0,0,0.3);
        color: grey;
        background: whitesmoke;
        width:450px;
        height:400px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        background:white;
        gap:20px;

        .name, .email{
        width:100%;
        display:flex;
        flex-direction:column;
        gap:0;
        align-items:flex-start;
        justify-content:center;
        font-size:20px;
        padding-left:20px;
        
        
        
        }

        input{
        margin-top:5px;
        width:95%;
        height:50px;
        font-size:20px;
        padding:0 5px;
        border-radius:0;
        outline:1px solid black;
        }
        button{
        align-self:flex-end;
        padding:4px 12px;
        margin-right:20px;
        font-size:15px;
        background:yellow;
        border-radius:3px;

        }

      

       
  #labelimage{
        border:1px solid black;
        padding:4px 8px;
        border-radius:4px;
        }

        #labelimage:hover{
        transition:1s;
        background:green;
        color:white;
        border:1px solid transparent;
        }
       

       }

`;

const Defaultcontainer = styled.div`
width:100%;
height:150px;
display:flex;
flex-direction:column;
align-items:center;
justify-content:flex-start;
gap:20px;
padding:10px;


.contactapp{
display:flex;
align-items:center;
justify-content:center;
gap:10px;
width:100%;
background:white;
height:50px;
border-radius:10px;
color:black;
margin:0 auto;

}

.searchadd{
width:99%;
display:flex;
flex-direction:row;
gap:20px;
align-items:center;
justify-content:center;
}

.searchbutton{
height:40px;
width:100%;
border:2px solid white;
padding:0 10px;
display:flex;
gap:20px;
align-items:center;
justify-content:center;
border-radius:10px;
}

input{
width:95%;
height:40px;
outline:none;
border:none;
background:transparent;
font-size:20px;
color:white;
}

h3{
padding-top:4px;}
`;

const Button = styled.button`
border-radius:50%;
height:50px;
width:50px;
padding-left:5px;
padding-right:5px;
border:none;
display:flex;
align-items:center;
justify-content:center;
outline:none;
background:white;

`


const Contactcontainer = styled.div`
height:400px;
display:flex;
align-items:center;
flex-direction:column;
gap:10px;
overflow:auto;
flex-wrap:no-wrap;




`