export default function Skeleton({count}){
    const elements = [...Array(count)].map((_,i) => {
        return (
            <div key={i} className="bg-gray-300 dark:bg-neutral-700 w-48 h-64 animate-pulse"></div>
        )
    })
    return elements;
}