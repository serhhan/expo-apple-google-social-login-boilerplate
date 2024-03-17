// useAuth.js
import React, { useState, useEffect, createContext, useContext } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthSessionResult } from "expo-auth-session/build/AuthSession.types";
import { AuthRequestPromptOptions } from "expo-auth-session/build/AuthRequest.types";

interface AuthContextType {
  userInfo: any; // You can replace 'any' with a more specific type tailored to your user info structure
  promptAsyncGoogle: (
    options?: AuthRequestPromptOptions | undefined
  ) => Promise<AuthSessionResult>;
  appleAuthAvailable: boolean;
  promptAsyncApple: () => Promise<void>;
}

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);
  const [request, response, promptAsyncGoogle] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  });

  useEffect(() => {
    handleSignInWithGoogle();
    checkAppleSignInAvailability();
  }, [response]);

  useEffect(() => {
    const checkAvailable = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailable(isAvailable);
    };
    checkAvailable();
  }, []);

  const getUserInfoGoogle = async (accessToken: string) => {
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
      console.error(error);
    }
  };

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfoGoogle(response.authentication!.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const promptAsyncApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // Here, you should handle credentials received.
      console.log(credential);
    } catch (e) {
      console.error(e);
    }
  };

  const checkAppleSignInAvailability = async () => {
    const isAvailable = await AppleAuthentication.isAvailableAsync();
    setAppleAuthAvailable(isAvailable);
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        promptAsyncGoogle,
        appleAuthAvailable,
        promptAsyncApple,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
