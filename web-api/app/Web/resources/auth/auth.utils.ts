import {differenceInMinutes} from 'date-fns';
import * as environment from '../../../../environment';


export function validatePasswordRequirements(password: string) {
    const minimumReqs = 2;
    if (password.length < environment.minimumPasswordLength) {
        return false;
    }
    const currentReqs = passwordReqs.reduce((acc, curr) => {
        acc += curr(password) ? 1 : 0;
        return acc;
    }, 0);
    return currentReqs >= minimumReqs;
}

export function hasLowerCase(password: string) {
    return !!password.match(/[a-z]/);
}

export function hasCaps(password: string) {
    return !!password.match(/[A-Z]/);
}

export function hasSpecialChar(password: string) {
    return !!password.match(/[\W]/);
}

export function hasDigit(password: string) {
    return !!password.match(/[\d]/);
}

const passwordReqs = [hasLowerCase, hasCaps, hasSpecialChar, hasDigit];

export interface IChangePassword {
    oldPassword?: string;
    newPassword1: string;
    newPassword2: string;
    resetId?: string;
}

export interface FacebookAuthEnvironment {
    baseUrl?: string;
    clientID?: string;
    clientSecret?: string;
    redirectURI?: string;
}
