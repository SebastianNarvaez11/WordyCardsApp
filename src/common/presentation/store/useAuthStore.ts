import {create} from 'zustand';

import {IUserModel} from '../../../modules/auth/domain/models';
import {AuthUseCases} from '../../../modules/auth/domain/use-cases';
import {IAuthStatus} from '../../../modules/auth/infrastructure/interfaces';
import {StorageAdapter} from '../../adapters';

interface IAuthStore {
  status: IAuthStatus;
  user?: IUserModel;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>()((set, get) => ({
  status: 'checking',
  user: undefined,

  login: async (email: string, password: string) => {
    const resp = await AuthUseCases.login({email, password});

    if (!resp) {
      get().logout();
      return false;
    }

    await StorageAdapter.setItem('ACCESS-TOKEN-WC', resp.accessToken);
    await StorageAdapter.setItem('REFRESH-TOKEN-WC', resp.refreshToken);

    set({status: 'authenticated', user: resp.user});

    return true;
  },

  checkStatus: async () => {
    const {ok, user} = await AuthUseCases.checkStatus();

    console.log(user);

    if (!ok) {
      return get().logout();
    }

    set({status: 'authenticated', user});
  },

  logout: async () => {
    await StorageAdapter.removeItem('access-token');
    await StorageAdapter.removeItem('refresh-token');

    set({
      status: 'unauthenticated',
      user: undefined,
    });
  },
}));
