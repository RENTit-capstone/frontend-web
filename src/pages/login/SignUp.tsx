import { useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import { SignUpType } from "../../types/types";

const SignUpList: (keyof SignUpType)[]= ["name", "nickname", "email", "emailConfirm", "pwd", "pwdConfirm", "phone", "university", "major", "stdId", "grade"];

const SignUp = () => {
    const {register, handleSubmit, formState: {errors}} = useForm <SignUpType>();

    const onSubmit = (data: SignUpType) => {
        console.log(data);
    }

    return (
        <div>
            <h1>회원가입</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {SignUpList.map((item: string) => (
                    <div key={item}>
                        <TextInput
                            label={item}
                            placeholder={item}
                            register={register(item as keyof SignUpType, {required: true})}
                        />
                        {errors[item as keyof SignUpType] && `${item}은 필수값입니다.`}
                    </div>
                ))}
                <button>가입하기</button>
            </form>
        </div>
    );
}

export default SignUp;