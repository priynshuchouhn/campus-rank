'use client'
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AuthForm } from './auth-form';
import { LogIn } from 'lucide-react';

interface AuthDialogProps {
  children: React.ReactNode;
}

const AuthDialog = ({ children }: AuthDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogIn className="h-5 w-5" />
            Sign In to Campus Rank
          </DialogTitle>
        </DialogHeader>
        <AuthForm url='/leaderboard'/>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;