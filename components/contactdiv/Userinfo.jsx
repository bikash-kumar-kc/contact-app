import React, { useRef, useState } from "react";
import styled from "styled-components";
import { BsPersonCircle } from "react-icons/bs";
import { LiaUserEditSolid } from "react-icons/lia";
import { AiOutlineUserDelete } from "react-icons/ai";
import services from "../../src/appwrite/databases";
import { useDispatch } from "react-redux";
import { update, remove } from "../../src/updateslice/updateSlice";

function Userinfo({
  username = "DummyUser",
  useremail = "dummyuser@gmail.com",
  userid,
  userimage,
  imageurl,
  contact,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedname, setupdatedname] = useState("");
  const [updatedemail, setupdatedemail] = useState("");
  const [updatedid, setupdatedid] = useState();
  const [url, seturl] = useState();
  const [showimage, setshowimage] = useState(false);

  const dispatch = useDispatch();

  const editContact = (email) => {
    setupdatedemail(editbutton.current.getAttribute("data-email"));
    setupdatedname(editbutton.current.getAttribute("data-name"));
    setupdatedid(editbutton.current.value);
    setIsModalOpen(true);
    console.log("your contact is ready to edit");
  };

  const deleteContact = async (value) => {
    try {
      const success = await services.deleteContactapp(
        deletebutton.current.value
      );

      const successimage = await services.deleteimage(
        deletebutton.current.value
      );
      if (success && successimage) console.log("successfully deleted..");
      dispatch(remove());
    } catch (error) {
      console.log("error from deleting contact" + error);
    }
  };

  const updateadd = async () => {
    const regexName = /^[A-Za-z ]{3,50}$/;
    const regexEmail = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,}$/;
    if (regexName.test(updatedname) && regexEmail.test(updatedemail)) {
      const response = await services.editcontactapp({
        documentid: updatedid,
        upname: updatedname,
        upemail: updatedemail,
      });

      dispatch(remove());
      setIsModalOpen(false);
    } else {
      alert("problme in email or name");
    }
  };

  const deletebutton = useRef();
  const editbutton = useRef();
  const image = useRef();

  const imagelook = () => {
    console.log("image is being ready for look");
    console.log(image.current.getAttribute("data-imageid"));
    imageurl.forEach((element) => {
      if (element.id === image.current.getAttribute("data-imageid")) {
        seturl(element.url);
        setshowimage(true);
      }
    });
    console.log(imageurl);
  };

  const closeimagelook = () => {
    setshowimage(false);
  };

  return (
    <>
      {isModalOpen && (
        <dialog>
          <div className="name">
            <label htmlFor="name">Name:</label>

            <input
              type="text"
             value={updatedname}
              onChange={(e) => setupdatedname(e.target.value)}
              placeholder="enter your name..."
              autoFocus
              autoComplete="off"
              id="name"
            />
          </div>

          <div className="email">
            <label htmlFor="email">Email: </label>

            <input
              type="email"
              id="email"
             value={contact.Email}
              onChange={(e) => setupdatedemail(e.target.value)}
              autoComplete="off"
              placeholder="enter your email..."
            />
          </div>

          <button onClick={updateadd}>Updated Contact</button>
        </dialog>
      )}

      {showimage && (
        <dialog className="dialogbox">
          <div className="name">
            <img
              src={url}
              style={{ width: "400px", height: "300px" }}
              alt="image......."
            />
            <br />
            <button onClick={closeimagelook}>close</button>
          </div>
        </dialog>
      )}
      <Userinfocontainer>
        <div className="user">
          <BsPersonCircle
            size={"40px"}
            color="orange"
            ref={image}
            data-imageid={userid}
            onClick={imagelook}
          />
          <div className="info">
            <h4>{username}</h4>
            <p>{useremail}</p>
          </div>
        </div>
        <div className="options">
          <Button
            value={userid}
            data-name={username}
            data-email={useremail}
            ref={editbutton}
            onClick={editContact}
          >
            <LiaUserEditSolid color="black" size={"30px"} />
          </Button>
          {/* <LiaUserEditSolid color='black' size={"30px"} onClick={editContact} /> */}
          <Button value={userid} ref={deletebutton} onClick={deleteContact}>
            {" "}
            <AiOutlineUserDelete color="blue" size={"30px"} />
          </Button>
        </div>
      </Userinfocontainer>
    </>
  );
}

export default Userinfo;

const Userinfocontainer = styled.div`
  width: 98%;
  height: 64px;
  background: #ffeaae;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  color: black;
  border-radius: 10px;
  padding: 5px;
  padding-right: 10px;

  .user {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 5px;
  }

  .info {
    margin-top: 23px;
  }

  .info h4 {
    margin: 0;
    padding: 0;
  }
  .options {
    display: flex;
    gap: 5px;
  }

  .dialogbox{
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
        
        }


`;

const Button = styled.button`
  background: transparent;
  border: none;
`;
