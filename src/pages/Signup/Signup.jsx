import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button/Button";
import { useState } from "react";
import { getUrl } from "../../helpers";
import "./signup.scss";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

const registerUser = async (body) => {
  const url = getUrl();

  const response = await fetch(`${url}/api/auth/signup`, {
    method: "POST",
    body: JSON.stringify(body),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};
export const Signup = () => {
  const [email, setEmail] = useState("example@example.com");
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [phoneNumber, setPhoneNumber] = useState("123456789");
  const [password, setPassword] = useState("example123");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const user = await registerUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
      });

      dispatch(setUser({ user: user }));
    } catch (error) {
      // TODO: Handle error
    }
  };

  const inputs = [
    {
      id: "Email",
      label: "Email",
      type: "text",
      value: email,
      onChange: handleEmail,
    },
    {
      id: "FirstName",
      label: "First name",
      type: "text",
      value: firstName,
      onChange: handleFirstName,
    },
    {
      id: "LastName",
      label: "Last name",
      type: "text",
      value: lastName,
      onChange: handleLastName,
    },

    {
      id: "PhoneNumber",
      label: "Phone number",
      type: "tel",
      value: phoneNumber,
      onChange: handlePhoneNumber,
    },
    {
      id: "Password",
      label: "Password (8 characters minimum)",
      type: "password",
      value: password,
      onChange: handlePassword,
    },
  ];

  return (
    <div id="signup">
      <div className="container__border">
        <div className="container">
          <div className="signup__content">
            <h2 className="sign__header h2">Create your account</h2>
            <form className="sign__form" onSubmit={handleSubmit}>
              {inputs.map((input, index) => {
                return (
                  <Input
                    key={index}
                    id={input.id}
                    label={input.label}
                    type={input.type}
                    value={input.value}
                    onChange={input.onChange}
                  />
                );
              })}

              <Button type="submit">Sign up</Button>
            </form>
            <span className="span">
              <span>Have an account? </span>
              <Link className="link" to="/signin">
                Sign in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
