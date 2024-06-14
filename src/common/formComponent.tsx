import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { CircularProgress, TextField } from "@mui/material";

export interface FormInputProps {
    name: string;
    control: any;
    fullWidth?: boolean;
    label?: string | null;
    multiline?: boolean;
    required?: boolean;
    width?: number;
    theme?: any;
    loading?: boolean;
    handleBlur?: () => void;
    onChangeCap?: any;
    noMarginTop?: boolean;
    sxProp?: any;
    charLimit?: number;
    autoComplete?: string;
    size?: "small" | "medium";
    readOnly?: boolean;
    disabled?: boolean;
}

export const FormTextField = ({
    name,
    label,
    fullWidth = false,
    control,
    multiline = false,
    required = false,
    theme,
    loading = false,
    handleBlur,
    onChangeCap,
    charLimit,
    autoComplete,
    readOnly = false,
    disabled = false,
    size = 'small'
}: FormInputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <TextField
                    fullWidth={fullWidth}
                    className='form-textfield'
                    size={size}
                    value={value}
                    onChange={(e) => {
                        onChange(e);
                        onChangeCap && onChangeCap();
                    }}
                    onBlur={() => {
                        onBlur();
                        handleBlur && handleBlur();
                        if (value === '') {
                            setIsFocused(false);
                        }
                    }}
                    onFocus={() => setIsFocused(true)}
                    label={label}
                    helperText={error ? error.message : null}
                    error={!!error}
                    variant="outlined"
                    multiline={multiline}
                    required={required}
                    InputProps={{
                        endAdornment: loading ? <CircularProgress color="inherit" size={20} /> : null,
                        readOnly,
                    }}
                    autoComplete={autoComplete}
                    inputProps={{
                        maxLength: charLimit,
                    }}
                    InputLabelProps={{
                        shrink: value !== '' || isFocused, // Shrink label if input has value or is focused
                    }}
                    data-testid={name}
                    id={name}
                    disabled={disabled}
                />
            )}
        />
    );
};

