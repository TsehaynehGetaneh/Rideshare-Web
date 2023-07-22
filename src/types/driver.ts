

export interface Driver {
    id:            number;
    userId:        string;
    user:          User;
    rate:          number[];
    experience:    number;
    address:       string;
    licenseNumber: string;
    license:       string;
    verified:      boolean;
}

export interface User {
    roles:          any[];
    fullName:       string;
    phoneNumber:    string;
    age:            number;
    statusByLogin:  null;
    profilePicture: null;
}