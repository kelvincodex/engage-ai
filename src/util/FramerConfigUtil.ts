export class FramerConfigUtil {
    static stagParent = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.25,
            },
        },
    }

    static stagChildren = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.25,
            },
        },
    }

    static scroll = {
        hidden: { opacity: 0, x: -100 },
        show: {opacity: 1, x: 0},
    }

    static fadeUp = {
        hidden: { opacity: 0, y: 100 },
        show: {opacity: 1, y: 0},
    }

    static fadeDown = {
        hidden: { opacity: 0, y: -100 },
        show: {opacity: 1, y: 0},
    }



}
