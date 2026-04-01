import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, signInWithGoogle, db, handleFirestoreError, OperationType } from './lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { LogIn, Brain, Sparkles, Plus, List, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './components/Dashboard';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Update user profile in Firestore
        const userRef = doc(db, 'users', currentUser.uid);
        try {
          await setDoc(userRef, {
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            lastActive: serverTimestamp()
          }, { merge: true });
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, `users/${currentUser.uid}`);
        }
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Brain className="w-12 h-12 text-accent" />
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center p-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full glass p-8 rounded-3xl"
        >
          <div className="bg-accent/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Brain className="w-12 h-12 text-accent" />
          </div>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Trợ lý Cá nhân AI</h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Người bạn đồng hành AI chủ động giúp bạn thu thập, tóm tắt và ưu tiên cuộc sống.
          </p>
          <button
            onClick={signInWithGoogle}
            className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95"
          >
            <LogIn className="w-5 h-5" />
            Đăng nhập với Google
          </button>
        </motion.div>
      </div>
    );
  }

  return <Dashboard user={user} />;
}

