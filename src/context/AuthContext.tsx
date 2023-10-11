import {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {ICredentials} from '../types/credentials';
import {IAuthResponse} from '../types/responses';
import * as Keychain from 'react-native-keychain';

interface AuthProps {
  authState?: {token: string | null; authenticated: boolean | null};
  onLogin?: (credentials: ICredentials) => Promise<any>;
  onLogout?: () => Promise<any>;
  loading?: boolean;
}

export const API_URL = 'https://emsystem2.onrender.com';
// export const API_URL = 'http://10.0.2.2:3001';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({token: null, authenticated: null});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      setLoading(true);
      const token = await Keychain.getGenericPassword();
      if (token) {
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${token.password}`;
        setAuthState({
          token: token.password,
          authenticated: true,
        });
        setLoading(false);
      }
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async (credentials: ICredentials) => {
    try {
      setLoading(true);
      const result: IAuthResponse = await axios.post(
        `${API_URL}/auth/login`,
        credentials,
      );
      setAuthState({
        token: result.data.backendTokens.accessToken,
        authenticated: true,
      });
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${result.data.backendTokens.accessToken}`;

      await Keychain.setGenericPassword(
        credentials.username,
        result.data.backendTokens.accessToken,
      );
      setLoading(false);
      return result;
    } catch (error: any) {
      setLoading(false);
      return {error: true, msg: error.response};
    }
  };

  const logout = async () => {
    await Keychain.resetGenericPassword();
    axios.defaults.headers.common['Authorization'] = '';
    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    authState,
    loading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
