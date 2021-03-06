import { createFeature, createReducer, on } from '@ngrx/store';
import {
	addAccountUser,
	setAccount,
	setAccountUsers,
	setCurrentUser,
} from './user.actions';
import { UserEntity } from 'entities/User.entity';
import { AccountEntity } from 'entities/Account.entity';

export interface UserState {
	account: AccountEntity | null;
	currentUser: UserEntity | null;
	users: UserEntity[];
}

const initialState: UserState = {
	account: null,
	currentUser: null,
	users: [],
};

export const userFeatureKey = 'user';

export const userReducer = createReducer(
	initialState,
	on(setAccount, (state, { account }) => ({ ...state, account })),
	on(setAccountUsers, (state, { users }) => ({ ...state, users })),
	on(addAccountUser, (state, { user }) => ({
		...state,
		users: [...state.users.filter(us => us.id !== user.id), user].sort(
			(a, b) => a.id - b.id
		),
	})),
	on(setCurrentUser, (state, { userId }) => {
		const user = state.users.find(u => u.id === userId)!;
		return { ...state, currentUser: user };
	})
);

export const UserFeature = createFeature({
	name: userFeatureKey,
	reducer: userReducer,
});
