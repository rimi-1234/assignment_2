import type { IRegisterPayload, ILoginPayload, IUserRes } from "./auth.interface.js";
export declare const AuthService: {
    registerUser: (payload: IRegisterPayload) => Promise<IUserRes>;
    loginUser: (payload: ILoginPayload) => Promise<{
        token: string;
        user: IUserRes;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map