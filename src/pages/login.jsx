import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
const Login = () => {
  const navigate = useNavigate();
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
            onSuccess={(credentialResponse) => {
              jwtDecode(credentialResponse.credential);
              navigate("/");
            }}
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
