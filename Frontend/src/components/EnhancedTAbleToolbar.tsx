import * as React from 'react';
import { Toolbar, Typography, IconButton, Tooltip, Select, MenuItem, TextField } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

interface EnhancedTableToolbarProps {
    searchTerm: string;
    handleAdd: () => void;
    setSearchTerm: (value: string) => void;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
}

const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = (props) => {
    const { handleAdd, searchTerm, setSearchTerm, statusFilter, setStatusFilter } = props;

    return (
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flex: '1 1 100%' }}>
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
                </Select>
                <Tooltip title="Filtrar Texto">
                    <TextField
                        label="Pesquisar"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Tooltip>
            </div>
        </Toolbar>
    );
};

export default EnhancedTableToolbar;

