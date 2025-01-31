// frontend/src/components/Auth/Profile.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../api/api";

const Profile = () => {
  const { token, userId } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    location: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Récupérer le profil de l'utilisateur
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await API.get("/auth/profile");
        setProfile(response.data);
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          age: response.data.age || "",
          gender: response.data.gender || "",
          location: response.data.location || "",
          bio: response.data.bio || "",
        });
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.msg || "Erreur lors de la récupération du profil"
        );
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.put("/auth/profile", formData);
      setProfile(response.data);
      setLoading(false);
      alert("Profil mis à jour avec succès !");
    } catch (err) {
      setError(
        err.response?.data?.msg || "Erreur lors de la mise à jour du profil"
      );
      setLoading(false);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!profile) return null;

  return (
    <div>
      <h2>Mon Profil</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Nom"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Email"
          required
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={onChange}
          placeholder="Âge"
        />
        <select name="gender" value={formData.gender} onChange={onChange}>
          <option value="">Sélectionner le genre</option>
          <option value="male">Homme</option>
          <option value="female">Femme</option>
          <option value="other">Autre</option>
        </select>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={onChange}
          placeholder="Localisation"
        />
        <textarea
          name="bio"
          value={formData.bio}
          onChange={onChange}
          placeholder="Bio"
        ></textarea>
        <button type="submit" disabled={loading}>
          {loading ? "Mise à jour..." : "Mettre à jour le profil"}
        </button>
      </form>
      <div>
        <h3>Détails du Profil</h3>
        <p>
          <strong>Nom:</strong> {profile.name}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Âge:</strong> {profile.age}
        </p>
        <p>
          <strong>Genre:</strong> {profile.gender}
        </p>
        <p>
          <strong>Localisation:</strong> {profile.location}
        </p>
        <p>
          <strong>Bio:</strong> {profile.bio}
        </p>
      </div>
    </div>
  );
};

export default Profile;
