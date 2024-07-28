export default function Box(props: {value: number | null}){
    return (
        <div className="box-border h-14 w-14 p-4 border-2 flex items-center justify-center">
            <p>{props.value && props.value}</p>
        </div>
    )
}