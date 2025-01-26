import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import axios from "axios";

export function Login({
  openModal,
  onCloseModal,
  onLoginSuccess,
}: {
  openModal: boolean;
  onCloseModal: () => void;
  onLoginSuccess: (user: {
    name: string;
    email: string;
    avatar: string;
  }) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = isSignUp
      ? "http://localhost:5000/api/auth/signup"
      : "http://localhost:5000/api/auth/login";

    const requestData = isSignUp
      ? { email, password, name }
      : { email, password };

    try {
      const response = await axios.post(url, requestData);

      if (response.status === 200 || response.status === 201) {
        alert(response.data.message);
        onLoginSuccess({
          name: response.data.name || email,
          email,
          avatar: "",
        });
        onCloseModal();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Authentication failed. Please try again.");
    }
  };

  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {isSignUp ? "Sign up for our platform" : "Sign in to our platform"}
          </h3>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Your name" />
                </div>
                <TextInput
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div className="mt-4 w-full space-y-4">
              <Button
                type="submit"
                className="w-full bg-red-800 hover:bg-red-700 text-white"
              >
                {isSignUp ? "Sign up" : "Log in"}
              </Button>
            </div>
          </form>
          <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
            {isSignUp ? "Already have an account?" : "Not registered?"}&nbsp;
            <a
              href="#"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-red-800 hover:underline dark:text-cyan-500"
            >
              {isSignUp ? "Sign in" : "Create account"}
            </a>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
