import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URLS } from 'config/api-routes';
import { catchError, Observable } from 'rxjs';
import { AccountEntity } from 'entities/Account.entity';
import { LoginCredentials } from 'interfaces/auth/login-credentials.interface';
import { ApiResponse } from 'interfaces/api/api-response.interface';
import { Tokens } from 'interfaces/auth/tokens.interface';
import { map } from 'rxjs/operators';

export const ACCESS_TOKEN = 'accessToken';

type AccountAndTokens = { account: AccountEntity } & Tokens;

@Injectable()
export class AuthService {
	constructor(private readonly http: HttpClient) {}

	public register(credentials: LoginCredentials): Observable<AccountEntity> {
		return this.http
			.post<ApiResponse<AccountEntity>>(
				API_URLS.ACCOUNT_REGISTER,
				credentials
			)
			.pipe(
				map(({ data: account }) => {
					return account;
				})
			);
	}

	public login(credentials: LoginCredentials): Observable<AccountEntity> {
		return this.http
			.post<ApiResponse<AccountAndTokens>>(
				API_URLS.ACCOUNT_LOGIN,
				credentials
			)
			.pipe(
				map(({ data: accountAndToken }) => {
					AuthService.setAccessToken(accountAndToken.accessToken);
					return accountAndToken.account;
				})
			);
	}

	public refresh() {
		return this.http
			.get<ApiResponse<Tokens>>(API_URLS.ACCOUNT_REFRESH_TOKEN, {
				withCredentials: true,
			})
			.pipe(
				map(({ data: tokens }) => {
					return tokens.accessToken;
				}),
				catchError(err => {
					console.log('in refresh - ', err);
					throw err;
				})
			);
	}

	public getAccessToken(): string {
		return localStorage.getItem(ACCESS_TOKEN) || '';
	}

	static setAccessToken(token: string) {
		localStorage.setItem(ACCESS_TOKEN, token);
	}
}
