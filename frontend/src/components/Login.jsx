import React, { useEffect } from "react";

export default function FacebookLogin() {
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

          FB.getLoginStatus(function (response) {
            if (response.status === "connected") {
              // User is logged in
              FB.api("/me", { fields: "name,email" }, function (profile) {
                document.getElementById(
                  "profile"
                ).innerHTML = `Good to see you, ${profile.name}. I see your email address is ${profile.email}.`;
              });
            } else {
              // User is not logged in
              console.log("User is not logged in.");
            }
          });
        };
      };
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleLogin = () => {
    FB.login(
      function (response) {
        if (response.authResponse) {
          console.log("Welcome! Fetching your information....");
          FB.api("/me", { fields: "name,email" }, function (profile) {
            document.getElementById(
              "profile"
            ).innerHTML = `Good to see you, ${profile.name}. I see your email address is ${profile.email}.`;
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="h-60 min-w-72 bg-slate-100 border-2 flex flex-col items-center justify-center gap-y-5 rounded shadow-sm">
        <h1 className="text-blue-600 font-bold text-4xl mb-4">Facebook</h1>
        <button
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogin}
        >
          Log in to Facebook
        </button>
        <div id="profile"></div>
      </div>
    </div>
  );
}
