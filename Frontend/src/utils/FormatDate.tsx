import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { TextField } from "@mui/material";

import "dayjs/locale/pt-br";
interface formatData {
    name: string,
    label: any, helperText: string, onChange: any
}
export default function FormatDate({ name, label, helperText, onChange }: formatData) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
            <DemoContainer components={["DatePicker"]}>
                <DatePicker
                    orientation="portrait"
                    name={name}
                    label={label}
                    onChange={onChange}
                    dayOfWeekFormatter={(weekday) => `${weekday.format("ddd")}.`}
                    format="DD/MM/YYYY"
                    sx={{
                        width: "100%",
                    }}
                    slotProps={{
                        calendarHeader: {
                            sx: {
                                color: "#bbdefb",
                                borderRadius: "2px",
                                borderWidth: "1px",
                                borderColor: "#2196f3",
                                border: "1px solid",
                                backgroundColor: "#0d47a1",
                            },
                        },
                        textField: {
                            helperText: helperText,
                        },
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
