import React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import "dayjs/locale/pt-br";

interface FormatDataProps {
    name: string;
    label: string;
    onChange: (date: dayjs.Dayjs | null) => void; // Altere para o tipo correto
    value: dayjs.Dayjs | null; // Deve ser um dayjs ou null
}

export default function FormatDate({ name, label, onChange, value }: FormatDataProps) {


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <DatePicker
                orientation="portrait"
                name={name}
                label={label}
                onChange={onChange}
                value={value}



                format="DD/MM/YYYY" // Formato da data
                sx={{
                    width: "100%",
                }}
            /> </LocalizationProvider>
    );
}

