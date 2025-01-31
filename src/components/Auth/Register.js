// frontend/src/components/Auth/Register.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    location: "",
  });

  const { name, email, password, age, gender, location } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(formData)).then((res) => {
      if (res.type === "auth/register/fulfilled") {
        navigate("/swipe");
      }
    });
  };

  if (token) {
    navigate("/swipe");
  }

  return (
    <div className="register-container">
      <h2>Inscription</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Nom"
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Mot de passe"
          required
        />
        <input
          type="number"
          name="age"
          value={age}
          onChange={onChange}
          placeholder="Âge"
        />
        <select name="gender" value={gender} onChange={onChange}>
          <option value="">Sélectionner le genre</option>
          <option value="male">Homme</option>
          <option value="female">Femme</option>
          <option value="other">Autre</option>
        </select>
        <input
          type="text"
          name="location"
          value={location}
          onChange={onChange}
          placeholder="Localisation"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Chargement..." : "S'inscrire"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
