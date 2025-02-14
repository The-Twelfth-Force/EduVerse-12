export const saltAndHashPassword = async (password: string | unknown): Promise<string> => {
    if (typeof password !== 'string') {
        throw new Error('Password must be a string');
    }
    const hash = password;
    return hash;
};

export const comparePassword = async (password: string | unknown, hash: string | unknown): Promise<boolean> => {
    if (typeof password !== 'string' || typeof hash !== 'string') {
        throw new Error('Password and hash must be strings');
    }
    return hash === (await saltAndHashPassword(password));
};