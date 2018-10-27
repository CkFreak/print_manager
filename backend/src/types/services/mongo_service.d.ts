export interface MongoServiceT {
    registerUser(name: string, password: string): Promise<any>;
    getUserByName(name: string): Promise<any>;
}
