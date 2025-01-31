// frontend/src/components/Matchs/Matchs.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatches } from "../../redux/slices/userSlice";

const Matchs = () => {
  const dispatch = useDispatch();
  const { matches, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getMatches());
  }, [dispatch]);

  if (loading) return <p>Chargement des matchs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Mes Matchs</h2>
      {matches.length === 0 ? (
        <p>Aucun match pour le moment.</p>
      ) : (
        matches.map((match) => (
          <div
            key={match._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>
              {match.name}, {match.age}
            </h3>
            <p>{match.location}</p>
            <p>{match.bio}</p> {/* Afficher la bio si disponible */}
          </div>
        ))
      )}
    </div>
  );
};

export default Matchs;
