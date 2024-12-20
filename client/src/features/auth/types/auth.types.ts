{/*import type { IUser } from '@/features/user/types'

/**
 * Интерфейс для ответа аутентификации.

export interface IAuthResponse {
	user: IUser
}
*/}
export enum UserRole{
	Reguler = 'REGULAR',
	Admin = 'ADMIN'
}
export enum EnumAuthMethod{
	Credentials = 'CREDENTIALS',
	Google = 'GOOGLE',
	Yandex = 'YANDEX'
}

export interface IAccount{
	id: string
	createAt: string
	updateAt: string
	type: string
	provier: string
	refreshToken: string
	accessToken: string
	expiresAt: string
	userId: string
}

export interface IUser{
	id: string
	createAt: string
	updateAt: string
	email: string
	password: string
	displayName: string
	picture: string
	role: UserRole 
	isVerified: boolean 
	isTwoFactorEnabled: boolean 
	method: EnumAuthMethod
	accounts: IAccount
}