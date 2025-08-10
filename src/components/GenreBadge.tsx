type Props = { text: string };
export default function GenreBadge({ text }: Props) {
    return (
        <span className="rounded-full border border-gray-300 px-2 py-0.5 text-sm">
      {text}
    </span>
    );
}
