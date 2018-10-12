export default ({
    search: (props) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" { ...props }>
            <g opacity="0.513109">
            <path fillRule="evenodd" clipRule="evenodd" d="M15.502 14H14.708L14.432 13.726C15.407 12.589 16 11.115 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.115 16 12.588 15.408 13.725 14.434L14.001 14.708V15.5L18.999 20.491L20.49 19L15.502 14ZM9.5 14C7.014 14 5 11.986 5 9.5C5 7.015 7.014 5 9.5 5C11.985 5 14 7.015 14 9.5C14 11.986 11.985 14 9.5 14Z" fill="#8AA1A9"/>
            </g>
        </svg>
    ),

    close: (props) => (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" { ...props }>
            <g opacity="0.54">
            <path fillRule="evenodd" clipRule="evenodd" d="M14 1.4L12.6 0L7 5.6L1.4 0L0 1.4L5.6 7L0 12.6L1.4 14L7 8.4L12.6 14L14 12.6L8.4 7L14 1.4Z" fill="#687B82"/>
            </g>
        </svg>
    ),

    expand: (props) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" { ...props }>
            <g opacity="0.54">
            <path fillRule="evenodd" clipRule="evenodd" d="M16.6 8.59998L12 13.2L7.4 8.59998L6 9.99998L12 16L18 9.99998L16.6 8.59998Z" fill="#687B82"/>
            </g>
        </svg>
    ),

    heart: (props) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" { ...props}>
            <g opacity="0.54">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 8C11.33 6.268 9.453 5 7.5 5C4.957 5 3 6.932 3 9.5C3 13.029 6.793 15.758 12 21C17.207 15.758 21 13.029 21 9.5C21 6.932 19.043 5 16.5 5C14.545 5 12.67 6.268 12 8Z" fill={ props.fill || "#87969C" }/>
            </g>
        </svg>
    )
});