import { createRef, CSSProperties, useEffect } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

interface TextareaProps<T> extends UseControllerProps<T> {
    placeholder?: string;
    style?: CSSProperties;
}

const textareaStyle: CSSProperties = {
    resize: 'none',
    boxSizing: 'border-box',
    overflow: 'hidden',
    lineHeight: '1.2'
};

export const Textarea = <T extends Record<string, any>>(props: TextareaProps<T>) => {
    const {field} = useController(props);
    const wrapperRef = createRef<HTMLDivElement>();

    const {
        placeholder = '',
        style = {},
    } = props;

    useEffect(() => {
        if (wrapperRef.current) {
            const textarea = wrapperRef.current
                .querySelector('textarea') as HTMLTextAreaElement;

            autoSizeTextarea(textarea);
        }
    }, []);

    useEffect(() => {
        if (wrapperRef.current) {
            const textarea = wrapperRef.current
                .querySelector('textarea') as HTMLTextAreaElement;

            autoSizeTextarea(textarea);
        }
    });

    return (
        <div className="shrink flex flex-col" ref={wrapperRef}>
            <textarea
                className="textarea textarea-bordered"
                cols={1}
                rows={1}
                style={{...textareaStyle, ...style}}
                placeholder={placeholder}
                {...field}
            />
        </div>
    );
};

function autoSizeTextarea(textarea: HTMLTextAreaElement) {
    textarea.style.height = '30px';
    textarea.style.height = `${textarea.scrollHeight}px`;
}