import Headers from "../components/Header.tsx"
import Footer from "../components/Footer.tsx"
import ClienteTable from "../components/TableClient.tsx"
import Table from "../components/Table.tsx"
import FabCellPhone from "../components/FabCellPhone.tsx"
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

const Home = () => {


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        }} >
            <main style={{ flex: 1 }}>
                <Headers />
                <QueryClientProvider client={queryClient}>
                    <ClienteTable />
                </QueryClientProvider>

                <FabCellPhone />
            </main>
            <Footer />

        </div>
    )
}
export default Home
