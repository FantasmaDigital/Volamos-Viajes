interface EstimatedTimeProps{
    estimatedTime: number
}

const EstimatedTime:React.FC<EstimatedTimeProps> = ({estimatedTime}) => {
    return (
        <div className="mt-4">
            <p className="text-lg font-bold">Tiempo estimado de llegada:</p>
            <p className="text-blue-500">{estimatedTime}</p>
        </div>
    )
}

export default EstimatedTime;