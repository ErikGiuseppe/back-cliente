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
import PausePresentationTwoToneIcon from '@mui/icons-material/PausePresentationTwoTone';
import FormatDate from '../utils/FormatDate.tsx';
const clienteRepository = new ClienteRepository();

interface Data {
    id: string;
    nome: string;
    gerente: string;
    telefone: string;
    situacao: string;
    providencias: string;
    status: string;
    cpf: string;
    data: Date
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
    { id: 'situacao', numeric: true, disablePadding: false, label: 'Situação' },
    { id: 'providencias', numeric: true, disablePadding: false, label: 'Providências' },
    { id: 'data', numeric: true, disablePadding: false, label: 'Data' },
    { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
];
interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

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
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
    searchTerm: any;
    handleDelete: () => void;
    handleAdd: () => void;
    handleEdit: () => void;
    setSearchTerm: any;
    statusFilter: any;
    setStatusFilter: any;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected, handleDelete, handleEdit, handleAdd, searchTerm, setSearchTerm, statusFilter, setStatusFilter } = props;

    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >

            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Clientes
                </Typography>
            )}
            {numSelected > 0 ? (
                <div className='flex flex-row gap-5'>
                    <Tooltip title="Editar Cliente">
                        <IconButton onClick={handleEdit}>
                            <EditOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={handleDelete} >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            ) : (
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
            )}

        </Toolbar>
    );
}

interface NewCliente {
    id?: string;
    nome: string;
    gerente: string;
    telefone: string;
    situacao: string;
    providencias: string;
    cpf: string;
    status: string;
    data: string; // ou Date se você estiver lidando com objetos Date
}
export default function EnhancedTable() {
    const queryClient = useQueryClient();
    const [newCliente, setNewCliente] = React.useState<NewCliente>({
        nome: '',
        gerente: '',
        telefone: '',
        situacao: '',
        providencias: '',
        cpf: '',
        status: '',
        data: '',
    });
    const { data = [], } = useQuery("cliente", () => clienteRepository.getAll(), {
        retry: 2,
        refetchOnWindowFocus: true,
        refetchInterval: 1000,
    });
    const mutationDelete = useMutation(
        (ids: string[]) => Promise.all(ids.map(id => clienteRepository.delete(id))),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("cliente");
                setSelected([]); // Limpa a seleção após a exclusão
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
    const clients = Array.isArray(data) ? data : [];

    if (data.isLoading) return <div className="loading">Carregando...</div>;
    if (data.error) return <div className="loading">Algo deu errado...</div>;
    const [order, setOrder] = React.useState<Order>('asc');
    const [open, setOpen] = React.useState(false);
    const [orderBy, setOrderBy] = React.useState<keyof Data>('nome');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = data.map((n: Data) => n.id);
            setSelected(newSelected);
        } else {
            setSelected([]);
        }
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewCliente({ nome: '', gerente: '', telefone: '', situacao: '', providencias: '', status: '', cpf: '', data: '' });

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

    const handleAddItem = () => {
        if (Object.values(newCliente).some(value => !value)) {
            console.error("Preencha todos os campos obrigatórios.");
            return;
        }
        addMutation.mutate(newCliente);
    };


    // Altere a função handleAdd para abrir o modal
    const handleAdd = () => {
        handleClickOpen();
    };


    const handleDelete = () => {
        if (selected.length > 0) {
            mutationDelete.mutate(selected);
            // Aqui você pode chamar uma função do seu repositório para deletar os clientes
            // Exemplo: clienteRepository.delete(selected);
            // Depois de deletar, você pode atualizar a lista de clientes ou refazer a consulta.
        }
    };
    const handleEdit = () => {
        if (selected.length === 1) {
            const clienteParaEditar = clients.find(cliente => cliente.id === selected[0]);
            if (clienteParaEditar) {
                setNewCliente(clienteParaEditar); // Define os dados do cliente no estado
                setOpen(true); // Abre o diálogo de edição
            }
        } else {
            alert("Selecione apenas um cliente para editar.");
        }
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
            client.situacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.providencias.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.status.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (client.status.toLowerCase().includes(statusFilter.toLowerCase()) || statusFilter === '')
    );

    const visibleRows = React.useMemo(
        () => filteredClients.sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, filteredClients]
    );


    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleAdd={handleAdd}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter} />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size='medium'>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = selected.includes(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                            {row.nome}
                                        </TableCell>
                                        <TableCell align="right">{row.cpf}</TableCell>
                                        <TableCell align="right">{row.gerente}</TableCell>
                                        <TableCell align="right">{row.telefone}</TableCell>
                                        <TableCell align="right">{row.situacao}</TableCell>
                                        <TableCell align="right">{row.providencias}</TableCell>
                                        <TableCell align="right">{row.data.replace(/(\d*)-(\d*)-(\d*).*/, "$3/$2/$1")}</TableCell>
                                        <TableCell align="right">{row.status}</TableCell>
                                    </TableRow>
                                );
                            })}
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
                        label="Situação"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCliente.situacao}
                        onChange={(e) => setNewCliente({ ...newCliente, situacao: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Providências"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCliente.providencias}
                        onChange={(e) => setNewCliente({ ...newCliente, providencias: e.target.value })}
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
                    <FormatDate
                        name="data"
                        label="Data"
                        value={newCliente.data}
                        onChange={(e) =>
                            setNewCliente({
                                ...newCliente,
                                data: e?.$d?.toLocaleDateString("en-Ca"),
                            })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={() => {
                        console.log(newCliente.id)
                        if (newCliente.id) {

                            console.log(newCliente.id)
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
        </Box>
    );
}

