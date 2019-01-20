import { IServerError } from "./IServerError";
import { autobind } from "core-decorators";

@autobind
export class ServerErrorParser {
    private readonly error: IServerError;

    constructor(error: IServerError) {
        this.error = error;
    }

    getErrorMessage(): string {
        return this.error.message;
    }

    getErrorCode(): number {
        return this.error.code;
    }
}
