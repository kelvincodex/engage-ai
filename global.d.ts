import 'quill';
declare module 'quill' {
    interface Quill {
        history: {
            undo: () => void;
            redo: () => void;
        };
    }
}