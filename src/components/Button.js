import React from 'react';
import Button from 'react-md/lib/Buttons/Button';

export const CustomButton = (props) => (
    <Button raised 
    children={props.label}
    type={props.type}
    disabled={props.disabled}
    onClick={props.onClick}
    />
)