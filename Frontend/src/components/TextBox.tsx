import { Box, } from "@mui/material"
import { TextBoxProps } from "../interfaces/TextBoxProps";
function TextBox(props: TextBoxProps) {
    const {
        title,
        text,

    } = props

    return (

        <Box className="flex px-0  items-center justify-center   w-full" >

            <Box
                sx={{
                    height: '100%',      // Altura 100% da viewport
                    backgroundSize: 'cover',  // Faz a imagem cobrir todo o box
                    backgroundPosition: 'center', // Centraliza a imagem
                    backgroundRepeat: 'no-repeat' // Não repete a imagem
                }}
                className='flex flex-col  items-center md:items-start w-screen lg:w-1/2  justify-center '
                id='produtos'

            >
                <h2 className='text-center  md:text-start font-mono  text-sm md:text-base lg:text-lg xl:text-2xl'>{title}</h2>

                <p className='text-center md:text-start font-mono my-3 text-xs md:text-sm lg:text-base xl:text-xl'>{text}</p>

            </Box>
        </Box>
    )
}


export default TextBox; 
