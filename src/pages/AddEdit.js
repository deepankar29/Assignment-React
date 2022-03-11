import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./AddEdit.css";
import fireDb from "../firebase";
import { toast } from "react-toastify";

const initialState = {
  name: "",
    phone: "",
    type: "",
    isWhatsapp: false,
    profilePicture: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, phone, type, isWhatsapp, profilePicture} = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error("Please provide value in each input field");
    } else {
      if (!id) {
        fireDb.child("contacts").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Contact Added Successfully");
          }
        });
      } else {
        fireDb.child(`contacts/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Contact Updated Successfully");
          }
        });
      }

      setTimeout(() => history.push("/"), 500);
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name..."
          value={name || ""}
          onChange={handleInputChange}
        />
       <label htmlFor="phone">Phone</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={handleInputChange}
                />
          <label htmlFor="type">Type</label>
                <select
                    type="text"
                    id="type"
                    name="type"
                    placeholder="Enter type"
                    value={type}
                    onChange={handleInputChange}>
                    <option value="Personal">Personal</option>
                    <option value="Office">Offfice</option>
                </select>
                
         <label htmlFor="iswhatsapp">isWhatsapp</label>
                <select
                    type="iswhatsapp"
                    id="iswhatsapp"
                    name="iswhatsapp"
                    placeholder="Enter iswhatsapp"
                    onChange={handleInputChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>

                <label htmlFor="profilePicture">Profile Picture</label>
                <input
                    type=""
                    id="profilePicture"
                    name="profilePicture"
                    placeholder="Enter URL"
                    accept="image/*"
                    value={profilePicture}
                    onChange={handleInputChange}
                />
                
        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;
