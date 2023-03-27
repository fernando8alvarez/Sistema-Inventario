import linkedin from "./img/linkedin.png";
import github from "./img/github.png";
import codigo from "./img/codigo.png";

export default function () {

    const año = new Date().getFullYear().toString();

    return (
        <>
            <div className="bg-transparent flex flex-col py-5 gap-3">
                <div className="flex justify-center gap-4">
                    <a href="https://www.linkedin.com/in/luis-fernando-alvarez-leccia-3a5b7b151/" target="_blank" title="Click para acceder a mi Linkedin" >
                        <img src={linkedin} alt="Img not found" className="cursor-pointer w-[30px] sm:w-[35px] lg:w-[40px]" />
                    </a>
                    <a href="https://github.com/fernando8alvarez" target="_blank" title="Click para acceder a mi Github">
                        <img src={github} alt="Img not found" className="cursor-pointer w-[30px] sm:w-[35px] lg:w-[40px]" />
                    </a>
                    <a href="https://github.com/fernando8alvarez/Sistema-Inventario" target="_blank" title="Click para aceder al Repositorio">
                        <img src={codigo} alt="Img not found" className="cursor-pointer w-[30px] sm:w-[35px] lg:w-[40px]" />
                    </a>
                </div>
                <div className="w-full text-center text-[#bfff07] text-xs sm:text-sm lg:text-base sm:font-medium">Copyright © {año} | Coded by Luis Fernando Alvarez</div>
            </div>
        </>
    )
}