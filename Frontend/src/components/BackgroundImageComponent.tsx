import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { BackgroundImageComponentProps } from '../interfaces/BackgroundImageComponentProps';
function BackgroundImageComponent(props: BackgroundImageComponentProps) {

    const {
        image,
        title,
        text,
        textButton,
        textColor,
        backGroudColor,
        containedButton,
        textWhats,
        id

    } = props
    let url = ''

    const newUrl = () => {
        url = `https://api.whatsapp.com/send?phone=5511999339150&text=${textWhats}`
        window.open(url, '_blank')

    };
    return (
        <Box
            sx={{
                width: '100%',       // Largura 100% da viewport
                height: '100%',      // Altura 100% da viewport
                backgroundImage: image ? image : null, // Caminho da imagem
                backgroundSize: 'cover',  // Faz a imagem cobrir todo o box
                backgroundPosition: 'center', // Centraliza a imagem
                backgroundRepeat: 'no-repeat', // Não repete a imagem
                borderRadius: '16px'

            }}
            className={`flex flex-col items-center ${backGroudColor} justify-center`}
            id={id}

        >
            {title ? <h2 className={`text-center font-mono ${textColor} text-sm md:text-base lg:text-lg xl:text-2xl`}> {title} </h2> : null}

            {text ? <p className={`text-center font-mono ${textColor} text-xs md:text-sm lg:text-base xl:text-xl`}> {text} </p> : null}


            <div className='pr-3 my-1'>

                {textButton ? (
                    <Button variant="text" sx={{ fontSize: { xs: '0.75rem', sm: '1rem', } }}>
                        {textButton}
                    </Button>
                ) : null}
                {containedButton ? (
                    <Button onClick={newUrl} size='small' variant="contained" color='warning' sx={{ fontSize: { xs: '0.75rem', sm: '1rem', } }}>
                        {containedButton}
                    </Button>
                ) : null}
            </div>

        </Box>
    );
}

export default BackgroundImageComponent;

