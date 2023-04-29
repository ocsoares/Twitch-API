import { HttpException } from '@nestjs/common';

export class UserAlreadyExistsByEmailException extends HttpException {
    constructor() {
        super('Já existe um usuário cadastrado com esse email !', 400);
    }
}
