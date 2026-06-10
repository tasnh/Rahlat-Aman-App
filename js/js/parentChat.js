/* =========================
   CURRENT USER
========================= */

const CURRENT_PARENT =
"Mother of Sarah";

const DRIVER =
"Bus Driver";

/* =========================
   ACTIVE CHAT
========================= */

let activeChat = DRIVER;

/* =========================
   SEND MESSAGE
========================= */

function sendTextMessage() {

    const input =
        document.getElementById("messageInput");

    if (!input.value.trim()) return;

    sendMessage({

        from: CURRENT_PARENT,
        to: activeChat,

        text: input.value,

        type: "text"

    });

    input.value = "";

    renderMessages();
    renderSidebar();

}

/* =========================
   RENDER MESSAGES
========================= */

function renderMessages() {

    const box =
        document.getElementById(
            "messagesContainer"
        );

    const messages =
        getChat(
            CURRENT_PARENT,
            activeChat
        );

    markAsSeen(
        CURRENT_PARENT,
        activeChat
    );

    box.innerHTML = "";

    messages.forEach(msg => {

        const isMe =
            msg.from === CURRENT_PARENT;

        const bubble =
        document.createElement("div");

        bubble.className =
        `bubble ${
            isMe ? "me" : "them"
        }`;

        let content = "";

        /* TEXT */

        if (msg.type === "text") {

            content += `
                <div class="msg-text">
                    ${msg.text}
                </div>
            `;

        }

        /* IMAGE */

        if (msg.type === "image") {

            content += `
                <img
                    src="${msg.file}"
                    class="chat-image"
                >
            `;

        }

        /* FILE */

        if (msg.type === "file") {

            content += `
                <div class="file-box">
                    📄 ${msg.fileName}
                </div>
            `;

        }

        bubble.innerHTML = `

            <small class="sender">
                ${msg.from}
            </small>

            ${content}

            <small class="msg-time">

                ${msg.time}

                ${
                    isMe
                    ? msg.seen
                        ? " ✓✓"
                        : " ✓"
                    : ""
                }

            </small>

        `;

        box.appendChild(bubble);

    });

    box.scrollTop =
        box.scrollHeight;

}

/* =========================
   SIDEBAR
========================= */

function renderSidebar() {

    const chats = [

        {
            name: DRIVER,
            type: "private"
        },

        {
            name: "Parents Group",
            type: "group"
        }

    ];

    const container =
    document.getElementById(
        "chatSidebar"
    );

    container.innerHTML = "";

    chats.forEach(chat => {

        const last =
            getLastMessage(
                CURRENT_PARENT,
                chat.name
            );

        const unread =
            getUnreadCount(
                CURRENT_PARENT,
                chat.name
            );

        const card =
        document.createElement("div");

        card.className = "chat-card";

        card.innerHTML = `

            <div class="avatar">
                ${
                    chat.type === "group"
                    ? "👥"
                    : "🚌"
                }
            </div>

            <div class="chat-info">

                <div class="top-row">

                    <h4>
                        ${chat.name}
                    </h4>

                    <small>
                        ${
                            last
                            ? last.time
                            : ""
                        }
                    </small>

                </div>

                <div class="bottom-row">

                    <small>

                        ${
                            last
                            ? last.text
                            : "No messages yet"
                        }

                    </small>

                    ${
                        unread > 0
                        ? `
                            <span class="badge">
                                ${unread}
                            </span>
                        `
                        : ""
                    }

                </div>

            </div>

        `;

        card.onclick = () => {

            activeChat =
                chat.name;

            renderMessages();

        };

        container.appendChild(card);

    });

}

/* =========================
   FILE SYSTEM
========================= */

function uploadFile(event) {

    const file =
        event.target.files[0];

    if (!file) return;

    const reader =
        new FileReader();

    reader.onload = function(e) {

        sendMessage({

            from: CURRENT_PARENT,

            to: activeChat,

            type: "image",

            file: e.target.result

        });

        renderMessages();

    };

    reader.readAsDataURL(file);

}

/* =========================
   EMOJI
========================= */

function addEmoji(emoji) {

    document
    .getElementById(
        "messageInput"
    )
    .value += emoji;

}
/* =========================
   AUTO REFRESH
========================= */
setInterval(() => {

    renderMessages();
    renderSidebar();

}, 1000);

/* =========================
   START
========================= */

renderSidebar();
renderMessages();