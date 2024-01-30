export const IconBgRound = ({ svg, ...rest }) => {
    // console.log(rest, ":rest")
    return (
        <div className={`h-${rest.width} w-12 w-${rest.width} inline-flex relative  rounded-[50%] ${rest.bg}  shadow-md flex justify-center items-center flex-shrink-0`}>
            <img className={`w-${rest.imgWidth}`} src={svg} alt='bg-round' />
            {rest.isCart ?
                <div class="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white">{rest.totalCartItems}</div>
                :
                <>
                </>
            }

        </div>
        
    )
}