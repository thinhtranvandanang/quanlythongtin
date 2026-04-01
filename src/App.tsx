import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { LogIn, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import Dashboard from './components/Dashboard';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) console.error('Error signing in:', error.message);
  };

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

