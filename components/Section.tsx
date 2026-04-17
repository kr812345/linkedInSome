import SunBackground from "./SunBackground";

export default function Section({children, className, withSun = false}) {

    return (<>
        <div className={`relative w-full min-h-screen py-25 px-10 flex justify-center items-center overflow-x-hidden ${className}`}>
             {withSun && <SunBackground />}
             <div className="relative z-10 w-full flex justify-center items-center">
                {children}
             </div>
        </div>
    </>)
}