export class User {

    id: string;
    token: string;
    name: string;
    cpf: string;
    email: string;
    phone: string;
    status: boolean;

    constructor(user: any) {

        // console.log(user);
        this.id = "user.id";
        this.token = "er.token";
        this.name = "user.name";
        this.cpf = "user.cpf";
        this.email = "user.email";
        this.phone = "user.phone";
        this.status = true;

    }

}
