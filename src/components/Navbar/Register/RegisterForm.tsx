import { useState } from "react";
import supabase from "../../../supabase";
import "./style.scss";

const registerForm = ({ showlogin }: any) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event: any) => {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        },
      });
      if (error) throw error;
      alert("check the e-mail");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-cont">
        <h2 className="form-title">Fill All Fields</h2>
        <input
          name="name"
          placeholder="Name"
          className="form-input"
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="E-mail"
          className="form-input"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="form-input"
          onChange={handleChange}
        />
        <div className="btn-cont">
          <button className="user-panel-btn" onClick={showlogin}>
            Back to Login
          </button>
          <button className="user-panel-btn" type="submit">
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default registerForm;
