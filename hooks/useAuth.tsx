// useAuth.js
import React, { useState, useEffect, createContext, useContext } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthSessionResult } from "expo-auth-session/build/AuthSession.types";
import { AuthRequestPromptOptions } from "expo-auth-session/build/AuthRequest.types";

interface AuthContextType {
  userInfo: any; // You can replace 'any' with a more specific type tailored to your user info structure
  promptAsync: (
    options?: AuthRequestPromptOptions | undefined
  ) => Promise<AuthSessionResult>;
}

WebBrowser.maybeCompleteAuthSession();

const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  const getUserInfo = async (accessToken: string) => {
    if (!accessToken) return;
    try {
      const response = await fetch(
        `https://www.googleapis.com/userinfo/v2/me`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const user = await response.json();
      setUserInfo(user);
      await AsyncStorage.setItem("@user", JSON.stringify(user));
    } catch (error) {
      // error handler
    }
  };

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication!.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  return (
    <AuthContext.Provider value={{ userInfo, promptAsync }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
