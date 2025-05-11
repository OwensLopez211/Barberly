import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Mail, Lock, User } from 'lucide-react';

interface SignupFormProps {
  onToggleForm: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onToggleForm }) => {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ 
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: { 
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (confirmPassword !== password) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      await signup(name, email, password, 'client');
      // Redirect will be handled by auth context
    } catch (error) {
      setErrors({ email: 'Failed to create account. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Join StylistHub to book appointments and more
        </p>
      </div>
      
      <Input
        type="text"
        label="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="John Doe"
        error={errors.name}
        icon={<User size={18} className="text-gray-500" />}
        required
      />
      
      <Input
        type="email"
        label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        error={errors.email}
        icon={<Mail size={18} className="text-gray-500" />}
        required
      />
      
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        error={errors.password}
        icon={<Lock size={18} className="text-gray-500" />}
        required
      />
      
      <Input
        type="password"
        label="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="••••••••"
        error={errors.confirmPassword}
        icon={<Lock size={18} className="text-gray-500" />}
        required
      />
      
      <div className="flex items-start">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
          required
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          I agree to the{' '}
          <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
            Privacy Policy
          </a>
        </label>
      </div>
      
      <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
        Create account
      </Button>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onToggleForm}
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Sign in
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;