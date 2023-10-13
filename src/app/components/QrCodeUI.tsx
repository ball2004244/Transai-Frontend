import { FRONTEND_URL } from "@/app/apis";

export function QrCodeUI({
    roomID,
    onClose,
}: {
    roomID: string;
    onClose: () => void;
}) {
    const QrGenURL = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=`;
    const userAccessURL = `${FRONTEND_URL}/room?room_id=${roomID}`;

    const AccessibleQrURL = `${QrGenURL}${userAccessURL}`;

    return (
        <div className="qr-container absolute top-0 left-0 z-10 flex flex-col items-center justify-center w-screen h-screen bg-gray-800 p-2 m-0">
            <div className="qr-container-col flex flex-col items-center justify-center z-20 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white rounded-lg p-4 m-2">
                <h1 className="qr-title text-3xl lg:text-5xl text-center font-bold text-gray-800 mt-4 p-2">
                    Scan to Join
                </h1>
                <div className="qr-code flex flex-col items-center justify-center w-full h-full">
                    <img className="qr-img rounded-lg w-full h-full" src={AccessibleQrURL} />
                </div>
                <h3 className="access-url text-lg lg:text-xl text-center italic text-gray-800 bg-gray-200 rounded-lg p-2 m-2">
                    {userAccessURL}
                </h3>
                <button
                    className="close-btn rounded-full p-2 m-2 text-gray-700 text-2xl font-bold w-fit select-none"
                    onClick={onClose}
                >
                    Go Back
                </button>
            </div>
        </div>
    );}

