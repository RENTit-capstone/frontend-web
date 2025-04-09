import {UseFormRegisterReturn} from 'react-hook-form'

export type TextInputProps = {
    label: string;
    type?: string;
    placeholder: string;
    register?: UseFormRegisterReturn;
}

const TextInput = (props: TextInputProps) => {
    const {label, type="text", placeholder, register} = props;

    return (
        <div>
            <label>{label}</label>
            <input
                type={type}
                {...register}
                placeholder={placeholder}
            />
        </div>
    );
};

export default TextInput;