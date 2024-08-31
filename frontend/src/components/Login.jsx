import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FacebookLogin() {
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    // Load the Facebook SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);

      // Initialize the Facebook SDK after it's loaded
      js.onload = () => {
        window.fbAsyncInit = function () {
          FB.init({
            appId: "1999095760509410", // Replace with your app ID
            xfbml: true,
            version: "v20.0",
          });
        };
      };
    })(document, "script", "facebook-jssdk");
  }, [navigate]);

  const handleLogin = () => {
    FB.login(
      function (response) {
        if (response.authResponse) {
          console.log("Welcome! Fetching your information....");
          FB.api(
            "/me",
            { fields: "id,name,email,picture" },
            function (profile) {
              navigate("/profile", { state: { profile } });
            }
          );
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { config_id: 3330570817238181, scope: "public_profile,email" }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center justify-center">
      <div className="flex  gap-2 mb-4 mr-10	">
        <img
          src="/src/assets/facebook-logo.png"
          alt="Facebook Logo"
          className="h-16 object-contain"
        />

        <h1 className="text-6xl font-bold text-center text-slate-50	 mb-10">
          facebook
        </h1>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Log in to connect with Facebook and access your personalized content.
        </p>
        <button
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          onClick={handleLogin}
        >
          Log in with Facebook
        </button>
      </div>
    </div>
  );
}
