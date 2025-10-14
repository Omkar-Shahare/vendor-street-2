import React, { useState } from "react";
import { authService } from "../../services/supabaseAuth";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Package, ArrowLeft } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SupplierAuth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { profileCompleted } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await authService.signIn({ email, password });
        navigate("/supplier/dashboard");
      } else {
        await authService.signUp({
          email,
          password,
          metadata: { userType: 'supplier' }
        });
        navigate("/supplier/profile-setup");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 pt-20">
        {/* Back Button - Below Navbar */}
        <div className="container mx-auto px-4 pt-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 p-2 bg-white/80 hover:bg-white rounded-lg shadow-md transition-all duration-200 text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </button>
        </div>
        
        <div className="flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl border-2 border-supplier/30">
        <CardHeader className="flex flex-col items-center pb-2">
          <div className="w-16 h-16 bg-gradient-supplier rounded-full flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">{isLogin ? "Supplier Login" : "Supplier Signup"}</CardTitle>
          <CardDescription>
            {isLogin ? "Access your supplier dashboard" : "Create your supplier account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            <Button type="submit" variant="supplier" className="w-full">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>
          <div className="text-center mt-2">
            <button
              type="button"
              className="text-supplier underline text-sm hover:text-supplier/80"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SupplierAuth;
