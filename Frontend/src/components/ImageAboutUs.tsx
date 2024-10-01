import { Box, Button } from "@mui/material"

function ImageAboutUs() {
    const redirect = () => {
        const url = `https://api.whatsapp.com/send?phone=5511999339150&text=Olá, gostaria de falar com um atendente.`
        window.open(url, '_blank')

    };
    return (
        <Box className="px-0 h-52  md:h-80 lg:h-96 xl:h-96 w-full" >
            <Box
                sx={{
                    width: '100%',       // Largura 100% da viewport
                    height: '100%',      // Altura 100% da viewport
                    backgroundImage: 'url(/public/Home-Auto-Life-Insurance.jpg)', // Caminho da imagem
                    backgroundSize: 'cover',  // Faz a imagem cobrir todo o box
                    backgroundPosition: 'center', // Centraliza a imagem
                    backgroundRepeat: 'no-repeat' // Não repete a imagem
                }}
                className={`flex flex-col items-center  justify-center`}
                id='imageMenu'

            >


                <Box
                    sx={{
                        height: '100%',      // Altura 100% da viewport
                        backgroundSize: 'cover',  // Faz a imagem cobrir todo o box
                        backgroundPosition: 'center', // Centraliza a imagem
                        backgroundRepeat: 'no-repeat' // Não repete a imagem
                    }}
                    className='flex flex-col  items-center md:items-start w-screen lg:w-1/2  justify-center '

                >
                    <h2 className='text-center   md:text-start font-mono  text-sm md:text-base lg:text-lg xl:text-2xl'>Realize Seus Sonhos com Nossos Consórcios!</h2>

                    <p className='text-center md:text-start font-mono  text-xs md:text-sm lg:text-base xl:text-xl'>Você já imaginou conquistar aquele carro novo, a casa dos seus sonhos ou até mesmo fazer uma viagem inesquecível? Com nossos consórcios, isso é possível!</p>
                    <div className="flex justify-center lg:justify-start w-full  mt-5">
                        <Button
                            onClick={redirect}
                            variant="contained"
                            size="small"
                            color='warning'
                            sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}
                        >
                            Simule Agora
                        </Button>
                    </div>

                </Box>

            </Box>

        </Box>

    )
}

export default ImageAboutUs; 
