
export default function Section({children}) {

    return (<>
        <div className='w-screen min-h-screen py-25 px-10 flex justify-center items-center'>
            {children}
        </div>
    </>)
}