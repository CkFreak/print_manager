import * as Imap from "imap";
import { CH_DRUCK_PW } from "../../config/constants";

export const ImapService = (() => {
    const imap: Imap = new Imap({
        user: "ch-druck-eval@web.de",
        password: CH_DRUCK_PW,
        host: "imap.web.de",
        port: 993,
        tls: true,
    });

    const openInbox = (callback: any) => {
        imap.openBox("INBOX", false, callback);
    };

    const findAttachmentParts = (struct: any, attachments: any) => {
        attachments = attachments || [];
        for (let i = 0, len = struct.length; i < len; ++i) {
            if (Array.isArray(struct[i])) {
                findAttachmentParts(struct[i], attachments);
            } else {
                if (struct[i].disposition && ['INLINE', 'attachment'].indexOf(struct[i].disposition.type) > -1) {
                    attachments.push(struct[i]);
                }
            }
        }
        return attachments;
    };

    const startService = () => {
        imap.once("ready", () => {
            openInbox((err: Error, box: any) => {
                if (err) console.log(err);
                const fetched = imap.seq.fetch("1:3", {
                    bodies: ["HEADER.FIELDS (FROM TO SUBJECT DATE)"],
                    struct: true,
                });

                fetched.on("message", (msg, seqno) => {
                    msg.once("attributes", (attributes) => {
                        const attachments: any[] = findAttachmentParts(attributes.struct, undefined);
                        console.log(`Found ${attachments.length} attachments.`);
                        for (let i = 0; i < attachments.length; ++i) {
                            console.log(`Fetching attachment ${attachments[i].params.name}`);
                            const att: any = imap.fetch(attributes.uid, {
                                bodies: [attachments[i].partID],
                                struct: true,
                            });
                            // Process the attachment here
                            att.on("message", (msg: any, seqno: any) => {
                                msg.on("body", (stream: any, info: any) => {
                                    stream.on("data", (chunk: any) => {
                                        console.log(`Gotten some data: ${chunk}`);
                                    });
                                    stream.on("end", () => {
                                        console.log("Gotten all data");
                                    })
                                });
                            });
                        }
                    });
                    msg.once("end", () => {
                        console.log("Finished email");
                    });
                });
                fetched.once('error', function (err) {
                    console.log('Fetch error: ' + err);
                });
                fetched.once('end', function () {
                    console.log('Done fetching all messages!');
                    imap.end();
                });
            });
        });
    };

    imap.once('error', function (err: Error) {
        console.log(err);
    });

    imap.once('end', function () {
        console.log('Connection ended');
    });

    imap.connect();

    return {
        startService,
    }
})();
