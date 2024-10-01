import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import BackgroundImageComponent from "../components/BackgroundImageComponent.tsx"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

export default function RowAndColumnSpacing() {

    return (
        <Box
            sx={{ width: '100%' }}
            className='px-3 flex items-center justify-center'
        >


            <Box
                className=' w-full lg:w-1/2'
            >

                <Grid className='  flex items-start justify-center' container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>


                    <Grid id='produtos' className="px-0 h-96  md:h-80 lg:h-96 xl:h-96 w-screen" size={6}>
                        <BackgroundImageComponent

                            image='url(/public/Concórcio-de-carros-4.jpg)'
                        />
                    </Grid>
                    <Grid className="flex flex-col items-center justify-center px-0   md:h-80 lg:h-96 xl:h-96 w-screen" size={6}>
                        <Item>
                            <BackgroundImageComponent
                                title='A Sua Chance de Conquistar o Veículo dos Seus Sonhos!'
                                text='Você sonha em ter um carro novo, mas não quer pagar altas taxas de juros? O consórcio de carros é a solução ideal para você! Com ele, você pode planejar a compra do seu veículo de forma inteligente e econômica.'
                                containedButton='Simule Agora'
                                textWhats='Olá, gostaria de falar sobre um consórcio de automóveis'

                            />
                        </Item>
                    </Grid>
                    <Grid className="flex flex-col items-center justify-center px-0   md:h-80 lg:h-96 xl:h-96 w-screen" size={6}>
                        <Item>
                            <BackgroundImageComponent
                                title='Realize o Sonho do Lar Próprio!'
                                text='Você deseja conquistar a casa dos seus sonhos, mas não quer se endividar com altas taxas de juros? O consórcio de casas é a alternativa perfeita para quem busca uma forma planejada e econômica de adquirir o seu imóvel.'
                                containedButton='Simule Agora'
                                textWhats='Olá, gostaria de falar sobre um consórcio de imóveis'
                                id='imoveis'
                            />
                        </Item>

                    </Grid>
                    <Grid className="px-0 h-72 mb-3  md:h-80 lg:h-96 xl:h-96 w-screen" size={6}>

                        <BackgroundImageComponent

                            image='url(/public/consorcio-casa-artigo.jpg)'
                        />
                    </Grid>
                </Grid>
            </Box >
        </Box >
    );
}
