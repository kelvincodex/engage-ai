import React, {ChangeEvent, useRef} from "react";

type BaseOtpInputType = {
    numberOfField?: number,
    className?: string,
    onChange?: (value: string)=>void,
}
export const BaseOtpInput = ({numberOfField=6,className,onChange}:BaseOtpInputType) => {
    const inputRefs = useRef<(HTMLInputElement)[]>([]);
    function getValue(): string{
        let val = ""
        for (let i = 0; i < inputRefs.current.length; i++){
            val += inputRefs.current[i].value
        }
        return val
    }
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const pattern: RegExp = /^[A-Za-z\s!@#$%^&*(),.?":{}|<>]+$/;
        if (!pattern.test(event.target.value)){
            event.target.focus()
            const inputs = event.target.value.split('')
            inputRefs.current[index].value = inputs[inputs.length-1]
            inputRefs.current[index+1].focus()
            inputRefs.current[index+1].focus()
        }else{
            inputRefs.current[index].value=""
        }
    }

    const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, numberOfField);
        if (/^\d+$/.test(pastedData)) {
            pastedData.split("").forEach((char, index) => {
                if (inputRefs.current[index]) {
                    inputRefs.current[index]!.value = char;
                }
            });
            onChange?.(pastedData); // Call onChange with the pasted value
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === 'Backspace') {
            event.preventDefault();
            inputRefs.current[index-1].value = "";
            inputRefs.current[index].value = "";
            inputRefs.current[index-1].focus();
        }
    };

    const handleKeyUp = () => {
        onChange?.(getValue())
    };

    return (
        <div className={'flex items-center justify-center gap-5 my-9'}>
            {[...Array(numberOfField)].map((_, index) =>
                <input type="numeric" onChange={(event)=>handleOnChange(event, index)}
                       inputMode="numeric"
                       ref={(ref) => {
                           inputRefs.current[index] = ref!;
                       }}
                       onPaste={handleOnPaste}
                       value={undefined}
                       onKeyDown={(event)=>handleKeyDown(event,index)}
                       onKeyUp={()=>handleKeyUp()}
                       maxLength={1}
                       className={`w-[56px] h-[56px] border text-center rounded-xl bg-white ${className}`}
                       placeholder="-" min="0" max={numberOfField} />
            )}
        </div>
    )
}