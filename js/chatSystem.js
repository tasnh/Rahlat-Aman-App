const CHAT_DB = "rahlat_aman_chat_database";

/* =========================
   DATABASE
========================= */

function getDB() {

    return JSON.parse(
        localStorage.getItem(CHAT_DB)
    ) || {

        chats: {},
        users: {},
        groups: {}

    };

}

function saveDB(db) {

    localStorage.setItem(
        CHAT_DB,
        JSON.stringify(db)
    );

}

/* =========================
   CHAT ID
========================= */

function createChatId(a, b) {

    return [a, b]
        .sort()
        .join("__");

}

/* =========================
   GET CHAT
========================= */

function getChat(a, b) {

    const db = getDB();

    const id = createChatId(a, b);

    return db.chats[id] || [];

}

/* =========================
   SEND MESSAGE
========================= */

function sendMessage({

    from,
    to,
    text = "",
    type = "text",
    file = null,
    replyTo = null

}) {

    const db = getDB();

    const chatId =
        createChatId(from, to);

    if (!db.chats[chatId]) {

        db.chats[chatId] = [];

    }

    const msg = {

        id:
            "MSG_" + Date.now(),

        from,
        to,

        text,

        type,

        file,

        replyTo,

        seen: false,

        delivered: true,

        reactions: [],

        createdAt:
            new Date().toISOString(),

        time:
            new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })

    };

    db.chats[chatId].push(msg);

    saveDB(db);

    return msg;

}

/* =========================
   SEEN SYSTEM
========================= */

function markAsSeen(currentUser, otherUser) {

    const db = getDB();

    const chatId =
        createChatId(
            currentUser,
            otherUser
        );

    if (!db.chats[chatId]) return;

    db.chats[chatId].forEach(msg => {

        if (
            msg.to === currentUser
        ) {

            msg.seen = true;

        }

    });

    saveDB(db);

}

/* =========================
   UNREAD COUNT
========================= */

function getUnreadCount(
    currentUser,
    otherUser
) {

    const messages =
        getChat(
            currentUser,
            otherUser
        );

    return messages.filter(msg => {

        return (
            msg.to === currentUser &&
            !msg.seen
        );

    }).length;

}

/* =========================
   LAST MESSAGE
========================= */

function getLastMessage(a, b) {

    const messages =
        getChat(a, b);

    return messages[
        messages.length - 1
    ];

}