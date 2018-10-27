import { MongoServiceT } from "../types/services/mongo_service";
import { ImapService } from "../types/services/imap_service";

export const ClientUpdateService = (mongo: MongoServiceT) => {

    const updateDatabase = async () => {
        ImapService.fetchAttachments(async (update: any[]) => {
            const updates = [];
            for (let i = 0; i < update.length; ++i) {
                if (update[i].Benutzername && update[i]["Jobs gesamt"] && update[i]["Seiten gesamt"]) {
                    updates.push(mongo.updateClientFromEmail(
                        update[i].Benutzername,
                        Number.parseInt(update[i]["Jobs gesamt"]),
                        Number.parseInt(update[i]["Seiten gesamt"])));
                }
            }
            for (let i = 0; i < updates.length; ++i) {
                await updates[i];
            }
        });
    };

    return {
        updateDatabase,
    }
};
