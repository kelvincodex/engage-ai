export const CreatedAtRenderer = (props: any) => {
    return (
        <div className="flex items-center gap-2 w-full h-full">
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full border text-gray-500">
                ST
            </div>
            <div className="min-w-0 flex-1">
                <span className="font-semibold block text-sm truncate">
                    Phoenix Baker
                </span>
                <span className="text-gray-500 block text-xs truncate">
                    phoenix@untitledui.com
                </span>
            </div>
        </div>
    );
};
