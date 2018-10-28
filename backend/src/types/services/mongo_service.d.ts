export interface MongoServiceT {
    registerUser(name: string, password: string): Promise<any>;
    getUserByName(name: string): Promise<any>;
    updateClientFromEmail(name: string, totalJobs: number, totalPages: number): Promise<any>;
    markPaymentForClient(name: string): Promise<any>;
    retrieveClients(): Promise<any>;
}
