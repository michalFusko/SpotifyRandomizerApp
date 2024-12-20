import "../styles/components/login.css";

const Login = () => {
  const CLIENT_ID = "11be729c8a7142abba52c439912f4892";
  const REDIRECT_URI = "https://randomizer-app.vercel.app/";
  // const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=user-library-read`;
  const SCOPES = [
    "user-follow-read",
    "user-library-read",
    "playlist-read-private",
    "playlist-read-collaborative",
  ];
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
    "%20",
  )}&response_type=token&show_dialog=true`;

  const redirectToSpotify = () => {
    window.location = AUTH_URL;
  };
  return (
    <div className="login-container">
      <p className="login-introduction">
        Have you saved hundreds, maybe thousands of albums, playlists and
        podcasts and can&apos;t decide what to listen to right now?
        <br />
        <br /> <strong>Don&apos;t worry, we got you!</strong>
      </p>
      <img src="/spotify.png" alt="" className="login-img" />
      <p className="login-content">To Start Using The App Login With Spotify</p>
      <button onClick={() => redirectToSpotify()} className="login-btn">
        LOGIN
      </button>
    </div>
  );
};

export default Login;
