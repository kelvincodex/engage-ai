import { TextareaHTMLAttributes } from "react";

interface BaseTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    leftIcon?: any;
    rightIcon?: any;
    classNameContainer?: string;
    formik?: any;
}

export const BaseTextArea = ({
                                 leftIcon: LeftIcon,
                                 rightIcon: RightIcon,
                                 className,
                                 classNameContainer,
                                 formik,
                                 ...props
                             }: BaseTextAreaProps) => {
    const isError = formik?.touched[props?.name ?? ""] && formik?.errors[props?.name ?? ""];

    return (
        <div className={`my-3 ${classNameContainer}`}>
            <label className="font-medium text-[15px]" htmlFor={props.id}>
                {props.label}
            </label>
            <div className="bg-white rounded-xl flex items-start px-3 border gap-2 overflow-hidden min-h-[100px]">
                {LeftIcon && (
                    <div className="pt-3">
                        <LeftIcon width={20} height={20} />
                    </div>
                )}
                <textarea
                    value={formik?.values[props?.name] ?? props.value}
                    onBlur={formik?.handleBlur(props?.name ?? "")}
                    onChange={formik?.handleChange(props?.name ?? "")}
                    className={`!outline-0 flex-1 bg-transparent w-full py-3 resize-y min-h-[100px] ${className}`}
                    {...props}
                />
                {RightIcon && (
                    <div className="pt-3">
                        <RightIcon width={20} height={20} />
                    </div>
                )}
            </div>
            {isError && (
                <p className="text-red-600 text-xs">
                    {formik?.errors[props?.name ?? ""]}
                </p>
            )}
        </div>
    );
};