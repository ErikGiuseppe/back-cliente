import * as React from 'react';
import { alpha } from '@mui/material/styles';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Paper,
    Checkbox,
    IconButton,
    Tooltip,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Select,
    MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import ClienteRepository from "../Repositories/ClienteRepository.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import FormatDate from '../utils/FormatDate.tsx';
const clienteRepository = new ClienteRepository();
import AtividadeRepository from "../Repositories/AtividadeRepository.js";
const atividadeRepository = new AtividadeRepository()

interface Atividade {
    id: string;
    situacao: string;
    providencias: string;
    cliente_id: string;
    data: Date
    createdAt: Date;
    updateAt: Date;
}
interface Data {
    id: string;
    nome: string;
    gerente: string;
    telefone: string;
    status: string;
    cpf: string;
    atividadesCliente: Atividade[]
    createdAt: Date;
    updateAt: Date;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    { id: 'nome', numeric: false, disablePadding: true, label: 'Nome' },
    { id: 'cpf', numeric: true, disablePadding: false, label: 'CPF' },
    { id: 'gerente', numeric: true, disablePadding: false, label: 'Gerente' },
    { id: 'telefone', numeric: true, disablePadding: false, label: 'Telefone' },
    { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
];
interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;

    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">

                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>

                ))}
                <TableCell padding="checkbox">

                </TableCell>
                <TableCell padding="checkbox">

                </TableCell>
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    searchTerm: any;
    handleAdd: () => void;
    setSearchTerm: any;
    statusFilter: any;
    setStatusFilter: any;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { handleAdd, searchTerm, setSearchTerm, statusFilter, setStatusFilter } = props;

    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },

            ]}
        >


            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Clientes
            </Typography>

            <div className='flex flex-row gap-5'>
                <Tooltip title="Adicionar Cliente">
                    <IconButton onClick={handleAdd}>
                        <AddCircleOutlinedIcon />
                    </IconButton>
                </Tooltip>
                <Select
                    label="Filtrar por Status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    displayEmpty
                >
                    <MenuItem value="">
                        <em>Todos</em>
                    </MenuItem>
                    <MenuItem value="ativo">Ativo</MenuItem>
                    <MenuItem value="suspenso">Suspenso</MenuItem>
                    <MenuItem value="pendente">Pendente</MenuItem>
                    {/* Adicione outras opções de status conforme necessário */}
                </Select>

                <Tooltip title="Filter Text" >
                    <TextField
                        id="outlined-basic"
                        label="Pesquisar"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Tooltip>

            </div>

        </Toolbar>
    );
}

interface NewCliente {
    id?: string;
    nome: string;
    gerente: string;
    telefone: string;
    cpf: string;
    status: string;
}
interface NewAtividade {
    id?: string;
    situacao: string;
    providencias: string;
    cliente_id: string;
    data: string
}
export default function EnhancedTable() {
    const queryClient = useQueryClient();
    const [newCliente, setNewCliente] = React.useState<NewCliente>({
        nome: '',
        gerente: '',
        telefone: '',
        cpf: '',
        status: '',
    });
    const [newAtividade, setNewAtividade] = React.useState<NewAtividade>({
        situacao: '',
        providencias: '',
        cliente_id: '',
        data: ''
    });
    const { data = [], } = useQuery("cliente", () => clienteRepository.getAllEscopo(), {
        retry: 2,
        refetchOnWindowFocus: false,
        refetchInterval: 5000,
    });
    const mutationDelete = useMutation(
        id => clienteRepository.delete(id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("cliente");
            },
            onError: (error) => {
                console.error("Erro ao deletar clientes:", error);
            },
        }
    );
    const atividadeMutationDelete = useMutation(
        id => atividadeRepository.delete(id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("cliente");
            },
            onError: (error) => {
                console.error("Erro ao deletar clientes:", error);
            },
        }
    );
    const mutationEdit = useMutation<void, Error, NewCliente>((newCliente) => clienteRepository.editCliente(newCliente), {

        onSuccess: () => {
            queryClient.invalidateQueries("cliente"); // Atualiza a lista de clientes
            handleClose(); // Fecha o modal
        },
        onError: (error) => {
            console.error("Erro ao adicionar cliente:", error);
        },
    });
    const mutationEditAtividade = useMutation<void, Error, NewAtividade>((newAtividade) => atividadeRepository.editAtividade(newAtividade), {

        onSuccess: () => {
            queryClient.invalidateQueries("cliente"); // Atualiza a lista de clientes
            handleClose(); // Fecha o modal
        },
        onError: (error) => {
            console.error("Erro ao adicionar cliente:", error);
        },
    });

    const clients = Array.isArray(data) ? data : [];

    if (data.isLoading) return <div className="loading">Carregando...</div>;
    if (data.error) return <div className="loading">Algo deu errado...</div>;
    const [order, setOrder] = React.useState<Order>('asc');
    const [open, setOpen] = React.useState(false);
    const [atividadeOpen, atividadeSetOpen] = React.useState(false);
    const [orderBy, setOrderBy] = React.useState<keyof Data>('nome');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleClickOpen = () => {
        setOpen(true);
    };
    const atividadeHandleClickOpen = () => {
        atividadeSetOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewCliente({ nome: '', gerente: '', telefone: '', status: '', cpf: '', });

    };
    const atividadeHandleClose = () => {
        atividadeSetOpen(false);
        setNewAtividade({
            situacao: '',
            providencias: '',
            cliente_id: '',
            data: ''
        });

    };
    const addMutation = useMutation<void, Error, NewCliente>((newCliente) => clienteRepository.createCliente(newCliente), {

        onSuccess: () => {
            queryClient.invalidateQueries("cliente"); // Atualiza a lista de clientes
            handleClose(); // Fecha o modal
        },
        onError: (error) => {
            console.error("Erro ao adicionar cliente:", error);
        },
    });
    const addMutationAtividade = useMutation<void, Error, NewAtividade>((newAtividade) => atividadeRepository.createAtividade(newAtividade), {

        onSuccess: () => {
            queryClient.invalidateQueries("cliente"); // Atualiza a lista de clientes
            handleClose(); // Fecha o modal
        },
        onError: (error) => {
            console.error("Erro ao adicionar cliente:", error);
        },
    });

    const handleAddItem = () => {
        if (Object.values(newCliente).some(value => !value)) {
            console.error("Preencha todos os campos obrigatórios.");
            return;
        }
        addMutation.mutate(newCliente);
    };


    // Altere a função handleAdd para abrir o modal
    const atividadeHandleAdd = (atividadeParaCriar: any) => {
        setNewAtividade(atividadeParaCriar); // Define os dados do cliente no estado
        atividadeSetOpen(true); // Abre o diálogo de edição

    };

    const handleAdd = () => {
        handleClickOpen();
    };

    const handleDelete = (id: any) => {

        mutationDelete.mutate(id);

    };

    const atividadeHandleDelete = (id: any) => {

        atividadeMutationDelete.mutate(id);

    };
    const handleEdit = (clienteParaEditar: any) => {
        setNewCliente(clienteParaEditar); // Define os dados do cliente no estado
        setOpen(true); // Abre o diálogo de edição

    };
    const atividadeHandleEdit = (atividadeParaEditar: any) => {
        setNewAtividade(atividadeParaEditar); // Define os dados do cliente no estado
        atividadeSetOpen(true); // Abre o diálogo de edição

    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const [searchTerm, setSearchTerm] = React.useState('');

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;


    const [statusFilter, setStatusFilter] = React.useState('');
    const filteredClients = clients.filter((client) =>
        (client.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.cpf.toString().includes(searchTerm) ||
            client.gerente.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.telefone.includes(searchTerm) ||
            client.status.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (client.status.toLowerCase().includes(statusFilter.toLowerCase()) || statusFilter === '')
    );

    const visibleRows = React.useMemo(
        () => filteredClients.sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, filteredClients]
    );
    const [openRows, setOpenRows] = React.useState<string[]>([]);

    const handleRowToggle = (id: string) => {
        setOpenRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };
    const StyledGridOverlay = styled('div')(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        '& .no-rows-primary': {
            fill: '#3D4751',
            ...theme.applyStyles('light', {
                fill: '#AEB8C2',
            }),
        },
        '& .no-rows-secondary': {
            fill: '#1D2126',
            ...theme.applyStyles('light', {
                fill: '#E8EAED',
            }),
        },
    }));

    function CustomNoRowsOverlay() {
        return (
            <StyledGridOverlay>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width={96}
                    viewBox="0 0 452 257"
                    aria-hidden
                    focusable="false"
                >
                    <path
                        className="no-rows-primary"
                        d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
                    />
                    <path
                        className="no-rows-primary"
                        d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
                    />
                    <path
                        className="no-rows-primary"
                        d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
                    />
                    <path
                        className="no-rows-secondary"
                        d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
                    />
                </svg>
                <Box sx={{ mt: 2 }}>No rows</Box>
            </StyledGridOverlay>
        );
    }

    function Row(props: { row: ReturnType<typeof Data> }) {
        const { row } = props;
        const isOpen = openRows.includes(row.id);

        return (


            <React.Fragment>

                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => handleRowToggle(row.id)}
                        >
                            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.nome}
                    </TableCell>
                    <TableCell align="right">{row.cpf}</TableCell>
                    <TableCell align="right">{row.gerente}</TableCell>
                    <TableCell align="right">{row.telefone}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>

                    <TableCell align="right" >
                        <IconButton
                            size="small"
                            onClick={() => handleEdit({ id: row.id, nome: row.nome, cpf: row.cpf, gerente: row.gerente, telefone: row.telefone, status: row.status })}
                        >
                            <EditOutlinedIcon />
                        </IconButton>

                    </TableCell>
                    <TableCell align="right" >
                        <IconButton
                            size="small"
                            onClick={() => handleDelete(row.id)}
                        >
                            <DeleteIcon />
                        </IconButton>

                    </TableCell>
                </TableRow>
                <TableRow>

                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <div className='flex flex-row gap-3 items-center'>
                                    <Typography variant="h6" >
                                        Histórico
                                    </Typography>
                                    <IconButton size='small' onClick={() => atividadeHandleAdd({cliente_id:row.id})}>
                                        <AddCircleOutlinedIcon />
                                    </IconButton>
                                </div>
                                {row.atividadesCliente.length > 0 ? (
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Situação</TableCell>
                                                <TableCell>Providência</TableCell>
                                                <TableCell >Data</TableCell>
                                                <TableCell padding='checkbox' ></TableCell>
                                                <TableCell padding='checkbox'></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {row.atividadesCliente.map((atividadeRow: Atividade) => (
                                                <TableRow key={atividadeRow.id}>
                                                    <TableCell component="th" scope="row">
                                                        {atividadeRow.situacao}
                                                    </TableCell>
                                                    <TableCell>{atividadeRow.providencias}</TableCell>
                                                    <TableCell >{atividadeRow.data.replace(/(\d*)-(\d*)-(\d*).*/, "$3/$2/$1")}</TableCell>
                                                    <TableCell align="right" >
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => atividadeHandleEdit({ id: atividadeRow.id, situacao: atividadeRow.situacao, providencias: atividadeRow.providencias, data: atividadeRow.data, cliente_id: row.id })}
                                                        >
                                                            <EditOutlinedIcon />
                                                        </IconButton>

                                                    </TableCell>
                                                    <TableCell align="right" >
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => atividadeHandleDelete(atividadeRow.id)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>

                                                    </TableCell>



                                                </TableRow>
                                            ))
                                            }
                                        </TableBody>
                                    </Table>
                                ) : CustomNoRowsOverlay()}
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }


    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    handleAdd={handleAdd}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter} />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size='medium'>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>

                            {
                                visibleRows.map((row) => (
                                    <Row key={row.id} row={row} />
                                ))
                            }
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{newCliente.id ? "Editar Cliente" : "Adicionar Cliente"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nome"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCliente.nome}
                        onChange={(e) => setNewCliente({ ...newCliente, nome: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Gerente"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCliente.gerente}
                        onChange={(e) => setNewCliente({ ...newCliente, gerente: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Telefone"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCliente.telefone}
                        onChange={(e) => setNewCliente({ ...newCliente, telefone: e.target.value })}
                    />

                    <TextField
                        margin="dense"
                        label="CPF"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCliente.cpf}
                        onChange={(e) => setNewCliente({ ...newCliente, cpf: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Status"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCliente.status}
                        onChange={(e) => setNewCliente({ ...newCliente, status: e.target.value })}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={() => {
                        if (newCliente.id) {

                            // Se já existe um ID, é uma edição
                            mutationEdit.mutate(newCliente);
                        } else {
                            // Se não existe ID, é uma adição
                            addMutation.mutate(newCliente);
                        }
                    }}>
                        {newCliente.id ? "Salvar" : "Adicionar"}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={atividadeOpen} onClose={atividadeHandleClose}>
                <DialogTitle>{newAtividade.id ? "Editar Atividade" : "Adicionar Atividade"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Situação"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newAtividade.situacao}
                        onChange={(e) => setNewAtividade({ ...newAtividade, situacao: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Providência"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newAtividade.providencias}
                        onChange={(e) => setNewAtividade({ ...newAtividade, providencias: e.target.value })}
                    />
                    <FormatDate
                        name="data"
                        label="Data"
                        value={newAtividade.data}
                        onChange={(e: any) =>
                            setNewAtividade({
                                ...newAtividade,
                                data: e?.$d?.toLocaleDateString("en-Ca"),
                            })
                        }
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={atividadeHandleClose}>Cancelar</Button>
                    <Button onClick={() => {
                        if (newAtividade.id) {

                            // Se já existe um ID, é uma edição
                            mutationEditAtividade.mutate(newAtividade);
                        } else {
                            // Se não existe ID, é uma adição
                            addMutationAtividade.mutate(newAtividade);
                        }
                    }}>
                        {newCliente.id ? "Salvar" : "Adicionar"}
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}

