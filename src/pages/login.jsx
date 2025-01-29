import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux"; // Import useDispatch
import { setUser } from "@/features/userSlice";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  const handleLoginSuccess = (credentialResponse) => {
    try {
      const decodedToken = jwtDecode(credentialResponse.credential);
      const data = {
        email: decodedToken.email,
        name: decodedToken.name,
        img_url: decodedToken.picture,
      };
      // Dispatch the decoded data to Redux
      sessionStorage.setItem("user", JSON.stringify(data));

      dispatch(setUser(data));

      navigate("/"); // Redirect to home or other page
    } catch (e) {
      alert("Error decoding the token", e);
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex text-2xl justify-center">
            <div>Login</div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex w-full justify-center">
          <GoogleLogin
            className="w-full"
            onSuccess={handleLoginSuccess} // Use the handleLoginSuccess function
            onError={() => {
              alert("Login Failed");
            }}
          />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default Login;
