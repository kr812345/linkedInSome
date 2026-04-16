
export default function Section({children, className}) {

    return (<>
        <div className={`w-screen min-h-screen py-25 px-10 flex justify-center items-center ${className}`}>
            {children}
        </div>
    </>)
}