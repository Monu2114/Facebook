import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [pageData, setPageData] = useState([]); // Initialize with an empty array
  const [selectedPage, setSelectedPage] = useState(null);
  const [submittedPage, setSubmittedPage] = useState(null); // Keep track of submitted page
  const [metrics, setMetrics] = useState({
    followers: 0,
    engagement: 0,
    impressions: 0,
    reactions: 0,
  });

  useEffect(() => {
    // Fetch the pages once after the component mounts
    FB.api("/me/accounts", function (response) {
      if (response && !response.error) {
        // Update the state with the list of pages
        console.log(response.data);
        setPageData(response.data);
      } else {
        console.log("Error retrieving pages:", response.error);
      }
    });
  }, []);

  const handlePageChange = (e) => {
    setSelectedPage(e.target.value); // Update selected page when user selects from dropdown
  };

  const handleSubmit = () => {
    if (selectedPage) {
      // When submit button is clicked, set the submitted page
      setSubmittedPage(selectedPage);

      // Simulate fetching metrics for the selected page
      const dummyMetrics = {
        followers: 1500, // Example value
        engagement: 300, // Example value
        impressions: 5000, // Example value
        reactions: 1000, // Example value
      };
      setMetrics(dummyMetrics);
    }
  };

  const location = useLocation();
  const { profile } = location.state || {};

  if (!profile) {
    return <p>No profile data available.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="mt-10 mb-20 border-2 border-gray-300 p-6 rounded-lg shadow-md w-screen  max-w-lg">
        <div className="flex flex-col items-center">
          <img
            src={profile.picture.data.url}
            alt={`${profile.name}'s profile`}
            className="rounded-full w-24 h-24 mb-4"
          />
          <h2 className="text-2xl font-semibold mb-4">{profile.name}</h2>

          <div className="w-full max-w-lg mb-4">
            <label
              htmlFor="pages"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select a Page:
            </label>
            <select
              id="pages"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handlePageChange}
            >
              <option value="">Select a page</option>
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
          </div>

          <button
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleSubmit}
            disabled={!selectedPage}
          >
            Submit
          </button>

          {/* Display metrics for the submitted page */}
          {submittedPage && (
            <div className="mt-6 w-full max-w-lg">
              <h3 className="text-lg font-semibold mb-4">Page Metrics</h3>
              <div className="bg-white shadow rounded-lg p-4 mb-4">
                <h4 className="font-semibold">Total Followers / Fans</h4>
                <p>{metrics.followers}</p>
              </div>
              <div className="bg-white shadow rounded-lg p-4 mb-4">
                <h4 className="font-semibold">Total Engagement</h4>
                <p>{metrics.engagement}</p>
              </div>
              <div className="bg-white shadow rounded-lg p-4 mb-4">
                <h4 className="font-semibold">Total Impressions</h4>
                <p>{metrics.impressions}</p>
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <h4 className="font-semibold">Total Reactions</h4>
                <p>{metrics.reactions}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
