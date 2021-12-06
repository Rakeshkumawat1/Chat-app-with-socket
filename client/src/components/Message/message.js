import React from 'react';

// import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { user, text }, name }) => {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();

    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyEnd">
                    <p className="sentText pr-10">{trimmedName}</p>
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                    </div>
                </div>
            )
            : (
                <li className="clearfix">
                    <div className="message-data">
                        <span className="message-data-time">10:12 AM, Today</span>
                    </div>
                    <div className="message my-message">{text}</div>
                </li>
                // <div className="messageContainer justifyStart">
                //   <div className="messageBox backgroundLight">
                //     <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                //   </div>
                //   <p className="sentText pl-10 ">{user}</p>
                // </div>
            )
    );
}

export default Message;