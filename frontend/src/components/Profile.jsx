import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
export default function ProfilePage() {
  const [pageData, setData] = useState("");

  useEffect(() => {
    // Ensure that the API call only happens once after the component mounts
    FB.api("/me/accounts", function (response) {
      if (response && !response.error) {
        // Update the state with the list of pages
        console.log(response.data);
        setData(response.data);
      } else {
        console.log("Error retrieving pages:", response.error);
      }
    });
  }, []);
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
      <p>Pages :</p>
      <select name="Pages" id="">
        {pageData.length > 0 ? (
          pageData.map((page) => (
            <option key={page.id} value={page.id}>
              {page.name}
            </option>
          ))
        ) : (
          <option>No Pages Available</option>
        )}
      </select>
      <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </div>
  );
}
