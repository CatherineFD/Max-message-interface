import React from "react";
import { observer } from "mobx-react-lite";
import { MessageModel } from "../../model/MessageModel";
import styles from "./Message.module.css";

interface MessageProps {
    data: MessageModel;
    showAvatar?: boolean;
}

export const Message: React.FC<MessageProps> = observer(({ data, showAvatar = true }) => {
    if (data.isDeleted) {
        return (
            <div className={styles.deleted}>
                <em>Сообщение удалено</em>
            </div>
        );
    }

    return (
        <div
            className={`${styles.message} ${data.isOutgoing ? styles.outgoing : styles.incoming}`}
            data-message-id={data.id}
        >
            {showAvatar && !data.isOutgoing && (
                <div className={styles.avatar}>
                    {/* Аватар отправителя */}
                </div>
            )}

            <div className={styles.bubble}>
                {/* Ответ на сообщение (reply) */}
                {data.replyToId && (
                    <div className={styles.reply}>
                        <span>↩ В ответ на сообщение</span>
                    </div>
                )}

                {/* Контент по типу */}
                {data.type === "text" && <div className={styles.text}>{data.text}</div>}
                
                {data.type === "image" && data.mediaUrl && (
                    <img src={data.mediaUrl} alt="" className={styles.image} />
                )}
                
                {data.type === "voice" && (
                    <div className={styles.voice}>
                        <button className={styles.playBtn}>▶</button>
                        <span>{data.duration} сек</span>
                    </div>
                )}

                {/* Метаданные: время + статус */}
                <div className={styles.meta}>
                    <span className={styles.time}>{data.formattedTime}</span>
                    {data.editedAt && <span className={styles.edited}>изменено</span>}
                </div>
            </div>
        </div>
    );
});

Message.displayName = "Message";