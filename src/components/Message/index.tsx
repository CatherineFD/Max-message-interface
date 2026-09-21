import React from "react";
import { observer } from "mobx-react-lite";
import { MessageModel } from "../../model/MessageModel";
import styles from "./Message.module.css";

interface MessageProps {
    data: MessageModel;
}

export const Message: React.FC<MessageProps> = observer(({ data }) => {
    if (data.isDeleted) {
        return (
            <div className={styles.deleted}>
                <em>Сообщение удалено</em>
            </div>
        );
    }

    return (
        <div
            className={`${styles.message}`}
            data-message-id={data.id}
        >
            <div className={styles.bubble}>
                {/* Ответ на сообщение (reply) */}
                {data.replyToId && (
                    <div className={styles.reply}>
                        <span>↩ В ответ на сообщение</span>
                    </div>
                )}

                {/* Контент по типу */}
                {data.type === "text" && <div className={styles.text}>{data.text}</div>}
                

                {/* Метаданные: статус */}
                <div className={styles.meta}>
                    {data.editedAt && <span className={styles.edited}>изменено</span>}
                </div>
            </div>
        </div>
    );
});

Message.displayName = "Message";