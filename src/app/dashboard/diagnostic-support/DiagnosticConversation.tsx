import { DiagnosticSupportDataType } from "@/app/dashboard/diagnostic-support/DiagnosticSupportChat";
import { Paperclip } from "lucide-react";
import React from "react";
import { IoMdSend } from "react-icons/io";
import { PiDotsThreeVerticalBold } from "react-icons/pi";

const DiagnosticConversation = ({
  selectedConvo,
}: {
  selectedConvo: DiagnosticSupportDataType;
}) => {
  return (
    <section className="col-span-1 md:col-span-2 bg-white w-full relative flex flex-col rounded-t-xl shadow-md h-full">
      {/* Header */}
      <div className="flex items-center text-white justify-between w-full px-5 py-2 bg-primary-green rounded-t-xl">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-medium">
            {selectedConvo.compoundId}: {selectedConvo.title}
          </h2>
          <p className="text-xs">{selectedConvo.time}</p>
        </div>
        <PiDotsThreeVerticalBold size={20} className="text-white" />
      </div>

      {/* Messages */}
      <div className="flex-grow h-full w-full overflow-y-scroll scrollbar-hide pb-10">
        <div className="flex flex-col gap-3 bg-chat-bg bg-no-repeat bg-cover bg-center w-full px-5 py-3 overflow-y-scroll scrollbar-hide">
          <p className="text-gray-700 bg-blue-100 rounded-full px-6 py-1 flex flex-col items-center text-center pt-2 w-fit text-xs mx-auto">
            Today
          </p>

          <div className="flex flex-col gap-5 w-full min-h-full pt-10 pb-5">
            {selectedConvo.chats.map((chat, index) => {
              const isUser = chat.user !== undefined;
              return (
                <div
                  key={index}
                  className={`flex flex-col gap-2 w-1/2 p-5 text-sm rounded-lg shadow-md ${
                    isUser
                      ? "bg-secondary-gray self-end text-white items-end"
                      : "bg-primary-gray/10 self-start text-secondary-gray items-start"
                  }`}
                >
                  <p className="text-sm">{chat.message}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <form
        method="post"
        onSubmit={(e) => e.preventDefault()}
        className="absolute bottom-0 right-0 w-full bg-white border-t border-t-secondary-gray/20 flex items-center gap-2 px-5 py-2"
      >
        <Paperclip size={20} className="text-primary-gray/50 cursor-pointer" />
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full px-5 py-3 text-sm text-primary-gray bg-transparent border-0 rounded-md outline-none flex-1"
        />
        <button type="submit">
          <IoMdSend size={20} className="text-primary-blue" />
        </button>
      </form>
    </section>
  );
};

export default DiagnosticConversation;
