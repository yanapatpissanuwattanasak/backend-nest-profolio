import { Users } from 'model/user.model';

export const usersRepository = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: Users,
  },
];
