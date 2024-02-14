import React from "react";

interface MessageProps {
    notification: {
        image: string;
        title: string;
        body: string;
    };
}

const Message: React.FC<MessageProps> = ({ notification }) => {
    return (
        <div className="flex flex-row gap-4">
            <div className="flex justify-between items-center text-xl font-bold">
                {notification.image && (
                    <div className="flex items-center">
                        <img src={notification.image} className="h-20 object-contain" alt="Notification" />
                    </div>
                )}
            </div>
            <div className="flex flex-col py-3 items-start justify-center gap-3">
                <span>{notification.title}</span>
                <span>{notification.body}</span>
            </div>
        </div>
    );
};

export default Message;
