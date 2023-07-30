import { type FC } from "react";
import { VscClose } from "react-icons/vsc";

interface ModalProps {
  title?: string;
  text?: string;
  acceptText?: string;
  declineText?: string;
  isShown: boolean;
  onClose: () => void;
  onContinue?: () => void;
  isAcceptButton?: boolean;
  isDeclineButton?: boolean;
}

export const Modal: FC<ModalProps> = ({
  title = "Log in to continue",
  text = "You need to be logged in to like a tweet.",
  acceptText = "Log in",
  declineText = "Decline",
  isShown,
  onClose,
  onContinue = () => null,
  isAcceptButton = true,
  isDeclineButton = true,
}) => {
  return (
    <div
      className={`fixed ${
        !isShown && "hidden"
      } bottom-0 left-0 right-0 top-0 z-50 backdrop-blur-[1px]`}
    >
      <div
        id="medium-modal"
        tabIndex={-1}
        className="fixed left-0 right-0 top-0 z-50 flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0"
      >
        <div className="relative max-h-full w-full max-w-lg">
          <div className="relative rounded-lg border bg-white">
            <div className=":border-gray-600 flex items-center justify-between rounded-t border-b p-5">
              <h3 className=":text-white text-xl font-medium text-gray-900">
                {title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className=":hover:bg-gray-600 :hover:text-white ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 transition-colors pc-hover:bg-gray-200 pc-hover:text-gray-900"
                data-modal-hide="medium-modal"
              >
                <VscClose className="text-2xl" />
                <span className="sr-only" onClick={onClose}>
                  Close modal
                </span>
              </button>
            </div>
            <div className="space-y-6 p-6">
              <p className="text-base leading-relaxed text-gray-500">{text}</p>
            </div>
            <div className=":border-gray-600 flex items-center space-x-2 rounded-b border-gray-200 p-6">
              {isAcceptButton && (
                <button
                  onClick={onContinue}
                  data-modal-hide="medium-modal"
                  type="button"
                  className=":bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  {acceptText}
                </button>
              )}

              {isDeclineButton && (
                <button
                  onClick={onClose}
                  data-modal-hide="medium-modal"
                  type="button"
                  className=":hover:bg-gray-600 :hover:text-white :focus:ring-gray-600 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
                >
                  {declineText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
