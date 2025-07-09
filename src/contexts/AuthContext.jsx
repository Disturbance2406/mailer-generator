import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Subscription tiers
  const SUBSCRIPTION_TIERS = {
    FREE: 'free',
    BRONZE: 'bronze',
    GOLD: 'gold',
    PLATINUM: 'platinum'
  };

  // Tier configurations
  const TIER_CONFIG = {
    [SUBSCRIPTION_TIERS.FREE]: {
      name: 'Free',
      price: 0,
      currency: 'ZAR',
      templates: 2,
      downloads: 0,
      canSave: false,
      support: 'Basic',
      features: ['2 Basic Templates', 'Full Customization', 'Live Preview']
    },
    [SUBSCRIPTION_TIERS.BRONZE]: {
      name: 'Bronze',
      price: 1200,
      currency: 'ZAR',
      templates: 'all',
      downloads: 1,
      canSave: false,
      support: 'Email',
      features: ['All Templates', 'Full Customization', '1 HTML Download', 'Email Support']
    },
    [SUBSCRIPTION_TIERS.GOLD]: {
      name: 'Gold',
      price: 4000,
      currency: 'ZAR',
      originalPrice: 6000,
      templates: 'all',
      downloads: 5,
      canSave: true,
      support: 'Priority',
      features: ['All Templates', '5 HTML Downloads', 'Save & Edit Drafts', 'Priority Support']
    },
    [SUBSCRIPTION_TIERS.PLATINUM]: {
      name: 'Platinum',
      price: 6000,
      currency: 'ZAR',
      originalPrice: 12000,
      templates: 'all',
      downloads: 10,
      canSave: true,
      support: 'VIP (2h)',
      features: ['All Features', '10 HTML Downloads', 'VIP Support', 'Future Templates', 'Advanced Branding']
    }
  };

  async function signup(email, password, displayName) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update display name
    await updateProfile(user, { displayName });
    
    // Create user profile in Firestore
    const userProfile = {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      subscriptionTier: SUBSCRIPTION_TIERS.FREE,
      downloadsUsed: 0,
      savedMailers: [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    await setDoc(doc(db, 'users', user.uid), userProfile);
    return userCredential;
  }

  async function login(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last login
    const userRef = doc(db, 'users', userCredential.user.uid);
    await setDoc(userRef, { lastLogin: new Date().toISOString() }, { merge: true });
    
    return userCredential;
  }

  async function logout() {
    return signOut(auth);
  }

  async function getUserProfile(uid) {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists() ? userDoc.data() : null;
  }

  async function updateUserProfile(updates) {
    if (!currentUser) return;
    
    const userRef = doc(db, 'users', currentUser.uid);
    await setDoc(userRef, updates, { merge: true });
    
    // Update local state
    setUserProfile(prev => ({ ...prev, ...updates }));
  }

  async function upgradeSubscription(newTier) {
    if (!currentUser) return;
    
    await updateUserProfile({
      subscriptionTier: newTier,
      upgradeDate: new Date().toISOString()
    });
  }

  async function incrementDownloads() {
    if (!currentUser || !userProfile) return;
    
    const newDownloadsUsed = userProfile.downloadsUsed + 1;
    await updateUserProfile({ downloadsUsed: newDownloadsUsed });
  }

  function canDownload() {
    if (!userProfile) return false;
    
    const tierConfig = TIER_CONFIG[userProfile.subscriptionTier];
    return userProfile.downloadsUsed < tierConfig.downloads;
  }

  function canAccessTemplate(templateIndex) {
    if (!userProfile) return false;
    
    const tierConfig = TIER_CONFIG[userProfile.subscriptionTier];
    
    if (tierConfig.templates === 'all') return true;
    if (typeof tierConfig.templates === 'number') {
      return templateIndex < tierConfig.templates;
    }
    
    return false;
  }

  function getRemainingDownloads() {
    if (!userProfile) return 0;
    
    const tierConfig = TIER_CONFIG[userProfile.subscriptionTier];
    return Math.max(0, tierConfig.downloads - userProfile.downloadsUsed);
  }

  function getTierConfig(tier = null) {
    const targetTier = tier || (userProfile?.subscriptionTier || SUBSCRIPTION_TIERS.FREE);
    return TIER_CONFIG[targetTier];
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Load user profile from Firestore
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    updateUserProfile,
    upgradeSubscription,
    incrementDownloads,
    canDownload,
    canAccessTemplate,
    getRemainingDownloads,
    getTierConfig,
    SUBSCRIPTION_TIERS,
    TIER_CONFIG
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

