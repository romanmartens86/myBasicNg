
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


export interface booksPersonOwn {

    name?: string;
    email?: string;
    thumb_picture?: string;
    picture?: string;

    UID?: string;

    rights?: number;


    // generic key
    // name has to be a string
    // value can be anything
    [key: string]: any;
}