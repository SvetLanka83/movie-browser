// Hardcoded user chip with avatar circle and name
export default function UserInfo() {
    return (
        <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gray-300" />
            <span className="text-sm">Guest</span>
        </div>
    );
}
