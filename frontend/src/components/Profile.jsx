import React from "react";
import { useLocation } from "react-router-dom";

export default function ProfilePage() {
  const location = useLocation();
  const { profile } = location.state || {};

  if (!profile) {
    return <p>No profile data available.</p>;
  }

  return (
    <div>
      <img
        src={profile.picture.data.url}
        alt={`${profile.name}'s profile`}
        className="rounded-full"
      />
      <h2>{profile.name}</h2>
      <select name="Pages" id="">
        <option value="">Page - 1</option>
        <option value="">Page - 2</option>
      </select>
    </div>
  );
}
