
export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoUrl: string;
}

export interface Student {
    uid: string;
    displayName: string;
    class: number;
    contactMail: string[];
}
